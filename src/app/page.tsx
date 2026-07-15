import { ContactSection } from "@/components/sections/ContactSection";
import { CustomizationSection } from "@/components/sections/CustomizationSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroBanner } from "@/components/sections/HeroBanner";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroBanner />
      <CustomizationSection />
      <GallerySection />
      <ContactSection />
    </main>
  );
}
