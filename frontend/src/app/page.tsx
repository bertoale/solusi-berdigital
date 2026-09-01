import {
  HeroSection,
  ServicesSection,
  HowItWorksSection,
  WhyChooseUsSection,
  FAQSection,
  CTASection,
} from "@/sections"

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <FAQSection />
      <CTASection />
    </div>
  )
}
