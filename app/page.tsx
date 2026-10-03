import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { AgentsSection } from "@/components/landing/AgentsSection";
import { HumanLoop } from "@/components/landing/HumanLoop";
import { Audiences, Fairness } from "@/components/landing/Audiences";
import { TrustSection, CTABand, Footer } from "@/components/landing/TrustSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <AgentsSection />
        <HumanLoop />
        <Audiences />
        <Fairness />
        <TrustSection />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
