import { GenerateImage } from "@/integrations/Core";
import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { Globe, Users, Target, Brain } from "lucide-react";
import { useState, useEffect } from "react";

export const AboutSection= () =>{
    const { t } = useLanguage();
    const [aboutImage, setAboutImage] = useState('');
  
    useEffect(() => {
      generateAboutImage();
    }, []);
  
    const generateAboutImage = async () => {
      try {
        const result = await GenerateImage({
          prompt: "Professional digital marketing workspace with multiple screens showing analytics dashboards, modern office environment, team collaboration, charts and graphs, clean and modern aesthetic"
        });
        setAboutImage(result.url);
      } catch (error) {
        console.error('Error generating about image:', error);
      }
    };
  
    const benefits = [
      { icon: Globe, text: t('about.benefits.0') },
      { icon: Users, text: t('about.benefits.1') },
      { icon: Target, text: t('about.benefits.2') },
      { icon: Brain, text: t('about.benefits.3') }
    ];
  
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {t('about.title')}
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {t('about.description')}
                </p>
              </div>
  
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg text-gray-700">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
  
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {aboutImage && (
                <img 
                  src={aboutImage} 
                  alt="Digital Marketing" 
                  className="rounded-2xl shadow-2xl"
                />
              )}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-gold-400 to-gold-500 rounded-2xl opacity-20" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-purple-400 to-blue-500 rounded-2xl opacity-20" />
            </motion.div>
          </div>
        </div>
      </section>
    );
  }