import React, { useState } from 'react';
import Header from '@/components/Header';
import PromptInput from '@/components/PromptInput';
import StyleSelector from '@/components/StyleSelector';
import VideoPreview from '@/components/VideoPreview';
import FeatureSection from '@/components/FeatureSection';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

// Mock Data
const styleOptions = [{
  id: 'tech',
  name: '科技风格',
  preview: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&h=225&auto=format&fit=crop'
}, {
  id: 'elegant',
  name: '优雅简约',
  preview: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&h=225&auto=format&fit=crop'
}, {
  id: 'vibrant',
  name: '活力动感',
  preview: 'https://images.unsplash.com/photo-1550684847-75c926d3f078?q=80&w=400&h=225&auto=format&fit=crop'
}, {
  id: 'business',
  name: '商务专业',
  preview: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&h=225&auto=format&fit=crop'
}];
const features = [{
  title: '自动脚本生成',
  description: '智能分析关键信息，生成专业级视频脚本',
  icon: 'https://api.iconify.design/lucide:file-text.svg?color=%23007aff'
}, {
  title: '数字人驱动',
  description: '真人表情与口型同步，自然流畅的动作',
  icon: 'https://api.iconify.design/lucide:user.svg?color=%23007aff'
}, {
  title: '专业配乐',
  description: '自动匹配场景情感，生成符合主题的背景音乐',
  icon: 'https://api.iconify.design/lucide:music.svg?color=%23007aff'
}];
const Index = () => {
  const {
    toast
  } = useToast();
  const [selectedStyle, setSelectedStyle] = useState('tech');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const handlePromptSubmit = (prompt: string, file?: File) => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setVideoUrl(undefined);
    if (file) {
      setUploadedFile(file);
      toast({
        title: `已上传${file.type.startsWith('image/') ? '图片' : '视频'}`,
        description: `文件名: ${file.name}`
      });
    }

    // Simulate video generation with progress
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          // Mock video URL (replace with actual API response)
          setVideoUrl('https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
          toast({
            title: "视频生成完成",
            description: "您的视频已成功生成，可以下载或分享。"
          });
          return 100;
        }
        return prev + 5;
      });
    }, 500);
  };
  const handleDownload = () => {
    toast({
      title: "开始下载",
      description: "视频下载已开始，请稍候..."
    });
    // Implement actual download logic
  };
  const handleShare = () => {
    toast({
      title: "分享链接已复制",
      description: "您可以将链接粘贴给好友或社交媒体。"
    });
    // Implement actual share logic
  };
  return <div className="flex flex-col min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto py-6 px-4 space-y-8">
        <section className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">一键生成自媒体视频</h1>
            <p className="text-muted-foreground">
              上传素材或输入创意，AI将为您生成完整的数字人视频
            </p>
          </div>
          
          <PromptInput onSubmit={handlePromptSubmit} placeholder="例如：家具行业的木椅解说15秒" />
          
          <StyleSelector options={styleOptions} selectedStyle={selectedStyle} onSelect={setSelectedStyle} />
        </section>
        
        <Separator />
        
        <section>
          <VideoPreview videoUrl={videoUrl} progress={generationProgress} isGenerating={isGenerating} onDownload={handleDownload} onShare={handleShare} />
        </section>
        
        <Separator />
        
        <FeatureSection features={features} />
      </main>
      
      <footer className="py-6 px-4 text-center text-sm text-muted-foreground border-t">
        <p>© 2025 苏格是视频智能助手 - 根据提示词一键生成精美视频</p>
      </footer>
    </div>;
};
export default Index;