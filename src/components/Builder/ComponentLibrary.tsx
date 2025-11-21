import React, { useState } from 'react';
import { useBuilderStore } from '../../store/builderStore';
import {
  Layout,
  Type,
  Grid,
  Image as ImageIcon,
  MessageSquare,
  Mail,
  Navigation,
  Sparkles,
  AlignLeft,
  Space,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { nanoid } from 'nanoid';

interface ComponentTemplate {
  type: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  defaultProps: Record<string, any>;
}

const componentTemplates: ComponentTemplate[] = [
  {
    type: 'Navbar',
    label: 'Navigation Bar',
    icon: <Navigation size={20} />,
    description: 'Header navigation with logo and menu',
    defaultProps: {
      variant: 'default',
      logo: 'Your Logo',
      links: ['Home', 'About', 'Services', 'Contact'],
      ctaText: 'Get Started',
    },
  },
  {
    type: 'Hero',
    label: 'Hero Section',
    icon: <Sparkles size={20} />,
    description: 'Eye-catching header section',
    defaultProps: {
      variant: 'centered',
      title: 'Welcome to Your Website',
      subtitle: 'Build something amazing today',
      ctaText: 'Get Started',
      ctaSecondary: 'Learn More',
      backgroundImage: '',
    },
  },
  {
    type: 'Features',
    label: 'Features Grid',
    icon: <Grid size={20} />,
    description: 'Showcase your features',
    defaultProps: {
      variant: '3col',
      title: 'Our Features',
      subtitle: 'Everything you need to succeed',
      features: [
        { title: 'Fast', description: 'Lightning fast performance', icon: 'Zap' },
        { title: 'Secure', description: 'Bank-level security', icon: 'Shield' },
        { title: 'Scalable', description: 'Grows with your business', icon: 'TrendingUp' },
      ],
    },
  },
  {
    type: 'Testimonials',
    label: 'Testimonials',
    icon: <MessageSquare size={20} />,
    description: 'Customer reviews and feedback',
    defaultProps: {
      variant: 'cards',
      title: 'What Our Clients Say',
      testimonials: [
        {
          name: 'John Doe',
          role: 'CEO, Company',
          content: 'Excellent service and outstanding results!',
          image: '',
          rating: 5,
        },
        {
          name: 'Jane Smith',
          role: 'Marketing Director',
          content: 'Highly recommend to anyone looking for quality.',
          image: '',
          rating: 5,
        },
      ],
    },
  },
  {
    type: 'Gallery',
    label: 'Image Gallery',
    icon: <ImageIcon size={20} />,
    description: 'Photo gallery or portfolio',
    defaultProps: {
      variant: 'grid',
      columns: 3,
      images: [
        { src: 'https://via.placeholder.com/400x300', alt: 'Gallery image 1' },
        { src: 'https://via.placeholder.com/400x300', alt: 'Gallery image 2' },
        { src: 'https://via.placeholder.com/400x300', alt: 'Gallery image 3' },
      ],
    },
  },
  {
    type: 'ContactForm',
    label: 'Contact Form',
    icon: <Mail size={20} />,
    description: 'Get in touch form',
    defaultProps: {
      variant: 'simple',
      title: 'Contact Us',
      subtitle: 'We\'d love to hear from you',
      fields: ['name', 'email', 'message'],
      submitText: 'Send Message',
    },
  },
  {
    type: 'CTA',
    label: 'Call to Action',
    icon: <Layout size={20} />,
    description: 'Conversion-focused section',
    defaultProps: {
      variant: 'centered',
      title: 'Ready to Get Started?',
      subtitle: 'Join thousands of satisfied customers',
      ctaText: 'Start Free Trial',
      ctaSecondary: 'Book a Demo',
    },
  },
  {
    type: 'TextBlock',
    label: 'Text Block',
    icon: <AlignLeft size={20} />,
    description: 'Rich text content',
    defaultProps: {
      variant: 'default',
      title: 'About Us',
      content: 'Your content goes here. Edit this text to tell your story.',
      alignment: 'left',
    },
  },
  {
    type: 'Spacer',
    label: 'Spacer',
    icon: <Space size={20} />,
    description: 'Add vertical spacing',
    defaultProps: {
      height: 60,
    },
  },
  {
    type: 'Footer',
    label: 'Footer',
    icon: <Type size={20} />,
    description: 'Website footer',
    defaultProps: {
      variant: 'default',
      logo: 'Your Logo',
      description: 'Building amazing websites since 2024',
      links: [
        { title: 'About', url: '#' },
        { title: 'Services', url: '#' },
        { title: 'Contact', url: '#' },
        { title: 'Privacy', url: '#' },
      ],
      socialLinks: [
        { platform: 'Facebook', url: '#' },
        { platform: 'Twitter', url: '#' },
        { platform: 'Instagram', url: '#' },
      ],
      copyright: '2024 Your Company. All rights reserved.',
    },
  },
];

export const ComponentLibrary: React.FC = () => {
  const { addComponent } = useBuilderStore();
  const [expandedCategory, setExpandedCategory] = useState<string | null>('layout');

  const categories = {
    layout: ['Navbar', 'Hero', 'Footer'],
    content: ['TextBlock', 'Features', 'Gallery'],
    forms: ['ContactForm', 'CTA'],
    social: ['Testimonials'],
    utility: ['Spacer'],
  };

  const handleAddComponent = (template: ComponentTemplate) => {
    const component = {
      id: nanoid(),
      type: template.type,
      props: template.defaultProps,
    };
    addComponent(component);
  };

  const renderCategory = (categoryName: string, categoryLabel: string) => {
    const isExpanded = expandedCategory === categoryName;
    const categoryComponents = componentTemplates.filter((t) =>
      categories[categoryName as keyof typeof categories].includes(t.type)
    );

    return (
      <div key={categoryName} className="border-b border-gray-200">
        <button
          onClick={() => setExpandedCategory(isExpanded ? null : categoryName)}
          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
        >
          <span className="font-semibold text-gray-700 capitalize">{categoryLabel}</span>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {isExpanded && (
          <div className="p-2 bg-gray-50">
            {categoryComponents.map((template) => (
              <button
                key={template.type}
                onClick={() => handleAddComponent(template)}
                className="w-full text-left p-3 mb-2 bg-white hover:bg-blue-50 border border-gray-200 rounded-lg transition-all hover:shadow-md group"
              >
                <div className="flex items-start gap-3">
                  <div className="text-gray-600 group-hover:text-blue-600 transition-colors mt-1">
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {template.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-yellow-700 to-yellow-600">
        <h2 className="text-lg font-bold text-white">Component Library</h2>
        <p className="text-xs text-yellow-100 mt-1">Drag and drop to add</p>
      </div>

      <div>
        {renderCategory('layout', 'Layout')}
        {renderCategory('content', 'Content')}
        {renderCategory('forms', 'Forms & CTAs')}
        {renderCategory('social', 'Social')}
        {renderCategory('utility', 'Utility')}
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Click a component to add it to your page
        </p>
      </div>
    </div>
  );
};
