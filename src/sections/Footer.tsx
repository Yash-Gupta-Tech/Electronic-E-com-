import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    pages: [
      { name: 'Home', href: '#hero' },
      { name: 'Products', href: '#products' },
      { name: 'Categories', href: '#categories' },
      { name: 'Reviews', href: '#reviews' },
      { name: 'Blog', href: '#blog' },
    ],
    support: [
      { name: 'Contact Us', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Shipping Info', href: '#' },
      { name: 'Returns', href: '#' },
      { name: 'Track Order', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative bg-dark-light w-full">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#hero" className="inline-block mb-6">
              <span className="font-display text-2xl font-bold text-white tracking-wider">
                TECH<span className="text-primary">GEAR</span>
              </span>
            </a>
            <p className="text-gray-custom text-sm leading-relaxed mb-6 max-w-sm">
              Your premier destination for high-performance gaming gear. We deliver cutting-edge technology and exceptional customer service to gamers worldwide.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:support@techgear.com" className="flex items-center gap-3 text-gray-custom hover:text-primary transition-colors text-sm">
                <Mail className="w-4 h-4" />
                support@techgear.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 text-gray-custom hover:text-primary transition-colors text-sm">
                <Phone className="w-4 h-4" />
                +1 (234) 567-890
              </a>
              <div className="flex items-center gap-3 text-gray-custom text-sm">
                <MapPin className="w-4 h-4" />
                123 Gaming Street, Tech City
              </div>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.pages.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-custom hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-custom hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-custom hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-custom text-sm text-center sm:text-left">
              © 2024 TechGear. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-dark rounded-full flex items-center justify-center text-gray-custom hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
