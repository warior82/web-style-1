
import { ShuffleHero } from "@/components/ui/shuffle-grid";
import { ProfileSection } from "@/components/ProfileSection";
import { PricingSection } from "@/components/PricingSection";
import { ContactSection } from "@/components/ContactSection"

export default function Home() {
  return (
    <div>
      <ShuffleHero />
      <div id="about">
        <ProfileSection />
      </div>
      <div id="Harga">
        <PricingSection />
      </div>
      <div id="Kontak">
        <ContactSection />
      </div>
    </div>
  );
}
