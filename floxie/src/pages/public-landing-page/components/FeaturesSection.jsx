import React from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: "MessageSquare",
      title: "Natural Language Reminders",
      description: "Simply tell Floxie what you need to remember in plain English. \'Remind me to call mom tomorrow at 3 PM\' - it\'s that easy!",
      benefits: [
        "No complex syntax required",
        "Understands context and timing",
        "Smart scheduling suggestions"
      ],
      gradient: "from-primary to-primary-600"
    },
    {
      id: 2,
      icon: "Mic",
      title: "Voice Note Transcription",
      description: "Send voice messages and get instant text transcriptions. Perfect for capturing thoughts on the go without typing.",
      benefits: [
        "Accurate speech-to-text",
        "Multiple language support",
        "Instant processing"
      ],
      gradient: "from-secondary to-secondary-600"
    },
    {
      id: 3,
      icon: "Calendar",
      title: "Google Calendar Sync",
      description: "Seamlessly integrate with your Google Calendar. Create events, check schedules, and manage appointments directly from WhatsApp.",
      benefits: [
        "Two-way synchronization",
        "Real-time updates",
        "Multiple calendar support"
      ],
      gradient: "from-accent to-accent-600"
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-surface">
      <div className="container-fluid">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 rounded-full mb-6">
              <Icon name="Sparkles" size={16} className="text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Core Features</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6">
              Everything you need in one
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> smart assistant</span>
            </h2>
            
            <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Floxie combines the power of AI with the convenience of WhatsApp to create the ultimate productivity companion
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="group relative bg-surface rounded-2xl border border-border hover:border-primary/20 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover-lift"
              >
                {/* Card Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <Icon name={feature.icon} size={28} color="white" strokeWidth={2.5} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Benefits List */}
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-text-muted">
                        <Icon name="Check" size={16} className="text-success mr-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Feature Number */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 text-text-muted">
              <Icon name="ArrowRight" size={16} />
              <span className="text-sm">Ready to experience these features?</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;