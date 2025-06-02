import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n/context';

interface Speaker {
  name: string;
  title: string;
  company: string;
}

const SPEAKERS: Speaker[] = [
  {
    name: 'Sarah Johnson',
    title: 'CMO',
    company: 'TechCorp Global'
  },
  {
    name: 'Michael Chen',
    title: 'Growth Director',
    company: 'StartupScale'
  },
  {
    name: 'Emily Rodriguez',
    title: 'Content Lead',
    company: 'MediaMasters'
  }
];

export function SpeakersPreview() {
  const { t } = useLanguage();

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{t('registration.speakers.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {SPEAKERS.map((speaker) => (
            <div key={speaker.name} className="text-sm">
              <div className="font-medium">{speaker.name}</div>
              <div className="text-gray-600">{speaker.title}, {speaker.company}</div>
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