import { useLanguage } from "@/lib/i18n/context";
import { Link } from "react-router-dom";

export const Footer = () => {
    const { t } = useLanguage();
  
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DC</span>
                </div>
                <span className="font-bold text-xl">DigitalConf 2025</span>
              </div>
              <p className="text-gray-300 mb-4">
                {t('footer.description')}
              </p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">{t('footer.quickLinks')}</h3>
              <div className="space-y-2">
                <a href="/" className="block text-gray-300 hover:text-white transition-colors">
                  {t('nav.home')}
                </a>
                <a href="/#speakers" className="block text-gray-300 hover:text-white transition-colors">
                  {t('nav.speakers')}
                </a>
                <a href="/#agenda" className="block text-gray-300 hover:text-white transition-colors">
                  {t('nav.agenda')}
                </a>
                <Link to="/register" className="block text-gray-300 hover:text-white transition-colors">
                  {t('nav.register')}
                </Link>
              </div>
            </div>
  
            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">{t('footer.legal')}</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                  {t('footer.terms')}
                </a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                  {t('footer.privacy')}
                </a>
              </div>
            </div>
          </div>
  
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              {t('footer.copyright')} 
              <a 
                href="https://idanlevian.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors ml-1"
              >
                Idan Levian
              </a>
            </p>
          </div>
        </div>
      </footer>
    );
  }