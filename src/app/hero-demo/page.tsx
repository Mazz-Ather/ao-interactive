'use client';

import { useState } from 'react';
import EnhancedHero, { EnhancedHeroVariantB } from '../components/Home/EnhancedHero';

export default function HeroDemo() {
  const [showVariantB, setShowVariantB] = useState(false);
  
  return (
    <main className="min-h-screen bg-black">
      {/* Toggle button for A/B testing */}
      <div className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-white/10">
        <button 
          onClick={() => setShowVariantB(!showVariantB)}
          className="px-4 py-2 bg-[#40ED70] hover:bg-[#40ED70]/90 text-black rounded-lg font-medium transition-colors"
        >
          Switch to Variant {showVariantB ? 'A' : 'B'}
        </button>
      </div>
      
      {/* Render the selected hero variant */}
      {showVariantB ? <EnhancedHeroVariantB /> : <EnhancedHero />}
      
      {/* Additional page content would go here */}
    </main>
  );
}