import { GenerateImage } from "@/integrations/Core";
import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { Badge, Calendar, ArrowRight, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export const HeroSection=()=> {
    const { t } = useLanguage();
    const [heroImage, setHeroImage] = useState('');
  
    useEffect(() => {
      generateHeroImage();
    }, []);
  
    const generateHeroImage = async () => {
      try {
        const result = await GenerateImage({
          prompt: "Modern digital conference stage with blue and purple lighting, large screens displaying marketing data and charts, professional conference setup with elegant lighting, high-tech atmosphere, wide shot"
        });
        setHeroImage(result.url);
      } catch (error) {
        console.error('Error generating hero image:', error);
      }
    };
  
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          {heroImage && (
            <img 
              src={heroImage} 
              alt="Conference Background" 
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-blue-900/90" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
  
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Badge className="bg-gold-500/20 text-white/70 border-gold-300/30 text-sm px-4 py-2">
              <Calendar className="w-4 h-4 mr-2 text-white" />
              {t('hero.date')}
            </Badge>
  
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              {t('hero.title')}
            </h1>
  
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
  
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold px-8 py-4 text-lg"
                >
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg bg-white/5"
              >
                <Play className="mr-2 w-5 h-5" />
                {t('hero.watchTrailer')}
              </Button>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl text-white/60 font-bold text-gold-400">12+</div>
                <div className="text-gray-300 text-2xl">{t('hero.expertSpeakers')}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-4xl text-white/60 font-bold text-gold-400">1000+</div>
                <div className="text-gray-300 text-2xl">{t('hero.attendeesExpected')}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl text-white/60 font-bold text-gold-400">8hrs</div>
                <div className="text-gray-300 text-2xl">{t('hero.learningContent')}</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
  
        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>
    );
  }
  