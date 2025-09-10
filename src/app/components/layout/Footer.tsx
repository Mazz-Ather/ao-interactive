import React from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Twitter,
  ExternalLink
} from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface OfficeLocation {
  country: string;
  countryCode: string;
  phone: string;
  address: string;
  flag: string;
}

const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: "Services",
      links: [
        { label: "Digital Transformation", href: "/services/immersive-transformations" },
        { label: "Events & Exhibitions", href: "/services/ai-innovations" },
        { label: "3D Animation & Visualisation", href: "/services/metaverse" },
        { label: "Real Estate Digital Twins", href: "/services/digital-twins" },
        { label: "AR VR & Mixed Reality Solutions", href: "/services/ar-vr" },
        { label: "Gamification", href: "/services/gamification" },
        ]
    },
    {
      title: "Industries",
      links: [
        { label: "Real Estate", href: "/industries/Real Estate" },
        { label: "Events & Entertainment", href: "/industries/immersive-transformation" },
        { label: "Education & Training", href: "/industries/entertainment" },
        { label: "Healthcare", href: "/industries/healthcare" },
        { label: "Defense & Security", href: "/industries/defence" },
        { label: "Tourism and Hospitality", href: "/industries/tourism" },
        { label: "Marketing & Ad Creative", href: "/industries/education" },
      ]
    },
    {
      title: "Products",
      links: [
        { label: "EventCast", href: "/products/eventcast" },
        { label: "Audience Engagement Suite", href: "/products/audience-engagement" },
        { label: "EchoBuild", href: "/products/echobuild" },
        { label: "VisionAR Studio", href: "/products/visionar" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "Portfolio", href: "/portfolio" },
        { label: "About Us", href: "/about" },
        { label: "Pitch Deck", href: "/pitch-deck" },
        { label: "Blogs", href: "/blogs" }
      ]
    }
  ];

  const officeLocations: OfficeLocation[] = [
    {
      country: "sauida",
      countryCode: "sauida",
      phone: "00966549252655",
      address: "507 Blacksmith Lane Sauida Saudi Arabia",
      flag: "🇸🇦"
    },
    {
      country: "KSA",
      countryCode: "SA",
      phone: "+966 54 925 2655",
      address: "3855, Muhammad Ibn Muslimah Al Ansari, District Al Malaz, Riyadh",
      flag: "🇸🇦"
    },
    {
      country: "UAE",
      countryCode: "AE",
      phone: "+971 58 986 2787",
      address: "346, Al Muteena, Residence 1072, Dubai, UAE",
      flag: "🇦🇪"
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/company/ao-studios", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/aostudios", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/aostudios", label: "YouTube" },
    { icon: Twitter, href: "https://twitter.com/aostudios", label: "Twitter" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-900">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          <div className="mb-8 lg:mb-0">
            {/* Logo */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#40ED70] rounded-full flex items-center justify-center mr-4 shadow-lg">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">AO INTERACTIVE</span>
            </div>
            
            {/* Tagline */}
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-light text-gray-500 leading-tight">
                Empowering the unicorns
                <br />
                <span className="text-gray-900 font-medium">of tomorrow!</span>
              </h2>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-right">
            <div className="flex items-center justify-end mb-4">
              <div className="w-12 h-12 bg-[#40ED70] rounded-full flex items-center justify-center mr-4 shadow-lg">
                <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="text-xl font-semibold text-gray-700">+1 (646) 243 0100</div>
                <div className="text-gray-500">info@aointeractive.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 hover:text-[#40ED70] transition-colors duration-300 flex items-center group"
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.label}
                      </span>
                      {link.external && (
                        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Office Locations */}
        <div className="border-t border-gray-200 pt-12 mb-12">
          <h3 className="text-2xl font-semibold text-center mb-12 text-gray-900">Our Global Presence</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-[#40ED70] hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{office.flag}</span>
                  <h4 className="text-xl font-semibold text-gray-900">{office.country}</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Phone className="w-4 h-4 mr-3 text-[#40ED70]" />
                    <a 
                      href={`tel:${office.phone.replace(/\s/g, '')}`}
                      className="hover:text-[#40ED70] transition-colors duration-300"
                    >
                      {office.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-start text-gray-700">
                    <MapPin className="w-4 h-4 mr-3 text-[#40ED70] mt-1 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{office.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-600 text-sm mb-6 lg:mb-0">
              Copyright {currentYear} © AO Interactive. All rights Reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-6 lg:mb-0">
              <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm">
                Terms & Conditions
              </Link>
              <Link href="/cookies-policy" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm">
                Cookies Policy
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-200 hover:bg-[#40ED70] rounded-full flex items-center justify-center transition-all duration-300 hover:transform hover:scale-110 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;