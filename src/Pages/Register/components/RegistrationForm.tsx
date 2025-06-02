import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  User, 
  Mail, 
  Building, 
  MapPin, 
  Briefcase,
  CheckCircle, 
  AlertCircle
} from 'lucide-react';
import type { RegistrationFormData, RegistrationFormProps } from '../types';
import { COUNTRIES, INTERESTS } from '../types';

export const RegistrationForm = ({ onSubmit, isLoading }: RegistrationFormProps) =>{
  const { t, direction } = useLanguage();
  const [formData, setFormData] = useState<Omit<RegistrationFormData, 'consent'>>({
    full_name: '',
    email: '',
    country: '',
    job_title: '',
    company: '',
  });
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, country: value }));
    setError(null);
  };

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.full_name || !formData.email || !formData.country || !formData.job_title) {
      setError(t('registration.errors.allFieldsRequired'));
      return;
    }

    if (!consent) {
      setError(t('registration.errors.consentRequired'));
      return;
    }

    await onSubmit(
      formData,
      selectedInterests
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
          {t('registration.personalInfo')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="full_name" className="flex items-center gap-2 mb-2">
              <User className={`w-4 h-4 ${direction === 'rtl' ? 'ml-2' : ''}`} />
              {t('registration.fullName')} *
            </Label>
            <Input
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              placeholder={t('registration.fullNamePlaceholder')}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="flex items-center gap-2 mb-2">
              <Mail className={`w-4 h-4 ${direction === 'rtl' ? 'ml-2' : ''}`} />
              {t('registration.email')} *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t('registration.emailPlaceholder')}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="country" className="flex items-center gap-2 mb-2">
            <MapPin className={`w-4 h-4 ${direction === 'rtl' ? 'ml-2' : ''}`} />
            {t('registration.country')} *
          </Label>
          <Select onValueChange={handleCountryChange}>
            <SelectTrigger>
              <SelectValue placeholder={t('registration.countryPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
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
          {t('registration.professionalInfo')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="job_title" className="flex items-center gap-2 mb-2">
              <Briefcase className={`w-4 h-4 ${direction === 'rtl' ? 'ml-2' : ''}`} />
              {t('registration.jobTitle')} *
            </Label>
            <Input
              id="job_title"
              name="job_title"
              value={formData.job_title}
              onChange={handleInputChange}
              placeholder={t('registration.jobTitlePlaceholder')}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="company" className="flex items-center gap-2 mb-2">
              <Building className={`w-4 h-4 ${direction === 'rtl' ? 'ml-2' : ''}`} />
              {t('registration.company')}
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder={t('registration.companyPlaceholder')}
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
          {t('registration.interestsDescription')}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {INTERESTS.map((interest) => (
            <div
              key={interest.key}
              onClick={() => handleInterestToggle(interest.key)}
              className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                selectedInterests.includes(interest.key)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className={`flex items-center ${direction === 'rtl' ? 'flex-row-reverse justify-between' : 'justify-between gap-2'}`}>
                <span className="text-sm font-medium text-gray-900 text-center flex-grow">{t(`registration.interestsList.${interest.key}`)}</span>
                {selectedInterests.includes(interest.key) && (
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consent */}
      <div className={`flex items-center flex-row`}>
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked: boolean) => setConsent(checked)}
        />
        <Label htmlFor="consent" className={`text-sm text-gray-600 leading-relaxed ${direction === 'rtl' ? 'mr-3' : 'ml-3'} self-start`}>
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
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            {t('registration.processing')}
          </div>
        ) : (
          <>
            <CheckCircle className={`w-5 h-5 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
            {t('registration.submit')}
          </>
        )}
      </Button>
    </form>
  );
} 