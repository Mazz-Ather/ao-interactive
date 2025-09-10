'use client';
import { motion } from "motion/react";
import { useState } from "react";

const testimonials = [
  {
    text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Fatima Ahmed",
    role: "Operations Manager",
  },
  {
    text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Muhammad Hassan",
    role: "IT Manager",
  },
  {
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Aisha Khan",
    role: "Customer Support Lead",
  },
  {
    text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Abdullah",
    role: "CEO",
  },
  {
    text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Ibrahim",
    role: "Project Manager",
  },
  {
    text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Maryam Ali",
    role: "Business Analyst",
  },
  {
    text: "Our business functions improved with a user-friendly design and positive customer feedback.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Youssef Rahman",
    role: "Marketing Director",
  },
  {
    text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Khadija Malik",
    role: "Sales Manager",
  },
  {
    text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Ibrahim Nazir",
    role: "E-commerce Manager",
  },
];

// Single testimonial card component
const TestimonialCard = ({ testimonial }: { testimonial: { text: string; image: string; name: string; role: string; } }) => (
  <div className="bg-[#1f1f1f] border border-gray-700 rounded-lg p-5 mb-4 hover:border-[#40ED70] hover:bg-[#1a1a1a] transition-all duration-300 shadow-sm">
    <p className="text-gray-300 text-sm leading-6 mb-4">
      "{testimonial.text}"
    </p>
    <div className="flex items-center space-x-3">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-10 h-10 rounded-full border-2 border-[#40ED70] object-cover"
      />
      <div>
        <h4 className="text-white font-semibold text-sm">
          {testimonial.name}
        </h4>
        <p className="text-[#40ED70] text-xs">
          {testimonial.role}
        </p>
      </div>
    </div>
  </div>
);

// Scrolling column component
const ScrollingColumn = ({ 
  testimonials, 
  duration = 10, 
  reverse = false 
}: {
  testimonials: Array<{
    text: string;
    image: string;
    name: string;
    role: string;
  }>;
  duration?: number;
  reverse?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];
  
  return (
    <div 
      className="w-80 h-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex flex-col"
        initial={{ y: reverse ? -50 : 0 }}
        animate={{
          y: isHovered ? (reverse ? -50 : 0) : reverse ? [0, -400] : [0, -400]
        }}
        transition={{
          duration: isHovered ? 0 : duration,
          ease: "linear",
          repeat: isHovered ? 0 : Infinity,
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </motion.div>
    </div>
  );
};

// Main testimonials component
const Testimonials = () => {
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className="bg-[#141414] py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-[#40ED70]/30 bg-[#40ED70]/10 text-[#40ED70] text-sm font-medium mb-6">
            Testimonials
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What our <span className="text-[#40ED70]">users say</span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See what our customers have to say about us.
          </p>
        </motion.div>

        {/* Testimonials columns */}
        <div className="flex justify-center gap-6 relative">
          {/* Gradient masks */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#141414] via-transparent to-[#141414] pointer-events-none z-10 h-full"></div>
          
          <div className="flex gap-6 h-[600px] overflow-hidden">
            <ScrollingColumn 
              testimonials={firstColumn} 
              duration={20}
            />
            <ScrollingColumn 
              testimonials={secondColumn} 
              duration={25}
              reverse={true}
            />
            <ScrollingColumn 
              testimonials={thirdColumn} 
              duration={22}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;