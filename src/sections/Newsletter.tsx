import { useEffect, useRef, useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function Newsletter() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    setIsSubmitted(true);
    toast.success('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-dark w-full overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div
          className={`max-w-3xl mx-auto text-center ${
            isVisible ? 'animate-slide-up' : 'opacity-0'
          }`}
        >
          {/* Icon */}
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-8 h-8 text-primary" />
          </div>

          {/* Heading */}
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            SUBSCRIBE TO OUR
            <br />
            <span className="text-gradient">NEWSLETTER</span>
          </h2>

          <p className="text-gray-custom text-lg mb-8 max-w-xl mx-auto">
            Stay updated with the latest gaming gear, exclusive deals, and tech news delivered straight to your inbox.
          </p>

          {/* Form */}
          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className={`flex flex-col sm:flex-row gap-4 max-w-md mx-auto ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-dark-light border-dark-light text-white placeholder:text-gray-custom focus:border-primary h-12"
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white font-semibold h-12 px-8"
              >
                Subscribe
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 text-primary animate-scale-in">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg font-semibold">Successfully subscribed!</span>
            </div>
          )}

          {/* Trust badges */}
          <div
            className={`flex flex-wrap justify-center gap-6 mt-8 text-gray-custom text-sm ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.3s' }}
          >
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              No spam, ever
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Unsubscribe anytime
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Exclusive deals
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
