import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Manager",
      company: "TechCorp Inc.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: `Floxie has completely transformed how I manage my daily tasks. The natural language processing is incredible - I can just say 'remind me about the client meeting next Tuesday' and it handles everything perfectly. The Google Calendar integration is seamless!`,
      highlight: "Transformed my daily workflow"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Freelance Designer",
      company: "Creative Studio",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: `As someone who's always on the go, Floxie's voice transcription feature is a game-changer. I can capture ideas while walking, driving, or in meetings. The accuracy is impressive and it saves me so much time compared to typing everything out.`,
      highlight: "Perfect for busy professionals"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Project Coordinator",
      company: "Global Solutions",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: `I've tried many reminder apps, but Floxie is different. It understands context so well - when I say 'remind me to follow up on the proposal tomorrow morning,' it knows exactly what I mean. The WhatsApp integration makes it feel natural and effortless.`,
      highlight: "Most intuitive reminder system"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Small Business Owner",
      company: "Thompson & Associates",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: `Running a small business means juggling countless tasks. Floxie helps me stay organized without adding another app to learn. The fact that it works through WhatsApp, which I already use daily, makes it incredibly convenient and practical.`,
      highlight: "Essential for business owners"
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Graduate Student",
      company: "Stanford University",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: `Balancing coursework, research, and part-time work is challenging. Floxie helps me remember everything from assignment deadlines to lab meetings. The voice notes feature is perfect for capturing research ideas when I'm in the library or field.`,
      highlight: "Perfect for students"
    },
    {
      id: 6,
      name: "Robert Kim",
      role: "Sales Director",
      company: "Enterprise Solutions",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: `In sales, timing is everything. Floxie ensures I never miss a follow-up call or important client meeting. The calendar sync keeps everything in one place, and the natural language input means I can set reminders quickly between calls.`,
      highlight: "Critical for sales success"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-warning fill-current" : "text-gray-300"}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-surface">
      <div className="container-fluid">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-success-50 rounded-full mb-6">
              <Icon name="MessageCircle" size={16} className="text-success mr-2" />
              <span className="text-sm font-medium text-success">Customer Stories</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6">
              Loved by
              <span className="bg-gradient-to-r from-success to-primary bg-clip-text text-transparent"> 10,000+ users</span>
            </h2>
            
            <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
              See how Floxie is helping professionals, students, and business owners stay organized and productive every day
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-surface rounded-2xl border border-border hover:border-primary/20 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover-lift group"
              >
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Highlight */}
                  <div className="inline-flex items-center px-3 py-1 bg-primary-50 rounded-full mb-4">
                    <span className="text-xs font-medium text-primary">{testimonial.highlight}</span>
                  </div>

                  {/* Content */}
                  <blockquote className="text-text-secondary leading-relaxed mb-6 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Image
                        src={testimonial.avatar}
                        alt={`${testimonial.name} profile picture`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-surface flex items-center justify-center">
                        <Icon name="Check" size={8} color="white" strokeWidth={3} />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-semibold text-text-primary truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-text-muted truncate">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-text-muted truncate">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Icon name="Quote" size={32} className="text-primary" />
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-text-secondary">Active Users</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-secondary mb-2">500K+</div>
                <div className="text-text-secondary">Reminders Set</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">99.9%</div>
                <div className="text-text-secondary">Uptime</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-success mb-2">4.9/5</div>
                <div className="text-text-secondary">User Rating</div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-text-muted mb-4">
              Join thousands of satisfied users today
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-text-muted">
              <Icon name="Shield" size={16} className="text-success" />
              <span>Trusted by professionals worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;