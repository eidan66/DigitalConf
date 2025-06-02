import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n/context'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-8 px-4">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900">
          {t('notFound.title')}
        </h2>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          {t('notFound.description')}
        </p>
        <Link to="/">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            {t('notFound.cta')}
          </Button>
        </Link>
      </div>
    </div>
  )
} 