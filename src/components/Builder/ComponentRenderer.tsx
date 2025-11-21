import React from 'react';
import { ComponentData, ProjectData } from '../../store/builderStore';
import { NavbarComponent } from '../WebComponents/NavbarComponent';
import { HeroComponent } from '../WebComponents/HeroComponent';
import { FeaturesComponent } from '../WebComponents/FeaturesComponent';
import { CTAComponent } from '../WebComponents/CTAComponent';
import { FooterComponent } from '../WebComponents/FooterComponent';
import { TestimonialsComponent } from '../WebComponents/TestimonialsComponent';
import { ContactFormComponent } from '../WebComponents/ContactFormComponent';
import { GalleryComponent } from '../WebComponents/GalleryComponent';
import { TextBlockComponent } from '../WebComponents/TextBlockComponent';
import { SpacerComponent } from '../WebComponents/SpacerComponent';

interface ComponentRendererProps {
  component: ComponentData;
  theme: ProjectData['theme'];
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component, theme }) => {
  const props = { ...component.props, theme };

  switch (component.type) {
    case 'Navbar':
      return <NavbarComponent {...props} />;
    case 'Hero':
      return <HeroComponent {...props} />;
    case 'Features':
      return <FeaturesComponent {...props} />;
    case 'CTA':
      return <CTAComponent {...props} />;
    case 'Footer':
      return <FooterComponent {...props} />;
    case 'Testimonials':
      return <TestimonialsComponent {...props} />;
    case 'ContactForm':
      return <ContactFormComponent {...props} />;
    case 'Gallery':
      return <GalleryComponent {...props} />;
    case 'TextBlock':
      return <TextBlockComponent {...props} />;
    case 'Spacer':
      return <SpacerComponent {...props} />;
    default:
      return (
        <div className="p-4 bg-gray-100 text-gray-600">
          Unknown component: {component.type}
        </div>
      );
  }
};
