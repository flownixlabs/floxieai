@@ .. @@
-import React from 'react';
+import React from 'react';
+import OptimizedImage from './ui/OptimizedImage';
 
 function Image({
   src,
@@ .. @@
 }) {

   return (
-    <img
+    <OptimizedImage
       src={src}
       alt={alt}
       className={className}
-      onError={(e) => {
-        e.target.src = "/assets/images/no_image.png"
-      }}
+      placeholder="/assets/images/no_image.png"
+      lazy={true}
       {...props}
     />
   );