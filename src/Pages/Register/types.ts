import type { Language } from '@/lib/i18n/types';

export interface RegistrationFormData {
  full_name: string;
  email: string;
  country: string;
  job_title: string;
  company: string;
  consent: boolean;
}

export interface RegistrationFormProps {
  onSubmit: (data: RegistrationFormData, interests: string[]) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Italy', 'Spain',
  'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden', 'Norway', 'Denmark',
  'Finland', 'Australia', 'New Zealand', 'Japan', 'South Korea', 'Singapore',
  'Israel', 'United Arab Emirates', 'Brazil', 'Mexico', 'Argentina', 'India',
  'China', 'Other'
] as const;

export const INTERESTS = [
  'Digital Strategy',
  'Content Marketing',
  'Social Media Marketing',
  'PPC & Paid Advertising',
  'SEO & Organic Growth',
  'Email Marketing',
  'Marketing Automation',
  'Analytics & Data',
  'Conversion Optimization',
  'E-commerce Marketing',
  'B2B Marketing',
  'Influencer Marketing'
] as const;

export type Country = typeof COUNTRIES[number];
export type Interest = typeof INTERESTS[number];

export interface RegistrationData extends RegistrationFormData {
  interests: string[];
  language: Language;
  ticket_id?: string;
} 