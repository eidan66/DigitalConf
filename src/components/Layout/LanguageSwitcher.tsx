import { useLanguage } from "@/lib/i18n/context";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
    const { language, switchLanguage } = useLanguage();
  
    return (
      <button
      onClick={() => switchLanguage(language === 'en' ? 'he' : 'en')}
      className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-600 hover:text-blue-600 transition-colors" />
            {language === 'en' ? 'עברית' : 'English'}
        </div>
      </button>
    );
  }
  