
import React from 'react';
import { cn } from '@/lib/utils';

interface StyleOption {
  id: string;
  name: string;
  preview: string;
}

interface StyleSelectorProps {
  options: StyleOption[];
  selectedStyle: string;
  onSelect: (styleId: string) => void;
  className?: string;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({
  options,
  selectedStyle,
  onSelect,
  className,
}) => {
  return (
    <div className={cn('w-full space-y-3', className)}>
      <h3 className="text-sm font-medium text-muted-foreground">选择风格</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {options.map((style) => (
          <div
            key={style.id}
            onClick={() => onSelect(style.id)}
            className={cn(
              'relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-300',
              'border-2',
              selectedStyle === style.id ? 'border-primary' : 'border-transparent',
              'hover:shadow-lg'
            )}
          >
            <img 
              src={style.preview} 
              alt={style.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-2">
              <span className="text-white text-xs font-medium truncate">{style.name}</span>
            </div>
            {selectedStyle === style.id && (
              <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
