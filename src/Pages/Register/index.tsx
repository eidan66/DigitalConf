import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/context';
import { Registration } from '@/entities/Registration';

import { RegistrationForm } from './components/RegistrationForm';
import { EventHighlights } from './components/EventHighlights';
import { SpeakersPreview } from './components/SpeakersPreview';
import type { RegistrationFormData } from './types';

export function Register() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: RegistrationFormData, interests: string[]) => {
    try {
      setIsLoading(true);
      setError(null);

      const registration = Registration.create({
        ...formData,
        interests,
        language,
      });

      // Store registration data in localStorage
      localStorage.setItem('registration', JSON.stringify(registration.toJSON()));

      // Navigate to confirmation page
      navigate('/confirmation');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">{t('register.title')}</h1>
        <p className="text-xl text-center text-gray-600 mb-8">{t('register.subtitle')}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RegistrationForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error || ''}
            />
          </div>
          <div className="space-y-8">
            <EventHighlights />
            <SpeakersPreview />
          </div>
        </div>
      </div>
    </motion.div>
  );
} 