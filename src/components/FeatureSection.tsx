
import React from 'react';
import { cn } from '@/lib/utils';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeatureSectionProps {
  features: Feature[];
  className?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  features,
  className,
}) => {
  return (
    <div className={cn('w-full', className)}>
      <h2 className="text-lg font-medium mb-3">创作特色</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="p-4 rounded-xl neo-card transition-all duration-300"
          >
            <div className="mb-3 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <img src={feature.icon} alt={feature.title} className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-base mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
