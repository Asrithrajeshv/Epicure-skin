import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Search, Loader2 } from 'lucide-react';
import { getDoctors } from '@/api/doctors';
import { useToast } from '@/hooks/useToast';

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  bio: string;
  qualifications: string[];
  responseTime: string;
  isAvailable: boolean;
  avatar: string;
  rating: number;
}

export function Doctors() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        const data = await getDoctors();
        setDoctors((data as { doctors: Doctor[] }).doctors);
        setFilteredDoctors((data as { doctors: Doctor[] }).doctors);
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load doctors',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, [toast]);

  useEffect(() => {
    const filtered = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]);

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Find a Dermatologist</h1>
        <p className="text-muted-foreground">
          Connect with board-certified dermatologists for professional medical advice
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by name or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : filteredDoctors.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No doctors found matching your search</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card
              key={doctor._id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/doctor/${doctor._id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={doctor.avatar} />
                      <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{doctor.name}</CardTitle>
                      <CardDescription>{doctor.specialization}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={doctor.isAvailable ? 'default' : 'secondary'}>
                    {doctor.isAvailable ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{doctor.bio}</p>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(doctor.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">{doctor.rating}</span>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Response time: {doctor.responseTime}</p>
                </div>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/doctor/${doctor._id}`);
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}