"use client";

/**
 * PrivacyPolicyView - Pure Presentation Component
 * NO admin code - lightweight for public users
 */

import { PrivacyPolicyContent } from '@/data/defaults/privacyPolicyDefaults';

interface PrivacyPolicyViewProps {
  content: PrivacyPolicyContent;
}

export function PrivacyPolicyView({ content }: PrivacyPolicyViewProps) {
  return (
    <>
      <div className="min-h-screen">
        <main className="pt-24 pb-16">
          <div className="container-custom max-w-4xl">
            <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-2">{content.heading}</h1>
            <p className="text-muted-foreground mb-8">
              Last updated: {content.lastUpdated}
            </p>
            
            <div className="prose prose-slate max-w-none space-y-6">
              <p>{content.intro1}</p>
              <p>{content.intro2}</p>

              <h2 className="font-heading text-2xl text-foreground mt-8 mb-4">{content.interpretationSectionTitle}</h2>
              
              <h3 className="font-heading text-xl text-foreground mt-6 mb-3">{content.interpretationHeading}</h3>
              <p>{content.interpretationText}</p>

              <h3 className="font-heading text-xl text-foreground mt-6 mb-3">{content.definitionsHeading}</h3>
              <p>{content.definitionsIntro}</p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account</strong> {content.accountDef}</li>
                <li><strong>Affiliate</strong> {content.affiliateDef}</li>
                <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to {content.companyDef}.</li>
                <li><strong>Cookies</strong> {content.cookiesDef}</li>
                <li><strong>Country</strong> refers to: {content.countryDef}</li>
                <li><strong>Device</strong> {content.deviceDef}</li>
                <li><strong>Personal Data</strong> {content.personalDataDef}</li>
                <li><strong>Service</strong> {content.serviceDef}</li>
                <li><strong>Service Provider</strong> {content.serviceProviderDef}</li>
                <li><strong>Usage Data</strong> {content.usageDataDef}</li>
                <li><strong>Website</strong> refers to {content.websiteDef}, accessible from <a href={content.contactWebsiteUrl} className="text-secondary hover:underline">{content.contactWebsiteUrl?.replace('https://', 'www.') || content.contactWebsiteUrl}</a></li>
                <li><strong>You</strong> {content.youDef}</li>
              </ul>

              <h2 className="font-heading text-2xl text-foreground mt-8 mb-4">{content.collectingSectionTitle}</h2>

              <h3 className="font-heading text-xl text-foreground mt-6 mb-3">{content.collectingTypesHeading}</h3>
              
              <h3 className="font-heading text-lg text-foreground mt-4 mb-2">{content.personalDataHeading}</h3>
              <p>{content.personalDataIntro}</p>
              <ul className="list-disc pl-6 space-y-2">
                {(content.personalDataItems || []).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="font-heading text-lg text-foreground mt-6 mb-2">{content.smsHeading}</h3>
              <p>{content.smsIntro}</p>
              
              <p className="font-semibold mt-4">{content.smsCollectionHeading}</p>
              <p>{content.smsCollectionIntro}</p>
              <ul className="list-disc pl-6 space-y-2">
                {(content.smsCollectionItems || []).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="font-semibold mt-4">{content.smsNoSharingHeading}</p>
              <p>{content.smsNoSharingIntro}</p>
              <p>{content.smsNoSharingText1}</p>
              <p>{content.smsNoSharingText2}</p>

              <p className="font-semibold mt-4">{content.smsOptOutHeading}</p>
              <p>{content.smsOptOutText}</p>

              <p className="font-semibold mt-4">{content.smsDataSecurityHeading}</p>
              <p>{content.smsDataSecurityText}</p>

              <p className="font-semibold mt-4">{content.smsNoPurchaseHeading}</p>
              <p>{content.smsNoPurchaseText}</p>

              <p className="font-semibold mt-4">{content.smsFrequencyHeading}</p>
              <p>{content.smsFrequencyText}</p>

              <h3 className="font-heading text-lg text-foreground mt-6 mb-2">{content.usageDataHeading}</h3>
              <p>{content.usageDataText1}</p>
              <p>{content.usageDataText2}</p>
              <p>{content.usageDataText3}</p>

              <h3 className="font-heading text-lg text-foreground mt-6 mb-2">{content.trackingHeading}</h3>
              <p>{content.trackingIntro}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cookies or Browser Cookies.</strong> {content.cookiesBrowserDef}</li>
                <li><strong>Web Beacons.</strong> {content.webBeaconsDef}</li>
              </ul>
              <p>{content.persistentSessionText}</p>
              <p>{content.cookiesUsageIntro}</p>
              
              <div className="ml-4 space-y-4">
                <div>
                  <p className="font-semibold">{content.necessaryCookiesTitle}</p>
                  <p>{content.necessaryCookiesType}</p>
                  <p>{content.necessaryCookiesAdmin}</p>
                  <p>Purpose: {content.necessaryCookiesPurpose}</p>
                </div>
                <div>
                  <p className="font-semibold">{content.acceptanceCookiesTitle}</p>
                  <p>{content.acceptanceCookiesType}</p>
                  <p>{content.acceptanceCookiesAdmin}</p>
                  <p>Purpose: {content.acceptanceCookiesPurpose}</p>
                </div>
                <div>
                  <p className="font-semibold">{content.functionalityCookiesTitle}</p>
                  <p>{content.functionalityCookiesType}</p>
                  <p>{content.functionalityCookiesAdmin}</p>
                  <p>Purpose: {content.functionalityCookiesPurpose}</p>
                </div>
              </div>

              <p>{content.cookiesMoreInfo}</p>

              <h3 className="font-heading text-xl text-foreground mt-6 mb-3">{content.useOfDataHeading}</h3>
              <p>{content.useOfDataIntro}</p>
              <ul className="list-disc pl-6 space-y-2">
                {(content.usePurposes || []).map((purpose, index) => (
                  <li key={index}>{purpose}</li>
                ))}
              </ul>
              <p className="mt-4">{content.shareIntro}</p>
              <ul className="list-disc pl-6 space-y-2">
                {(content.sharePurposes || []).map((purpose, index) => (
                  <li key={index}>{purpose}</li>
                ))}
              </ul>

              <h3 className="font-heading text-xl text-foreground mt-6 mb-3">{content.retentionHeading}</h3>
              <p>{content.retentionText1}</p>
              <p>{content.retentionText2}</p>

              <h3 className="font-heading text-xl text-foreground mt-6 mb-3">{content.transferHeading}</h3>
              <p>{content.transferText1}</p>
              <p>{content.transferText2}</p>
              <p>{content.transferText3}</p>

              <h3 className="font-heading text-xl text-foreground mt-6 mb-3">{content.deleteHeading}</h3>
              <p>{content.deleteText1}</p>
              <p>{content.deleteText2}</p>
              <p>{content.deleteText3}</p>
              <p>{content.deleteText4}</p>

              <h3 className="font-heading text-xl text-foreground mt-6 mb-3">{content.disclosureHeading}</h3>
              
              <h3 className="font-heading text-lg text-foreground mt-4 mb-2">{content.disclosureBusinessHeading}</h3>
              <p>{content.disclosureBusinessText}</p>

              <h3 className="font-heading text-lg text-foreground mt-4 mb-2">{content.disclosureLawHeading}</h3>
              <p>{content.disclosureLawText}</p>

              <h3 className="font-heading text-lg text-foreground mt-4 mb-2">{content.disclosureOtherHeading}</h3>
              <p>{content.disclosureOtherIntro}</p>
              <ul className="list-disc pl-6 space-y-2">
                {(content.disclosureOtherItems || []).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="font-heading text-xl text-foreground mt-6 mb-3">{content.securityHeading}</h3>
              <p>{content.securityText}</p>

              <h2 className="font-heading text-2xl text-foreground mt-8 mb-4">{content.linksHeading}</h2>
              <p>{content.linksText}</p>

              <h2 className="font-heading text-2xl text-foreground mt-8 mb-4">{content.childrenHeading}</h2>
              <p>{content.childrenText}</p>

              <h2 className="font-heading text-2xl text-foreground mt-8 mb-4">{content.changesHeading}</h2>
              <p>{content.changesText1}</p>
              <p>{content.changesText2}</p>

              <h2 className="font-heading text-2xl text-foreground mt-8 mb-4">{content.contactHeading}</h2>
              <p>{content.contactText}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>By email: {content.contactEmail}</li>
                <li>By visiting this page on our website: {content.contactWebsiteUrl}</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
