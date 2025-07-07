@@ .. @@
 import React from 'react';
 import Icon from '../../../components/AppIcon';
 import Button from '../../../components/ui/Button';
+import OptimizedImage from '../../../components/ui/OptimizedImage';
 
 const HeroSection = () => {
   const handleWhatsAppClick = () => {
   }
 }
@@ .. @@
           {/* Logo */}
           <div className="flex justify-center mb-8">
             <div className="relative group">
-              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300 hover-lift">
-                <Icon name="MessageCircle" size={40} color="white" strokeWidth={2.5} />
-              </div>
-              <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg">
-                <Icon name="Sparkles" size={16} color="white" strokeWidth={3} />
+              <OptimizedImage
+                src="/assets/images/floxie_AI_assistant-1751908626629.png"
+                alt="Floxie AI Assistant"
+                className="w-20 h-20 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-300 hover-lift"
+                lazy={false}
+              />
+              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg">
+                <Icon name="Sparkles" size={12} color="white" strokeWidth={3} />
               </div>
             </div>
           </div>