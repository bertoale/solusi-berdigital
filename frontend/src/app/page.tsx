import {
  HeroSection,
  ServicesSection,
  HowItWorksSection,
  WhyChooseUsSection,
  FAQSection,
  CTASection,
} from "@/sections"
import { HomeFaqSchema } from "@/jsonLD"

export default function Home() {
  return (
    <div className="flex flex-col">
      <HomeFaqSchema />
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <FAQSection />
      <CTASection />
    </div>
  )
}
