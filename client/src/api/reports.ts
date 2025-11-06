import api from './api';

// Description: Generate PDF report from prediction
// Endpoint: POST /api/reports/generate
// Request: { predictionId: string }
// Response: { _id: string, predictionId: string, patientName: string, patientAge: number, patientGender: string, disease: string, confidence: number, timestamp: string, pdfUrl: string }
export const generateReport = (predictionId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        _id: 'report_' + Date.now(),
        predictionId,
        patientName: 'John Doe',
        patientAge: 35,
        patientGender: 'Male',
        disease: 'Melanoma',
        confidence: 87,
        timestamp: new Date().toISOString(),
        pdfUrl: '/reports/report_' + Date.now() + '.pdf'
      });
    }, 1000);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.post('/api/reports/generate', { predictionId });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Get all reports for current user
// Endpoint: GET /api/reports
// Request: {}
// Response: { reports: Array<{ _id: string, predictionId: string, disease: string, confidence: number, timestamp: string, pdfUrl: string }> }
export const getReports = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        reports: [
          {
            _id: 'report_1',
            predictionId: 'pred_1',
            disease: 'Melanoma',
            confidence: 87,
            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            pdfUrl: '/reports/report_1.pdf'
          },
          {
            _id: 'report_2',
            predictionId: 'pred_2',
            disease: 'Psoriasis',
            confidence: 72,
            timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            pdfUrl: '/reports/report_2.pdf'
          }
        ]
      });
    }, 500);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.get('/api/reports');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Delete a report
// Endpoint: DELETE /api/reports/:id
// Request: {}
// Response: { success: boolean, message: string }
export const deleteReport = (reportId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Report deleted successfully' });
    }, 500);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.delete(`/api/reports/${reportId}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};