import { storage } from '../utils/storage';
import { config } from '../config';

const BASE_URL = config.API_BASE_URL;

export const userService = {
  getProfile: async () => {
    const token = await storage.getToken();
    const response = await fetch(`${BASE_URL}/profile/getUserDetails`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  updateProfile: async (data: any) => {
    const token = await storage.getToken();
    const response = await fetch(`${BASE_URL}/profile/updateProfile`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
