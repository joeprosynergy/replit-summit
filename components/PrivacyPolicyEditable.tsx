"use client";

/**
 * PrivacyPolicyEditable - Admin Editing Component
 * Lazy-loaded ONLY for admins
 * NOTE: This is a large component due to the extensive content in PrivacyPolicy
 */

import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { InlineEditable } from '@/components/admin/InlineEditable';
import { PrivacyPolicyContent } from '@/data/defaults/privacyPolicyDefaults';

interface PrivacyPolicyEditableProps {
  initialContent: PrivacyPolicyContent;
}

export default function PrivacyPolicyEditable({ initialContent }: PrivacyPolicyEditableProps) {
  return (
    <EditablePageWrapper<PrivacyPolicyContent> slug="privacy-policy" defaultContent={initialContent}>
      {({ content, isEditMode, updateField }) => {
        // Helper to update array items
        const updateArrayItem = (arrayField: keyof PrivacyPolicyContent, index: number, value: string) => {
          const currentArray = content[arrayField] as string[];
          const newArray = [...currentArray];
          newArray[index] = value;
          updateField(arrayField, newArray);
        };

        return (
          <>
            <div className="min-h-screen">
              <main className="pt-24 pb-16">
                <div className="container-custom max-w-4xl">
                  <InlineEditable
                    value={content.heading}
                    fieldName="Page heading"
                    onChange={(v) => updateField('heading', v)}
                    isEditMode={isEditMode}
                    className="font-heading text-3xl md:text-4xl text-foreground mb-2"
                    as="h1"
                  />
                  <p className="text-muted-foreground mb-8">
                    Last updated: <InlineEditable
                      value={content.lastUpdated}
                      fieldName="Last updated"
                      onChange={(v) => updateField('lastUpdated', v)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </p>
                  
                  <div className="prose prose-slate max-w-none space-y-6">
                    <InlineEditable value={content.intro1} fieldName="Intro 1" onChange={(v) => updateField('intro1', v)} isEditMode={isEditMode} as="p" />
                    <InlineEditable value={content.intro2} fieldName="Intro 2" onChange={(v) => updateField('intro2', v)} isEditMode={isEditMode} as="p" />

                    <InlineEditable value={content.interpretationSectionTitle} fieldName="Interpretation section title" onChange={(v) => updateField('interpretationSectionTitle', v)} isEditMode={isEditMode} className="font-heading text-2xl text-foreground mt-8 mb-4" as="h2" />
                    
                    <InlineEditable value={content.interpretationHeading} fieldName="Interpretation heading" onChange={(v) => updateField('interpretationHeading', v)} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
                    <InlineEditable value={content.interpretationText} fieldName="Interpretation text" onChange={(v) => updateField('interpretationText', v)} isEditMode={isEditMode} as="p" />

                    <InlineEditable value={content.definitionsHeading} fieldName="Definitions heading" onChange={(v) => updateField('definitionsHeading', v)} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
                    <InlineEditable value={content.definitionsIntro} fieldName="Definitions intro" onChange={(v) => updateField('definitionsIntro', v)} isEditMode={isEditMode} as="p" />
                    
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Account</strong> <InlineEditable value={content.accountDef} fieldName="Account def" onChange={(v) => updateField('accountDef', v)} isEditMode={isEditMode} as="span" /></li>
                      <li><strong>Affiliate</strong> <InlineEditable value={content.affiliateDef} fieldName="Affiliate def" onChange={(v) => updateField('affiliateDef', v)} isEditMode={isEditMode} as="span" /></li>
                      <li><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to <InlineEditable value={content.companyDef} fieldName="Company def" onChange={(v) => updateField('companyDef', v)} isEditMode={isEditMode} as="span" />.</li>
                      <li><strong>Cookies</strong> <InlineEditable value={content.cookiesDef} fieldName="Cookies def" onChange={(v) => updateField('cookiesDef', v)} isEditMode={isEditMode} as="span" /></li>
                      <li><strong>Country</strong> refers to: <InlineEditable value={content.countryDef} fieldName="Country def" onChange={(v) => updateField('countryDef', v)} isEditMode={isEditMode} as="span" /></li>
                      <li><strong>Device</strong> <InlineEditable value={content.deviceDef} fieldName="Device def" onChange={(v) => updateField('deviceDef', v)} isEditMode={isEditMode} as="span" /></li>
                      <li><strong>Personal Data</strong> <InlineEditable value={content.personalDataDef} fieldName="Personal Data def" onChange={(v) => updateField('personalDataDef', v)} isEditMode={isEditMode} as="span" /></li>
                      <li><strong>Service</strong> <InlineEditable value={content.serviceDef} fieldName="Service def" onChange={(v) => updateField('serviceDef', v)} isEditMode={isEditMode} as="span" /></li>
                      <li><strong>Service Provider</strong> <InlineEditable value={content.serviceProviderDef} fieldName="Service Provider def" onChange={(v) => updateField('serviceProviderDef', v)} isEditMode={isEditMode} as="span" /></li>
                      <li><strong>Usage Data</strong> <InlineEditable value={content.usageDataDef} fieldName="Usage Data def" onChange={(v) => updateField('usageDataDef', v)} isEditMode={isEditMode} as="span" /></li>
                      <li><strong>Website</strong> refers to <InlineEditable value={content.websiteDef} fieldName="Website def" onChange={(v) => updateField('websiteDef', v)} isEditMode={isEditMode} as="span" />, accessible from <a href={content.contactWebsiteUrl} className="text-secondary hover:underline">{content.contactWebsiteUrl.replace('https://', 'www.')}</a></li>
                      <li><strong>You</strong> <InlineEditable value={content.youDef} fieldName="You def" onChange={(v) => updateField('youDef', v)} isEditMode={isEditMode} as="span" /></li>
                    </ul>

                    <InlineEditable value={content.collectingSectionTitle} fieldName="Collecting section title" onChange={(v) => updateField('collectingSectionTitle', v)} isEditMode={isEditMode} className="font-heading text-2xl text-foreground mt-8 mb-4" as="h2" />

                    <InlineEditable value={content.collectingTypesHeading} fieldName="Types heading" onChange={(v) => updateField('collectingTypesHeading', v)} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
                    
                    <InlineEditable value={content.personalDataHeading} fieldName="Personal data heading" onChange={(v) => updateField('personalDataHeading', v)} isEditMode={isEditMode} className="font-heading text-lg text-foreground mt-4 mb-2" as="h3" />
                    <InlineEditable value={content.personalDataIntro} fieldName="Personal data intro" onChange={(v) => updateField('personalDataIntro', v)} isEditMode={isEditMode} as="p" />
                    <ul className="list-disc pl-6 space-y-2">
                      {(content.personalDataItems || []).map((item, index) => (
                        <li key={index}>
                          <InlineEditable
                            value={item}
                            fieldName={`Personal data item ${index + 1}`}
                            onChange={(v) => updateArrayItem('personalDataItems', index, v)}
                            isEditMode={isEditMode}
                            as="span"
                          />
                        </li>
                      ))}
                    </ul>

                    <InlineEditable value={content.smsHeading} fieldName="SMS heading" onChange={(v) => updateField('smsHeading', v)} isEditMode={isEditMode} className="font-heading text-lg text-foreground mt-6 mb-2" as="h3" />
                    <InlineEditable value={content.smsIntro} fieldName="SMS intro" onChange={(v) => updateField('smsIntro', v)} isEditMode={isEditMode} as="p" />
                    
                    <p className="font-semibold mt-4"><InlineEditable value={content.smsCollectionHeading} fieldName="SMS collection heading" onChange={(v) => updateField('smsCollectionHeading', v)} isEditMode={isEditMode} as="span" /></p>
                    <InlineEditable value={content.smsCollectionIntro} fieldName="SMS collection intro" onChange={(v) => updateField('smsCollectionIntro', v)} isEditMode={isEditMode} as="p" />
                    <ul className="list-disc pl-6 space-y-2">
                      {(content.smsCollectionItems || []).map((item, index) => (
                        <li key={index}>
                          <InlineEditable
                            value={item}
                            fieldName={`SMS collection item ${index + 1}`}
                            onChange={(v) => updateArrayItem('smsCollectionItems', index, v)}
                            isEditMode={isEditMode}
                            as="span"
                          />
                        </li>
                      ))}
                    </ul>

                    <p className="font-semibold mt-4"><InlineEditable value={content.smsNoSharingHeading} fieldName="No sharing heading" onChange={(v) => updateField('smsNoSharingHeading', v)} isEditMode={isEditMode} as="span" /></p>
                    <InlineEditable value={content.smsNoSharingIntro} fieldName="No sharing intro" onChange={(v) => updateField('smsNoSharingIntro', v)} isEditMode={isEditMode} as="p" />
                    <InlineEditable value={content.smsNoSharingText1} fieldName="No sharing text 1" onChange={(v) => updateField('smsNoSharingText1', v)} isEditMode={isEditMode} as="p" />
                    <InlineEditable value={content.smsNoSharingText2} fieldName="No sharing text 2" onChange={(v) => updateField('smsNoSharingText2', v)} isEditMode={isEditMode} as="p" />

                    <p className="font-semibold mt-4"><InlineEditable value={content.smsOptOutHeading} fieldName="Opt out heading" onChange={(v) => updateField('smsOptOutHeading', v)} isEditMode={isEditMode} as="span" /></p>
                    <InlineEditable value={content.smsOptOutText} fieldName="Opt out text" onChange={(v) => updateField('smsOptOutText', v)} isEditMode={isEditMode} as="p" />

                    <p className="font-semibold mt-4"><InlineEditable value={content.smsDataSecurityHeading} fieldName="Data security heading" onChange={(v) => updateField('smsDataSecurityHeading', v)} isEditMode={isEditMode} as="span" /></p>
                    <InlineEditable value={content.smsDataSecurityText} fieldName="Data security text" onChange={(v) => updateField('smsDataSecurityText', v)} isEditMode={isEditMode} as="p" />

                    <p className="font-semibold mt-4"><InlineEditable value={content.smsNoPurchaseHeading} fieldName="No purchase heading" onChange={(v) => updateField('smsNoPurchaseHeading', v)} isEditMode={isEditMode} as="span" /></p>
                    <InlineEditable value={content.smsNoPurchaseText} fieldName="No purchase text" onChange={(v) => updateField('smsNoPurchaseText', v)} isEditMode={isEditMode} as="p" />

                    <p className="font-semibold mt-4"><InlineEditable value={content.smsFrequencyHeading} fieldName="Frequency heading" onChange={(v) => updateField('smsFrequencyHeading', v)} isEditMode={isEditMode} as="span" /></p>
                    <InlineEditable value={content.smsFrequencyText} fieldName="Frequency text" onChange={(v) => updateField('smsFrequencyText', v)} isEditMode={isEditMode} as="p" />

                    <InlineEditable value={content.usageDataHeading} fieldName="Usage data heading" onChange={(v) => updateField('usageDataHeading', v)} isEditMode={isEditMode} className="font-heading text-lg text-foreground mt-6 mb-2" as="h3" />
                    <InlineEditable value={content.usageDataText1} fieldName="Usage data text 1" onChange={(v) => updateField('usageDataText1', v)} isEditMode={isEditMode} as="p" />
                    <InlineEditable value={content.usageDataText2} fieldName="Usage data text 2" onChange={(v) => updateField('usageDataText2', v)} isEditMode={isEditMode} as="p" />
                    <InlineEditable value={content.usageDataText3} fieldName="Usage data text 3" onChange={(v) => updateField('usageDataText3', v)} isEditMode={isEditMode} as="p" />

                    <InlineEditable value={content.trackingHeading} fieldName="Tracking heading" onChange={(v) => updateField('trackingHeading', v)} isEditMode={isEditMode} className="font-heading text-lg text-foreground mt-6 mb-2" as="h3" />
                    <InlineEditable value={content.trackingIntro} fieldName="Tracking intro" onChange={(v) => updateField('trackingIntro', v)} isEditMode={isEditMode} as="p" />
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Cookies or Browser Cookies.</strong> <InlineEditable value={content.cookiesBrowserDef} fieldName="Cookies browser def" onChange={(v) => updateField('cookiesBrowserDef', v)} isEditMode={isEditMode} as="span" /></li>
                      <li><strong>Web Beacons.</strong> <InlineEditable value={content.webBeaconsDef} fieldName="Web beacons def" onChange={(v) => updateField('webBeaconsDef', v)} isEditMode={isEditMode} as="span" /></li>
                    </ul>
                    <InlineEditable value={content.persistentSessionText} fieldName="Persistent session text" onChange={(v) => updateField('persistentSessionText', v)} isEditMode={isEditMode} as="p" />
                    <InlineEditable value={content.cookiesUsageIntro} fieldName="Cookies usage intro" onChange={(v) => updateField('cookiesUsageIntro', v)} isEditMode={isEditMode} as="p" />
                    
                    <div className="ml-4 space-y-4">
                      <div>
                        <p className="font-semibold"><InlineEditable value={content.necessaryCookiesTitle} fieldName="Necessary cookies title" onChange={(v) => updateField('necessaryCookiesTitle', v)} isEditMode={isEditMode} as="span" /></p>
                        <InlineEditable value={content.necessaryCookiesType} fieldName="Necessary cookies type" onChange={(v) => updateField('necessaryCookiesType', v)} isEditMode={isEditMode} as="p" />
                        <InlineEditable value={content.necessaryCookiesAdmin} fieldName="Necessary cookies admin" onChange={(v) => updateField('necessaryCookiesAdmin', v)} isEditMode={isEditMode} as="p" />
                        <p>Purpose: <InlineEditable value={content.necessaryCookiesPurpose} fieldName="Necessary cookies purpose" onChange={(v) => updateField('necessaryCookiesPurpose', v)} isEditMode={isEditMode} as="span" /></p>
                      </div>
                      <div>
                        <p className="font-semibold"><InlineEditable value={content.acceptanceCookiesTitle} fieldName="Acceptance cookies title" onChange={(v) => updateField('acceptanceCookiesTitle', v)} isEditMode={isEditMode} as="span" /></p>
                        <InlineEditable value={content.acceptanceCookiesType} fieldName="Acceptance cookies type" onChange={(v) => updateField('acceptanceCookiesType', v)} isEditMode={isEditMode} as="p" />
                        <InlineEditable value={content.acceptanceCookiesAdmin} fieldName="Acceptance cookies admin" onChange={(v) => updateField('acceptanceCookiesAdmin', v)} isEditMode={isEditMode} as="p" />
                        <p>Purpose: <InlineEditable value={content.acceptanceCookiesPurpose} fieldName="Acceptance cookies purpose" onChange={(v) => updateField('acceptanceCookiesPurpose', v)} isEditMode={isEditMode} as="span" /></p>
                      </div>
                      <div>
                        <p className="font-semibold"><InlineEditable value={content.functionalityCookiesTitle} fieldName="Functionality cookies title" onChange={(v) => updateField('functionalityCookiesTitle', v)} isEditMode={isEditMode} as="span" /></p>
                        <InlineEditable value={content.functionalityCookiesType} fieldName="Functionality cookies type" onChange={(v) => updateField('functionalityCookiesType', v)} isEditMode={isEditMode} as="p" />
                        <InlineEditable value={content.functionalityCookiesAdmin} fieldName="Functionality cookies admin" onChange={(v) => updateField('functionalityCookiesAdmin', v)} isEditMode={isEditMode} as="p" />
                        <p>Purpose: <InlineEditable value={content.functionalityCookiesPurpose} fieldName="Functionality cookies purpose" onChange={(v) => updateField('functionalityCookiesPurpose', v)} isEditMode={isEditMode} as="span" /></p>
                      </div>
                    </div>

                    <InlineEditable value={content.cookiesMoreInfo} fieldName="Cookies more info" onChange={(v) => updateField('cookiesMoreInfo', v)} isEditMode={isEditMode} as="p" />

                    <InlineEditable value={content.useOfDataHeading} fieldName="Use of data heading" onChange={(v) => updateField('useOfDataHeading', v)} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
                    <InlineEditable value={content.useOfDataIntro} fieldName="Use of data intro" onChange={(v) => updateField('useOfDataIntro', v)} isEditMode={isEditMode} as="p" />
                    <ul className="list-disc pl-6 space-y-2">
                      {(content.usePurposes || []).map((purpose, index) => (
                        <li key={index}>
                          <InlineEditable
                            value={purpose}
                            fieldName={`Use purpose ${index + 1}`}
                            onChange={(v) => updateArrayItem('usePurposes', index, v)}
                            isEditMode={isEditMode}
                            as="span"
                          />
                        </li>
                      ))}
                    </ul>
                    <InlineEditable value={content.shareIntro} fieldName="Share intro" onChange={(v) => updateField('shareIntro', v)} isEditMode={isEditMode} className="mt-4" as="p" />
                    <ul className="list-disc pl-6 space-y-2">
                      {(content.sharePurposes || []).map((purpose, index) => (
                        <li key={index}>
                          <InlineEditable
                            value={purpose}
                            fieldName={`Share purpose ${index + 1}`}
                            onChange={(v) => updateArrayItem('sharePurposes', index, v)}
                            isEditMode={isEditMode}
                            as="span"
                          />
                        </li>
                      ))}
                    </ul>

                    <InlineEditable value={content.retentionHeading} fieldName="Retention heading" onChange={(v) => updateField('retentionHeading', v)} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
                    <InlineEditable value={content.retentionText1} fieldName="Retention text 1" onChange={(v) => updateField('retentionText1', v)} isEditMode={isEditMode} as="p" />
                    <InlineEditable value={content.retentionText2} fieldName="Retention text 2" onChange={(v) => updateField('retentionText2', v)} isEditMode={isEditMode} as="p" />

                    <InlineEditable value={content.transferHeading} fieldName="Transfer heading" onChange={(v) => updateField('transferHeading', v)} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
                    <InlineEditable value={content.transferText1} fieldName="Transfer text 1" onChange={(v) => updateField('transferText1', v)} isEditMode={isEditMode} as="p" />
                    <InlineEditable value={content.transferText2} fieldName="Transfer text 2" onChange={(v) => updateField('transferText2', v)} isEditMode={isEditMode} as="p" />
                    <InlineEditable value={content.transferText3} fieldName="Transfer text 3" onChange={(v) => updateField('transferText3', v)} isEditMode={isEditMode} as="p" />

                    <InlineEditable value={content.deleteHeading} fieldName="Delete heading" onChange={(v) => updateField('deleteHeading', v)} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
                    <InlineEditable value={content.deleteText1} fieldName="Delete text 1" onChange={(v) => updateField('deleteText1', v)} isEditMode={isEditMode} as="p" />
                    <InlineEditable value={content.deleteText2} fieldName="Delete text 2" onChange={(v) => updateField('deleteText2', v)} isEditMode={isEditMode} as="p" />
                    <InlineEditable value={content.deleteText3} fieldName="Delete text 3" onChange={(v) => updateField('deleteText3', v)} isEditMode={isEditMode} as="p" />
                    <InlineEditable value={content.deleteText4} fieldName="Delete text 4" onChange={(v) => updateField('deleteText4', v)} isEditMode={isEditMode} as="p" />

                    <InlineEditable value={content.disclosureHeading} fieldName="Disclosure heading" onChange={(v) => updateField('disclosureHeading', v)} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
                    
                    <InlineEditable value={content.disclosureBusinessHeading} fieldName="Business heading" onChange={(v) => updateField('disclosureBusinessHeading', v)} isEditMode={isEditMode} className="font-heading text-lg text-foreground mt-4 mb-2" as="h3" />
                    <InlineEditable value={content.disclosureBusinessText} fieldName="Business text" onChange={(v) => updateField('disclosureBusinessText', v)} isEditMode={isEditMode} as="p" />

                    <InlineEditable value={content.disclosureLawHeading} fieldName="Law heading" onChange={(v) => updateField('disclosureLawHeading', v)} isEditMode={isEditMode} className="font-heading text-lg text-foreground mt-4 mb-2" as="h3" />
                    <InlineEditable value={content.disclosureLawText} fieldName="Law text" onChange={(v) => updateField('disclosureLawText', v)} isEditMode={isEditMode} as="p" />

                    <InlineEditable value={content.disclosureOtherHeading} fieldName="Other heading" onChange={(v) => updateField('disclosureOtherHeading', v)} isEditMode={isEditMode} className="font-heading text-lg text-foreground mt-4 mb-2" as="h3" />
                    <InlineEditable value={content.disclosureOtherIntro} fieldName="Other intro" onChange={(v) => updateField('disclosureOtherIntro', v)} isEditMode={isEditMode} as="p" />
                    <ul className="list-disc pl-6 space-y-2">
                      {(content.disclosureOtherItems || []).map((item, index) => (
                        <li key={index}>
                          <InlineEditable
                            value={item}
                            fieldName={`Other item ${index + 1}`}
                            onChange={(v) => updateArrayItem('disclosureOtherItems', index, v)}
                            isEditMode={isEditMode}
                            as="span"
                          />
                        </li>
                      ))}
                    </ul>

                    <InlineEditable value={content.securityHeading} fieldName="Security heading" onChange={(v) => updateField('securityHeading', v)} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
                    <InlineEditable value={content.securityText} fieldName="Security text" onChange={(v) => updateField('securityText', v)} isEditMode={isEditMode} as="p" />

                    <InlineEditable value={content.linksHeading} fieldName="Links heading" onChange={(v) => updateField('linksHeading', v)} isEditMode={isEditMode} className="font-heading text-2xl text-foreground mt-8 mb-4" as="h2" />
                    <InlineEditable value={content.linksText} fieldName="Links text" onChange={(v) => updateField('linksText', v)} isEditMode={isEditMode} as="p" />

                    <InlineEditable value={content.childrenHeading} fieldName="Children heading" onChange={(v) => updateField('childrenHeading', v)} isEditMode={isEditMode} className="font-heading text-2xl text-foreground mt-8 mb-4" as="h2" />
                    <InlineEditable value={content.childrenText} fieldName="Children text" onChange={(v) => updateField('childrenText', v)} isEditMode={isEditMode} as="p" />

                    <InlineEditable value={content.changesHeading} fieldName="Changes heading" onChange={(v) => updateField('changesHeading', v)} isEditMode={isEditMode} className="font-heading text-2xl text-foreground mt-8 mb-4" as="h2" />
                    <InlineEditable value={content.changesText1} fieldName="Changes text 1" onChange={(v) => updateField('changesText1', v)} isEditMode={isEditMode} as="p" />
                    <InlineEditable value={content.changesText2} fieldName="Changes text 2" onChange={(v) => updateField('changesText2', v)} isEditMode={isEditMode} as="p" />

                    <InlineEditable value={content.contactHeading} fieldName="Contact heading" onChange={(v) => updateField('contactHeading', v)} isEditMode={isEditMode} className="font-heading text-2xl text-foreground mt-8 mb-4" as="h2" />
                    <InlineEditable value={content.contactText} fieldName="Contact text" onChange={(v) => updateField('contactText', v)} isEditMode={isEditMode} as="p" />
                    <ul className="list-disc pl-6 space-y-2">
                      <li>By email: <InlineEditable value={content.contactEmail} fieldName="Contact email" onChange={(v) => updateField('contactEmail', v)} isEditMode={isEditMode} as="span" /></li>
                      <li>By visiting this page on our website: <InlineEditable value={content.contactWebsiteUrl} fieldName="Contact website" onChange={(v) => updateField('contactWebsiteUrl', v)} isEditMode={isEditMode} as="span" /></li>
                    </ul>
                  </div>
                </div>
              </main>
            </div>
          </>
        );
      }}
    </EditablePageWrapper>
  );
}
