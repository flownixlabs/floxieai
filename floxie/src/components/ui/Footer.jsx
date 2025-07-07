import React from 'react';
import Icon from '../AppIcon';
import AppImage from '../AppImage';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Contact', href: '#contact' },
        { label: 'Blog', href: '#blog' },
        { label: 'Careers', href: '#careers' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Cookie Policy', href: '#cookies' },
        { label: 'GDPR', href: '#gdpr' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#help' },
        { label: 'Documentation', href: '#docs' },
        { label: 'API Reference', href: '#api' },
        { label: 'Status', href: '#status' },
      ],
    },
  ];

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
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
  };

  return (
    <footer className="bg-text-primary text-white">
      <div className="container-fluid py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <AppImage
                src="/assets/images/floxie_AI_assistant-1751908626629.png"
                alt="Floxie AI Assistant"
                className="w-12 h-12 rounded-xl shadow-lg"
              />
              <div>
                <h2 className="text-2xl font-heading font-semibold">Floxie</h2>
                <p className="text-sm text-gray-300 font-medium">AI Assistant</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Your intelligent WhatsApp assistant for seamless reminder management and calendar integration.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-150">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-150">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-150">
                <Icon name="Linkedin" size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-150">
                <Icon name="Instagram" size={20} />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-heading font-semibold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="text-gray-300 hover:text-white transition-colors duration-150 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © 2024 Floxie AI Assistant. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#privacy" className="text-gray-300 hover:text-white transition-colors duration-150 text-sm">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-300 hover:text-white transition-colors duration-150 text-sm">
                Terms of Service
              </a>
              <a href="#cookies" className="text-gray-300 hover:text-white transition-colors duration-150 text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;