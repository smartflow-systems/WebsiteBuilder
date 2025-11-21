import React from 'react';

interface CTAProps {
  variant?: 'centered' | 'split' | 'boxed';
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaSecondary?: string;
  theme?: any;
}

export const CTAComponent: React.FC<CTAProps> = ({
  variant = 'centered',
  title = 'Ready to Get Started?',
  subtitle = 'Join thousands of satisfied customers',
  ctaText = 'Start Free Trial',
  ctaSecondary = 'Book a Demo',
  theme,
}) => {
  const renderButtons = () => (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        className="px-8 py-4 rounded-lg text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
        style={{ backgroundColor: theme?.primaryColor || '#8B4513' }}
      >
        {ctaText}
      </button>
      <button
        className="px-8 py-4 rounded-lg border-2 bg-white font-semibold text-lg hover:bg-gray-50 transition-colors"
        style={{ borderColor: theme?.primaryColor || '#8B4513', color: theme?.primaryColor || '#8B4513' }}
      >
        {ctaSecondary}
      </button>
    </div>
  );

  if (variant === 'boxed') {
    return (
      <div className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl p-12 text-white text-center shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${theme?.primaryColor || '#8B4513'}, ${theme?.secondaryColor || '#DAA520'})` }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
            <p className="text-xl mb-8 opacity-90">{subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-lg bg-white font-semibold text-lg hover:bg-gray-100 transition-colors" style={{ color: theme?.primaryColor || '#8B4513' }}>
                {ctaText}
              </button>
              <button className="px-8 py-4 rounded-lg border-2 border-white text-white font-semibold text-lg hover:bg-white hover:bg-opacity-20 transition-colors">
                {ctaSecondary}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'split') {
    return (
      <div className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
              <p className="text-xl text-gray-600">{subtitle}</p>
            </div>
            <div>{renderButtons()}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-6 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
        <p className="text-xl mb-8 opacity-90">{subtitle}</p>
        {renderButtons()}
      </div>
    </div>
  );
};
