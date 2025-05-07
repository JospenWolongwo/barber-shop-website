import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  Menu,
  X,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

// Main App Component
export default function BarberShopWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative bg-black text-white min-h-screen font-sans overflow-x-hidden">
      {/* Navigation */}
      <NavBar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        activeSection={activeSection}
        handleSectionClick={handleSectionClick}
      />

      {/* Main Content */}
      <main>
        {activeSection === "home" && (
          <>
            <HeroSection />
            <ServicesSection />
            <AboutSection />
            <GallerySection />
            <PricingSection />
            <TestimonialsSection />
          </>
        )}
        {activeSection === "services" && <ServicesSection />}
        {activeSection === "about" && <AboutSection />}
        {activeSection === "gallery" && <GallerySection />}
        {activeSection === "pricing" && <PricingSection />}
        {activeSection === "testimonials" && <TestimonialsSection />}
        {activeSection === "contact" && <ContactSection />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Loading Screen Component
function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ ease: "linear", duration: 2, repeat: Infinity }}
          className="mx-auto mb-6"
        >
          <Scissors size={64} className="text-amber-500" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-amber-500"
        >
          PRIME CUTS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 mt-2"
        >
          Premium Barbershop Experience
        </motion.p>
      </motion.div>
    </div>
  );
}

// Navigation Component
function NavBar({ isMenuOpen, toggleMenu, activeSection, handleSectionClick }) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "gallery", label: "Gallery" },
    { id: "pricing", label: "Pricing" },
    { id: "testimonials", label: "Reviews" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-sm z-40 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Scissors size={28} className="text-amber-500 mr-2" />
            <span className="text-2xl font-bold text-amber-500">
              PRIME CUTS
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-8"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`relative text-lg transition-colors ${
                  activeSection === item.id
                    ? "text-amber-500"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Booking Button (Desktop) */}
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block bg-amber-500 text-black px-6 py-2 rounded-sm font-medium hover:bg-amber-400 transition-colors"
          >
            Book Now
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-gray-900"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionClick(item.id)}
                  className={`py-3 text-left text-lg ${
                    activeSection === item.id
                      ? "text-amber-500"
                      : "text-gray-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button className="mt-4 bg-amber-500 text-black py-3 rounded-sm font-medium">
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen pt-24 md:pt-0 flex items-center"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
          alt="Stylish barber shop interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Crafting Your <span className="text-amber-500">Perfect</span> Look
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Experience premium grooming services tailored to your unique
              style. Where precision meets perfection.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-24"
          >
            <button className="bg-amber-500 text-black px-8 py-3 rounded-sm text-lg font-medium hover:bg-amber-400 transition-colors">
              Book Appointment
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-sm text-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors">
              Our Services
            </button>
          </motion.div>
        </div>
      </div>

      {/* Business Info Bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 py-4 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-0">
            <div className="flex items-center justify-center md:justify-start">
              <Clock className="text-amber-500 mr-3" size={20} />
              <div>
                <p className="text-white font-medium">Opening Hours</p>
                <p className="text-gray-400 text-sm">Mon - Sat: 9am - 8pm</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <MapPin className="text-amber-500 mr-3" size={20} />
              <div>
                <p className="text-white font-medium">Location</p>
                <p className="text-gray-400 text-sm">
                  123 Style Street, Downtown
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <Phone className="text-amber-500 mr-3" size={20} />
              <div>
                <p className="text-white font-medium">Appointments</p>
                <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

// Services Section Component
function ServicesSection() {
  const services = [
    {
      title: "Haircut & Styling",
      description:
        "Precision cutting and styling tailored to your face shape and preferences.",
      icon: <Scissors className="text-amber-500 mb-4" size={36} />,
    },
    {
      title: "Beard Trim & Shaping",
      description:
        "Expert beard grooming to maintain or create your desired facial hair style.",
      icon: <Scissors className="text-amber-500 mb-4" size={36} />,
    },
    {
      title: "Hot Towel Shave",
      description:
        "Classic straight razor shave with hot towels for the ultimate smooth finish.",
      icon: <Scissors className="text-amber-500 mb-4" size={36} />,
    },
    {
      title: "Hair Treatments",
      description:
        "Specialized treatments for hair health, including deep conditioning and scalp therapy.",
      icon: <Scissors className="text-amber-500 mb-4" size={36} />,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Our Premium <span className="text-amber-500">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience a range of exceptional grooming services designed to
            enhance your style and confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black p-8 rounded-sm text-center hover:bg-gray-800 transition-colors"
            >
              {service.icon}
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button className="bg-amber-500 text-black px-8 py-3 rounded-sm text-lg font-medium hover:bg-amber-400 transition-colors">
            View Full Service Menu
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}

// About Section Component
function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-black"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=750&q=80"
              alt="Barber cutting hair"
              className="w-full rounded-sm"
            />
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 bg-amber-500 p-6 rounded-sm">
              <p className="text-black font-bold text-5xl">15+</p>
              <p className="text-black font-medium">Years of Experience</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              About <span className="text-amber-500">Prime Cuts</span>
            </h2>
            <p className="text-gray-300 mb-6">
              Founded in 2010, Prime Cuts has been at the forefront of men's
              grooming in the city. We blend traditional barbering techniques
              with modern styles to deliver an exceptional experience.
            </p>
            <p className="text-gray-300 mb-6">
              Our team of skilled barbers are passionate about their craft and
              are committed to perfection with every cut, trim, and shave. We
              believe that a great haircut is more than just a service—it's an
              experience.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-xl font-bold mb-2">Our Vision</h4>
                <p className="text-gray-400">
                  To redefine men's grooming standards and create a community
                  space where style meets substance.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Our Approach</h4>
                <p className="text-gray-400">
                  Personalized attention to detail, premium products, and
                  techniques tailored to your unique features.
                </p>
              </div>
            </div>
            <button className="bg-transparent border border-amber-500 text-amber-500 px-8 py-3 rounded-sm text-lg font-medium hover:bg-amber-500 hover:text-black transition-colors">
              Meet Our Team
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Gallery Section Component
function GallerySection() {
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Stylish haircut",
    },
    {
      src: "https://images.unsplash.com/photo-1541533848490-bc8115cd6522?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Beard trimming",
    },
    {
      src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Barbershop interior",
    },
    {
      src: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Classic haircut",
    },
    {
      src: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Modern fade",
    },
    {
      src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Hot towel shave",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Our <span className="text-amber-500">Work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse through our gallery to see examples of our craftsmanship and
            the styles we've created for our clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden group"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover rounded-sm transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white font-medium mb-2">{image.alt}</p>
                  <span className="text-amber-500 text-sm">
                    Click to enlarge
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <button className="border border-amber-500 text-amber-500 px-8 py-3 rounded-sm text-lg font-medium hover:bg-amber-500 hover:text-black transition-colors">
            View Instagram
          </button>
        </motion.div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full max-h-[80vh] object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white hover:text-amber-500"
                >
                  <X size={24} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

// Pricing Section Component
function PricingSection() {
  const pricingItems = [
    { service: "Men's Haircut", price: "$30", duration: "45 min" },
    { service: "Beard Trim", price: "$15", duration: "20 min" },
    { service: "Haircut & Beard Trim", price: "$40", duration: "60 min" },
    { service: "Hot Towel Shave", price: "$35", duration: "30 min" },
    { service: "Kid's Haircut (Under 12)", price: "$20", duration: "30 min" },
    { service: "Senior's Haircut (65+)", price: "$25", duration: "45 min" },
    { service: "Hair & Scalp Treatment", price: "$25", duration: "30 min" },
    { service: "VIP Package", price: "$75", duration: "90 min" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-black"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Our <span className="text-amber-500">Pricing</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We offer competitive pricing for premium services. Quality grooming
            that fits your budget.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900 rounded-sm overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-800 p-4">
              <div className="text-gray-300 font-medium">Service</div>
              <div className="text-gray-300 font-medium text-center">
                Duration
              </div>
              <div className="text-gray-300 font-medium text-right">Price</div>
            </div>

            <div className="divide-y divide-gray-800">
              {pricingItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="grid grid-cols-3 p-4 hover:bg-gray-800 transition-colors"
                >
                  <div className="font-medium">{item.service}</div>
                  <div className="text-gray-400 text-center">
                    {item.duration}
                  </div>
                  <div className="text-amber-500 font-bold text-right">
                    {item.price}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 text-center p-6 bg-gray-900 rounded-sm"
          >
            <h3 className="text-xl font-bold mb-2">Membership Plans</h3>
            <p className="text-gray-400 mb-4">
              Save more with our monthly membership plans. Unlimited haircuts
              and special discounts.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button className="bg-amber-500 text-black px-6 py-3 rounded-sm font-medium hover:bg-amber-400 transition-colors">
                View Membership Options
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-sm font-medium hover:bg-white hover:bg-opacity-10 transition-colors">
                Book Appointment
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Testimonials Section Component
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Michael Thompson",
      rating: 5,
      text: "The best barbershop in town! John gave me the perfect fade and beard trim. The attention to detail was incredible.",
    },
    {
      name: "David Williams",
      rating: 5,
      text: "I've been coming here for 3 years now and have never been disappointed. Great atmosphere and excellent service every time.",
    },
    {
      name: "Robert Johnson",
      rating: 5,
      text: "First-class experience from start to finish. The hot towel shave was amazing. Highly recommend!",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Client <span className="text-amber-500">Reviews</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. See what our clients have to say
            about their experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black p-8 rounded-sm"
            >
              <div className="flex text-amber-500 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} fill="#F59E0B" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
              <p className="font-medium">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="text-amber-500 flex items-center justify-center gap-2 hover:underline"
          >
            <span>See more reviews on Google</span>
            <span>&rarr;</span>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Contact Section Component
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to a server
    alert("Thanks for your message! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-black"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Get In <span className="text-amber-500">Touch</span>
            </h2>
            <p className="text-gray-300 mb-8">
              Have questions or want to schedule an appointment? Contact us
              directly or use the form to send us a message.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <MapPin className="text-amber-500 mr-4" size={24} />
                <div>
                  <p className="font-medium mb-1">Location</p>
                  <p className="text-gray-400">123 Style Street, Downtown</p>
                  <p className="text-gray-400">New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="text-amber-500 mr-4" size={24} />
                <div>
                  <p className="font-medium mb-1">Phone</p>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="text-amber-500 mr-4" size={24} />
                <div>
                  <p className="font-medium mb-1">Email</p>
                  <p className="text-gray-400">info@primecuts.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="text-amber-500 mr-4" size={24} />
                <div>
                  <p className="font-medium mb-1">Hours</p>
                  <p className="text-gray-400">Monday - Friday: 9am - 8pm</p>
                  <p className="text-gray-400">Saturday: 10am - 6pm</p>
                  <p className="text-gray-400">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-900 p-8 rounded-sm"
          >
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-sm p-3 text-white focus:border-amber-500 focus:ring-amber-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-sm p-3 text-white focus:border-amber-500 focus:ring-amber-500 transition-colors"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-gray-400">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-sm p-3 text-white focus:border-amber-500 focus:ring-amber-500 transition-colors"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-gray-400">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-gray-800 border border-gray-700 rounded-sm p-3 text-white focus:border-amber-500 focus:ring-amber-500 transition-colors"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-amber-500 text-black py-3 rounded-sm font-medium hover:bg-amber-400 transition-colors"
              >
                Send Message
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <Scissors size={28} className="text-amber-500 mr-2" />
              <span className="text-2xl font-bold text-amber-500">
                PRIME CUTS
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Premium barbershop offering top-quality haircuts, beard trims, and
              hot towel shaves in a relaxed, stylish environment.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Haircuts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Beard Trims
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Hot Towel Shave
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Hair Treatments
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Membership Plans
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Opening Hours</h4>
            <ul className="space-y-3">
              <li className="text-gray-400">Monday - Friday: 9am - 8pm</li>
              <li className="text-gray-400">Saturday: 10am - 6pm</li>
              <li className="text-gray-400">Sunday: Closed</li>
            </ul>
            <a
              href="#"
              className="inline-block mt-6 bg-amber-500 text-black px-6 py-2 rounded-sm font-medium hover:bg-amber-400 transition-colors"
            >
              Book Now
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Prime Cuts Barbershop. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
