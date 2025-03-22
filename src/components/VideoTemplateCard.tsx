
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface VideoTemplateCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
  className?: string;
}

const VideoTemplateCard: React.FC<VideoTemplateCardProps> = ({
  title,
  description,
  icon,
  onClick,
  className,
}) => {
  return (
    <Card 
      className={cn(
        'neo-card p-5 cursor-pointer animate-scale-in',
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col space-y-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
          <img src={icon} alt={title} className="w-6 h-6" />
        </div>
        <h3 className="font-medium text-base">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
};

export default VideoTemplateCard;
