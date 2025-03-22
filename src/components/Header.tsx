import React from 'react';
import { cn } from '@/lib/utils';
interface HeaderProps {
  className?: string;
}
const Header: React.FC<HeaderProps> = ({
  className
}) => {
  return <header className={cn('w-full py-4 px-6 flex items-center justify-between glass-morphism border-b', className)}>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2.5L9.33333 6.5H13.5L10.0833 9L11.4167 13L8 10.5L4.58333 13L5.91667 9L2.5 6.5H6.66667L8 2.5Z" fill="white" />
          </svg>
        </div>
        <h1 className="text-lg font-medium">苏格</h1>
      </div>
      <div>
        
      </div>
    </header>;
};
export default Header;