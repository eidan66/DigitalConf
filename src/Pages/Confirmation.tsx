import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n/context';
import { GenerateImage } from '@/integrations/Core';
import { 
  CheckCircle, 
  Calendar, 
  Download, 
  Mail, 
  Home,
  Ticket,
  Clock,
  Users,
  Gift,
  ExternalLink
} from 'lucide-react';

interface RegistrationData {
  full_name: string;
  email: string;
  ticket_id: string;
}

export default function Confirmation() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [confirmationImage, setConfirmationImage] = useState('');
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Get registration data from localStorage
    const data = localStorage.getItem('registrationData');
    if (!data) {
      // Redirect to home if no registration data
      navigate('/');
      return;
    }
    
    const parsed = JSON.parse(data);
    setRegistrationData(parsed);
    generateConfirmationImage(parsed.full_name);

    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const generateConfirmationImage = async (name: string) => {
    try {
      const result = await GenerateImage({
        prompt: `Congratulations banner for ${name} - Digital Marketing Conference 2025, professional design with blue and purple gradient, celebration theme, modern typography, ticket design elements`
      });
      setConfirmationImage(result.url);
    } catch (error) {
      console.error('Error generating confirmation image:', error);
    }
  };

  const generateCalendarFile = () => {
    const event = {
      title: 'Digital Marketing Conference 2025',
      start: '20250720T090000Z',
      end: '20250720T170000Z',
      description: 'Join industry leaders for the premier digital marketing event of 2025',
      location: 'Online Event'
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Digital Marketing Conference//EN',
      'BEGIN:VEVENT',
      `DTSTART:${event.start}`,
      `DTEND:${event.end}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      `UID:${registrationData?.ticket_id}@digitalconf.com`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'digital-marketing-conference-2025.ics';
    link.click();
    URL.revokeObjectURL(url);
  };

  const getGoogleCalendarUrl = () => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: 'Digital Marketing Conference 2025',
      dates: '20250720T090000Z/20250720T170000Z',
      details: 'Join industry leaders for the premier digital marketing event of 2025',
      location: 'Online Event'
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  if (!registrationData) {
    return null;
  }

  const firstName = registrationData.full_name.split(' ')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                rotate: 0,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                y: window.innerHeight + 10,
                rotate: 360,
                transition: {
                  duration: Math.random() * 3 + 2,
                  ease: "linear",
                  repeat: Infinity
                }
              }}
              className={`absolute w-3 h-3 ${
                ['bg-gold-400', 'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-pink-500'][i % 5]
              }`}
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            {t('confirmation.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-2"
          >
            Hey {firstName}! {t('confirmation.subtitle')}
          </motion.p>
        </motion.div>

        {/* Confirmation Image */}
        {confirmationImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <img 
              src={confirmationImage} 
              alt="Confirmation" 
              className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Registration Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Ticket className="w-6 h-6 mr-3 text-blue-500" />
                  Your Registration Details
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Name</span>
                    <span className="font-semibold">{registrationData.full_name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Email</span>
                    <span className="font-semibold">{registrationData.email}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">{t('confirmation.ticketId')}</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {registrationData.ticket_id}
                    </Badge>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mt-6">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Check Your Email</h4>
                        <p className="text-sm text-gray-600">
                          We've sent a confirmation email with your ticket and event details to {registrationData.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Event Information & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            {/* Event Details Card */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-purple-500" />
                  Event Details
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-semibold">July 20, 2025</div>
                      <div className="text-sm text-gray-600">9:00 AM - 5:00 PM (EST)</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-semibold">100% Online Event</div>
                      <div className="text-sm text-gray-600">Join from anywhere in the world</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gold-50 to-gold-100 rounded-lg">
                    <Gift className="w-5 h-5 text-gold-600" />
                    <div>
                      <div className="font-semibold text-gold-800">Free Event</div>
                      <div className="text-sm text-gold-700">No payment required</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('confirmation.addCalendar')}
                </h3>
                
                <div className="space-y-3">
                  <Button
                    onClick={generateCalendarFile}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Download className="w-4 h-4 mr-3" />
                    Download .ics file
                  </Button>
                  
                  <Button
                    onClick={() => window.open(getGoogleCalendarUrl(), '_blank')}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <ExternalLink className="w-4 h-4 mr-3" />
                    Add to Google Calendar
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link to="/">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Home className="w-4 h-4 mr-3" />
                      {t('confirmation.backHome')}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">What's Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <Mail className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                  <h4 className="font-semibold mb-2">Check Your Email</h4>
                  <p className="text-sm text-blue-100">Confirmation and event link sent</p>
                </div>
                <div>
                  <Calendar className="w-8 h-8 mx-auto mb-3 text-purple-200" />
                  <h4 className="font-semibold mb-2">Save the Date</h4>
                  <p className="text-sm text-purple-100">July 20, 2025 - Mark your calendar</p>
                </div>
                <div>
                  <Users className="w-8 h-8 mx-auto mb-3 text-pink-200" />
                  <h4 className="font-semibold mb-2">Get Ready to Network</h4>
                  <p className="text-sm text-pink-100">Connect with 1000+ professionals</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}