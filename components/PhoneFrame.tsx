// import { motion } from 'framer-motion';

export interface PhoneFrameProps {
  src: string;
  alt: string;
  /**
   * Delay in seconds before the animation begins. Defaults to 0.
   */
  delay?: number;
  /**
   * Whether to show an iPhone notch. Defaults to false.
   */
  showNotch?: boolean;
}

/**
 * PhoneFrame renders an image inside a realistic iPhone 16 Pro frame.
 */
export function PhoneFrame({ src, alt, delay = 0, showNotch = false }: PhoneFrameProps) {
  return (
    <div 
      className="relative w-full max-w-xs mx-auto group cursor-pointer animate-fadeInUp"
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {/* iPhone 16 Pro Frame */}
      <div className="relative bg-black rounded-[3rem] p-2 shadow-2xl">
        {/* Screen */}
        <div className="relative bg-white rounded-[2.5rem] overflow-hidden">
          {/* Screen Content */}
          <div className="relative w-full h-auto">
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
              style={{ aspectRatio: '9/19.5' }}
            />
            
            {/* iPhone Notch */}
            {showNotch && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black rounded-b-2xl z-10">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black rounded-full"></div>
              </div>
            )}
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand/20 via-transparent to-brand/20 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
    </div>
  );
}