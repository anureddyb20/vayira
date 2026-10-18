import RoyalReveal from "@/components/layout/RoyalReveal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import DemoSignInSection from "@/components/home/DemoSignInSection";
import ArtOfSilkSection from "@/components/home/ArtOfSilkSection";
import CraftsmanshipSection from "@/components/home/CraftsmanshipSection";
import CuratedCollections from "@/components/home/CuratedCollections";
import CuratedProductsSection from "@/components/home/CuratedProductsSection";
import AtelierTeaser from "@/components/home/AtelierTeaser";
import SeeYourselfTeaser from "@/components/home/SeeYourselfTeaser";

export default function HomePage() {
  return (
    <>
      {/* Cinematic Opening Royal Reveal */}
      <RoyalReveal />

      {/* Global Luxury Navigation */}
      <Header />

      <main>
        {/* Introduction to VAYIRA & Royal Hero */}
        <HeroSection />

        {/* 1. Sign In with Demo */}
        <DemoSignInSection />

        {/* 2. Heritage (Art of Silk & Master Pit Looms) */}
        <ArtOfSilkSection />
        <CraftsmanshipSection />

        {/* 3. Collections (Expanded Regional Categories & Catalog Showcase) */}
        <CuratedCollections />
        <CuratedProductsSection />

        {/* 4. Saree Atelier (Bespoke Customizer Studio) */}
        <AtelierTeaser />

        {/* 5. See Yourself in the Saree (AI Virtual Try-On Studio) */}
        <SeeYourselfTeaser />
      </main>

      {/* Final Royal Brand Statement & Footer */}
      <Footer />
    </>
  );
}
