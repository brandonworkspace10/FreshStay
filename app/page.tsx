import { FaqSection } from "@/components/landing/faq-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { IncludedSection } from "@/components/landing/included-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { LeadPopup } from "@/components/landing/lead-popup";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import { NeighborhoodsSection } from "@/components/landing/neighborhoods-section";
import { PainSection } from "@/components/landing/pain-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { SignupSection } from "@/components/landing/signup-section";
import { SocialProofBar } from "@/components/landing/social-proof-bar";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { TrustSection } from "@/components/landing/trust-section";

export default function Page() {
  return (
    <>
      <a
        href="#signup"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-card focus:px-4 focus:py-2 focus:shadow-lg focus:ring-2 focus:ring-ring"
      >
        Skip to sign up
      </a>
      <LandingHeader />
      <main className="pb-20 md:pb-0">
        <HeroSection />
        <SocialProofBar />
        <PainSection />
        <PricingSection />
        <IncludedSection />
        <NeighborhoodsSection />
        <HowItWorksSection />
        <TrustSection />
        <TestimonialsSection />
        <FaqSection />
        <SignupSection />
      </main>
      <LandingFooter />
      <MobileCtaBar />
      <LeadPopup />
    </>
  );
}
