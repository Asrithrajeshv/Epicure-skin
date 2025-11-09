from django.urls import path
from . import views

urlpatterns = [
    path('config', views.config),
    path('register', views.register),
    path('login', views.login),
]