import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n/context';

export function SpeakersPreview() {
  const { t } = useLanguage();

  const SPEAKERS = [
    {
      id: 'sarahJohnson',
      name: t('speakers.details.sarahJohnson.name'),
      role: t('speakers.details.sarahJohnson.role'),
      company: t('speakers.details.sarahJohnson.company'),
      topic: t('speakers.details.sarahJohnson.topic'),
      bio: t('speakers.details.sarahJohnson.bio')
    },
    {
      id: 'michaelChen',
      name: t('speakers.details.michaelChen.name'),
      role: t('speakers.details.michaelChen.role'),
      company: t('speakers.details.michaelChen.company'),
      topic: t('speakers.details.michaelChen.topic'),
      bio: t('speakers.details.michaelChen.bio')
    },
    {
      id: 'emilyRodriguez',
      name: t('speakers.details.emilyRodriguez.name'),
      role: t('speakers.details.emilyRodriguez.role'),
      company: t('speakers.details.emilyRodriguez.company'),
      topic: t('speakers.details.emilyRodriguez.topic'),
      bio: t('speakers.details.emilyRodriguez.bio')
    },
    {
      id: 'davidKim',
      name: t('speakers.details.davidKim.name'),
      role: t('speakers.details.davidKim.role'),
      company: t('speakers.details.davidKim.company'),
      topic: t('speakers.details.davidKim.topic'),
      bio: t('speakers.details.davidKim.bio')
    },
    {
      id: 'lisaThompson',
      name: t('speakers.details.lisaThompson.name'),
      role: t('speakers.details.lisaThompson.role'),
      company: t('speakers.details.lisaThompson.company'),
      topic: t('speakers.details.lisaThompson.topic'),
      bio: t('speakers.details.lisaThompson.bio')
    },
    {
      id: 'jamesWilson',
      name: t('speakers.details.jamesWilson.name'),
      role: t('speakers.details.jamesWilson.role'),
      company: t('speakers.details.jamesWilson.company'),
      topic: t('speakers.details.jamesWilson.topic'),
      bio: t('speakers.details.jamesWilson.bio')
    }
  ];

  return (
    <Card className="shadow-lg py-6">
      <CardHeader>
        <CardTitle>{t('registration.speakers.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {SPEAKERS.map((speaker) => (
            <div key={speaker.name} className="text-sm">
              <div className="font-medium">{speaker.name}</div>
              <div className="text-gray-600">{speaker.role}, {speaker.company}</div>
            </div>
          ))}
          <Badge variant="outline" className="text-xs">
            {t('registration.speakers.more')}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
} 