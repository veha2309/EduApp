import { storage } from '../utils/storage';
import { config } from '../config';

const BASE_URL = `${config.API_BASE_URL}/auth`;

export const authService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.success && data.token) {
      await storage.saveToken(data.token);
    }
    return data;
  },

  sendOTP: async (email: string) => {
    const response = await fetch(`${BASE_URL}/sendotp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return response.json();
  },

  signUp: async (data: {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    password: string;
    confirmPassword: string;
    otp: string;
  }) => {
    const response = await fetch(`${BASE_URL}/signUp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, accountType: 'Student' }),
    });
    return response.json();
  },

  signOut: async () => {
    await storage.removeToken();
  },
};
