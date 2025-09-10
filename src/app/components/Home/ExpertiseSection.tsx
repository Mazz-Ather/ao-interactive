import { useState } from 'react';
import { motion } from 'framer-motion'; // Assuming Framer Motion is installed for advanced animations

const expertiseItems = [
  { label: "AI Innovation", slug: "ai-innovation" },
  { label: "Metaverse & Virtual Ecosystems", slug: "metaverse-virtual-ecosystems" },
  { label: "Spatial Computing & Digital Twins", slug: "spatial-computing-digital-twins" },
  { label: "AR/VR Mixed Reality Solutions", slug: "ar-vr-mixed-reality" },
  { label: "Gamification", slug: "gamification" }
];

// ExpertiseRotator Component
const ExpertiseRotator = ({ items, onItemClick }: { items: { label: string; slug: string }[]; onItemClick: (item: { label: string; slug: string }) => void }) => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for seamless infinite loop
  const extendedItems = [...items, ...items];

  return (
    <div 
      className="relative overflow-hidden w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: isPaused ? 0 : ["0%", "-50%"],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20, // Adjust speed as needed
              ease: "linear"
            }
          }
        }}
      >
        {extendedItems.map((item, index) => (
          <motion.div
            key={`${item.slug}-${index}`}
            className="inline-flex items-center px-4 py-2 mx-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/10"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            onClick={() => onItemClick(item)}
          >
            <span className="text-white font-semibold text-sm md:text-base">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
      {/* Gradient overlays for smooth edges */}
      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default function ExpertiseSection({ handleExpertiseClick }: { handleExpertiseClick: (item: { label: string; slug: string }) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="pt-6"
    >
      <h3 className="text-lg text-white/70 font-medium mb-4">Our Expertise</h3>
      <ExpertiseRotator 
        items={expertiseItems} 
        onItemClick={handleExpertiseClick} 
      />
    </motion.div>
  );
}