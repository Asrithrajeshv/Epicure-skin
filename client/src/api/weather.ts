import api from './api';

// Description: Get weather and UV index for a location
// Endpoint: GET /api/weather
// Request: { latitude?: number, longitude?: number, city?: string }
// Response: { temperature: number, humidity: number, windSpeed: number, uvIndex: number, uvLevel: string, condition: string, recommendation: string }
export const getWeatherAndUV = (location?: {
  latitude?: number;
  longitude?: number;
  city?: string;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const uvIndex = Math.floor(Math.random() * 12);
      let uvLevel = 'Low';
      let recommendation = 'Safe to go outside';

      if (uvIndex <= 2) {
        uvLevel = 'Low';
        recommendation = 'Safe to go outside';
      } else if (uvIndex <= 5) {
        uvLevel = 'Moderate';
        recommendation = 'Use SPF 30+ sunscreen';
      } else if (uvIndex <= 7) {
        uvLevel = 'High';
        recommendation = 'Limit sun exposure, use SPF 50+';
      } else if (uvIndex <= 10) {
        uvLevel = 'Very High';
        recommendation = 'Avoid sun, stay indoors if possible';
      } else {
        uvLevel = 'Extreme';
        recommendation = 'Avoid sun, stay indoors';
      }

      resolve({
        temperature: 72,
        humidity: 65,
        windSpeed: 12,
        uvIndex,
        uvLevel,
        condition: 'Partly Cloudy',
        recommendation,
        location: location?.city || 'New York, NY'
      });
    }, 500);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.get('/api/weather', { params: location });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};