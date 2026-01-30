import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Loader2, Upload, ImagePlus, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CLOUDINARY_FOLDER = 'summit-buildings';
// Use environment variable for Supabase URL, fallback for backwards compatibility
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://lmpdjitplofcysyfgcjl.supabase.co';
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/upload-to-cloudinary`;

interface UploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}

const AdminCloudinaryUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [filePublicId, setFilePublicId] = useState('');
  
  // URL upload state
  const [imageUrl, setImageUrl] = useState('');
  const [urlPublicId, setUrlPublicId] = useState('');

  // Handle file selection
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }
    
    setSelectedFile(file);
    setUploadResult(null);
    
    // Generate preview
    const reader = new FileReader();
    reader.onload = () => setFilePreview(reader.result as string);
    reader.readAsDataURL(file);
    
    // Auto-generate public ID from filename
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
    const sanitized = nameWithoutExt.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    setFilePublicId(sanitized);
  }, []);

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Upload via edge function (server-side)
  const uploadToCloudinary = async (data: { 
    imageBase64?: string; 
    imageUrl?: string; 
    publicId: string 
  }): Promise<UploadResult> => {
    try {
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          folder: CLOUDINARY_FOLDER
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { success: false, error: errorText || `HTTP ${response.status}` };
      }

      const result = await response.json();

      if (!result.success) {
        return { success: false, error: result.error || 'Upload failed' };
      }

      return { 
        success: true, 
        url: result.url, 
        publicId: result.publicId 
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return { success: false, error: message };
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile || !filePublicId.trim()) {
      toast.error('Please select a file and enter a public ID');
      return;
    }

    setIsUploading(true);
    setUploadResult(null);

    try {
      const base64 = await fileToBase64(selectedFile);
      const result = await uploadToCloudinary({
        imageBase64: base64,
        publicId: filePublicId.trim()
      });

      setUploadResult(result);
      
      if (result.success) {
        toast.success('Image uploaded successfully!');
      } else {
        toast.error(result.error || 'Upload failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setUploadResult({ success: false, error: message });
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle URL upload
  const handleUrlUpload = async () => {
    if (!imageUrl.trim() || !urlPublicId.trim()) {
      toast.error('Please enter both URL and public ID');
      return;
    }

    // Basic URL validation
    try {
      new URL(imageUrl);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsUploading(true);
    setUploadResult(null);

    try {
      const result = await uploadToCloudinary({
        imageUrl: imageUrl.trim(),
        publicId: urlPublicId.trim()
      });

      setUploadResult(result);
      
      if (result.success) {
        toast.success('Image uploaded successfully!');
      } else {
        toast.error(result.error || 'Upload failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setUploadResult({ success: false, error: message });
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  // Copy URL to clipboard
  const copyUrl = () => {
    if (uploadResult?.url) {
      navigator.clipboard.writeText(uploadResult.url);
      toast.success('URL copied to clipboard!');
    }
  };

  // Reset form
  const resetForm = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setFilePublicId('');
    setImageUrl('');
    setUrlPublicId('');
    setUploadResult(null);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Cloudinary Upload</h1>
        <p className="text-muted-foreground mb-8">
          Upload images to Cloudinary CDN. All uploads are processed securely server-side.
        </p>

        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="file" className="flex items-center gap-2">
              <ImagePlus className="w-4 h-4" />
              Upload File
            </TabsTrigger>
            <TabsTrigger value="url" className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              Upload from URL
            </TabsTrigger>
          </TabsList>

          {/* File Upload Tab */}
          <TabsContent value="file" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-input">Select Image</Label>
                <Input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="mt-1"
                  disabled={isUploading}
                />
              </div>

              {filePreview && (
                <div className="rounded-lg overflow-hidden border bg-muted">
                  <img 
                    src={filePreview} 
                    alt="Preview" 
                    className="max-h-64 mx-auto object-contain"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="file-public-id">Public ID</Label>
                <Input
                  id="file-public-id"
                  type="text"
                  value={filePublicId}
                  onChange={(e) => setFilePublicId(e.target.value)}
                  placeholder="e.g., hero-image"
                  className="mt-1"
                  disabled={isUploading}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Unique identifier for this image (letters, numbers, hyphens only)
                </p>
              </div>

              <Button 
                onClick={handleFileUpload} 
                disabled={isUploading || !selectedFile || !filePublicId.trim()}
                className="w-full"
                size="lg"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Upload to Cloudinary
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* URL Upload Tab */}
          <TabsContent value="url" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1"
                  disabled={isUploading}
                />
              </div>

              <div>
                <Label htmlFor="url-public-id">Public ID</Label>
                <Input
                  id="url-public-id"
                  type="text"
                  value={urlPublicId}
                  onChange={(e) => setUrlPublicId(e.target.value)}
                  placeholder="e.g., hero-image"
                  className="mt-1"
                  disabled={isUploading}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Unique identifier for this image (letters, numbers, hyphens only)
                </p>
              </div>

              <Button 
                onClick={handleUrlUpload} 
                disabled={isUploading || !imageUrl.trim() || !urlPublicId.trim()}
                className="w-full"
                size="lg"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Upload to Cloudinary
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Upload Result */}
        {uploadResult && (
          <div className={`mt-8 p-6 rounded-lg border ${
            uploadResult.success 
              ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' 
              : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
          }`}>
            <div className="flex items-start gap-3">
              {uploadResult.success ? (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              )}
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-1">
                  {uploadResult.success ? 'Upload Successful!' : 'Upload Failed'}
                </h3>
                
                {uploadResult.success ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground break-all">
                      <strong>Public ID:</strong> {uploadResult.publicId}
                    </p>
                    <p className="text-sm text-muted-foreground break-all">
                      <strong>URL:</strong> {uploadResult.url}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" onClick={copyUrl}>
                        Copy URL
                      </Button>
                      <Button size="sm" variant="outline" onClick={resetForm}>
                        Upload Another
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-red-600">
                    {uploadResult.error}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">🔒 Security Information</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• All uploads are processed through a secure server-side API</li>
            <li>• Cloudinary credentials are never exposed to the browser</li>
            <li>• Images are stored in the <code className="bg-background px-1 rounded">{CLOUDINARY_FOLDER}</code> folder</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminCloudinaryUpload;
