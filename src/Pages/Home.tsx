import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Calendar, 
  Users, 
  Globe, 
  Target, 
  Brain,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  MapPin,
  Clock
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { GenerateImage } from '@/integrations/Core';

// Hero Section Component
function HeroSection() {
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
                className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold px-8 py-4 text-lg"
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
              Watch Trailer
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-gold-400">12+</div>
              <div className="text-gray-300">Expert Speakers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-gold-400">1000+</div>
              <div className="text-gray-300">Attendees Expected</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-gold-400">8hrs</div>
              <div className="text-gray-300">Learning Content</div>
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

// About Section Component
function AboutSection() {
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

// Add type for speaker images state
interface SpeakerImages {
  [key: number]: string;
}

// Speakers Section Component
function SpeakersSection() {
  const { t } = useLanguage();
  const [speakerImages, setSpeakerImages] = useState<SpeakerImages>({});

  const speakers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Chief Marketing Officer",
      company: "TechCorp Global",
      topic: "The Future of AI in Marketing",
      bio: "20+ years leading digital transformation initiatives"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Growth Marketing Director",
      company: "StartupScale",
      topic: "Scaling Marketing in Hypergrowth",
      bio: "Helped 50+ startups achieve product-market fit"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Content Strategy Lead",
      company: "MediaMasters",
      topic: "Content That Converts",
      bio: "Built content engines generating $100M+ revenue"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Performance Marketing Expert",
      company: "AdOptimize",
      topic: "Advanced PPC Strategies",
      bio: "Managed $500M+ in ad spend with 300%+ ROAS"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Social Media Strategist",
      company: "ViralVision",
      topic: "Social Commerce Revolution",
      bio: "Created viral campaigns reaching 100M+ people"
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Marketing Automation Guru",
      company: "AutoFlow",
      topic: "Marketing Automation at Scale",
      bio: "Automated marketing for Fortune 500 companies"
    }
  ];

  useEffect(() => {
    generateSpeakerImages();
  }, []);

  const generateSpeakerImages = async () => {
    const images: SpeakerImages = {};
    for (const speaker of speakers) {
      try {
        const result = await GenerateImage({
          prompt: `Professional headshot of ${speaker.name}, ${speaker.role}, professional business attire, clean background, high quality portrait, confident expression, marketing professional`
        });
        images[speaker.id] = result.url;
      } catch (error) {
        console.error(`Error generating image for ${speaker.name}:`, error);
      }
    }
    setSpeakerImages(images);
  };

  return (
    <section id="speakers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('speakers.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('speakers.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    {speakerImages[speaker.id] && (
                      <img 
                        src={speakerImages[speaker.id]} 
                        alt={speaker.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {speaker.name}
                  </h3>
                  
                  <p className="text-blue-600 font-semibold mb-1">
                    {speaker.role}
                  </p>
                  
                  <p className="text-gray-600 mb-3">
                    {speaker.company}
                  </p>
                  
                  <Badge variant="outline" className="mb-3">
                    {speaker.topic}
                  </Badge>
                  
                  <p className="text-sm text-gray-500">
                    {speaker.bio}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Add type for agenda item type
type AgendaItemType = 'keynote' | 'session' | 'panel' | 'networking' | 'break' | 'closing';

// Add type for testimonial images state
interface TestimonialImages {
  [key: number]: string;
}

// Add type for agenda item
interface AgendaItem {
  time: string;
  title: string;
  speaker: string;
  type: AgendaItemType;
}

// Agenda Section Component
function AgendaSection() {
  const { t } = useLanguage();

  const agenda: AgendaItem[] = [
    {
      time: "09:00 - 09:30",
      title: "Registration & Welcome Coffee",
      speaker: "Event Team",
      type: "networking"
    },
    {
      time: "09:30 - 10:15",
      title: "Opening Keynote: The Future of AI in Marketing",
      speaker: "Sarah Johnson",
      type: "keynote"
    },
    {
      time: "10:15 - 11:00",
      title: "Scaling Marketing in Hypergrowth Companies",
      speaker: "Michael Chen",
      type: "session"
    },
    {
      time: "11:00 - 11:15",
      title: "Coffee Break",
      speaker: "",
      type: "break"
    },
    {
      time: "11:15 - 12:00",
      title: "Content That Converts: Strategy to Execution",
      speaker: "Emily Rodriguez",
      type: "session"
    },
    {
      time: "12:00 - 13:00",
      title: "Networking Lunch",
      speaker: "",
      type: "networking"
    },
    {
      time: "13:00 - 13:45",
      title: "Advanced PPC Strategies for 2025",
      speaker: "David Kim",
      type: "session"
    },
    {
      time: "13:45 - 14:30",
      title: "Social Commerce Revolution",
      speaker: "Lisa Thompson",
      type: "session"
    },
    {
      time: "14:30 - 14:45",
      title: "Afternoon Break",
      speaker: "",
      type: "break"
    },
    {
      time: "14:45 - 15:30",
      title: "Marketing Automation at Scale",
      speaker: "James Wilson",
      type: "session"
    },
    {
      time: "15:30 - 16:15",
      title: "Panel: The Future of Digital Marketing",
      speaker: "All Speakers",
      type: "panel"
    },
    {
      time: "16:15 - 16:30",
      title: "Closing Remarks & Next Steps",
      speaker: "Event Team",
      type: "closing"
    }
  ];

  const getTypeColor = (type: AgendaItemType): string => {
    switch (type) {
      case 'keynote': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'session': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'panel': return 'bg-green-100 text-green-800 border-green-200';
      case 'networking': return 'bg-gold-100 text-gold-800 border-gold-200';
      case 'break': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'closing': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section id="agenda" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('agenda.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('agenda.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {agenda.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-4 md:w-1/4">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span className="font-mono text-sm font-medium text-gray-600">
                          {item.time}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        {item.speaker && (
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{item.speaker}</span>
                          </div>
                        )}
                      </div>
                      
                      <Badge className={getTypeColor(item.type as AgendaItemType)}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section Component
function TestimonialsSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonialImages, setTestimonialImages] = useState<TestimonialImages>({});

  const testimonials = [
    {
      id: 1,
      name: "Alexandra Smith",
      role: "Marketing Director",
      company: "GrowthTech",
      content: "This conference completely transformed how I approach digital marketing. The insights from the speakers were game-changing.",
      rating: 5
    },
    {
      id: 2,
      name: "Robert Davis",
      role: "CMO",
      company: "InnovateCorp",
      content: "Incredible networking opportunities and cutting-edge strategies. Already implementing what I learned with amazing results.",
      rating: 5
    },
    {
      id: 3,
      name: "Maria Garcia",
      role: "Digital Marketing Specialist",
      company: "StartupSuccess",
      content: "The speakers delivered actionable insights that I could implement immediately. ROI on attendance was 10x within 3 months.",
      rating: 5
    },
    {
      id: 4,
      name: "Thomas Wilson",
      role: "Growth Manager",
      company: "ScaleUp",
      content: "Best conference I've attended in years. The combination of strategy and practical implementation was perfect.",
      rating: 5
    }
  ];

  useEffect(() => {
    generateTestimonialImages();
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const generateTestimonialImages = async () => {
    const images: TestimonialImages = {};
    for (const testimonial of testimonials) {
      try {
        const result = await GenerateImage({
          prompt: `Professional headshot of ${testimonial.name}, ${testimonial.role}, business professional, clean background, friendly expression, corporate photo`
        });
        images[testimonial.id] = result.url;
      } catch (error) {
        console.error(`Error generating testimonial image for ${testimonial.name}:`, error);
      }
    }
    setTestimonialImages(images);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Ensure we have a valid testimonial
  if (!testimonials.length) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];
  if (!currentTestimonial) {
    return null;
  }

  const currentImage = testimonialImages[currentTestimonial.id];

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
                    "{currentTestimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center gap-4">
                    {currentImage && (
                      <img 
                        src={currentImage} 
                        alt={currentTestimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">
                        {currentTestimonial.name}
                      </div>
                      <div className="text-blue-600">
                        {currentTestimonial.role}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {currentTestimonial.company}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
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

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
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
}

// CTA Section Component
function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {t('hero.seats')}
          </h2>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join over 1000 marketing professionals for the most impactful digital marketing event of 2025.
          </p>
          
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-gold-500 hover:bg-gold-600 text-black font-semibold px-12 py-6 text-xl"
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
          
          <div className="flex items-center justify-center space-x-8 text-blue-100">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>100% Online</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-white" />
              <span>July 20, 2025</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>Free Registration</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Home Component
export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <SpeakersSection />
      <AgendaSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}