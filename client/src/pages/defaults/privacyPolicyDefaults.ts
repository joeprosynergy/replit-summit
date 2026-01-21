/**
 * PrivacyPolicy Page - Default Content
 * Extracted from original PrivacyPolicy.tsx for CMS-first architecture
 */

export interface PrivacyPolicyContent {
  // Meta
  metaTitle: string;
  metaDescription: string;
  
  // Page heading
  heading: string;
  
  // Intro
  lastUpdated: string;
  intro1: string;
  intro2: string;
  
  // Interpretation & Definitions
  interpretationSectionTitle: string;
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
  
  // Collecting Data
  collectingSectionTitle: string;
  collectingTypesHeading: string;
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
  
  // Tracking
  trackingHeading: string;
  trackingIntro: string;
  cookiesBrowserDef: string;
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
  
  // Use of Data
  useOfDataHeading: string;
  useOfDataIntro: string;
  usePurposes: string[];
  shareIntro: string;
  sharePurposes: string[];
  
  // Retention
  retentionHeading: string;
  retentionText1: string;
  retentionText2: string;
  
  // Transfer
  transferHeading: string;
  transferText1: string;
  transferText2: string;
  transferText3: string;
  
  // Delete
  deleteHeading: string;
  deleteText1: string;
  deleteText2: string;
  deleteText3: string;
  deleteText4: string;
  
  // Disclosure
  disclosureHeading: string;
  disclosureBusinessHeading: string;
  disclosureBusinessText: string;
  disclosureLawHeading: string;
  disclosureLawText: string;
  disclosureOtherHeading: string;
  disclosureOtherIntro: string;
  disclosureOtherItems: string[];
  
  // Security
  securityHeading: string;
  securityText: string;
  
  // Links
  linksHeading: string;
  linksText: string;
  
  // Children
  childrenHeading: string;
  childrenText: string;
  
  // Changes
  changesHeading: string;
  changesText1: string;
  changesText2: string;
  
  // Contact
  contactHeading: string;
  contactText: string;
  contactEmail: string;
  contactWebsiteUrl: string;
}

export const privacyPolicyDefaults: PrivacyPolicyContent = {
  // Meta
  metaTitle: "Privacy Policy | Summit Portable Buildings",
  metaDescription: "Privacy Policy for Summit Portable Buildings. Learn how we collect, use, and protect your personal information.",
  
  // Page heading
  heading: "Privacy Policy",
  
  // Intro
  lastUpdated: "October 05, 2023",
  intro1: "This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.",
  intro2: "We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.",
  
  // Interpretation & Definitions
  interpretationSectionTitle: "Interpretation and Definitions",
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
  
  // Collecting Data
  collectingSectionTitle: "Collecting and Using Your Personal Data",
  collectingTypesHeading: "Types of Data Collected",
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
  
  // Tracking
  trackingHeading: "Tracking Technologies and Cookies",
  trackingIntro: "We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:",
  cookiesBrowserDef: "A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.",
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
  
  // Use of Data
  useOfDataHeading: "Use of Your Personal Data",
  useOfDataIntro: "The Company may use Personal Data for the following purposes:",
  usePurposes: [
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
  
  // Retention
  retentionHeading: "Retention of Your Personal Data",
  retentionText1: "The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.",
  retentionText2: "The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.",
  
  // Transfer
  transferHeading: "Transfer of Your Personal Data",
  transferText1: "Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.",
  transferText2: "Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.",
  transferText3: "The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.",
  
  // Delete
  deleteHeading: "Delete Your Personal Data",
  deleteText1: "You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.",
  deleteText2: "Our Service may give You the ability to delete certain information about You from within the Service.",
  deleteText3: "You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.",
  deleteText4: "Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.",
  
  // Disclosure
  disclosureHeading: "Disclosure of Your Personal Data",
  disclosureBusinessHeading: "Business Transactions",
  disclosureBusinessText: "If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.",
  disclosureLawHeading: "Law enforcement",
  disclosureLawText: "Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).",
  disclosureOtherHeading: "Other legal requirements",
  disclosureOtherIntro: "The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:",
  disclosureOtherItems: [
    "Comply with a legal obligation",
    "Protect and defend the rights or property of the Company",
    "Prevent or investigate possible wrongdoing in connection with the Service",
    "Protect the personal safety of Users of the Service or the public",
    "Protect against legal liability",
  ],
  
  // Security
  securityHeading: "Security of Your Personal Data",
  securityText: "The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.",
  
  // Links
  linksHeading: "Links to Other Websites",
  linksText: "Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.",
  
  // Children
  childrenHeading: "Children's Privacy",
  childrenText: "Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.",
  
  // Changes
  changesHeading: "Changes to this Privacy Policy",
  changesText1: "We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.",
  changesText2: 'We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.',
  
  // Contact
  contactHeading: "Contact Us",
  contactText: "If you have any questions about this Privacy Policy, You can contact us:",
  contactEmail: "ervin@summitbuildings.com",
  contactWebsiteUrl: "https://summitbuildings.com",
};
