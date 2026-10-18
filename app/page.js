import RoyalReveal from "@/components/layout/RoyalReveal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ArtOfSilkSection from "@/components/home/ArtOfSilkSection";
import CuratedCollections from "@/components/home/CuratedCollections";
import SeeYourselfTeaser from "@/components/home/SeeYourselfTeaser";
import AtelierTeaser from "@/components/home/AtelierTeaser";
import CraftsmanshipSection from "@/components/home/CraftsmanshipSection";
import CuratedProductsSection from "@/components/home/CuratedProductsSection";

export default function HomePage() {
  return (
    <>
      {/* Cinematic Opening Royal Reveal */}
      <RoyalReveal />

      {/* Global Luxury Navigation */}
      <Header />

      <main>
        {/* Section 1: Royal Hero */}
        <HeroSection />

        {/* Section 2: The Art of Silk */}
        <ArtOfSilkSection />

        {/* Section 3: Curated Collections */}
        <CuratedCollections />

        {/* Section 4: Signature Feature 1 — See Yourself in Silk (AI Try-On Teaser) */}
        <SeeYourselfTeaser />

        {/* Section 5: Signature Feature 2 — Design Your Saree (Atelier Customizer Teaser) */}
        <AtelierTeaser />

        {/* Section 6: Craftsmanship (Master Pit Loom & Zari Metallurgy) */}
        <CraftsmanshipSection />

        {/* Section 7: Curated Real Catalogue Showcase */}
        <CuratedProductsSection />
      </main>

      {/* Section 8: Final Brand Statement & Royal Footer */}
      <Footer />
    </>
  );
}
