import { User, Language } from '../types';
import { apiClient } from './api';

const MOCK_USER: User = {
  id: 'usr-ben-001',
  name: 'Rameshwar Shinde (रामेश्वर शिंदे)',
  phone: '9823012345',
  email: 'rameshwar.pm-ajay@demo.gov.in',
  role: 'beneficiary',
  language: 'hi',
  consentGiven: true,
  consentTimestamp: '2026-03-29T10:00:00Z',
  createdAt: '2026-03-20T08:00:00Z'
};

export const authService = {
  async getCurrentUser(): Promise<User> {
    try {
      return await apiClient<User>('/auth/me');
    } catch {
      return MOCK_USER;
    }
  },

  async login(phoneOrEmail: string, _password?: string): Promise<{ user: User; token: string }> {
    try {
      return await apiClient<{ user: User; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier: phoneOrEmail })
      });
    } catch {
      return { user: MOCK_USER, token: 'mock-jwt-kaushal-saathi-sih26097' };
    }
  },

  async setConsent(consent: boolean): Promise<boolean> {
    try {
      await apiClient('/auth/consent', {
        method: 'POST',
        body: JSON.stringify({ consent, timestamp: new Date().toISOString() })
      });
      return true;
    } catch {
      MOCK_USER.consentGiven = consent;
      return true;
    }
  },

  async updateLanguage(language: Language): Promise<Language> {
    try {
      await apiClient('/auth/language', {
        method: 'PUT',
        body: JSON.stringify({ language })
      });
      return language;
    } catch {
      MOCK_USER.language = language;
      return language;
    }
  }
};
