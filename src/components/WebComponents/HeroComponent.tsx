import React from 'react';

interface HeroProps {
  variant?: 'centered' | 'left' | 'right' | 'fullscreen' | 'split';
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaSecondary?: string;
  backgroundImage?: string;
  theme?: any;
}

export const HeroComponent: React.FC<HeroProps> = ({
  variant = 'centered',
  title = 'Welcome to Your Website',
  subtitle = 'Build something amazing today',
  ctaText = 'Get Started',
  ctaSecondary = 'Learn More',
  backgroundImage,
  theme,
}) => {
  const renderContent = () => (
    <div className={`${variant === 'centered' ? 'text-center' : 'text-left'} space-y-6`}>
      <h1 className="text-5xl md:text-7xl font-bold leading-tight">
        {title}
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
        {subtitle}
      </p>
      <div className="flex gap-4 pt-4" style={{ justifyContent: variant === 'centered' ? 'center' : 'flex-start' }}>
        <button
          className="px-8 py-4 rounded-lg text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
          style={{ backgroundColor: theme?.primaryColor || '#8B4513' }}
        >
          {ctaText}
        </button>
        <button
          className="px-8 py-4 rounded-lg border-2 font-semibold text-lg hover:bg-gray-50 transition-colors"
          style={{ borderColor: theme?.primaryColor || '#8B4513', color: theme?.primaryColor || '#8B4513' }}
        >
          {ctaSecondary}
        </button>
      </div>
    </div>
  );

  if (variant === 'fullscreen') {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
        style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-white px-6 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>
    );
  }

  if (variant === 'split') {
    return (
      <div className="min-h-screen grid md:grid-cols-2 gap-8 items-center px-6 md:px-12">
        <div>{renderContent()}</div>
        <div className="bg-gray-200 rounded-2xl h-96 md:h-full flex items-center justify-center">
          {backgroundImage ? (
            <img src={backgroundImage} alt="Hero" className="w-full h-full object-cover rounded-2xl" />
          ) : (
            <span className="text-gray-400 text-lg">Image Placeholder</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`py-20 px-6 ${variant === 'centered' ? 'text-center' : ''}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};
