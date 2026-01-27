import { useState, useRef } from 'react';
import { cn, normalizeImageUrl } from '@/lib/utils';
import { Camera, Upload, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { authFetch } from '@/lib/authFetch';

interface InlineEditableImageProps {
  src: string;
  alt: string;
  onImageChange: (newUrl: string) => void;
  isEditMode: boolean;
  className?: string;
  imageClassName?: string;
}

const InlineEditableImage = ({
  src,
  alt,
  onImageChange,
  isEditMode,
  className,
  imageClassName
}: InlineEditableImageProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InlineEditableImage.tsx:37',message:'handleFileSelect called',data:{hasFiles:!!e.target.files,fileCount:e.target.files?.length||0},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A3'})}).catch(()=>{});
    // #endregion
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file',
        variant: 'destructive'
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please select an image under 10MB',
        variant: 'destructive'
      });
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InlineEditableImage.tsx:65',message:'handleUpload entry',data:{hasFile:!!selectedFile,fileName:selectedFile?.name},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A4'})}).catch(()=>{});
    // #endregion
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          // Remove data URL prefix to get just the base64
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
      });
      reader.readAsDataURL(selectedFile);
      const base64Data = await base64Promise;

      // Generate a unique public ID based on filename and timestamp
      const fileNameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '-');
      const publicId = `${fileNameWithoutExt}-${Date.now()}`;

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InlineEditableImage.tsx:90',message:'before authFetch call',data:{publicId:publicId,url:'/api/cloudinary/upload'},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A1'})}).catch(()=>{});
      // #endregion
      // Upload to Cloudinary via Express API endpoint (requires auth)
      const response = await authFetch('/api/cloudinary/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: `data:${selectedFile.type};base64,${base64Data}`,
          publicId: publicId,
          folder: 'summit-buildings'
        })
      });

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InlineEditableImage.tsx:103',message:'authFetch response',data:{ok:response.ok,status:response.status},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A2,A5'})}).catch(()=>{});
      // #endregion
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InlineEditableImage.tsx:108',message:'upload failed',data:{error:errorData.error||'Upload failed',status:response.status},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A2,A5'})}).catch(()=>{});
        // #endregion
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InlineEditableImage.tsx:115',message:'upload response data',data:{success:data.success,hasUrl:!!data.url},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A2'})}).catch(()=>{});
      // #endregion
      
      if (data.success && data.url) {
        onImageChange(data.url);
        toast({
          title: 'Image uploaded',
          description: 'Your image has been uploaded successfully'
        });
        handleClose();
      } else {
        throw new Error(data.error || 'No URL returned');
      }
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InlineEditableImage.tsx:128',message:'upload catch error',data:{errorMsg:error instanceof Error?error.message:'unknown',errorType:error?.constructor?.name},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A1,A2'})}).catch(()=>{});
      // #endregion
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Failed to upload image. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const normalizedSrc = normalizeImageUrl(src);

  // CRITICAL: Always render the same component structure to prevent React remounting
  // The edit UI is layered on top, not conditionally swapping parent elements
  return (
    <>
      <div 
        className={cn('relative', isEditMode && 'group cursor-pointer', className)}
        onClick={isEditMode ? () => {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/f4257b34-1dc4-4061-84a5-733cc267b72d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InlineEditableImage.tsx:157',message:'image clicked - opening dialog',data:{isEditMode:isEditMode},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A4'})}).catch(()=>{});
          // #endregion
          setIsDialogOpen(true);
        } : undefined}
      >
        <img src={normalizedSrc} alt={alt} className={imageClassName} />
        {/* Edit mode overlay - visibility controlled, not conditionally rendered */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity flex items-center justify-center",
            isEditMode ? "opacity-0 group-hover:opacity-100" : "opacity-0 pointer-events-none"
          )}
          aria-hidden={!isEditMode}
        >
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2">
            <Camera className="w-5 h-5" />
            <span className="font-medium">Change Image</span>
          </div>
        </div>
        {/* Edit mode badge - visibility controlled */}
        <div 
          className={cn(
            "absolute top-2 right-2 bg-primary text-primary-foreground p-1 rounded-full transition-opacity",
            isEditMode ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          aria-hidden={!isEditMode}
        >
          <Camera className="w-4 h-4" />
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Change Image</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Current Image Preview */}
            <div className="text-sm text-muted-foreground">Current image:</div>
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              <img 
                src={previewUrl || normalizedSrc} 
                alt={alt} 
                className="w-full h-full object-cover"
              />
              {previewUrl && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  New Preview
                </div>
              )}
            </div>

            {/* Upload Area */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer flex flex-col items-center gap-2"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Upload className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Drop an image here or click to browse
              </span>
              <span className="text-xs text-muted-foreground">
                Max size: 10MB
              </span>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={handleUpload} 
                disabled={!selectedFile || isUploading}
              >
                {isUploading ? (
                  <>Uploading...</>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Save Image
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InlineEditableImage;
