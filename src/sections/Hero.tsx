import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const productRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x: x * 10, y: y * 10 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-dark"
    >
      {/* Background Image */}
      <div
        className={`absolute inset-0 transition-opacity duration-1500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          src="/hero-bg.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark" />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div
              className={`overflow-hidden ${
                isLoaded ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              <span className="inline-block px-4 py-2 bg-primary/20 text-primary text-sm font-semibold rounded-full mb-6">
                NEW COLLECTION 2024
              </span>
            </div>

            <h1
              className={`font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none mb-6 ${
                isLoaded ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.4s' }}
            >
              GAMING
              <br />
              <span className="text-gradient">HEADSET</span>
            </h1>

            <p
              className={`text-gray-custom text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 mb-8 ${
                isLoaded ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.6s' }}
            >
              Experience the future of audio with our premium gaming collection.
              Immersive sound, ultimate comfort.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ${
                isLoaded ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.8s' }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-6 text-lg group btn-liquid"
              >
                SHOP NOW
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                VIEW COLLECTION
              </Button>
            </div>

            {/* Stats */}
            <div
              className={`flex gap-8 justify-center lg:justify-start mt-12 ${
                isLoaded ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '1s' }}
            >
              <div>
                <p className="font-display text-3xl font-bold text-white">50K+</p>
                <p className="text-gray-custom text-sm">Happy Customers</p>
              </div>
              <div className="w-px bg-dark-light" />
              <div>
                <p className="font-display text-3xl font-bold text-white">200+</p>
                <p className="text-gray-custom text-sm">Products</p>
              </div>
              <div className="w-px bg-dark-light" />
              <div>
                <p className="font-display text-3xl font-bold text-white">4.9</p>
                <p className="text-gray-custom text-sm">Rating</p>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div
              className={`relative ${isLoaded ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: '0.4s' }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-75 animate-pulse-glow" />
              
              {/* Product image with 3D tilt */}
              <img
                ref={productRef}
                src="/hero-headphones.png"
                alt="Gaming Headset"
                className="relative z-10 w-full max-w-md lg:max-w-lg xl:max-w-xl animate-float"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
              />

              {/* Floating badges */}
              <div
                className={`absolute top-10 right-0 bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 ${
                  isLoaded ? 'animate-slide-in-right' : 'opacity-0'
                }`}
                style={{ animationDelay: '1.2s' }}
              >
                <p className="text-white font-semibold">7.1 Surround</p>
              </div>
              <div
                className={`absolute bottom-20 left-0 bg-primary/90 rounded-lg px-4 py-2 ${
                  isLoaded ? 'animate-slide-up' : 'opacity-0'
                }`}
                style={{ animationDelay: '1.4s' }}
              >
                <p className="text-white font-semibold">-25% OFF</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${
          isLoaded ? 'animate-fade-in' : 'opacity-0'
        }`}
        style={{ animationDelay: '1.5s' }}
      >
        <a
          href="#categories"
          className="flex flex-col items-center text-gray-custom hover:text-white transition-colors"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
