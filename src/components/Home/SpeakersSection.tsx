import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const SPEAKER_IMAGES: Record<string, string> = {
  'sarahJohnson': 'https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW58ZW58MHx8MHx8fDA%3D',
  'emilyRodriguez': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWFufGVufDB8fDB8fHww',
  'lisaThompson': 'https://plus.unsplash.com/premium_photo-1694557636097-5969bae91ba8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdvbWFufGVufDB8fDB8fHww',
  'michaelChen': 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww',
  'davidKim': 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww',
  'jamesWilson': 'https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1hbnxlbnwwfHwwfHx8MA%3D%3D'
};

export const SpeakersSection = () => {
  const { t } = useLanguage();

  const speakers = [
    {
      id: 'sarahJohnson',
      name: t('speakers.details.sarahJohnson.name'),
      role: t('speakers.details.sarahJohnson.role'),
      company: t('speakers.details.sarahJohnson.company'),
      topic: t('speakers.details.sarahJohnson.topic'),
      bio: t('speakers.details.sarahJohnson.bio')
    },
    {
      id: 'michaelChen',
      name: t('speakers.details.michaelChen.name'),
      role: t('speakers.details.michaelChen.role'),
      company: t('speakers.details.michaelChen.company'),
      topic: t('speakers.details.michaelChen.topic'),
      bio: t('speakers.details.michaelChen.bio')
    },
    {
      id: 'emilyRodriguez',
      name: t('speakers.details.emilyRodriguez.name'),
      role: t('speakers.details.emilyRodriguez.role'),
      company: t('speakers.details.emilyRodriguez.company'),
      topic: t('speakers.details.emilyRodriguez.topic'),
      bio: t('speakers.details.emilyRodriguez.bio')
    },
    {
      id: 'davidKim',
      name: t('speakers.details.davidKim.name'),
      role: t('speakers.details.davidKim.role'),
      company: t('speakers.details.davidKim.company'),
      topic: t('speakers.details.davidKim.topic'),
      bio: t('speakers.details.davidKim.bio')
    },
    {
      id: 'lisaThompson',
      name: t('speakers.details.lisaThompson.name'),
      role: t('speakers.details.lisaThompson.role'),
      company: t('speakers.details.lisaThompson.company'),
      topic: t('speakers.details.lisaThompson.topic'),
      bio: t('speakers.details.lisaThompson.bio')
    },
    {
      id: 'jamesWilson',
      name: t('speakers.details.jamesWilson.name'),
      role: t('speakers.details.jamesWilson.role'),
      company: t('speakers.details.jamesWilson.company'),
      topic: t('speakers.details.jamesWilson.topic'),
      bio: t('speakers.details.jamesWilson.bio')
    }
  ];

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
                    <img 
                      src={SPEAKER_IMAGES[speaker.id]} 
                      alt={speaker.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
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
                  
                  <div className="mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {speaker.topic}
                    </span>
                  </div>
                  
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
};