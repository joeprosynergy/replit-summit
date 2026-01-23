import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface BuyersGuideFormData {
  name: string;
  phone: string;
  email: string;
  zipCode: string;
  formType: 'Buyers Guide';
}

const WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/20240386/uwfjnan/';
const STORAGE_KEY = 'buyersGuideAccess';

export function BuyersGuideLinkInterceptor({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [formData, setFormData] = useState<BuyersGuideFormData>({
    name: '',
    phone: '',
    email: '',
    zipCode: '',
    formType: 'Buyers Guide',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BuyersGuideFormData, string>>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link) {
        const href = link.getAttribute('href');
        
        // Check if this is a buyers guide link
        if (href === '/buyers-guide' || href?.includes('buyers-guide')) {
          // Check if user has access
          const hasAccess = localStorage.getItem(STORAGE_KEY) === 'true';
          
          if (!hasAccess) {
            e.preventDefault();
            e.stopPropagation();
            setPendingNavigation(href);
            setIsOpen(true);
          }
        }
      }
    };

    // Attach click listener to document
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BuyersGuideFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid zip code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateHtmlContent = (data: BuyersGuideFormData): string => {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <h2 style="color: #333; margin-bottom: 20px;">New Buyers Guide Request</h2>
        <table style="background-color: white; padding: 20px; border-radius: 8px; width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 12px; font-weight: bold; color: #555;">Name:</td>
            <td style="padding: 12px; color: #333;">${data.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 12px; font-weight: bold; color: #555;">Phone:</td>
            <td style="padding: 12px; color: #333;">${data.phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 12px; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 12px; color: #333;">${data.email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 12px; font-weight: bold; color: #555;">Zip Code:</td>
            <td style="padding: 12px; color: #333;">${data.zipCode}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; color: #555;">Form Type:</td>
            <td style="padding: 12px; color: #333;">${data.formType}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #777; font-size: 12px;">
          Submitted on ${new Date().toLocaleString()}
        </p>
      </div>
    `;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill out all required fields correctly.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Use URLSearchParams to avoid CORS issues with Zapier webhooks
      const formPayload = new URLSearchParams();
      formPayload.append('name', formData.name);
      formPayload.append('phone', formData.phone);
      formPayload.append('email', formData.email);
      formPayload.append('zipCode', formData.zipCode);
      formPayload.append('source', formData.formType);
      formPayload.append('timestamp', new Date().toISOString());
      formPayload.append('htmlContent', generateHtmlContent(formData));

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formPayload,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Store access in localStorage
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsOpen(false);

      toast({
        title: 'Success!',
        description: 'Thank you for your interest. Redirecting to Buyers Guide...',
      });

      // Navigate to the buyers guide
      if (pendingNavigation) {
        setTimeout(() => {
          navigate(pendingNavigation);
        }, 1000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Submission Error',
        description: 'Failed to submit form. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof BuyersGuideFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      {children}
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Access Buyers Guide</DialogTitle>
            <DialogDescription>
              Please fill out this form to access our comprehensive Buyers Guide.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
                className={cn(errors.name && 'border-destructive')}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
                className={cn(errors.phone && 'border-destructive')}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@example.com"
                className={cn(errors.email && 'border-destructive')}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">
                Zip Code <span className="text-destructive">*</span>
              </Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                placeholder="12345"
                maxLength={10}
                className={cn(errors.zipCode && 'border-destructive')}
              />
              {errors.zipCode && (
                <p className="text-sm text-destructive">{errors.zipCode}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Get Access'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BuyersGuideLinkInterceptor;
