import api from './api';

// Description: Get doctor dashboard stats
// Endpoint: GET /api/doctor/dashboard/stats
// Request: {}
// Response: { totalPatients: number, pendingAppointments: number, unreadMessages: number, completedAppointments: number }
export const getDoctorStats = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalPatients: 47,
        pendingAppointments: 5,
        unreadMessages: 3,
        completedAppointments: 142
      });
    }, 500);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.get('/api/doctor/dashboard/stats');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Get doctor appointments
// Endpoint: GET /api/doctor/appointments
// Request: {}
// Response: { appointments: Array<{ _id: string, patientName: string, patientAge: number, patientGender: string, date: string, time: string, status: string, disease: string, confidence: number, imageUrl: string }> }
export const getDoctorAppointments = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        appointments: [
          {
            _id: 'apt_1',
            patientName: 'John Doe',
            patientAge: 35,
            patientGender: 'Male',
            date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            time: '10:00 AM',
            status: 'pending',
            disease: 'Melanoma',
            confidence: 87,
            imageUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=skin1'
          },
          {
            _id: 'apt_2',
            patientName: 'Jane Smith',
            patientAge: 28,
            patientGender: 'Female',
            date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            time: '2:30 PM',
            status: 'confirmed',
            disease: 'Psoriasis',
            confidence: 72,
            imageUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=skin2'
          },
          {
            _id: 'apt_3',
            patientName: 'Mike Johnson',
            patientAge: 42,
            patientGender: 'Male',
            date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            time: '11:00 AM',
            status: 'pending',
            disease: 'Eczema',
            confidence: 65,
            imageUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=skin3'
          }
        ]
      });
    }, 500);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.get('/api/doctor/appointments');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Confirm an appointment
// Endpoint: POST /api/doctor/appointments/:id/confirm
// Request: {}
// Response: { success: boolean, message: string }
export const confirmAppointment = (appointmentId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Appointment confirmed successfully' });
    }, 500);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.post(`/api/doctor/appointments/${appointmentId}/confirm`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Decline an appointment
// Endpoint: POST /api/doctor/appointments/:id/decline
// Request: { reason: string }
// Response: { success: boolean, message: string }
export const declineAppointment = (appointmentId: string, reason: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Appointment declined successfully' });
    }, 500);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.post(`/api/doctor/appointments/${appointmentId}/decline`, { reason });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Get doctor patient reports
// Endpoint: GET /api/doctor/reports
// Request: {}
// Response: { reports: Array<{ _id: string, patientName: string, disease: string, confidence: number, timestamp: string, status: string, imageUrl: string }> }
export const getDoctorReports = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        reports: [
          {
            _id: 'report_1',
            patientName: 'John Doe',
            disease: 'Melanoma',
            confidence: 87,
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'reviewed',
            imageUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=report1'
          },
          {
            _id: 'report_2',
            patientName: 'Jane Smith',
            disease: 'Psoriasis',
            confidence: 72,
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'pending',
            imageUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=report2'
          }
        ]
      });
    }, 500);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.get('/api/doctor/reports');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};