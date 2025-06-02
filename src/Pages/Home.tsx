import { HeroSection } from '@/components/Home/HeroSection';
import { AboutSection } from '@/components/Home/AboutSection';
import { SpeakersSection } from '@/components/Home/SpeakersSection';
import { AgendaSection } from '@/components/Home/AgendaSection';
import { TestimonialsSection } from '@/components/Home/TestimonialsSection';
import { CTASection } from '@/components/Home/CTASection';


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