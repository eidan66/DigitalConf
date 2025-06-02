import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export const CTASection = ()=> {
    const { t, direction } = useLanguage();
  
    return (
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-7"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {t('hero.seats')}
            </h2>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {t('hero.joinDescription')}
            </p>
            
            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-gold-500 hover:bg-gold-600 text-black font-semibold px-10 py-5 text-lg rounded-lg my-4"
              >
                {direction === 'rtl' && <ArrowRight className="ml-2 w-5 h-5" />}
                {t('hero.cta')}
                {direction !== 'rtl' && <ArrowRight className="ml-2 w-5 h-5" />}
              </Button>
            </Link>
            
            <div className="flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{t('registration.eventLocation')}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-white" />
                <span>{t('registration.eventDate')}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>{t('registration.eventType')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }