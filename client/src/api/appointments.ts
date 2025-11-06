import api from './api';

// Description: Get all appointments for current user
// Endpoint: GET /api/appointments
// Request: {}
// Response: { appointments: Array<{ _id: string, doctorId: string, doctorName: string, doctorAvatar: string, date: string, time: string, status: string, disease: string, confidence: number }> }
export const getAppointments = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        appointments: [
          {
            _id: 'apt_1',
            doctorId: 'doc_1',
            doctorName: 'Dr. Sarah Johnson',
            doctorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            time: '10:00 AM',
            status: 'confirmed',
            disease: 'Melanoma',
            confidence: 87
          },
          {
            _id: 'apt_2',
            doctorId: 'doc_2',
            doctorName: 'Dr. Michael Chen',
            doctorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            time: '2:30 PM',
            status: 'pending',
            disease: 'Psoriasis',
            confidence: 72
          },
          {
            _id: 'apt_3',
            doctorId: 'doc_1',
            doctorName: 'Dr. Sarah Johnson',
            doctorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            time: '11:00 AM',
            status: 'completed',
            disease: 'Eczema',
            confidence: 65
          }
        ]
      });
    }, 500);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.get('/api/appointments');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Cancel an appointment
// Endpoint: DELETE /api/appointments/:id
// Request: {}
// Response: { success: boolean, message: string }
export const cancelAppointment = (appointmentId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Appointment cancelled successfully' });
    }, 500);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.delete(`/api/appointments/${appointmentId}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};