/**
 * Landing Page - Hero's Journey Homepage
 * 
 * This is the narrative homepage that tells the story of trader transformation.
 * Structure follows the Hero's Journey: From Chaos to Mastery.
 * 
 * NO feature marketing, NO screenshots, NO pricing, NO token/NFT references.
 * Pure storytelling.
 */

import { useEffect } from 'react';
import Navigation from '../components/landing/Navigation';
import HeroSection from '../components/landing/HeroSection';
import WoundsSection from '../components/landing/WoundsSection';
import JourneySection from '../components/landing/JourneySection';
import TransformSection from '../components/landing/TransformSection';
import VoicesSection from '../components/landing/VoicesSection';
import FinalCTA from '../components/landing/FinalCTA';
import FooterJourney from '../components/landing/FooterJourney';

// Import styles - Design System v1.0
import '../styles/design-tokens.css';  // FIRST: Design system variables
import '../styles/global.css';
import '../styles/landing.css';

export default function LandingPage() {
  useEffect(() => {
    // Set page title
    document.title = 'Sparkfined - From Chaos to Mastery';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'The journey from degen to sage. A trader\'s transformation through discipline, reflection, and iteration.'
      );
    }
  }, []);

  return (
    <div className="landing-page">
      {/* Fixed Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero - Opening Statement */}
        <HeroSection />

        {/* Act I: The Ordinary World - The Wounds */}
        <WoundsSection />

        {/* Act II: The Road of Trials - The Five Phases */}
        <JourneySection />

        {/* Act III: The Transformation - Before/After */}
        <TransformSection />

        {/* Voices From The Path - Testimonials */}
        <VoicesSection />

        {/* Final CTA - Begin The Journey */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <FooterJourney />
    </div>
  );
}
