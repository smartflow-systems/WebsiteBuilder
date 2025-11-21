import React from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  variant?: 'default' | 'transparent' | 'centered';
  logo?: string;
  links?: string[];
  ctaText?: string;
  theme?: any;
}

export const NavbarComponent: React.FC<NavbarProps> = ({
  variant = 'default',
  logo = 'Logo',
  links = ['Home', 'About', 'Services', 'Contact'],
  ctaText = 'Get Started',
  theme,
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const baseClasses = 'py-4 px-6 shadow-md';
  const variantClasses = {
    default: 'bg-white',
    transparent: 'bg-transparent',
    centered: 'bg-white',
  };

  return (
    <nav className={`${baseClasses} ${variantClasses[variant]}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold" style={{ color: theme?.primaryColor || '#8B4513' }}>
            {logo}
          </div>

          {/* Desktop Navigation */}
          {variant === 'centered' ? (
            <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-8">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <button
            className="hidden md:block px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: theme?.primaryColor || '#8B4513' }}
          >
            {ctaText}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={`#${link.toLowerCase()}`}
                className="block text-gray-700 hover:text-gray-900 transition-colors"
              >
                {link}
              </a>
            ))}
            <button
              className="w-full px-6 py-2 rounded-lg text-white font-semibold"
              style={{ backgroundColor: theme?.primaryColor || '#8B4513' }}
            >
              {ctaText}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
