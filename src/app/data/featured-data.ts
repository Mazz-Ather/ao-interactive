import { Brand, Quote } from '../components/Home/FeaturedSection';

interface SampleData {
  heading: string;
  imageSrc: string;
  brands: Brand[];
  quotes: Quote[];
}

export const sampleData: SampleData = {
  heading: "First foreign AI powered immersive tech company to enter Saudi Arabia under the IGNITE Program.",
  imageSrc: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzNDE1NiIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPlNpZ25pbmcgQ2VyZW1vbnkgUGhvdG88L3RleHQ+PC9zdmc+",
  brands: [
    { name: "NBA", logo: "", description: "Sports partnership for immersive fan experiences" },
    { name: "NHC", logo: "", description: "Healthcare innovation collaboration" },
    { name: "PEPSICO", logo: "", description: "Brand activation and AR campaigns" },
    { name: "PwC", logo: "", description: "Digital transformation consulting" },
    { name: "Mercedes-Benz", logo: "", description: "Luxury automotive experiences" },
    { name: "Spotify", logo: "", description: "Music streaming integration" },
    { name: "Saudi Tourism", logo: "", description: "Tourism promotion initiatives" },
    { name: "Tim Hortons", logo: "", description: "Customer engagement solutions" },
    { name: "Apple", logo: "", description: "iOS app development partnership" },
    { name: "Google", logo: "", description: "Cloud services and AI integration" },
    { name: "Vision 2030", logo: "", description: "Supporting Saudi Arabia's vision" },
    { name: "Expo 2030", logo: "", description: "World expo technology partner" }
  ],
  quotes: [
    { 
      text: "Ministry of Investment × Narsun Studios", 
      type: "partnership" as const,
      details: "Signed agreement date: 2023. Strategic partnership for digital innovation."
    },
    { 
      text: "We are proud to continually deliver exceptional work that sets us apart.", 
      type: "testimonial" as const,
      details: "Testimonials from satisfied clients worldwide."
    },
    { 
      text: "Award-winning immersive solutions provider since 2016 till Infinity!", 
      type: "achievement" as const,
      details: "Multiple international awards and recognitions for excellence."
    }
  ]
};