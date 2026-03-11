"use client";

/**
 * Compact quote form for hero sections.
 * Captures name, phone, email, zip code, and optional message.
 * Submits to the same Zapier webhook as the full ContactForm.
 */

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/20240386/uwfjnan/';

export default function QuickQuoteForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const landingUrlRef = useRef('');
  const [honeypot, setHoneypot] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    zipCode: '',
    message: '',
  });

  useEffect(() => {
    landingUrlRef.current = window.location.href;
    const params = new URLSearchParams(window.location.search);
    const utms: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].forEach((key) => {
      const val = params.get(key);
      if (val) utms[key] = val;
    });
    if (Object.keys(utms).length > 0) setUtmParams(utms);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      toast({ title: 'Request Submitted!', description: "We'll get back to you promptly." });
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.zipCode.trim()) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);

    try {
      const trimmed = formData.name.trim();
      const parts = trimmed.split(/\s+/);
      const firstName = parts[0];
      const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';
      const currentPage = landingUrlRef.current || window.location.href;
      const utmDisplay = Object.entries(utmParams).map(([k, v]) => `${k}=${v}`).join(', ');

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a2e; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">Quick Quote Request</h2>
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
              <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Message</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${formData.message || 'No message provided'}</td>
            </tr>
            <tr style="background-color: #f5f5f5;">
              <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Page Submitted From</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${currentPage}</td>
            </tr>
            ${Object.keys(utmParams).length > 0 ? `
            <tr style="background-color: #fff3cd;">
              <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Ad Source</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${utmDisplay}</td>
            </tr>` : ''}
          </table>
          <p style="margin-top: 20px; color: #666; font-size: 12px;">Submitted on: ${new Date().toLocaleString()}</p>
        </div>
      `;

      await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          full_name: formData.name,
          phone: formData.phone,
          email: formData.email,
          zip_code: formData.zipCode,
          interested_in: 'Traditional A-Frame Shed (Quick Quote)',
          message: formData.message || 'No message provided',
          page_submitted_from: currentPage,
          submitted_at: new Date().toISOString(),
          html_content: htmlContent,
          ...utmParams,
        }),
      });

      toast({ title: 'Request Submitted!', description: "We'll get back to you promptly." });
      setFormData({ name: '', phone: '', email: '', zipCode: '', message: '' });
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
        <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <Input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required className="bg-background" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input type="tel" name="phone" placeholder="Phone *" value={formData.phone} onChange={handleChange} required className="bg-background" />
        <Input type="text" name="zipCode" placeholder="Zip Code *" value={formData.zipCode} onChange={handleChange} required className="bg-background" />
      </div>

      <div>
        <Input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required className="bg-background" />
      </div>

      <div>
        <Textarea name="message" placeholder="Tell us what you're looking for (optional)" value={formData.message} onChange={handleChange} rows={2} className="bg-background resize-none" />
      </div>

      <Button variant="hero" size="lg" type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Get My Free Quote'}
        <Send className="w-4 h-4" />
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        No spam. We&apos;ll reach out with your quote — that&apos;s it.
      </p>
    </form>
  );
}
