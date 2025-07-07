import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PublicNavigation from '../../components/ui/PublicNavigation';
import Footer from '../../components/ui/Footer';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import Icon from '../../components/AppIcon';

const PublicLandingPage = () => {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Floxie - Your Smart WhatsApp AI Assistant | Never Miss Important Tasks</title>
        <meta 
          name="description" 
          content="Transform your WhatsApp into a powerful productivity hub with Floxie AI assistant. Set reminders using natural language, transcribe voice notes, and sync with Google Calendar seamlessly." 
        />
        <meta 
          name="keywords" 
          content="WhatsApp assistant, AI reminder, voice transcription, Google Calendar sync, productivity app, task management, natural language processing" 
        />
        <meta property="og:title" content="Floxie - Your Smart WhatsApp AI Assistant" />
        <meta 
          property="og:description" 
          content="Never miss important tasks again with AI-powered reminders, voice transcription, and seamless calendar integration through WhatsApp." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://floxie.ai" />
        <meta property="og:image" content="https://floxie.ai/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Floxie - Your Smart WhatsApp AI Assistant" />
        <meta 
          name="twitter:description" 
          content="Transform your WhatsApp into a powerful productivity hub with AI-powered reminders and calendar integration." 
        />
        <meta name="twitter:image" content="https://floxie.ai/twitter-image.jpg" />
        <link rel="canonical" href="https://floxie.ai" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#2563EB" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Floxie AI" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <PublicNavigation />

        {/* Main Content */}
        <main className="relative">
          {/* Hero Section */}
          <HeroSection />

          {/* Features Section */}
          <FeaturesSection />

          {/* How It Works Section */}
          <HowItWorksSection />

          {/* Testimonials Section */}
          <TestimonialsSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover-lift focus-ring z-40 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <Icon name="ArrowUp" size={20} />
        </button>
      </div>
    </>
  );
};

export default PublicLandingPage;