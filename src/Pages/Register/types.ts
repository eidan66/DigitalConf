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
  onSubmit: (formData: Omit<RegistrationFormData, 'consent'>, interests: string[]) => Promise<void>;
  isLoading: boolean;
}

export const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Italy', 'Spain',
  'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden', 'Norway', 'Denmark',
  'Finland', 'Australia', 'New Zealand', 'Japan', 'South Korea', 'Singapore',
  'Israel', 'United Arab Emirates', 'Brazil', 'Mexico', 'Argentina', 'India',
  'China', 'Other'
] as const;

export const INTERESTS = [
  { key: 'digitalStrategy', default: 'Digital Strategy' },
  { key: 'contentMarketing', default: 'Content Marketing' },
  { key: 'socialMediaMarketing', default: 'Social Media Marketing' },
  { key: 'ppcPaidAdvertising', default: 'PPC & Paid Advertising' },
  { key: 'seoOrganicGrowth', default: 'SEO & Organic Growth' },
  { key: 'emailMarketing', default: 'Email Marketing' },
  { key: 'marketingAutomation', default: 'Marketing Automation' },
  { key: 'analyticsData', default: 'Analytics & Data' },
  { key: 'conversionOptimization', default: 'Conversion Optimization' },
  { key: 'ecommerceMarketing', default: 'E-commerce Marketing' },
  { key: 'b2bMarketing', default: 'B2B Marketing' },
  { key: 'influencerMarketing', default: 'Influencer Marketing' },
] as const;

export type Country = typeof COUNTRIES[number];
export type Interest = typeof INTERESTS[number];

export interface RegistrationData extends RegistrationFormData {
  interests: string[];
  language: Language;
  ticket_id?: string;
} 