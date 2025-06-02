import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import type { RegistrationFormData, RegistrationFormProps } from '../types';
import { INTERESTS } from '../types';

export function RegistrationForm({ onSubmit, isLoading }: RegistrationFormProps) {
  const { t } = useLanguage();
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

    if (!consent) {
      setError(t('register.errors.consentRequired'));
      return;
    }

    await onSubmit(
      {
        ...formData,
        consent,
      },
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

      <div className="space-y-4">
        <div>
          <Label htmlFor="full_name">{t('register.fields.fullName.label')}</Label>
          <Input
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder={t('register.fields.fullName.placeholder')}
            required
          />
        </div>

        <div>
          <Label htmlFor="email">{t('register.fields.email.label')}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t('register.fields.email.placeholder')}
            required
          />
        </div>

        <div>
          <Label htmlFor="country">{t('register.fields.country.label')}</Label>
          <Input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder={t('register.fields.country.placeholder')}
            required
          />
        </div>

        <div>
          <Label htmlFor="job_title">{t('register.fields.jobTitle.label')}</Label>
          <Input
            id="job_title"
            name="job_title"
            value={formData.job_title}
            onChange={handleInputChange}
            placeholder={t('register.fields.jobTitle.placeholder')}
            required
          />
        </div>

        <div>
          <Label htmlFor="company">{t('register.fields.company.label')}</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder={t('register.fields.company.placeholder')}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>{t('register.fields.interests.label')}</Label>
        <div className="grid grid-cols-2 gap-4">
          {INTERESTS.map((interest) => (
            <div key={interest} className="flex items-center space-x-2">
              <Checkbox
                id={`interest-${interest}`}
                checked={selectedInterests.includes(interest)}
                onCheckedChange={() => handleInterestToggle(interest)}
              />
              <Label
                htmlFor={`interest-${interest}`}
                className="text-sm font-normal"
              >
                {interest}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked: boolean) => setConsent(checked)}
        />
        <Label htmlFor="consent" className="text-sm font-normal">
          {t('register.fields.consent.label')}
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? t('register.submit.loading') : t('register.submit.default')}
      </Button>
    </form>
  );
} 