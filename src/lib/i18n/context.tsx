import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Language, LanguageContextType, Translation } from './types';
import { en } from './translations/en';
import { he } from './translations/he';

const translations: Record<Language, Translation> = { en, he };

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('he');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('rtl');

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    setDirection(lang === 'he' ? 'rtl' : 'ltr');
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];
    
    for (const k of keys) {
      if (value === undefined || typeof value !== 'object' || value === null) return key;
      value = (value as Record<string, unknown>)[k];
    }
    
    return typeof value === 'string' ? value : key;
  };

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);
  return (
    <LanguageContext.Provider value={{ language, direction, switchLanguage, t: t as LanguageContextType['t'] }}>
      {children}
    </LanguageContext.Provider>
  );
} 