export type BusinessAddress = {
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
  streetAddress?: string;
  postalCode?: string;
};

export type BusinessGeo = {
  latitude: number;
  longitude: number;
};

export type OpeningHours = {
  dayOfWeek: string[];
  opens: string;
  closes: string;
};

export type ServiceEntry = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
};

export type FaqEntry = {
  question: string;
  answer: string;
};

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};
