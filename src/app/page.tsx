import BlogSection from '@/components/ui/BlogSection';
import ContactForm from '@/components/ui/ContactForm';
import ContentSection from '@/components/ui/ContentSection';
import CTASection from '@/components/ui/CTASection';
import CustomerSection from '@/components/ui/CustomerSection';
import EventSchedule from '@/components/ui/EventSchedule';
import FAQSection from '@/components/ui/FAQSection';
import FeatureSection from '@/components/ui/FeatureSection';
import HeroSection from '@/components/ui/HeroSection';
import NewsletterSection from '@/components/ui/NewsletterSection';
import Popup from '@/components/ui/Popup';
import PricingTable from '@/components/ui/PricingTable';
import TeamSection from '@/components/ui/TeamSection';
import TestimonialSection from '@/components/ui/TestimonialSection';

export default function Page() {
  return (
    <main className="grow overflow-y-auto">
      <HeroSection />
      <FeatureSection />
      <CustomerSection />
      <TestimonialSection />
      <ContentSection />
      <TeamSection />
      <PricingTable />
      <FAQSection />
      <CTASection />
      <ContactForm />
      <NewsletterSection />
      <BlogSection />
      <EventSchedule />
      <Popup initialIsOpen={false} />
    </main>
  )
}
