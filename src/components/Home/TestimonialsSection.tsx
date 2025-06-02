import { GenerateImage } from "@/integrations/Core";
import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent } from "../ui/card";

interface TestimonialImages {
  [key: string]: string;
}

export const TestimonialsSection = () => {
  const { t, direction } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonialImages, setTestimonialImages] = useState<TestimonialImages>({});

  const testimonialIds = useMemo(() => [
    'alexandraSmith',
    'robertDavis',
    'mariaGarcia',
    'thomasWilson'
  ], []);

  const generateTestimonialImages = useCallback(async () => {
    const images: TestimonialImages = {};
    for (const id of testimonialIds) {
      try {
        const result = await GenerateImage({
          prompt: `Professional headshot of ${t(`testimonials.items.${id}.name`)}, ${t(`testimonials.items.${id}.role`)}, business professional, clean background, friendly expression, corporate photo`
        });
        images[id] = result.url;
      } catch (error) {
        console.error(`Error generating testimonial image for ${id}:`, error);
      }
    }
    setTestimonialImages(images);
  }, [testimonialIds, t]);

  useEffect(() => {
    generateTestimonialImages();
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialIds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [generateTestimonialImages, testimonialIds.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialIds.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialIds.length) % testimonialIds.length);
  };

  if (!testimonialIds.length) {
    return null;
  }

  const currentId = testimonialIds[currentIndex];
  if (!currentId) {
    return null;
  }

  const currentImage = testimonialImages[currentId];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('testimonials.title')}
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="text-center">
                <CardContent className="p-8">
                  <Quote className="w-12 h-12 text-blue-500 mx-auto mb-6" />
                  
                  <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed">
                    "{t(`testimonials.items.${currentId}.content`)}"
                  </blockquote>
                  
                  <div className={`flex items-center justify-center gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    {currentImage && (
                      <img 
                        src={currentImage} 
                        alt={t(`testimonials.items.${currentId}.name`)}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">
                        {t(`testimonials.items.${currentId}.name`)}
                      </div>
                      <div className="text-blue-600">
                        {t(`testimonials.items.${currentId}.role`)}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {t(`testimonials.items.${currentId}.company`)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonialIds.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};