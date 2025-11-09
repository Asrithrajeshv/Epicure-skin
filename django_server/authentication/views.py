from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import get_user_model
import jwt
from django.conf import settings

User = get_user_model()

@api_view(['GET'])
def config(request):
    return Response({'strategy': 'email'})

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    email = request.data.get('email')
    password = request.data.get('password')
    role = request.data.get('role', 'patient')
    
    if User.objects.filter(email=email).exists():
        return Response({'message': 'User already exists'}, status=400)
    
    user = User.objects.create_user(username=email, email=email, password=password)
    user.role = role
    user.save()
    
    token = jwt.encode({'sub': str(user.id), 'email': email}, 'secret', algorithm='HS256')
    
    return Response({
        '_id': user.id,
        'email': user.email,
        'role': user.role,
        'name': user.email,
        'accessToken': token,
        'refreshToken': token,
        'isActive': True,
        'createdAt': user.date_joined,
        'lastLoginAt': user.last_login,
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    try:
        user = User.objects.get(email=email)
        if user.check_password(password):
            token = jwt.encode({'sub': str(user.id), 'email': email}, 'secret', algorithm='HS256')
            return Response({
                '_id': user.id,
                'email': user.email,
                'role': user.role,
                'name': user.email,
                'accessToken': token,
                'refreshToken': token,
                'isActive': True,
                'createdAt': user.date_joined,
                'lastLoginAt': user.last_login,
            })
    except User.DoesNotExist:
        pass
    
    return Response({'message': 'Email or password is incorrect'}, status=400)