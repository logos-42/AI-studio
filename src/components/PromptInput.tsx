
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Play } from 'lucide-react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  className?: string;
  placeholder?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({
  onSubmit,
  className,
  placeholder = '描述您想要生成的视频内容...',
}) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit(prompt);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={cn('w-full space-y-4', className)}>
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={placeholder}
        className="focus-ring min-h-[100px] text-base resize-none rounded-xl"
      />
      <Button 
        onClick={handleSubmit}
        disabled={!prompt.trim() || isLoading}
        className="premium-button w-full h-12 text-base font-medium"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            生成中...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            一键生成
          </span>
        )}
      </Button>
    </div>
  );
};

export default PromptInput;
