import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useEditablePageContent, PageContent } from '@/hooks/useEditablePageContent';
import { useSectionContent } from '@/hooks/useSectionContent';
import { InlineEditable } from '@/components/admin/InlineEditable';
import { AdminEditMode } from '@/components/admin/AdminEditMode';
import { usePageManagement } from '@/hooks/usePageManagement';

interface IntroContent {
  lastUpdated: string;
  intro1: string;
  intro2: string;
}

interface InterpretationContent {
  sectionTitle: string;
  interpretationHeading: string;
  interpretationText: string;
  definitionsHeading: string;
  definitionsIntro: string;
  accountDef: string;
  affiliateDef: string;
  companyDef: string;
  cookiesDef: string;
  countryDef: string;
  deviceDef: string;
  personalDataDef: string;
  serviceDef: string;
  serviceProviderDef: string;
  usageDataDef: string;
  websiteDef: string;
  youDef: string;
}

interface CollectingDataContent {
  sectionTitle: string;
  typesHeading: string;
  personalDataHeading: string;
  personalDataIntro: string;
  personalDataItems: string[];
  smsHeading: string;
  smsIntro: string;
  smsCollectionHeading: string;
  smsCollectionIntro: string;
  smsCollectionItems: string[];
  smsNoSharingHeading: string;
  smsNoSharingIntro: string;
  smsNoSharingText1: string;
  smsNoSharingText2: string;
  smsOptOutHeading: string;
  smsOptOutText: string;
  smsDataSecurityHeading: string;
  smsDataSecurityText: string;
  smsNoPurchaseHeading: string;
  smsNoPurchaseText: string;
  smsFrequencyHeading: string;
  smsFrequencyText: string;
  usageDataHeading: string;
  usageDataText1: string;
  usageDataText2: string;
  usageDataText3: string;
}

interface TrackingContent {
  heading: string;
  intro: string;
  cookiesOrBrowserDef: string;
  webBeaconsDef: string;
  persistentSessionText: string;
  cookiesUsageIntro: string;
  necessaryCookiesTitle: string;
  necessaryCookiesType: string;
  necessaryCookiesAdmin: string;
  necessaryCookiesPurpose: string;
  acceptanceCookiesTitle: string;
  acceptanceCookiesType: string;
  acceptanceCookiesAdmin: string;
  acceptanceCookiesPurpose: string;
  functionalityCookiesTitle: string;
  functionalityCookiesType: string;
  functionalityCookiesAdmin: string;
  functionalityCookiesPurpose: string;
  cookiesMoreInfo: string;
}

interface UseOfDataContent {
  heading: string;
  intro: string;
  purposes: string[];
  shareIntro: string;
  sharePurposes: string[];
}

interface RetentionContent {
  heading: string;
  text1: string;
  text2: string;
}

interface TransferContent {
  heading: string;
  text1: string;
  text2: string;
  text3: string;
}

interface DeleteContent {
  heading: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
}

interface DisclosureContent {
  heading: string;
  businessHeading: string;
  businessText: string;
  lawHeading: string;
  lawText: string;
  otherHeading: string;
  otherIntro: string;
  otherItems: string[];
}

interface SecurityContent {
  heading: string;
  text: string;
}

interface LinksContent {
  heading: string;
  text: string;
}

interface ChildrenContent {
  heading: string;
  text: string;
}

interface ChangesContent {
  heading: string;
  text1: string;
  text2: string;
}

interface ContactContent {
  heading: string;
  text: string;
  email: string;
  websiteUrl: string;
}

const defaultIntro: IntroContent = {
  lastUpdated: "October 05, 2023",
  intro1: "This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.",
  intro2: "We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.",
};

const defaultInterpretation: InterpretationContent = {
  sectionTitle: "Interpretation and Definitions",
  interpretationHeading: "Interpretation",
  interpretationText: "The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.",
  definitionsHeading: "Definitions",
  definitionsIntro: "For the purposes of this Privacy Policy:",
  accountDef: "means a unique account created for You to access our Service or parts of our Service.",
  affiliateDef: 'means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.',
  companyDef: "Summit Portable Buildings, 7336 MO-32, Farmington, MO 63640",
  cookiesDef: "are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.",
  countryDef: "Missouri, United States",
  deviceDef: "means any device that can access the Service such as a computer, a cellphone or a digital tablet.",
  personalDataDef: "is any information that relates to an identified or identifiable individual.",
  serviceDef: "refers to the Website.",
  serviceProviderDef: "means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.",
  usageDataDef: "refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).",
  websiteDef: "Summit Portable Buildings",
  youDef: 'means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.',
};

const defaultCollectingData: CollectingDataContent = {
  sectionTitle: "Collecting and Using Your Personal Data",
  typesHeading: "Types of Data Collected",
  personalDataHeading: "Personal Data",
  personalDataIntro: "While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:",
  personalDataItems: ["Email address", "First name and last name", "Phone number", "Usage Data"],
  smsHeading: "SMS & Mobile Messaging Privacy Policy",
  smsIntro: "We value your privacy and are committed to protecting your personal information. This section explains how we handle mobile phone numbers, SMS consent information, and any data collected through our text messaging program.",
  smsCollectionHeading: "Collection & Use of Mobile Information",
  smsCollectionIntro: "When you opt in to receive SMS messages from us, we collect your mobile phone number and any related consent details. This information is used solely to send you:",
  smsCollectionItems: ["Account alerts or updates", "Order information", "Promotional or marketing messages", "Customer service communications"],
  smsNoSharingHeading: "No Sharing of Mobile Opt-In Data (Required Disclosure)",
  smsNoSharingIntro: "In compliance with industry regulations, including CTIA and carrier requirements:",
  smsNoSharingText1: "We do not share, sell, rent, trade, or disclose your mobile opt-in data, mobile phone number, SMS consent information, or any related personal information to third parties or affiliates for marketing or any other purposes.",
  smsNoSharingText2: "Your mobile information is kept strictly confidential and used only for the services you request.",
  smsOptOutHeading: "Opt-Out",
  smsOptOutText: "You can opt out of our text messaging program at any time by replying STOP to any message. You may also contact us directly to be removed.",
  smsDataSecurityHeading: "Data Security",
  smsDataSecurityText: "We take reasonable technical and organizational measures to protect your mobile information from unauthorized access, disclosure, alteration, or destruction.",
  smsNoPurchaseHeading: "No Purchase Required",
  smsNoPurchaseText: "Signing up for our SMS messages is always voluntary and is not a condition of making a purchase.",
  smsFrequencyHeading: "Message Frequency & Rates",
  smsFrequencyText: "Message frequency may vary. Message and data rates may apply depending on your mobile carrier.",
  usageDataHeading: "Usage Data",
  usageDataText1: "Usage Data is collected automatically when using the Service.",
  usageDataText2: "Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.",
  usageDataText3: "When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.",
};

const defaultTracking: TrackingContent = {
  heading: "Tracking Technologies and Cookies",
  intro: "We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:",
  cookiesOrBrowserDef: "A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.",
  webBeaconsDef: "Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).",
  persistentSessionText: 'Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.',
  cookiesUsageIntro: "We use both Session and Persistent Cookies for the purposes set out below:",
  necessaryCookiesTitle: "Necessary / Essential Cookies",
  necessaryCookiesType: "Type: Session Cookies",
  necessaryCookiesAdmin: "Administered by: Us",
  necessaryCookiesPurpose: "Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.",
  acceptanceCookiesTitle: "Cookies Policy / Notice Acceptance Cookies",
  acceptanceCookiesType: "Type: Persistent Cookies",
  acceptanceCookiesAdmin: "Administered by: Us",
  acceptanceCookiesPurpose: "Purpose: These Cookies identify if users have accepted the use of cookies on the Website.",
  functionalityCookiesTitle: "Functionality Cookies",
  functionalityCookiesType: "Type: Persistent Cookies",
  functionalityCookiesAdmin: "Administered by: Us",
  functionalityCookiesPurpose: "Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.",
  cookiesMoreInfo: "For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.",
};

const defaultUseOfData: UseOfDataContent = {
  heading: "Use of Your Personal Data",
  intro: "The Company may use Personal Data for the following purposes:",
  purposes: [
    "To provide and maintain our Service, including to monitor the usage of our Service.",
    "To manage Your Account: to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.",
    "For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.",
    "To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.",
    "To provide You with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.",
    "To manage Your requests: To attend and manage Your requests to Us.",
    "For business transfers: We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.",
    "For other purposes: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.",
  ],
  shareIntro: "We may share Your personal information in the following situations:",
  sharePurposes: [
    "With Service Providers: We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.",
    "For business transfers: We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.",
    "With Affiliates: We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.",
    "With business partners: We may share Your information with Our business partners to offer You certain products, services or promotions.",
    "With other users: when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.",
    "With Your consent: We may disclose Your personal information for any other purpose with Your consent.",
  ],
};

const defaultRetention: RetentionContent = {
  heading: "Retention of Your Personal Data",
  text1: "The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.",
  text2: "The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.",
};

const defaultTransfer: TransferContent = {
  heading: "Transfer of Your Personal Data",
  text1: "Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.",
  text2: "Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.",
  text3: "The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.",
};

const defaultDelete: DeleteContent = {
  heading: "Delete Your Personal Data",
  text1: "You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.",
  text2: "Our Service may give You the ability to delete certain information about You from within the Service.",
  text3: "You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.",
  text4: "Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.",
};

const defaultDisclosure: DisclosureContent = {
  heading: "Disclosure of Your Personal Data",
  businessHeading: "Business Transactions",
  businessText: "If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.",
  lawHeading: "Law enforcement",
  lawText: "Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).",
  otherHeading: "Other legal requirements",
  otherIntro: "The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:",
  otherItems: [
    "Comply with a legal obligation",
    "Protect and defend the rights or property of the Company",
    "Prevent or investigate possible wrongdoing in connection with the Service",
    "Protect the personal safety of Users of the Service or the public",
    "Protect against legal liability",
  ],
};

const defaultSecurity: SecurityContent = {
  heading: "Security of Your Personal Data",
  text: "The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.",
};

const defaultLinks: LinksContent = {
  heading: "Links to Other Websites",
  text: "Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.",
};

const defaultChildren: ChildrenContent = {
  heading: "Children's Privacy",
  text: "Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.",
};

const defaultChanges: ChangesContent = {
  heading: "Changes to this Privacy Policy",
  text1: "We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.",
  text2: 'We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.',
};

const defaultContact: ContactContent = {
  heading: "Contact Us",
  text: "If you have any questions about this Privacy Policy, You can contact us:",
  email: "ervin@summitbuildings.com",
  websiteUrl: "https://summitbuildings.com",
};

const defaultContent: PageContent = {
  heading: "Privacy Policy",
  tagline: "",
  subheading: "",
  ctaHeading: "",
  ctaDescription: "",
  ctaButton: "",
  metaTitle: "Privacy Policy | Summit Portable Buildings",
  metaDescription: "Privacy Policy for Summit Portable Buildings. Learn how we collect, use, and protect your personal information.",
};

const PrivacyPolicy = () => {
  const { isAdmin } = useAdminAuth();
  const { showDuplicateDialog, showDeleteDialog, newSlug, isDuplicating, isDeleting, setNewSlug, setShowDuplicateDialog, setShowDeleteDialog, duplicatePage, deletePage } = usePageManagement('privacy-policy');

  const { content, isLoading: isPageLoading, isSaving: isPageSaving, isEditMode, hasChanges: hasPageChanges, updateField, save: savePage, reset: resetPage, startEditing } = useEditablePageContent('privacy-policy', defaultContent);

  const { content: introContent, isLoading: isIntroLoading, isSaving: isIntroSaving, hasChanges: hasIntroChanges, updateField: updateIntroField, save: saveIntro, reset: resetIntro } = useSectionContent('privacy-policy', 'intro', defaultIntro as any) as { content: IntroContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: interpretationContent, isLoading: isInterpLoading, isSaving: isInterpSaving, hasChanges: hasInterpChanges, updateField: updateInterpField, save: saveInterp, reset: resetInterp } = useSectionContent('privacy-policy', 'interpretation', defaultInterpretation as any) as { content: InterpretationContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: collectingContent, isLoading: isCollectLoading, isSaving: isCollectSaving, hasChanges: hasCollectChanges, updateField: updateCollectField, save: saveCollect, reset: resetCollect } = useSectionContent('privacy-policy', 'collecting', defaultCollectingData as any) as { content: CollectingDataContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: trackingContent, isLoading: isTrackLoading, isSaving: isTrackSaving, hasChanges: hasTrackChanges, updateField: updateTrackField, save: saveTrack, reset: resetTrack } = useSectionContent('privacy-policy', 'tracking', defaultTracking as any) as { content: TrackingContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: useOfDataContent, isLoading: isUseLoading, isSaving: isUseSaving, hasChanges: hasUseChanges, updateField: updateUseField, save: saveUse, reset: resetUse } = useSectionContent('privacy-policy', 'use-of-data', defaultUseOfData as any) as { content: UseOfDataContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: retentionContent, isLoading: isRetentLoading, isSaving: isRetentSaving, hasChanges: hasRetentChanges, updateField: updateRetentField, save: saveRetent, reset: resetRetent } = useSectionContent('privacy-policy', 'retention', defaultRetention as any) as { content: RetentionContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: transferContent, isLoading: isTransferLoading, isSaving: isTransferSaving, hasChanges: hasTransferChanges, updateField: updateTransferField, save: saveTransfer, reset: resetTransfer } = useSectionContent('privacy-policy', 'transfer', defaultTransfer as any) as { content: TransferContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: deleteContent, isLoading: isDeleteLoading, isSaving: isDeleteSaving, hasChanges: hasDeleteChanges, updateField: updateDeleteField, save: saveDelete, reset: resetDelete } = useSectionContent('privacy-policy', 'delete', defaultDelete as any) as { content: DeleteContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: disclosureContent, isLoading: isDisclosureLoading, isSaving: isDisclosureSaving, hasChanges: hasDisclosureChanges, updateField: updateDisclosureField, save: saveDisclosure, reset: resetDisclosure } = useSectionContent('privacy-policy', 'disclosure', defaultDisclosure as any) as { content: DisclosureContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: securityContent, isLoading: isSecurityLoading, isSaving: isSecuritySaving, hasChanges: hasSecurityChanges, updateField: updateSecurityField, save: saveSecurity, reset: resetSecurity } = useSectionContent('privacy-policy', 'security', defaultSecurity as any) as { content: SecurityContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: linksContent, isLoading: isLinksLoading, isSaving: isLinksSaving, hasChanges: hasLinksChanges, updateField: updateLinksField, save: saveLinks, reset: resetLinks } = useSectionContent('privacy-policy', 'links', defaultLinks as any) as { content: LinksContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: childrenContent, isLoading: isChildrenLoading, isSaving: isChildrenSaving, hasChanges: hasChildrenChanges, updateField: updateChildrenField, save: saveChildren, reset: resetChildren } = useSectionContent('privacy-policy', 'children', defaultChildren as any) as { content: ChildrenContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: changesContent, isLoading: isChangesLoading, isSaving: isChangesSaving, hasChanges: hasChangesChanges, updateField: updateChangesField, save: saveChanges, reset: resetChanges } = useSectionContent('privacy-policy', 'changes', defaultChanges as any) as { content: ChangesContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: contactContent, isLoading: isContactLoading, isSaving: isContactSaving, hasChanges: hasContactChanges, updateField: updateContactField, save: saveContact, reset: resetContact } = useSectionContent('privacy-policy', 'contact', defaultContact as any) as { content: ContactContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };

  const [localIntro, setLocalIntro] = useState<IntroContent>(defaultIntro);
  const [localInterp, setLocalInterp] = useState<InterpretationContent>(defaultInterpretation);
  const [localCollect, setLocalCollect] = useState<CollectingDataContent>(defaultCollectingData);
  const [localTrack, setLocalTrack] = useState<TrackingContent>(defaultTracking);
  const [localUse, setLocalUse] = useState<UseOfDataContent>(defaultUseOfData);
  const [localRetent, setLocalRetent] = useState<RetentionContent>(defaultRetention);
  const [localTransfer, setLocalTransfer] = useState<TransferContent>(defaultTransfer);
  const [localDeleteData, setLocalDeleteData] = useState<DeleteContent>(defaultDelete);
  const [localDisclosure, setLocalDisclosure] = useState<DisclosureContent>(defaultDisclosure);
  const [localSecurity, setLocalSecurity] = useState<SecurityContent>(defaultSecurity);
  const [localLinks, setLocalLinks] = useState<LinksContent>(defaultLinks);
  const [localChildrenData, setLocalChildrenData] = useState<ChildrenContent>(defaultChildren);
  const [localChangesData, setLocalChangesData] = useState<ChangesContent>(defaultChanges);
  const [localContact, setLocalContact] = useState<ContactContent>(defaultContact);

  useEffect(() => { if (introContent) setLocalIntro(introContent); }, [introContent]);
  useEffect(() => { if (interpretationContent) setLocalInterp(interpretationContent); }, [interpretationContent]);
  useEffect(() => { if (collectingContent) setLocalCollect(collectingContent); }, [collectingContent]);
  useEffect(() => { if (trackingContent) setLocalTrack(trackingContent); }, [trackingContent]);
  useEffect(() => { if (useOfDataContent) setLocalUse(useOfDataContent); }, [useOfDataContent]);
  useEffect(() => { if (retentionContent) setLocalRetent(retentionContent); }, [retentionContent]);
  useEffect(() => { if (transferContent) setLocalTransfer(transferContent); }, [transferContent]);
  useEffect(() => { if (deleteContent) setLocalDeleteData(deleteContent); }, [deleteContent]);
  useEffect(() => { if (disclosureContent) setLocalDisclosure(disclosureContent); }, [disclosureContent]);
  useEffect(() => { if (securityContent) setLocalSecurity(securityContent); }, [securityContent]);
  useEffect(() => { if (linksContent) setLocalLinks(linksContent); }, [linksContent]);
  useEffect(() => { if (childrenContent) setLocalChildrenData(childrenContent); }, [childrenContent]);
  useEffect(() => { if (changesContent) setLocalChangesData(changesContent); }, [changesContent]);
  useEffect(() => { if (contactContent) setLocalContact(contactContent); }, [contactContent]);

  const updateArrayItem = (section: string, field: string, index: number, value: string, localState: any, setLocalState: any, updateFieldFn: any) => {
    const updated = [...localState[field]];
    updated[index] = value;
    setLocalState({ ...localState, [field]: updated });
    updateFieldFn(field, updated);
  };

  const handleSave = async () => {
    await Promise.all([
      savePage(), saveIntro(), saveInterp(), saveCollect(), saveTrack(), saveUse(),
      saveRetent(), saveTransfer(), saveDelete(), saveDisclosure(), saveSecurity(),
      saveLinks(), saveChildren(), saveChanges(), saveContact()
    ]);
  };

  const handleReset = () => {
    resetPage(); resetIntro(); resetInterp(); resetCollect(); resetTrack(); resetUse();
    resetRetent(); resetTransfer(); resetDelete(); resetDisclosure(); resetSecurity();
    resetLinks(); resetChildren(); resetChanges(); resetContact();
    if (introContent) setLocalIntro(introContent);
    if (interpretationContent) setLocalInterp(interpretationContent);
    if (collectingContent) setLocalCollect(collectingContent);
    if (trackingContent) setLocalTrack(trackingContent);
    if (useOfDataContent) setLocalUse(useOfDataContent);
    if (retentionContent) setLocalRetent(retentionContent);
    if (transferContent) setLocalTransfer(transferContent);
    if (deleteContent) setLocalDeleteData(deleteContent);
    if (disclosureContent) setLocalDisclosure(disclosureContent);
    if (securityContent) setLocalSecurity(securityContent);
    if (linksContent) setLocalLinks(linksContent);
    if (childrenContent) setLocalChildrenData(childrenContent);
    if (changesContent) setLocalChangesData(changesContent);
    if (contactContent) setLocalContact(contactContent);
  };

  const isLoading = isPageLoading || isIntroLoading || isInterpLoading || isCollectLoading || isTrackLoading || isUseLoading || isRetentLoading || isTransferLoading || isDeleteLoading || isDisclosureLoading || isSecurityLoading || isLinksLoading || isChildrenLoading || isChangesLoading || isContactLoading;
  const isSaving = isPageSaving || isIntroSaving || isInterpSaving || isCollectSaving || isTrackSaving || isUseSaving || isRetentSaving || isTransferSaving || isDeleteSaving || isDisclosureSaving || isSecuritySaving || isLinksSaving || isChildrenSaving || isChangesSaving || isContactSaving;
  const hasChanges = hasPageChanges || hasIntroChanges || hasInterpChanges || hasCollectChanges || hasTrackChanges || hasUseChanges || hasRetentChanges || hasTransferChanges || hasDeleteChanges || hasDisclosureChanges || hasSecurityChanges || hasLinksChanges || hasChildrenChanges || hasChangesChanges || hasContactChanges;

  if (isLoading) return null;

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href="https://summitbuildings.com/privacy-policy" />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <AdminEditMode
          isAdmin={isAdmin}
          isEditMode={isEditMode}
          hasChanges={hasChanges}
          isSaving={isSaving}
          onToggleEdit={startEditing}
          onSave={handleSave}
          onCancel={handleReset}
          pageSlug="privacy-policy"
          showDuplicateDialog={showDuplicateDialog}
          showDeleteDialog={showDeleteDialog}
          newSlug={newSlug}
          isDuplicating={isDuplicating}
          isDeleting={isDeleting}
          onSetNewSlug={setNewSlug}
          onSetShowDuplicateDialog={setShowDuplicateDialog}
          onSetShowDeleteDialog={setShowDeleteDialog}
          onDuplicatePage={duplicatePage}
          onDeletePage={deletePage}
        />

        <main className="pt-24 pb-16">
          <div className="container-custom max-w-4xl">
            <InlineEditable value={content.heading} fieldName="Page title" onChange={(v) => updateField('heading', v)} isEditMode={isEditMode} className="font-heading text-3xl md:text-4xl text-foreground mb-2" as="h1" />
            <p className="text-muted-foreground mb-8">
              Last updated: <InlineEditable value={localIntro.lastUpdated} fieldName="Last updated" onChange={(v) => { setLocalIntro({ ...localIntro, lastUpdated: v }); updateIntroField('lastUpdated', v); }} isEditMode={isEditMode} as="span" />
            </p>
            
            <div className="prose prose-slate max-w-none space-y-6">
              <InlineEditable value={localIntro.intro1} fieldName="Intro 1" onChange={(v) => { setLocalIntro({ ...localIntro, intro1: v }); updateIntroField('intro1', v); }} isEditMode={isEditMode} as="p" />
              <InlineEditable value={localIntro.intro2} fieldName="Intro 2" onChange={(v) => { setLocalIntro({ ...localIntro, intro2: v }); updateIntroField('intro2', v); }} isEditMode={isEditMode} as="p" />

              <InlineEditable value={localInterp.sectionTitle} fieldName="Interpretation section title" onChange={(v) => { setLocalInterp({ ...localInterp, sectionTitle: v }); updateInterpField('sectionTitle', v); }} isEditMode={isEditMode} className="font-heading text-2xl text-foreground mt-8 mb-4" as="h2" />
              
              <InlineEditable value={localInterp.interpretationHeading} fieldName="Interpretation heading" onChange={(v) => { setLocalInterp({ ...localInterp, interpretationHeading: v }); updateInterpField('interpretationHeading', v); }} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
              <InlineEditable value={localInterp.interpretationText} fieldName="Interpretation text" onChange={(v) => { setLocalInterp({ ...localInterp, interpretationText: v }); updateInterpField('interpretationText', v); }} isEditMode={isEditMode} as="p" />

              <InlineEditable value={localInterp.definitionsHeading} fieldName="Definitions heading" onChange={(v) => { setLocalInterp({ ...localInterp, definitionsHeading: v }); updateInterpField('definitionsHeading', v); }} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
              <InlineEditable value={localInterp.definitionsIntro} fieldName="Definitions intro" onChange={(v) => { setLocalInterp({ ...localInterp, definitionsIntro: v }); updateInterpField('definitionsIntro', v); }} isEditMode={isEditMode} as="p" />
              
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account</strong> <InlineEditable value={localInterp.accountDef} fieldName="Account definition" onChange={(v) => { setLocalInterp({ ...localInterp, accountDef: v }); updateInterpField('accountDef', v); }} isEditMode={isEditMode} as="span" /></li>
                <li><strong>Affiliate</strong> <InlineEditable value={localInterp.affiliateDef} fieldName="Affiliate definition" onChange={(v) => { setLocalInterp({ ...localInterp, affiliateDef: v }); updateInterpField('affiliateDef', v); }} isEditMode={isEditMode} as="span" /></li>
                <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to <InlineEditable value={localInterp.companyDef} fieldName="Company definition" onChange={(v) => { setLocalInterp({ ...localInterp, companyDef: v }); updateInterpField('companyDef', v); }} isEditMode={isEditMode} as="span" />.</li>
                <li><strong>Cookies</strong> <InlineEditable value={localInterp.cookiesDef} fieldName="Cookies definition" onChange={(v) => { setLocalInterp({ ...localInterp, cookiesDef: v }); updateInterpField('cookiesDef', v); }} isEditMode={isEditMode} as="span" /></li>
                <li><strong>Country</strong> refers to: <InlineEditable value={localInterp.countryDef} fieldName="Country definition" onChange={(v) => { setLocalInterp({ ...localInterp, countryDef: v }); updateInterpField('countryDef', v); }} isEditMode={isEditMode} as="span" /></li>
                <li><strong>Device</strong> <InlineEditable value={localInterp.deviceDef} fieldName="Device definition" onChange={(v) => { setLocalInterp({ ...localInterp, deviceDef: v }); updateInterpField('deviceDef', v); }} isEditMode={isEditMode} as="span" /></li>
                <li><strong>Personal Data</strong> <InlineEditable value={localInterp.personalDataDef} fieldName="Personal Data definition" onChange={(v) => { setLocalInterp({ ...localInterp, personalDataDef: v }); updateInterpField('personalDataDef', v); }} isEditMode={isEditMode} as="span" /></li>
                <li><strong>Service</strong> <InlineEditable value={localInterp.serviceDef} fieldName="Service definition" onChange={(v) => { setLocalInterp({ ...localInterp, serviceDef: v }); updateInterpField('serviceDef', v); }} isEditMode={isEditMode} as="span" /></li>
                <li><strong>Service Provider</strong> <InlineEditable value={localInterp.serviceProviderDef} fieldName="Service Provider definition" onChange={(v) => { setLocalInterp({ ...localInterp, serviceProviderDef: v }); updateInterpField('serviceProviderDef', v); }} isEditMode={isEditMode} as="span" /></li>
                <li><strong>Usage Data</strong> <InlineEditable value={localInterp.usageDataDef} fieldName="Usage Data definition" onChange={(v) => { setLocalInterp({ ...localInterp, usageDataDef: v }); updateInterpField('usageDataDef', v); }} isEditMode={isEditMode} as="span" /></li>
                <li><strong>Website</strong> refers to <InlineEditable value={localInterp.websiteDef} fieldName="Website definition" onChange={(v) => { setLocalInterp({ ...localInterp, websiteDef: v }); updateInterpField('websiteDef', v); }} isEditMode={isEditMode} as="span" />, accessible from <a href={localContact.websiteUrl} className="text-secondary hover:underline">{localContact.websiteUrl.replace('https://', 'www.')}</a></li>
                <li><strong>You</strong> <InlineEditable value={localInterp.youDef} fieldName="You definition" onChange={(v) => { setLocalInterp({ ...localInterp, youDef: v }); updateInterpField('youDef', v); }} isEditMode={isEditMode} as="span" /></li>
              </ul>

              <InlineEditable value={localCollect.sectionTitle} fieldName="Collecting section title" onChange={(v) => { setLocalCollect({ ...localCollect, sectionTitle: v }); updateCollectField('sectionTitle', v); }} isEditMode={isEditMode} className="font-heading text-2xl text-foreground mt-8 mb-4" as="h2" />

              <InlineEditable value={localCollect.typesHeading} fieldName="Types heading" onChange={(v) => { setLocalCollect({ ...localCollect, typesHeading: v }); updateCollectField('typesHeading', v); }} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
              
              <InlineEditable value={localCollect.personalDataHeading} fieldName="Personal data heading" onChange={(v) => { setLocalCollect({ ...localCollect, personalDataHeading: v }); updateCollectField('personalDataHeading', v); }} isEditMode={isEditMode} className="font-heading text-lg text-foreground mt-4 mb-2" as="h3" />
              <InlineEditable value={localCollect.personalDataIntro} fieldName="Personal data intro" onChange={(v) => { setLocalCollect({ ...localCollect, personalDataIntro: v }); updateCollectField('personalDataIntro', v); }} isEditMode={isEditMode} as="p" />
              <ul className="list-disc pl-6 space-y-2">
                {localCollect.personalDataItems.map((item, index) => (
                  <li key={index}><InlineEditable value={item} fieldName={`Personal data item ${index + 1}`} onChange={(v) => updateArrayItem('collect', 'personalDataItems', index, v, localCollect, setLocalCollect, updateCollectField)} isEditMode={isEditMode} as="span" /></li>
                ))}
              </ul>

              <InlineEditable value={localCollect.smsHeading} fieldName="SMS heading" onChange={(v) => { setLocalCollect({ ...localCollect, smsHeading: v }); updateCollectField('smsHeading', v); }} isEditMode={isEditMode} className="font-heading text-lg text-foreground mt-6 mb-2" as="h3" />
              <InlineEditable value={localCollect.smsIntro} fieldName="SMS intro" onChange={(v) => { setLocalCollect({ ...localCollect, smsIntro: v }); updateCollectField('smsIntro', v); }} isEditMode={isEditMode} as="p" />
              
              <p className="font-semibold mt-4"><InlineEditable value={localCollect.smsCollectionHeading} fieldName="SMS collection heading" onChange={(v) => { setLocalCollect({ ...localCollect, smsCollectionHeading: v }); updateCollectField('smsCollectionHeading', v); }} isEditMode={isEditMode} as="span" /></p>
              <InlineEditable value={localCollect.smsCollectionIntro} fieldName="SMS collection intro" onChange={(v) => { setLocalCollect({ ...localCollect, smsCollectionIntro: v }); updateCollectField('smsCollectionIntro', v); }} isEditMode={isEditMode} as="p" />
              <ul className="list-disc pl-6 space-y-2">
                {localCollect.smsCollectionItems.map((item, index) => (
                  <li key={index}><InlineEditable value={item} fieldName={`SMS collection item ${index + 1}`} onChange={(v) => updateArrayItem('collect', 'smsCollectionItems', index, v, localCollect, setLocalCollect, updateCollectField)} isEditMode={isEditMode} as="span" /></li>
                ))}
              </ul>

              <p className="font-semibold mt-4"><InlineEditable value={localCollect.smsNoSharingHeading} fieldName="No sharing heading" onChange={(v) => { setLocalCollect({ ...localCollect, smsNoSharingHeading: v }); updateCollectField('smsNoSharingHeading', v); }} isEditMode={isEditMode} as="span" /></p>
              <InlineEditable value={localCollect.smsNoSharingIntro} fieldName="No sharing intro" onChange={(v) => { setLocalCollect({ ...localCollect, smsNoSharingIntro: v }); updateCollectField('smsNoSharingIntro', v); }} isEditMode={isEditMode} as="p" />
              <InlineEditable value={localCollect.smsNoSharingText1} fieldName="No sharing text 1" onChange={(v) => { setLocalCollect({ ...localCollect, smsNoSharingText1: v }); updateCollectField('smsNoSharingText1', v); }} isEditMode={isEditMode} as="p" />
              <InlineEditable value={localCollect.smsNoSharingText2} fieldName="No sharing text 2" onChange={(v) => { setLocalCollect({ ...localCollect, smsNoSharingText2: v }); updateCollectField('smsNoSharingText2', v); }} isEditMode={isEditMode} as="p" />

              <p className="font-semibold mt-4"><InlineEditable value={localCollect.smsOptOutHeading} fieldName="Opt out heading" onChange={(v) => { setLocalCollect({ ...localCollect, smsOptOutHeading: v }); updateCollectField('smsOptOutHeading', v); }} isEditMode={isEditMode} as="span" /></p>
              <InlineEditable value={localCollect.smsOptOutText} fieldName="Opt out text" onChange={(v) => { setLocalCollect({ ...localCollect, smsOptOutText: v }); updateCollectField('smsOptOutText', v); }} isEditMode={isEditMode} as="p" />

              <p className="font-semibold mt-4"><InlineEditable value={localCollect.smsDataSecurityHeading} fieldName="Data security heading" onChange={(v) => { setLocalCollect({ ...localCollect, smsDataSecurityHeading: v }); updateCollectField('smsDataSecurityHeading', v); }} isEditMode={isEditMode} as="span" /></p>
              <InlineEditable value={localCollect.smsDataSecurityText} fieldName="Data security text" onChange={(v) => { setLocalCollect({ ...localCollect, smsDataSecurityText: v }); updateCollectField('smsDataSecurityText', v); }} isEditMode={isEditMode} as="p" />

              <p className="font-semibold mt-4"><InlineEditable value={localCollect.smsNoPurchaseHeading} fieldName="No purchase heading" onChange={(v) => { setLocalCollect({ ...localCollect, smsNoPurchaseHeading: v }); updateCollectField('smsNoPurchaseHeading', v); }} isEditMode={isEditMode} as="span" /></p>
              <InlineEditable value={localCollect.smsNoPurchaseText} fieldName="No purchase text" onChange={(v) => { setLocalCollect({ ...localCollect, smsNoPurchaseText: v }); updateCollectField('smsNoPurchaseText', v); }} isEditMode={isEditMode} as="p" />

              <p className="font-semibold mt-4"><InlineEditable value={localCollect.smsFrequencyHeading} fieldName="Frequency heading" onChange={(v) => { setLocalCollect({ ...localCollect, smsFrequencyHeading: v }); updateCollectField('smsFrequencyHeading', v); }} isEditMode={isEditMode} as="span" /></p>
              <InlineEditable value={localCollect.smsFrequencyText} fieldName="Frequency text" onChange={(v) => { setLocalCollect({ ...localCollect, smsFrequencyText: v }); updateCollectField('smsFrequencyText', v); }} isEditMode={isEditMode} as="p" />

              <InlineEditable value={localCollect.usageDataHeading} fieldName="Usage data heading" onChange={(v) => { setLocalCollect({ ...localCollect, usageDataHeading: v }); updateCollectField('usageDataHeading', v); }} isEditMode={isEditMode} className="font-heading text-lg text-foreground mt-6 mb-2" as="h3" />
              <InlineEditable value={localCollect.usageDataText1} fieldName="Usage data text 1" onChange={(v) => { setLocalCollect({ ...localCollect, usageDataText1: v }); updateCollectField('usageDataText1', v); }} isEditMode={isEditMode} as="p" />
              <InlineEditable value={localCollect.usageDataText2} fieldName="Usage data text 2" onChange={(v) => { setLocalCollect({ ...localCollect, usageDataText2: v }); updateCollectField('usageDataText2', v); }} isEditMode={isEditMode} as="p" />
              <InlineEditable value={localCollect.usageDataText3} fieldName="Usage data text 3" onChange={(v) => { setLocalCollect({ ...localCollect, usageDataText3: v }); updateCollectField('usageDataText3', v); }} isEditMode={isEditMode} as="p" />

              <InlineEditable value={localTrack.heading} fieldName="Tracking heading" onChange={(v) => { setLocalTrack({ ...localTrack, heading: v }); updateTrackField('heading', v); }} isEditMode={isEditMode} className="font-heading text-lg text-foreground mt-6 mb-2" as="h3" />
              <InlineEditable value={localTrack.intro} fieldName="Tracking intro" onChange={(v) => { setLocalTrack({ ...localTrack, intro: v }); updateTrackField('intro', v); }} isEditMode={isEditMode} as="p" />
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cookies or Browser Cookies.</strong> <InlineEditable value={localTrack.cookiesOrBrowserDef} fieldName="Cookies browser def" onChange={(v) => { setLocalTrack({ ...localTrack, cookiesOrBrowserDef: v }); updateTrackField('cookiesOrBrowserDef', v); }} isEditMode={isEditMode} as="span" /></li>
                <li><strong>Web Beacons.</strong> <InlineEditable value={localTrack.webBeaconsDef} fieldName="Web beacons def" onChange={(v) => { setLocalTrack({ ...localTrack, webBeaconsDef: v }); updateTrackField('webBeaconsDef', v); }} isEditMode={isEditMode} as="span" /></li>
              </ul>
              <InlineEditable value={localTrack.persistentSessionText} fieldName="Persistent session text" onChange={(v) => { setLocalTrack({ ...localTrack, persistentSessionText: v }); updateTrackField('persistentSessionText', v); }} isEditMode={isEditMode} as="p" />
              <InlineEditable value={localTrack.cookiesUsageIntro} fieldName="Cookies usage intro" onChange={(v) => { setLocalTrack({ ...localTrack, cookiesUsageIntro: v }); updateTrackField('cookiesUsageIntro', v); }} isEditMode={isEditMode} as="p" />
              
              <div className="ml-4 space-y-4">
                <div>
                  <p className="font-semibold"><InlineEditable value={localTrack.necessaryCookiesTitle} fieldName="Necessary cookies title" onChange={(v) => { setLocalTrack({ ...localTrack, necessaryCookiesTitle: v }); updateTrackField('necessaryCookiesTitle', v); }} isEditMode={isEditMode} as="span" /></p>
                  <InlineEditable value={localTrack.necessaryCookiesType} fieldName="Necessary cookies type" onChange={(v) => { setLocalTrack({ ...localTrack, necessaryCookiesType: v }); updateTrackField('necessaryCookiesType', v); }} isEditMode={isEditMode} as="p" />
                  <InlineEditable value={localTrack.necessaryCookiesAdmin} fieldName="Necessary cookies admin" onChange={(v) => { setLocalTrack({ ...localTrack, necessaryCookiesAdmin: v }); updateTrackField('necessaryCookiesAdmin', v); }} isEditMode={isEditMode} as="p" />
                  <p>Purpose: <InlineEditable value={localTrack.necessaryCookiesPurpose} fieldName="Necessary cookies purpose" onChange={(v) => { setLocalTrack({ ...localTrack, necessaryCookiesPurpose: v }); updateTrackField('necessaryCookiesPurpose', v); }} isEditMode={isEditMode} as="span" /></p>
                </div>
                <div>
                  <p className="font-semibold"><InlineEditable value={localTrack.acceptanceCookiesTitle} fieldName="Acceptance cookies title" onChange={(v) => { setLocalTrack({ ...localTrack, acceptanceCookiesTitle: v }); updateTrackField('acceptanceCookiesTitle', v); }} isEditMode={isEditMode} as="span" /></p>
                  <InlineEditable value={localTrack.acceptanceCookiesType} fieldName="Acceptance cookies type" onChange={(v) => { setLocalTrack({ ...localTrack, acceptanceCookiesType: v }); updateTrackField('acceptanceCookiesType', v); }} isEditMode={isEditMode} as="p" />
                  <InlineEditable value={localTrack.acceptanceCookiesAdmin} fieldName="Acceptance cookies admin" onChange={(v) => { setLocalTrack({ ...localTrack, acceptanceCookiesAdmin: v }); updateTrackField('acceptanceCookiesAdmin', v); }} isEditMode={isEditMode} as="p" />
                  <p>Purpose: <InlineEditable value={localTrack.acceptanceCookiesPurpose} fieldName="Acceptance cookies purpose" onChange={(v) => { setLocalTrack({ ...localTrack, acceptanceCookiesPurpose: v }); updateTrackField('acceptanceCookiesPurpose', v); }} isEditMode={isEditMode} as="span" /></p>
                </div>
                <div>
                  <p className="font-semibold"><InlineEditable value={localTrack.functionalityCookiesTitle} fieldName="Functionality cookies title" onChange={(v) => { setLocalTrack({ ...localTrack, functionalityCookiesTitle: v }); updateTrackField('functionalityCookiesTitle', v); }} isEditMode={isEditMode} as="span" /></p>
                  <InlineEditable value={localTrack.functionalityCookiesType} fieldName="Functionality cookies type" onChange={(v) => { setLocalTrack({ ...localTrack, functionalityCookiesType: v }); updateTrackField('functionalityCookiesType', v); }} isEditMode={isEditMode} as="p" />
                  <InlineEditable value={localTrack.functionalityCookiesAdmin} fieldName="Functionality cookies admin" onChange={(v) => { setLocalTrack({ ...localTrack, functionalityCookiesAdmin: v }); updateTrackField('functionalityCookiesAdmin', v); }} isEditMode={isEditMode} as="p" />
                  <p>Purpose: <InlineEditable value={localTrack.functionalityCookiesPurpose} fieldName="Functionality cookies purpose" onChange={(v) => { setLocalTrack({ ...localTrack, functionalityCookiesPurpose: v }); updateTrackField('functionalityCookiesPurpose', v); }} isEditMode={isEditMode} as="span" /></p>
                </div>
              </div>

              <InlineEditable value={localTrack.cookiesMoreInfo} fieldName="Cookies more info" onChange={(v) => { setLocalTrack({ ...localTrack, cookiesMoreInfo: v }); updateTrackField('cookiesMoreInfo', v); }} isEditMode={isEditMode} as="p" />

              <InlineEditable value={localUse.heading} fieldName="Use of data heading" onChange={(v) => { setLocalUse({ ...localUse, heading: v }); updateUseField('heading', v); }} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
              <InlineEditable value={localUse.intro} fieldName="Use of data intro" onChange={(v) => { setLocalUse({ ...localUse, intro: v }); updateUseField('intro', v); }} isEditMode={isEditMode} as="p" />
              <ul className="list-disc pl-6 space-y-2">
                {localUse.purposes.map((purpose, index) => (
                  <li key={index}><InlineEditable value={purpose} fieldName={`Use purpose ${index + 1}`} onChange={(v) => updateArrayItem('use', 'purposes', index, v, localUse, setLocalUse, updateUseField)} isEditMode={isEditMode} as="span" /></li>
                ))}
              </ul>
              <InlineEditable value={localUse.shareIntro} fieldName="Share intro" onChange={(v) => { setLocalUse({ ...localUse, shareIntro: v }); updateUseField('shareIntro', v); }} isEditMode={isEditMode} className="mt-4" as="p" />
              <ul className="list-disc pl-6 space-y-2">
                {localUse.sharePurposes.map((purpose, index) => (
                  <li key={index}><InlineEditable value={purpose} fieldName={`Share purpose ${index + 1}`} onChange={(v) => updateArrayItem('use', 'sharePurposes', index, v, localUse, setLocalUse, updateUseField)} isEditMode={isEditMode} as="span" /></li>
                ))}
              </ul>

              <InlineEditable value={localRetent.heading} fieldName="Retention heading" onChange={(v) => { setLocalRetent({ ...localRetent, heading: v }); updateRetentField('heading', v); }} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
              <InlineEditable value={localRetent.text1} fieldName="Retention text 1" onChange={(v) => { setLocalRetent({ ...localRetent, text1: v }); updateRetentField('text1', v); }} isEditMode={isEditMode} as="p" />
              <InlineEditable value={localRetent.text2} fieldName="Retention text 2" onChange={(v) => { setLocalRetent({ ...localRetent, text2: v }); updateRetentField('text2', v); }} isEditMode={isEditMode} as="p" />

              <InlineEditable value={localTransfer.heading} fieldName="Transfer heading" onChange={(v) => { setLocalTransfer({ ...localTransfer, heading: v }); updateTransferField('heading', v); }} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
              <InlineEditable value={localTransfer.text1} fieldName="Transfer text 1" onChange={(v) => { setLocalTransfer({ ...localTransfer, text1: v }); updateTransferField('text1', v); }} isEditMode={isEditMode} as="p" />
              <InlineEditable value={localTransfer.text2} fieldName="Transfer text 2" onChange={(v) => { setLocalTransfer({ ...localTransfer, text2: v }); updateTransferField('text2', v); }} isEditMode={isEditMode} as="p" />
              <InlineEditable value={localTransfer.text3} fieldName="Transfer text 3" onChange={(v) => { setLocalTransfer({ ...localTransfer, text3: v }); updateTransferField('text3', v); }} isEditMode={isEditMode} as="p" />

              <InlineEditable value={localDeleteData.heading} fieldName="Delete heading" onChange={(v) => { setLocalDeleteData({ ...localDeleteData, heading: v }); updateDeleteField('heading', v); }} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
              <InlineEditable value={localDeleteData.text1} fieldName="Delete text 1" onChange={(v) => { setLocalDeleteData({ ...localDeleteData, text1: v }); updateDeleteField('text1', v); }} isEditMode={isEditMode} as="p" />
              <InlineEditable value={localDeleteData.text2} fieldName="Delete text 2" onChange={(v) => { setLocalDeleteData({ ...localDeleteData, text2: v }); updateDeleteField('text2', v); }} isEditMode={isEditMode} as="p" />
              <InlineEditable value={localDeleteData.text3} fieldName="Delete text 3" onChange={(v) => { setLocalDeleteData({ ...localDeleteData, text3: v }); updateDeleteField('text3', v); }} isEditMode={isEditMode} as="p" />
              <InlineEditable value={localDeleteData.text4} fieldName="Delete text 4" onChange={(v) => { setLocalDeleteData({ ...localDeleteData, text4: v }); updateDeleteField('text4', v); }} isEditMode={isEditMode} as="p" />

              <InlineEditable value={localDisclosure.heading} fieldName="Disclosure heading" onChange={(v) => { setLocalDisclosure({ ...localDisclosure, heading: v }); updateDisclosureField('heading', v); }} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
              
              <InlineEditable value={localDisclosure.businessHeading} fieldName="Business heading" onChange={(v) => { setLocalDisclosure({ ...localDisclosure, businessHeading: v }); updateDisclosureField('businessHeading', v); }} isEditMode={isEditMode} className="font-heading text-lg text-foreground mt-4 mb-2" as="h3" />
              <InlineEditable value={localDisclosure.businessText} fieldName="Business text" onChange={(v) => { setLocalDisclosure({ ...localDisclosure, businessText: v }); updateDisclosureField('businessText', v); }} isEditMode={isEditMode} as="p" />

              <InlineEditable value={localDisclosure.lawHeading} fieldName="Law heading" onChange={(v) => { setLocalDisclosure({ ...localDisclosure, lawHeading: v }); updateDisclosureField('lawHeading', v); }} isEditMode={isEditMode} className="font-heading text-lg text-foreground mt-4 mb-2" as="h3" />
              <InlineEditable value={localDisclosure.lawText} fieldName="Law text" onChange={(v) => { setLocalDisclosure({ ...localDisclosure, lawText: v }); updateDisclosureField('lawText', v); }} isEditMode={isEditMode} as="p" />

              <InlineEditable value={localDisclosure.otherHeading} fieldName="Other heading" onChange={(v) => { setLocalDisclosure({ ...localDisclosure, otherHeading: v }); updateDisclosureField('otherHeading', v); }} isEditMode={isEditMode} className="font-heading text-lg text-foreground mt-4 mb-2" as="h3" />
              <InlineEditable value={localDisclosure.otherIntro} fieldName="Other intro" onChange={(v) => { setLocalDisclosure({ ...localDisclosure, otherIntro: v }); updateDisclosureField('otherIntro', v); }} isEditMode={isEditMode} as="p" />
              <ul className="list-disc pl-6 space-y-2">
                {localDisclosure.otherItems.map((item, index) => (
                  <li key={index}><InlineEditable value={item} fieldName={`Other item ${index + 1}`} onChange={(v) => updateArrayItem('disclosure', 'otherItems', index, v, localDisclosure, setLocalDisclosure, updateDisclosureField)} isEditMode={isEditMode} as="span" /></li>
                ))}
              </ul>

              <InlineEditable value={localSecurity.heading} fieldName="Security heading" onChange={(v) => { setLocalSecurity({ ...localSecurity, heading: v }); updateSecurityField('heading', v); }} isEditMode={isEditMode} className="font-heading text-xl text-foreground mt-6 mb-3" as="h3" />
              <InlineEditable value={localSecurity.text} fieldName="Security text" onChange={(v) => { setLocalSecurity({ ...localSecurity, text: v }); updateSecurityField('text', v); }} isEditMode={isEditMode} as="p" />

              <InlineEditable value={localLinks.heading} fieldName="Links heading" onChange={(v) => { setLocalLinks({ ...localLinks, heading: v }); updateLinksField('heading', v); }} isEditMode={isEditMode} className="font-heading text-2xl text-foreground mt-8 mb-4" as="h2" />
              <InlineEditable value={localLinks.text} fieldName="Links text" onChange={(v) => { setLocalLinks({ ...localLinks, text: v }); updateLinksField('text', v); }} isEditMode={isEditMode} as="p" />

              <InlineEditable value={localChildrenData.heading} fieldName="Children heading" onChange={(v) => { setLocalChildrenData({ ...localChildrenData, heading: v }); updateChildrenField('heading', v); }} isEditMode={isEditMode} className="font-heading text-2xl text-foreground mt-8 mb-4" as="h2" />
              <InlineEditable value={localChildrenData.text} fieldName="Children text" onChange={(v) => { setLocalChildrenData({ ...localChildrenData, text: v }); updateChildrenField('text', v); }} isEditMode={isEditMode} as="p" />

              <InlineEditable value={localChangesData.heading} fieldName="Changes heading" onChange={(v) => { setLocalChangesData({ ...localChangesData, heading: v }); updateChangesField('heading', v); }} isEditMode={isEditMode} className="font-heading text-2xl text-foreground mt-8 mb-4" as="h2" />
              <InlineEditable value={localChangesData.text1} fieldName="Changes text 1" onChange={(v) => { setLocalChangesData({ ...localChangesData, text1: v }); updateChangesField('text1', v); }} isEditMode={isEditMode} as="p" />
              <InlineEditable value={localChangesData.text2} fieldName="Changes text 2" onChange={(v) => { setLocalChangesData({ ...localChangesData, text2: v }); updateChangesField('text2', v); }} isEditMode={isEditMode} as="p" />

              <InlineEditable value={localContact.heading} fieldName="Contact heading" onChange={(v) => { setLocalContact({ ...localContact, heading: v }); updateContactField('heading', v); }} isEditMode={isEditMode} className="font-heading text-2xl text-foreground mt-8 mb-4" as="h2" />
              <InlineEditable value={localContact.text} fieldName="Contact text" onChange={(v) => { setLocalContact({ ...localContact, text: v }); updateContactField('text', v); }} isEditMode={isEditMode} as="p" />
              <ul className="list-disc pl-6 space-y-2">
                <li>By email: <InlineEditable value={localContact.email} fieldName="Contact email" onChange={(v) => { setLocalContact({ ...localContact, email: v }); updateContactField('email', v); }} isEditMode={isEditMode} as="span" /></li>
                <li>By visiting this page on our website: <InlineEditable value={localContact.websiteUrl} fieldName="Contact website" onChange={(v) => { setLocalContact({ ...localContact, websiteUrl: v }); updateContactField('websiteUrl', v); }} isEditMode={isEditMode} as="span" /></li>
              </ul>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
