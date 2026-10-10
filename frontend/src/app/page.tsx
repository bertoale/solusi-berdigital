import {
  HeroSection,
  ServicesSection,
  HowItWorksSection,
  WhyChooseUsSection,
  FAQSection,
  CTASection,
} from "@/sections"
import { HomeFaqSchema } from "@/jsonLD"
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "https://solusiberdigital.com" },
}

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
