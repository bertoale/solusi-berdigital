import {
  HeroSection,
  ServicesSection,
  HowItWorksSection,
  WhyChooseUsSection,
  FAQSection,
  BlogInsightSection,
  CTASection,
} from "@/sections"
import { HomeFaqSchema } from "@/jsonLD"
import type { Metadata } from "next"

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
      <BlogInsightSection />
      <CTASection />
    </div>
  )
}
