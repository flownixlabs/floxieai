import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in learning more about Floxie AI assistant.");
    const whatsappUrl = `https://wa.me/1234567890?text=${message}`;
    
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.open(whatsappUrl, '_blank');
    } else {
      window.open(`https://web.whatsapp.com/send?phone=1234567890&text=${message}`, '_blank');
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-surface to-secondary-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-fluid relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300 hover-lift">
                <Icon name="MessageCircle" size={40} color="white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg">
                <Icon name="Sparkles" size={16} color="white" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-6 leading-tight">
            Meet{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Floxie
            </span>
            <br />
            Your Smart WhatsApp Assistant
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-text-secondary mb-8 font-medium max-w-3xl mx-auto leading-relaxed">
            Never miss important tasks again with AI-powered reminders, voice transcription, and seamless calendar integration
          </p>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your WhatsApp into a powerful productivity hub. Set reminders using natural language, transcribe voice notes instantly, and sync with Google Calendar - all through simple chat messages.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              variant="primary"
              size="xl"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={handleWhatsAppClick}
              className="hover-lift shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-4"
            >
              Start with WhatsApp
            </Button>
            
            <Button
              variant="outline"
              size="xl"
              iconName="Play"
              iconPosition="left"
              className="hover-lift transition-all duration-300 text-lg px-8 py-4"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-text-muted">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span>End-to-end encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span>24/7 availability</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-secondary" />
              <span>10,000+ active users</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center">
          <div className="w-1 h-3 bg-text-muted rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;