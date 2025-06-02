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
    watchTrailer: string;
    expertSpeakers: string;
    attendeesExpected: string;
    learningContent: string;
    joinDescription: string;
  };
  about: {
    title: string;
    description: string;
    benefits: string[];
  };
  speakers: {
    title: string;
    subtitle: string;
    details: {
      [key: string]: {
        name: string;
        role: string;
        company: string;
        topic: string;
        bio: string;
      };
    };
    more: string;
  };
  agenda: {
    title: string;
    subtitle: string;
    items: {
      [key: string]: {
        title: string;
        speaker: string;
      };
    };
    types: {
      [key: string]: string;
    };
  };
  testimonials: {
    title: string;
    items: {
      [key: string]: {
        name: string;
        role: string;
        company: string;
        content: string;
      };
    };
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
    formTitle: string;
    interestsList: {
      [key: string]: string;
    };
  };
  confirmation: {
    hey:string;
    title: string;
    subtitle: string;
    ticketId: string;
    addCalendar: string;
    backHome: string;
    registrationDetailsTitle: string;
    nameLabel: string;
    emailLabel: string;
    checkEmailTitle: string;
    checkEmailDescription: string;
    eventDetailsTitle: string;
    joinAnywhere: string;
    freeEventLabel: string;
    noPayment: string;
    downloadIcs: string;
    addToGoogleCalendar: string;
    whatsNextTitle: string;
    checkEmailWhatsNextTitle: string;
    checkEmailWhatsNextDescription: string;
    saveDateTitle: string;
    saveDateDescription: string;
    getReadyTitle: string;
    getReadyDescription: string;
  };
  footer: {
    copyright: string;
    terms: string;
    privacy: string;
    description: string;
    quickLinks: string;
    legal: string;
  };
}

// Recursive type to get the value type from a nested key path
export type GetTranslationValue<T, K extends string> = K extends keyof T
  ? T[K] extends string
    ? string
    : T[K] extends string[]
    ? string[]
    : T[K] extends { [key: string]: string | string[] | { [key: string]: string | string[] } }
    ? T[K]
    : never
  : string;

export interface LanguageContextType {
  language: Language;
  direction: 'ltr' | 'rtl';
  switchLanguage: (lang: Language) => void;
  t: <K extends string>(key: K) => GetTranslationValue<Translation, K>;
} 