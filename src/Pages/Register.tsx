import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Registration } from '@/entities/Registration';
import { useLanguage } from '@/lib/i18n/context';
import { 
  ArrowLeft,
  Calendar,
  Globe,
  Star
} from 'lucide-react';
import { EventHighlights } from './Register/components/EventHighlights';
import { SpeakersPreview } from './Register/components/SpeakersPreview';
import { RegistrationForm } from './Register/components/RegistrationForm';
import type { RegistrationFormData } from './Register/types';

export default function Register() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const generateTicketId = () => {
    return 'DMC2025-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const handleSubmit = async (formData: Omit<RegistrationFormData, 'consent'>, selectedInterests: string[]) => {
    setIsLoading(true);
    setError('');

    try {
      const ticketId = generateTicketId();
      
      const registrationData = {
        ...formData,
        interests: selectedInterests,
        language,
        ticket_id: ticketId,
        consent: true,
      };

      await Registration.create(registrationData);
      
      localStorage.setItem('registrationData', JSON.stringify({
        full_name: formData.full_name,
        email: formData.email,
        ticket_id: ticketId
      }));
      
      navigate('/confirmation');
    } catch (error) {
      console.error('Registration error:', error);
      setError(t('registration.errors.failed'));
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('registration.backToHome')}
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('registration.title')}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {t('registration.subtitle')}
          </p>

          {/* Event Details */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="font-medium">{t('registration.eventDate')}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Globe className="w-5 h-5 text-purple-500" />
              <span className="font-medium">{t('registration.eventLocation')}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Star className="w-5 h-5 text-gold-500" />
              <span className="font-medium">{t('registration.eventType')}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center py-2">
                  {t('registration.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <RegistrationForm onSubmit={handleSubmit} isLoading={isLoading} />

              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Event Highlights */}
            <EventHighlights />

            {/* Speakers Preview */}
            <SpeakersPreview />
          </motion.div>
        </div>
      </div>
    </div>
  );
}