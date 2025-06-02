import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Registration } from '@/entities/Registration';
import { useLanguage } from '@/lib/i18n/context'
import { 
  User, 
  Mail, 
  Building, 
  MapPin, 
  Briefcase, 
  Star,
  Clock,
  Users,
  CheckCircle,
  ArrowLeft,
  Calendar,
  Globe
} from 'lucide-react';

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Italy', 'Spain',
  'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden', 'Norway', 'Denmark',
  'Finland', 'Australia', 'New Zealand', 'Japan', 'South Korea', 'Singapore',
  'Israel', 'United Arab Emirates', 'Brazil', 'Mexico', 'Argentina', 'India',
  'China', 'Other'
];

const interests = [
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
];

export default function Register() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    country: '',
    job_title: '',
    company: '',
    consent: false
  });

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const generateTicketId = () => {
    return 'DMC2025-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (!formData.full_name || !formData.email || !formData.country || !formData.job_title) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (!formData.consent) {
      setError('Please agree to receive event updates');
      setIsLoading(false);
      return;
    }

    try {
      const ticketId = generateTicketId();
      
      const registrationData = {
        ...formData,
        interests: selectedInterests,
        language,
        ticket_id: ticketId
      };

      await Registration.create(registrationData);
      
      // Store user data in localStorage for confirmation page
      localStorage.setItem('registrationData', JSON.stringify({
        full_name: formData.full_name,
        email: formData.email,
        ticket_id: ticketId
      }));
      
      navigate('/confirmation');
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
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
            Back to Home
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('registration.title')}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Join 1000+ marketing professionals for the premier digital marketing event of 2025
          </p>

          {/* Event Details */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="font-medium">July 20, 2025</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Globe className="w-5 h-5 text-purple-500" />
              <span className="font-medium">100% Online</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Star className="w-5 h-5 text-gold-500" />
              <span className="font-medium">Free Event</span>
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
                  <User className="w-6 h-6 mr-3" />
                  Registration Form
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="full_name" className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4" />
                          {t('registration.fullName')} *
                        </Label>
                        <Input
                          id="full_name"
                          value={formData.full_name}
                          onChange={(e) => handleInputChange('full_name', e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4" />
                          {t('registration.email')} *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country" className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4" />
                        {t('registration.country')} *
                      </Label>
                      <Select onValueChange={(value) => handleInputChange('country', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                      Professional Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="job_title" className="flex items-center gap-2 mb-2">
                          <Briefcase className="w-4 h-4" />
                          {t('registration.jobTitle')} *
                        </Label>
                        <Input
                          id="job_title"
                          value={formData.job_title}
                          onChange={(e) => handleInputChange('job_title', e.target.value)}
                          placeholder="e.g. Marketing Manager"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="company" className="flex items-center gap-2 mb-2">
                          <Building className="w-4 h-4" />
                          {t('registration.company')}
                        </Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                      {t('registration.interests')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Select the topics you're most interested in (optional)
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {interests.map((interest) => (
                        <div
                          key={interest}
                          onClick={() => handleInterestToggle(interest)}
                          className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                            selectedInterests.includes(interest)
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{interest}</span>
                            {selectedInterests.includes(interest) && (
                              <CheckCircle className="w-4 h-4 text-blue-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => handleInputChange('consent', checked)}
                    />
                    <Label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
                      {t('registration.consent')}
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Processing...
                      </div>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        {t('registration.submit')}
                      </>
                    )}
                  </Button>
                </form>
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
            <Card className="shadow-lg py-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-gold-500" />
                  What You'll Get
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Expert Sessions</h4>
                      <p className="text-sm text-gray-600">12+ industry leaders sharing insights</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-purple-500 mt-1" />
                    <div>
                      <h4 className="font-medium">8 Hours Content</h4>
                      <p className="text-sm text-gray-600">Full day of learning and networking</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Certificate</h4>
                      <p className="text-sm text-gray-600">Completion certificate included</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Speakers Preview */}
            <Card className="shadow-lg py-6">
              <CardHeader>
                <CardTitle>Featured Speakers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">Sarah Johnson</div>
                    <div className="text-gray-600">CMO, TechCorp Global</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Michael Chen</div>
                    <div className="text-gray-600">Growth Director, StartupScale</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Emily Rodriguez</div>
                    <div className="text-gray-600">Content Lead, MediaMasters</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    +9 more speakers
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}