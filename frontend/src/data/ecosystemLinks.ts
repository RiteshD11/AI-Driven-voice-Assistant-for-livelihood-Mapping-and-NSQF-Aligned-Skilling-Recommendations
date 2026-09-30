export interface EcosystemPlatform {
  id: string;
  name: string;
  category: string;
  description: string;
  officialServiceLabel: string;
  primaryUrl: string;
  secondaryUrl?: string;
  defaultActionLabel: string;
  note?: string;
  badge?: {
    text: string;
    variant: 'neutral' | 'warning' | 'info' | 'purple';
  };
  themeColor: {
    accent: string;
    badgeBg: string;
    badgeText: string;
    borderHover: string;
    buttonBg: string;
    buttonHover: string;
    iconBg: string;
    iconColor: string;
  };
}

export const ECOSYSTEM_PLATFORMS: EcosystemPlatform[] = [
  {
    id: 'sidh',
    name: 'Skill India Digital',
    category: 'Training • Certification • Skill Centres',
    description: 'Explore skill courses, certification and career-focused skilling services.',
    officialServiceLabel: 'Official Government Skill Platform',
    primaryUrl: 'https://www.skillindiadigital.gov.in/',
    secondaryUrl: 'https://courses.skillindiadigital.gov.in/courses/',
    defaultActionLabel: 'EXPLORE COURSES',
    themeColor: {
      accent: 'blue',
      badgeBg: 'bg-blue-50',
      badgeText: 'text-blue-800',
      borderHover: 'hover:border-blue-300',
      buttonBg: 'bg-blue-600 hover:bg-blue-700',
      buttonHover: 'hover:bg-blue-700',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
  },
  {
    id: 'ncs',
    name: 'National Career Service',
    category: 'Jobs • Career Services',
    description: 'Explore employment opportunities and career services.',
    officialServiceLabel: 'Official National Employment Portal',
    primaryUrl: 'https://ncs.gov.in/',
    defaultActionLabel: 'FIND OPPORTUNITIES',
    note: 'Search and apply on the official NCS platform.',
    themeColor: {
      accent: 'emerald',
      badgeBg: 'bg-emerald-50',
      badgeText: 'text-emerald-800',
      borderHover: 'hover:border-emerald-300',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
      buttonHover: 'hover:bg-emerald-700',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
  },
  {
    id: 'nsdc',
    name: 'NSDC / NOS',
    category: 'Occupational Standards • Competencies',
    description: 'Review National Occupational Standards and occupation-level competency information.',
    officialServiceLabel: 'Reference Occupational Standards Repository',
    primaryUrl: 'https://www.nsdcindia.org/',
    secondaryUrl: 'https://stag-api.nsdcindia.org/standards-frameworks',
    defaultActionLabel: 'VIEW STANDARDS',
    note: 'Reference occupational standards and qualification framework benchmarks.',
    themeColor: {
      accent: 'amber',
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-800',
      borderHover: 'hover:border-amber-300',
      buttonBg: 'bg-amber-600 hover:bg-amber-700',
      buttonHover: 'hover:bg-amber-700',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
  },
  {
    id: 'bhashini',
    name: 'BHASHINI',
    category: 'Indian Languages • Voice & Translation',
    description: 'Explore multilingual language services and language technology resources.',
    officialServiceLabel: 'National Language Technology Platform',
    primaryUrl: 'https://bhashini.gov.in/',
    defaultActionLabel: 'EXPLORE BHASHINI',
    badge: {
      text: 'PLANNED PRODUCTION LANGUAGE LAYER',
      variant: 'purple',
    },
    note: 'BHASHINI is planned as a production language layer and is not currently integrated into the UNNATIAI prototype.',
    themeColor: {
      accent: 'purple',
      badgeBg: 'bg-purple-50',
      badgeText: 'text-purple-800',
      borderHover: 'hover:border-purple-300',
      buttonBg: 'bg-purple-600 hover:bg-purple-700',
      buttonHover: 'hover:bg-purple-700',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  },
  {
    id: 'pmajay',
    name: 'PM-AJAY',
    category: 'Scheme Information • Livelihood Support',
    description: 'Learn about the PM-AJAY scheme and livelihood-oriented support for SC communities.',
    officialServiceLabel: 'Ministry Scheme Programme Framework',
    primaryUrl: 'https://socialjustice.gov.in/index.php/schemes/104',
    secondaryUrl: 'https://pmajay.dosje.gov.in/',
    defaultActionLabel: 'LEARN ABOUT PM-AJAY',
    note: 'Learn about the Grant-in-Aid (GIA) component and welfare guidelines directly on official ministry portals.',
    themeColor: {
      accent: 'orange',
      badgeBg: 'bg-orange-50',
      badgeText: 'text-orange-800',
      borderHover: 'hover:border-orange-300',
      buttonBg: 'bg-orange-600 hover:bg-orange-700',
      buttonHover: 'hover:bg-orange-700',
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
  },
];
