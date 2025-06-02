export type Language = 'en' | 'he';

export interface Translation {
  nav: {
    home: string;
    speakers: string;
    agenda: string;
    register: string;
  };
  hero: {
    title: string;
    subtitle: string;
    date: string;
    cta: string;
    seats: string;
  };
  about: {
    title: string;
    description: string;
    benefits: string[];
  };
  speakers: {
    title: string;
    subtitle: string;
  };
  agenda: {
    title: string;
    subtitle: string;
  };
  testimonials: {
    title: string;
  };
  registration: {
    title: string;
    subtitle: string;
    backToHome: string;
    eventDate: string;
    eventLocation: string;
    eventType: string;
    personalInfo: string;
    professionalInfo: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    country: string;
    countryPlaceholder: string;
    jobTitle: string;
    jobTitlePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    interests: string;
    interestsDescription: string;
    consent: string;
    submit: string;
    processing: string;
    errors: {
      failed: string;
    };
    highlights: {
      title: string;
      expertSessions: string;
      expertSessionsDesc: string;
      content: string;
      contentDesc: string;
      certificate: string;
      certificateDesc: string;
    };
    speakers: {
      title: string;
      more: string;
    };
  };
  confirmation: {
    title: string;
    subtitle: string;
    ticketId: string;
    addCalendar: string;
    backHome: string;
  };
  footer: {
    copyright: string;
    terms: string;
    privacy: string;
  };
}

export interface LanguageContextType {
  language: Language;
  direction: 'ltr' | 'rtl';
  switchLanguage: (lang: Language) => void;
  t: (key: string) => string;
} 