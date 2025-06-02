import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/lib/i18n/context';
import { 
  Star,
  Clock,
  Users,
  CheckCircle
} from 'lucide-react';

export function EventHighlights() {
  const { t } = useLanguage();

  return (
    <Card className="shadow-lg py-4">
      <CardHeader>
        <CardTitle className="flex items-center ">
          <Star className="w-5 h-5 mr-2 text-gold-500" />
          {t('registration.highlights.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <h4 className="font-medium">{t('registration.highlights.expertSessions')}</h4>
              <p className="text-sm text-gray-600">{t('registration.highlights.expertSessionsDesc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-purple-500 mt-1" />
            <div>
              <h4 className="font-medium">{t('registration.highlights.content')}</h4>
              <p className="text-sm text-gray-600">{t('registration.highlights.contentDesc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <h4 className="font-medium">{t('registration.highlights.certificate')}</h4>
              <p className="text-sm text-gray-600">{t('registration.highlights.certificateDesc')}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 