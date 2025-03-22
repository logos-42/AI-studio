
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Upload, Image, Film } from 'lucide-react';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  className?: string;
  acceptedTypes?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelected,
  className,
  acceptedTypes = "image/*,video/*"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    onFileSelected(file);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Determine file type
    if (file.type.startsWith('image/')) {
      setFileType('image');
    } else if (file.type.startsWith('video/')) {
      setFileType('video');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedTypes}
        className="hidden"
      />
      
      {!selectedFile ? (
        <div 
          onClick={triggerFileInput}
          className="border-2 border-dashed border-primary/30 rounded-xl p-4 flex flex-col items-center justify-center gap-2 h-[120px] cursor-pointer hover:border-primary/60 transition-colors"
        >
          <Upload className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">点击上传图片或视频</p>
          <p className="text-xs text-muted-foreground">用于生成数字人内容</p>
        </div>
      ) : (
        <div 
          onClick={triggerFileInput}
          className="relative border rounded-xl overflow-hidden h-[120px] cursor-pointer group"
        >
          {fileType === 'image' && previewUrl && (
            <img 
              src={previewUrl} 
              alt="预览" 
              className="w-full h-full object-cover"
            />
          )}
          
          {fileType === 'video' && previewUrl && (
            <video 
              src={previewUrl}
              className="w-full h-full object-cover"
            />
          )}
          
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <p className="text-white text-sm">更换文件</p>
          </div>
          
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={removeFile}
          >
            <span className="sr-only">删除</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L9 9M1 9L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </Button>
          
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs py-1 px-2 rounded-full flex items-center gap-1">
            {fileType === 'image' ? (
              <>
                <Image className="h-3 w-3" />
                <span>{selectedFile.name}</span>
              </>
            ) : (
              <>
                <Film className="h-3 w-3" />
                <span>{selectedFile.name}</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
