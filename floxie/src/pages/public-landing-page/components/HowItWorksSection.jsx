import React from 'react';
import Icon from '../../../components/AppIcon';

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      title: "Connect with Floxie",
      description: "Click the WhatsApp button and start a conversation with Floxie. No app downloads or complex setup required.",
      icon: "MessageCircle",
      details: [
        "Instant connection via WhatsApp",
        "No registration needed",
        "Works on any device"
      ]
    },
    {
      id: 2,
      title: "Set Up Your Preferences",
      description: "Tell Floxie about your timezone, preferred reminder style, and connect your Google Calendar for seamless integration.",
      icon: "Settings",
      details: [
        "Personalized settings",
        "Calendar integration",
        "Custom preferences"
      ]
    },
    {
      id: 3,
      title: "Start Creating Reminders",
      description: "Simply chat with Floxie using natural language. Say 'Remind me to buy groceries tomorrow at 5 PM' and you're done!",
      icon: "MessageSquare",
      details: [
        "Natural language processing",
        "Smart time recognition",
        "Context understanding"
      ]
    },
    {
      id: 4,
      title: "Get Timely Notifications",
      description: "Receive your reminders exactly when you need them. Floxie sends WhatsApp messages at the perfect time.",
      icon: "Bell",
      details: [
        "Precise timing",
        "WhatsApp notifications",
        "Never miss important tasks"
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-gradient-to-br from-primary-50/50 via-surface to-secondary-50/50">
      <div className="container-fluid">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-accent-50 rounded-full mb-6">
              <Icon name="Play" size={16} className="text-accent mr-2" />
              <span className="text-sm font-medium text-accent">How It Works</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6">
              Get started in
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"> 4 simple steps</span>
            </h2>
            
            <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Setting up Floxie is incredibly simple. Follow these steps and you'll be managing your tasks like a pro in minutes.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-1/2 top-24 w-0.5 h-16 bg-gradient-to-b from-primary/30 to-transparent -translate-x-1/2 z-0"></div>
                )}

                <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center px-3 py-1 bg-primary-100 rounded-full mb-4">
                      <span className="text-sm font-bold text-primary">Step {step.id}</span>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details List */}
                    <ul className="space-y-2 mb-6">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center justify-center lg:justify-start text-text-muted">
                          <Icon name="Check" size={16} className="text-success mr-3 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual Element */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      {/* Main Circle */}
                      <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl hover-lift">
                        <Icon name={step.icon} size={48} color="white" strokeWidth={2} />
                      </div>
                      
                      {/* Step Number */}
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-lg font-bold text-white">{step.id}</span>
                      </div>
                      
                      {/* Decorative Elements */}
                      <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-secondary/20 rounded-full"></div>
                      <div className="absolute -top-4 -left-4 w-6 h-6 bg-accent/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-surface rounded-2xl border border-border p-8 shadow-lg">
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Ready to get started?
              </h3>
              <p className="text-text-secondary mb-6">
                Join thousands of users who are already boosting their productivity with Floxie
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-text-muted">
                <Icon name="Clock" size={16} className="text-primary" />
                <span>Setup takes less than 2 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;