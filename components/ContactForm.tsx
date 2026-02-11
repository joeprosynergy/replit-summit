"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Send, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';

const interestOptions = [
  { value: 'storage-shed', label: 'Storage Shed' },
  { value: 'cabin', label: 'Cabin' },
  { value: 'garage', label: 'Garage' },
  { value: 'carport', label: 'Carport' },
  { value: 'greenhouse', label: 'Greenhouse' },
  { value: 'animal-shelter', label: 'Animal Shelter/Kennel' },
  { value: 'shed-move', label: 'Shed Move' },
  { value: 'other', label: 'Other' },
];

const sizeOptions = [
  { value: 'small', label: 'Small (up to 10x12)' },
  { value: 'medium', label: 'Medium (10x12 to 12x20)' },
  { value: 'large', label: "Large (anything wider than 12' or longer than 20')" },
];

const truckAccessOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'help', label: 'I need help with this' },
];

const contactMethodOptions = [
  { value: 'text', label: 'Text' },
  { value: 'call', label: 'Call' },
  { value: 'email', label: 'Email' },
];

const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/20240386/uwfjnan/';

const ContactForm = () => {
  const { toast } = useToast();
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    interest: '',
    otherInterest: '',
    size: '',
    truckAccess: '',
    contactMethod: '',
    message: '',
    // Shed move specific fields
    pickupAddress: '',
    dropoffAddress: '',
    shedSize: '',
    payerName: '',
    payerSameAsAbove: false,
    billingAddress: '',
    billingAddressOption: '', // 'pickup' | 'dropoff' | 'custom'
  });
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState(false);
  const [images, setImages] = useState<{ file: File; preview: string; base64?: string }[]>([]);

  const isShedMove = formData.interest === 'shed-move';

  const splitName = (fullName: string) => {
    const trimmed = fullName.trim();
    const parts = trimmed.split(/\s+/);
    if (parts.length === 1) {
      return { firstName: parts[0], lastName: '' };
    }
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');
    return { firstName, lastName };
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: { file: File; preview: string; base64?: string }[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        
        // Convert to base64
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });

        newImages.push({ file, preview, base64 });
      }
    }

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, silently reject
    if (honeypot) {
      toast({
        title: 'Thank you',
        description: 'We are unable to help with your request.',
      });
      return;
    }
    
    if (!consent) {
      toast({
        title: 'Please provide consent',
        description: 'You must consent to receive messages before submitting.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.name.trim()) {
      toast({
        title: 'Name is required',
        description: 'Please enter your full name.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.phone.trim()) {
      toast({
        title: 'Phone is required',
        description: 'Please enter your phone number.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.email.trim()) {
      toast({
        title: 'Email is required',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.zipCode.trim()) {
      toast({
        title: 'Zip Code is required',
        description: 'Please enter your zip code.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.interest) {
      toast({
        title: 'Please select what you are interested in',
        description: 'Select one option.',
        variant: 'destructive',
      });
      return;
    }

    // Validation for shed move
    if (isShedMove) {
      if (!formData.pickupAddress.trim()) {
        toast({
          title: 'Pickup Address is required',
          description: 'Please enter the pickup address.',
          variant: 'destructive',
        });
        return;
      }
      if (!formData.dropoffAddress.trim()) {
        toast({
          title: 'Drop Off Address is required',
          description: 'Please enter the drop off address.',
          variant: 'destructive',
        });
        return;
      }
      if (!formData.shedSize.trim()) {
        toast({
          title: 'Shed Size is required',
          description: 'Please enter the shed size.',
          variant: 'destructive',
        });
        return;
      }
      if (!formData.payerName.trim() && !formData.payerSameAsAbove) {
        toast({
          title: 'Payer Name is required',
          description: 'Please enter the name of the party responsible for payment.',
          variant: 'destructive',
        });
        return;
      }
    } else {
      if (!formData.size) {
        toast({
          title: 'Size is required',
          description: 'Please select a size.',
          variant: 'destructive',
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const { firstName, lastName } = splitName(formData.name);
      const currentPage = window.location.origin + pathname;
      
      const interestLabel = interestOptions.find(i => i.value === formData.interest)?.label || formData.interest;
      const interestDisplay = formData.interest === 'other' && formData.otherInterest
        ? `Other: ${formData.otherInterest}`
        : interestLabel;

      const sizeLabel = sizeOptions.find(s => s.value === formData.size)?.label || formData.size;
      const contactMethodLabel = contactMethodOptions.find(c => c.value === formData.contactMethod)?.label || formData.contactMethod || 'Not specified';
      const truckAccessLabel = truckAccessOptions.find(t => t.value === formData.truckAccess)?.label || 'Not specified';

      // Get billing address based on selection
      let billingAddressDisplay = formData.billingAddress;
      if (formData.billingAddressOption === 'pickup') {
        billingAddressDisplay = formData.pickupAddress;
      } else if (formData.billingAddressOption === 'dropoff') {
        billingAddressDisplay = formData.dropoffAddress;
      }

      const payerNameDisplay = formData.payerSameAsAbove ? formData.name : formData.payerName;

      let htmlContent = '';

      if (isShedMove) {
        // Shed Move HTML Content
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1a1a2e; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">🚚 Shed Move Request</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd; width: 40%;">First Name</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${firstName}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Last Name</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${lastName}</td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Phone</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${formData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Email</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${formData.email}</td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Zip Code</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${formData.zipCode}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Pickup Address</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${formData.pickupAddress}</td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Drop Off Address</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${formData.dropoffAddress}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Shed Size</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${formData.shedSize}</td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Party Responsible for Payment</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${payerNameDisplay}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Billing Address</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${billingAddressDisplay}</td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Preferred Contact Method</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${contactMethodLabel}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Message</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${formData.message || 'No message provided'}</td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Photos Attached</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${images.length} image(s)</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Page Submitted From</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${currentPage}</td>
              </tr>
            </table>
            
            <p style="margin-top: 20px; color: #666; font-size: 12px;">
              Submitted on: ${new Date().toLocaleString()}
            </p>
          </div>
        `;
      } else {
        // Standard form HTML Content
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1a1a2e; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">New Contact Form Submission</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd; width: 40%;">First Name</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${firstName}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Last Name</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${lastName}</td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Phone</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${formData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Email</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${formData.email}</td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Zip Code</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${formData.zipCode}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Interested In</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${interestDisplay}</td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Size</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${sizeLabel}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Truck & Trailer Access</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${truckAccessLabel}</td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Preferred Contact Method</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${contactMethodLabel}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Message</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${formData.message || 'No message provided'}</td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Page Submitted From</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${currentPage}</td>
              </tr>
            </table>
            
            <p style="margin-top: 20px; color: #666; font-size: 12px;">
              Submitted on: ${new Date().toLocaleString()}
            </p>
          </div>
        `;
      }

      // Build zapier data based on form type
      let zapierData: Record<string, unknown>;

      if (isShedMove) {
        zapierData = {
          first_name: firstName,
          last_name: lastName,
          full_name: formData.name,
          phone: formData.phone,
          email: formData.email,
          zip_code: formData.zipCode,
          interested_in: 'Shed Move',
          pickup_address: formData.pickupAddress,
          dropoff_address: formData.dropoffAddress,
          shed_size: formData.shedSize,
          payer_name: payerNameDisplay,
          billing_address: billingAddressDisplay,
          preferred_contact_method: contactMethodLabel,
          message: formData.message || 'No message provided',
          page_submitted_from: currentPage,
          submitted_at: new Date().toISOString(),
          html_content: htmlContent,
          images_count: images.length,
          // Send images as base64 array
          images: images.map((img, i) => ({
            filename: img.file.name,
            base64: img.base64,
            index: i + 1,
          })),
        };
      } else {
        zapierData = {
          first_name: firstName,
          last_name: lastName,
          full_name: formData.name,
          phone: formData.phone,
          email: formData.email,
          zip_code: formData.zipCode,
          interested_in: interestDisplay,
          size: sizeLabel,
          truck_trailer_access: truckAccessLabel,
          preferred_contact_method: contactMethodLabel,
          message: formData.message || 'No message provided',
          page_submitted_from: currentPage,
          submitted_at: new Date().toISOString(),
          html_content: htmlContent,
        };
      }

      await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(zapierData),
      });

      toast({
        title: 'Request Submitted!',
        description: "We'll get back to you promptly.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        zipCode: '',
        interest: '',
        otherInterest: '',
        size: '',
        truckAccess: '',
        contactMethod: '',
        message: '',
        pickupAddress: '',
        dropoffAddress: '',
        shedSize: '',
        payerName: '',
        payerSameAsAbove: false,
        billingAddress: '',
        billingAddressOption: '',
      });
      setConsent(false);
      // Clean up image previews
      images.forEach((img) => URL.revokeObjectURL(img.preview));
      setImages([]);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Submission Error',
        description: 'There was an issue submitting your request. Please try again or call us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle billing address option change
  const handleBillingOptionChange = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      billingAddressOption: option,
      billingAddress: option === 'pickup' ? prev.pickupAddress : option === 'dropoff' ? prev.dropoffAddress : prev.billingAddress,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Honeypot field - hidden from users */}
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="do_you_like_cabbage">Do you like cabbage?</label>
        <input
          type="checkbox"
          id="do_you_like_cabbage"
          name="do_you_like_cabbage"
          checked={honeypot}
          onChange={(e) => setHoneypot(e.target.checked)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Full Name <span className="text-destructive">*</span>
        </label>
        <Input
          type="text"
          name="name"
          placeholder="John Smith"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-background"
        />
      </div>

      {/* Phone, Email & Zip Code */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Phone <span className="text-destructive">*</span>
          </label>
          <Input
            type="tel"
            name="phone"
            placeholder="(555) 555-5555"
            value={formData.phone}
            onChange={handleChange}
            required
            className="bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email <span className="text-destructive">*</span>
          </label>
          <Input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Zip Code <span className="text-destructive">*</span>
          </label>
          <Input
            type="text"
            name="zipCode"
            placeholder="12345"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="bg-background"
          />
        </div>
      </div>

      {/* What are you interested in? */}
      <div className="bg-muted/50 p-5 rounded-lg border border-border">
        <h3 className="text-base font-semibold text-foreground mb-4">
          What are you interested in? <span className="text-destructive">*</span>
        </h3>
        <RadioGroup
          value={formData.interest}
          onValueChange={(value) => setFormData({ 
            ...formData, 
            interest: value, 
            otherInterest: value !== 'other' ? '' : formData.otherInterest,
            // Reset shed move fields when switching away
            ...(value !== 'shed-move' && {
              pickupAddress: '',
              dropoffAddress: '',
              shedSize: '',
              payerName: '',
              payerSameAsAbove: false,
              billingAddress: '',
              billingAddressOption: '',
            }),
          })}
          className="grid grid-cols-2 gap-3"
        >
          {interestOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`interest-${option.value}`} />
              <Label htmlFor={`interest-${option.value}`} className="text-sm cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {formData.interest === 'other' && (
          <div className="mt-4">
            <Input
              type="text"
              name="otherInterest"
              placeholder="Please describe what you're looking for..."
              value={formData.otherInterest}
              onChange={handleChange}
              className="bg-background"
            />
          </div>
        )}
      </div>

      {/* SHED MOVE SPECIFIC FIELDS */}
      {isShedMove && (
        <>
          {/* Pickup Address */}
          <div className="bg-muted/50 p-5 rounded-lg border border-border">
            <h3 className="text-base font-semibold text-foreground mb-4">
              Pickup Address <span className="text-destructive">*</span>
            </h3>
            <Input
              type="text"
              name="pickupAddress"
              placeholder="Full address where the shed is currently located"
              value={formData.pickupAddress}
              onChange={handleChange}
              required
              className="bg-background"
            />
          </div>

          {/* Drop Off Address */}
          <div className="bg-muted/50 p-5 rounded-lg border border-border">
            <h3 className="text-base font-semibold text-foreground mb-4">
              Drop Off Address <span className="text-destructive">*</span>
            </h3>
            <Input
              type="text"
              name="dropoffAddress"
              placeholder="Full address where you want the shed delivered"
              value={formData.dropoffAddress}
              onChange={handleChange}
              required
              className="bg-background"
            />
          </div>

          {/* Shed Size */}
          <div className="bg-muted/50 p-5 rounded-lg border border-border">
            <h3 className="text-base font-semibold text-foreground mb-4">
              Shed Size <span className="text-destructive">*</span>
            </h3>
            <Input
              type="text"
              name="shedSize"
              placeholder="e.g., 10x12, 12x20, etc."
              value={formData.shedSize}
              onChange={handleChange}
              required
              className="bg-background"
            />
          </div>

          {/* Payer Name */}
          <div className="bg-muted/50 p-5 rounded-lg border border-border">
            <h3 className="text-base font-semibold text-foreground mb-4">
              Name of Party Responsible for Payment <span className="text-destructive">*</span>
            </h3>
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox
                id="payerSameAsAbove"
                checked={formData.payerSameAsAbove}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    payerSameAsAbove: checked === true,
                    payerName: checked === true ? '' : formData.payerName,
                  })
                }
              />
              <Label htmlFor="payerSameAsAbove" className="text-sm cursor-pointer">
                Same as above (use my name)
              </Label>
            </div>
            {!formData.payerSameAsAbove && (
              <Input
                type="text"
                name="payerName"
                placeholder="Full name of the person responsible for payment"
                value={formData.payerName}
                onChange={handleChange}
                className="bg-background"
              />
            )}
          </div>

          {/* Billing Address */}
          <div className="bg-muted/50 p-5 rounded-lg border border-border">
            <h3 className="text-base font-semibold text-foreground mb-4">
              Billing Address
            </h3>
            <RadioGroup
              value={formData.billingAddressOption}
              onValueChange={handleBillingOptionChange}
              className="space-y-3 mb-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pickup" id="billing-pickup" />
                <Label htmlFor="billing-pickup" className="text-sm cursor-pointer">
                  Same as pickup address
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dropoff" id="billing-dropoff" />
                <Label htmlFor="billing-dropoff" className="text-sm cursor-pointer">
                  Same as drop off address
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="billing-custom" />
                <Label htmlFor="billing-custom" className="text-sm cursor-pointer">
                  Different address
                </Label>
              </div>
            </RadioGroup>
            {formData.billingAddressOption === 'custom' && (
              <Input
                type="text"
                name="billingAddress"
                placeholder="Enter billing address"
                value={formData.billingAddress}
                onChange={handleChange}
                className="bg-background"
              />
            )}
          </div>

          {/* Photo Upload */}
          <div className="bg-muted/50 p-5 rounded-lg border border-border">
            <h3 className="text-base font-semibold text-foreground mb-2">
              Photos of Your Shed
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please upload 2-3 photos of exterior and 2-3 photos of interior
            </p>
            
            <div className="space-y-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-secondary transition-colors bg-background">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, JPEG up to 10MB each</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </label>

              {images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img.preview}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* NON-SHED-MOVE SPECIFIC FIELDS */}
      {!isShedMove && (
        <>
          {/* Size */}
          <div className="bg-muted/50 p-5 rounded-lg border border-border">
            <h3 className="text-base font-semibold text-foreground mb-4">
              Size <span className="text-destructive">*</span>
            </h3>
            <RadioGroup
              value={formData.size}
              onValueChange={(value) => setFormData({ ...formData, size: value })}
              className="space-y-3"
            >
              {sizeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`size-${option.value}`} />
                  <Label htmlFor={`size-${option.value}`} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Truck Access */}
          <div className="bg-muted/50 p-5 rounded-lg border border-border">
            <h3 className="text-base font-semibold text-foreground mb-4">
              Does your site have access for a truck and trailer?
            </h3>
            <RadioGroup
              value={formData.truckAccess}
              onValueChange={(value) => setFormData({ ...formData, truckAccess: value })}
              className="flex flex-wrap gap-4"
            >
              {truckAccessOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`truck-${option.value}`} />
                  <Label htmlFor={`truck-${option.value}`} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </>
      )}

      {/* Contact Method */}
      <div className="bg-muted/50 p-5 rounded-lg border border-border">
        <h3 className="text-base font-semibold text-foreground mb-4">
          Preferred method we use to contact you
        </h3>
        <RadioGroup
          value={formData.contactMethod}
          onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}
          className="flex gap-6"
        >
          {contactMethodOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`contact-${option.value}`} />
              <Label htmlFor={`contact-${option.value}`} className="text-sm cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Additional Message
        </label>
        <Textarea
          name="message"
          placeholder="Tell us about your project, preferred size, colors, etc."
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="bg-background"
        />
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked === true)}
        />
        <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
          I consent to receive transactional messages related to my inquiry. Message & data rates may apply.
        </label>
      </div>

      <Button variant="hero" size="xl" type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Request'}
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
};

export default ContactForm;
