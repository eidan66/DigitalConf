import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "../ui/badge";

// Add type for agenda item type
type AgendaItemType = 'keynote' | 'session' | 'panel' | 'networking' | 'break' | 'closing';

// Add type for agenda item
interface AgendaItem {
  id: string;
  time: string;
  type: AgendaItemType;
}

export const AgendaSection = () => {
  const { t } = useLanguage();

  const agenda: AgendaItem[] = [
    {
      id: 'registration',
      time: "09:00 - 09:30",
      type: "networking"
    },
    {
      id: 'keynote',
      time: "09:30 - 10:15",
      type: "keynote"
    },
    {
      id: 'scalingMarketing',
      time: "10:15 - 11:00",
      type: "session"
    },
    {
      id: 'coffeeBreak',
      time: "11:00 - 11:15",
      type: "break"
    },
    {
      id: 'contentStrategy',
      time: "11:15 - 12:00",
      type: "session"
    },
    {
      id: 'lunch',
      time: "12:00 - 13:00",
      type: "networking"
    },
    {
      id: 'ppcStrategies',
      time: "13:00 - 13:45",
      type: "session"
    },
    {
      id: 'socialCommerce',
      time: "13:45 - 14:30",
      type: "session"
    },
    {
      id: 'afternoonBreak',
      time: "14:30 - 14:45",
      type: "break"
    },
    {
      id: 'marketingAutomation',
      time: "14:45 - 15:30",
      type: "session"
    },
    {
      id: 'panel',
      time: "15:30 - 16:15",
      type: "panel"
    },
    {
      id: 'closing',
      time: "16:15 - 16:30",
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
                key={item.id}
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
                          {t(`agenda.items.${item.id}.title`)}
                        </h3>
                        {t(`agenda.items.${item.id}.speaker`) && (
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">
                              {t(`agenda.items.${item.id}.speaker`)}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <Badge className={getTypeColor(item.type)}>
                        {t(`agenda.types.${item.type}`)}
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
};