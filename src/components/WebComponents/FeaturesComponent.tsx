import React from 'react';
import { Zap, Shield, TrendingUp, Heart, Star, Sparkles } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesProps {
  variant?: '2col' | '3col' | '4col';
  title?: string;
  subtitle?: string;
  features?: Feature[];
  theme?: any;
}

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap size={32} />,
  Shield: <Shield size={32} />,
  TrendingUp: <TrendingUp size={32} />,
  Heart: <Heart size={32} />,
  Star: <Star size={32} />,
  Sparkles: <Sparkles size={32} />,
};

export const FeaturesComponent: React.FC<FeaturesProps> = ({
  variant = '3col',
  title = 'Our Features',
  subtitle = 'Everything you need to succeed',
  features = [
    { title: 'Fast', description: 'Lightning fast performance', icon: 'Zap' },
    { title: 'Secure', description: 'Bank-level security', icon: 'Shield' },
    { title: 'Scalable', description: 'Grows with your business', icon: 'TrendingUp' },
  ],
  theme,
}) => {
  const gridClasses = {
    '2col': 'grid-cols-1 md:grid-cols-2',
    '3col': 'grid-cols-1 md:grid-cols-3',
    '4col': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Features Grid */}
        <div className={`grid ${gridClasses[variant]} gap-8`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div
                className="inline-flex p-3 rounded-lg mb-4"
                style={{ backgroundColor: `${theme?.primaryColor || '#8B4513'}20` }}
              >
                <div style={{ color: theme?.primaryColor || '#8B4513' }}>
                  {iconMap[feature.icon] || <Star size={32} />}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
