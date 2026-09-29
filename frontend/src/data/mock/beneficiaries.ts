import { Beneficiary } from '../../types';

export const mockBeneficiaries: Beneficiary[] = [
  {
    id: 'ben-001',
    name: 'Rameshwar Shinde (रामेश्वर शिंदे)',
    age: 23,
    gender: 'male',
    district: 'Pune',
    state: 'Maharashtra',
    pincode: '411038',
    category: 'SC',
    schemeComponent: 'GIA-PM-AJAY',
    educationLevel: '10th Pass (SSC)',
    currentOccupation: 'Agricultural Labor & Informal Wiring Repair',
    yearsOfExperience: 2,
    preferredLanguage: 'mr',
    createdAt: '2026-03-12T10:30:00Z'
  },
  {
    id: 'ben-002',
    name: 'Rajesh Kumar (राजेश कुमार)',
    age: 21,
    gender: 'male',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    pincode: '221001',
    category: 'SC',
    schemeComponent: 'GIA-PM-AJAY',
    educationLevel: '12th Pass (Higher Secondary)',
    currentOccupation: 'Apprentice / Looking for Skilling',
    yearsOfExperience: 1,
    preferredLanguage: 'hi',
    createdAt: '2026-03-15T09:15:00Z'
  },
  {
    id: 'ben-003',
    name: 'Sunita Kamble (सुनीता कांबळे)',
    age: 26,
    gender: 'female',
    district: 'Pimpri-Chinchwad',
    state: 'Maharashtra',
    pincode: '411018',
    category: 'SC',
    schemeComponent: 'GIA-PM-AJAY',
    educationLevel: '8th Pass',
    currentOccupation: 'Self-Help Group Member / Tailoring',
    yearsOfExperience: 3,
    preferredLanguage: 'mr',
    createdAt: '2026-03-18T14:20:00Z'
  }
];

export const activeBeneficiary: Beneficiary = mockBeneficiaries[0];
