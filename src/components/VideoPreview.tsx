import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Download, Share } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
interface VideoPreviewProps {
  videoUrl?: string;
  progress?: number;
  isGenerating: boolean;
  onDownload?: () => void;
  onShare?: () => void;
  className?: string;
}
const VideoPreview: React.FC<VideoPreviewProps> = ({
  videoUrl,
  progress = 0,
  isGenerating,
  onDownload,
  onShare,
  className
}) => {
  return <div className={cn('w-full space-y-4', className)}>
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary/50">
        {isGenerating ? <div className="absolute inset-0 flex flex-col items-center justify-center p-4 space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">正在为您生成精彩视频</p>
              <p className="text-xs text-muted-foreground">预计完成时间: 30秒</p>
            </div>
            <Progress value={progress} className="w-full max-w-xs" />
            <p className="text-xs text-muted-foreground">{Math.round(progress)}%</p>
          </div> : videoUrl ? <video src={videoUrl} controls className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center">
            
          </div>}
      </div>
      
      {videoUrl && !isGenerating && <div className="flex space-x-2">
          <Button onClick={onDownload} variant="outline" className="flex-1 h-10 space-x-2">
            <Download className="h-4 w-4" />
            <span>下载</span>
          </Button>
          <Button onClick={onShare} variant="outline" className="flex-1 h-10 space-x-2">
            <Share className="h-4 w-4" />
            <span>分享</span>
          </Button>
        </div>}
    </div>;
};
export default VideoPreview;