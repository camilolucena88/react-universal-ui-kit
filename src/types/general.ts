interface CourseDetail {
  pk: number;
  title: string;
  short_description: string;
  extra_description: string;
  includes: string;
  features: string[] | null;
  start_at: string;            // ISO date format, e.g., "2024-10-01"
  end_at: string;              // ISO date format, e.g., "2024-10-31"
  img_cdn: string;
  price: number;
  created_at: string;          // ISO date format with timezone, e.g., "2024-10-06T10:29:14.078330-04:00"
}

export interface Service {
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
}

export interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface FAQItem {
  question: string;
  answer: string;
}

type CourseDetails = CourseDetail[];