import { storage } from '../utils/storage';
import { config } from '../config';

const BASE_URL = `${config.API_BASE_URL}/profile`;

export const courseService = {
  getEnrolledCourses: async () => {
    const token = await storage.getToken();
    const response = await fetch(`${BASE_URL}/getEnrolledCourses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};