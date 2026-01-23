import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Settings, Check, X, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { authFetch } from '@/lib/authFetch';
import { useGlobalColors } from '@/hooks/useGlobalColors';
import { GlobalColorSelector } from './GlobalColorSelector';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface InlineEditableColorSwatchProps {
  globalColorId?: string; // Reference to global color
  name?: string;
  color?: string; // Hex color code
  image?: string; // Optional image URL
  onChange: (updates: { globalColorId?: string; name?: string; color?: string; image?: string }) => void;
  onDelete: () => void;
  isEditMode: boolean;
}

const InlineEditableColorSwatch = ({
  globalColorId,
  name,
  color,
  image,
  onChange,
  onDelete,
  isEditMode,
}: InlineEditableColorSwatchProps) => {
  const { getColorById } = useGlobalColors();
  const [isOpen, setIsOpen] = useState(false);
  const [useGlobal, setUseGlobal] = useState(!!globalColorId);
  const [selectedGlobalId, setSelectedGlobalId] = useState(globalColorId || '');
  const [editedName, setEditedName] = useState(name || '');
  const [editedColor, setEditedColor] = useState(color || '#808080');
  const [editedImage, setEditedImage] = useState(image || '');
  const [colorType, setColorType] = useState<'color' | 'image'>(image ? 'image' : 'color');
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Resolve display values from global color if using global
  const displayColor = globalColorId ? getColorById(globalColorId) : { name, color, image };
  const displayName = displayColor?.name || name || 'Unknown';
  const displayColorValue = displayColor?.color || color || '#808080';
  const displayImage = displayColor?.image || image;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file',
        variant: 'destructive'
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please select an image under 10MB',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);
      const base64Data = await base64Promise;

      const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '-');
      const publicId = `color-swatch-${fileNameWithoutExt}-${Date.now()}`;

      const response = await authFetch('/api/cloudinary/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: `data:${file.type};base64,${base64Data}`,
          publicId: publicId,
          folder: 'summit-buildings/colors'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      
      if (data.success && data.url) {
        setEditedImage(data.url);
        setPreviewUrl(data.url);
        toast({
          title: 'Image uploaded',
          description: 'Color image uploaded successfully'
        });
      } else {
        throw new Error(data.error || 'No URL returned');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSave = () => {
    console.log('[InlineEditableColorSwatch] handleSave called:', {
      useGlobal,
      selectedGlobalId,
      editedName,
      editedColor,
      editedImage,
      colorType
    });
    
    if (useGlobal && selectedGlobalId) {
      // Save global color reference
      onChange({
        globalColorId: selectedGlobalId,
        name: undefined,
        color: undefined,
        image: undefined
      });
    } else {
      // Save custom local color
      if (colorType === 'image' && editedImage) {
        onChange({
          globalColorId: undefined,
          name: editedName,
          color: editedColor || '#000000',
          image: editedImage
        });
      } else {
        onChange({
          globalColorId: undefined,
          name: editedName,
          color: editedColor,
          image: ''
        });
      }
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setUseGlobal(!!globalColorId);
    setSelectedGlobalId(globalColorId || '');
    setEditedName(name || '');
    setEditedColor(color || '#808080');
    setEditedImage(image || '');
    setColorType(image ? 'image' : 'color');
    setPreviewUrl(null);
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setUseGlobal(!!globalColorId);
      setSelectedGlobalId(globalColorId || '');
      setEditedName(name || '');
      setEditedColor(color || '#808080');
      setEditedImage(image || '');
      setColorType(image ? 'image' : 'color');
      setPreviewUrl(null);
    }
    setIsOpen(open);
  };

  if (!isEditMode) {
    return (
      <div className="flex flex-col items-center gap-2">
        {displayImage ? (
          <div className="w-16 h-16 rounded-full border-4 border-card shadow-md overflow-hidden">
            <img src={displayImage} alt={displayName} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div
            className="w-16 h-16 rounded-full border-4 border-card shadow-md"
            style={{ backgroundColor: displayColorValue }}
          />
        )}
        <span className="text-xs text-muted-foreground text-center leading-tight max-w-[70px]">
          {displayName}
        </span>
      </div>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div className="relative group cursor-pointer">
          <div className="flex flex-col items-center gap-2">
            {displayImage ? (
              <div className="w-16 h-16 rounded-full border-4 border-card shadow-md group-hover:border-primary transition-colors overflow-hidden">
                <img src={displayImage} alt={displayName} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div
                className="w-16 h-16 rounded-full border-4 border-card shadow-md group-hover:border-primary transition-colors"
                style={{ backgroundColor: displayColorValue }}
              />
            )}
            <span className="text-xs text-muted-foreground text-center leading-tight max-w-[70px]">
              {displayName}
              {globalColorId && <span className="text-[10px] block text-primary">Global</span>}
            </span>
          </div>
          <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <Settings className="w-3 h-3" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="start">
        <div className="space-y-4">
          <div className="space-y-3">
            <Label>Color Source</Label>
            <RadioGroup value={useGlobal ? 'global' : 'custom'} onValueChange={(value) => setUseGlobal(value === 'global')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="global" id="source-global" />
                <Label htmlFor="source-global" className="font-normal cursor-pointer">
                  Use Global Color (syncs everywhere)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="source-custom" />
                <Label htmlFor="source-custom" className="font-normal cursor-pointer">
                  Custom Color (page-specific)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {useGlobal ? (
            <div className="space-y-2">
              <Label>Select Global Color</Label>
              <GlobalColorSelector
                selectedColorId={selectedGlobalId}
                onSelectColor={setSelectedGlobalId}
              />
              {selectedGlobalId && (
                <p className="text-xs text-muted-foreground">
                  Changes to this color in the Global Palette will update here automatically
                </p>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="swatch-name">Color Name</Label>
                <Input
                  id="swatch-name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Enter color name"
                />
              </div>

              <div className="space-y-3">
                <Label>Color Type</Label>
                <RadioGroup value={colorType} onValueChange={(value: 'color' | 'image') => setColorType(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="color" id="type-color" />
                    <Label htmlFor="type-color" className="font-normal cursor-pointer">
                      Solid Color
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="image" id="type-image" />
                    <Label htmlFor="type-image" className="font-normal cursor-pointer">
                      Image/Texture
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {colorType === 'color' ? (
                <div className="space-y-2">
                  <Label htmlFor="swatch-color">Hex Color Code</Label>
                  <div className="flex gap-2">
                    <Input
                      id="swatch-color"
                      value={editedColor}
                      onChange={(e) => setEditedColor(e.target.value)}
                      placeholder="#000000"
                      maxLength={7}
                    />
                    <input
                      type="color"
                      value={editedColor}
                      onChange={(e) => setEditedColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className="w-10 h-10 rounded border-2 border-border"
                      style={{ backgroundColor: editedColor }}
                    />
                    <span className="text-xs text-muted-foreground">Color Preview</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>Upload Image</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="color-image-upload"
                  />
                  <label
                    htmlFor="color-image-upload"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground text-center">
                      {isUploading ? 'Uploading...' : 'Click to upload image'}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">Max 10MB</span>
                  </label>
                  
                  {(previewUrl || editedImage) && (
                    <div className="flex items-center gap-2 mt-2 p-2 border border-border rounded">
                      <div className="w-12 h-12 rounded border-2 border-border overflow-hidden flex-shrink-0">
                        <img
                          src={previewUrl || editedImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground truncate">
                          {previewUrl ? 'New image uploaded' : 'Current image'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          <div className="flex justify-between items-center pt-2 border-t">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isUploading}>
                <Check className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default InlineEditableColorSwatch;
