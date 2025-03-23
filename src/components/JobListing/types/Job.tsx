export interface Job {
    id?: string;
    _id: string
    city: string
    company: string
    company_type: string
    country: string
    department: string
    link: string
    location: string
    logo: string
    overview: string
    scraped_at: string
    slug?: string
    title: string
    published_at?: string;
    created_at?: string;
    min_salary?: number;
    max_salary?: number;
}