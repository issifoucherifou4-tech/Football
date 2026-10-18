export type AdFormat = 'infeed' | 'floating-mobile' | 'medium-rect' | 'hero-billboard' | 'official-embed';

export type AdTheme = 'barca' | 'dark' | 'sunset' | 'light';

export type DeviceMode = 'mobile' | 'tablet' | 'desktop';

export interface AdConfig {
  pinUrl: string;
  pinShortUrl: string;
  pinId: string;
  title: string;
  description: string;
  author: string;
  imageUrl: string;
  videoUrl?: string;
  videoDownloadUrl?: string;
  ctaText: string;
  badgeText: string;
  theme: AdTheme;
  format: AdFormat;
  enableAnimation: boolean;
  showMetrics: boolean;
}

export interface AdMetrics {
  impressions: number;
  clicks: number;
  saves: number;
  ctr: number;
}
