"use client";

import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface GhlTrackingFormHandle {
  fire: (data: {
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
    postalCode?: string;
  }) => void;
}

interface Props {
  formName: string;
}

/**
 * Hidden plain <form> paired with a hidden <iframe> so GHL's
 * external-tracking.js can capture the submit event (rule #5 requires
 * no JS-bound handlers on the form, which the React forms all have).
 *
 * Usage:
 *   const ref = useRef<GhlTrackingFormHandle>(null);
 *   <GhlTrackingForm ref={ref} formName="Summit Quick Quote" />
 *   ...
 *   ref.current?.fire({ email, phone, firstName, lastName, postalCode });
 *
 * We dispatch a cancelable submit event and preventDefault in a one-shot
 * listener — the tracking script sees the submit, the browser never does
 * a real submission (avoids Chrome's non-secure-form warning).
 */
const GhlTrackingForm = forwardRef<GhlTrackingFormHandle, Props>(function GhlTrackingForm(
  { formName },
  ref
) {
  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    fire: (data) => {
      const f = formRef.current;
      if (!f) return;
      const set = (name: string, value: string) => {
        const el = f.elements.namedItem(name) as HTMLInputElement | null;
        if (el) el.value = value;
      };
      set('first_name', data.firstName || '');
      set('last_name', data.lastName || '');
      set('email', data.email);
      set('phone', data.phone || '');
      set('postal_code', data.postalCode || '');
      const evt = new Event('submit', { bubbles: true, cancelable: true });
      f.addEventListener('submit', (e) => e.preventDefault(), { once: true });
      f.dispatchEvent(evt);
    },
  }));

  return (
    <>
      <iframe name="ghl_tracking_sink" title="ghl-tracking" style={{ display: 'none' }} />
      <form
        ref={formRef}
        action="about:blank"
        target="ghl_tracking_sink"
        method="post"
        style={{ display: 'none' }}
        aria-hidden="true"
        tabIndex={-1}
        data-form-name={formName}
      >
        <input type="text" name="first_name" defaultValue="" />
        <input type="text" name="last_name" defaultValue="" />
        <input type="email" name="email" defaultValue="" />
        <input type="tel" name="phone" defaultValue="" />
        <input type="text" name="postal_code" defaultValue="" />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
});

export default GhlTrackingForm;
