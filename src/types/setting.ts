export interface Plan {
    id: number;
    name: { en: string; ar: string };
    price: string | number;
    max_services: number;
    commission_rate: string | number;
    features: { en: string[]; ar: string[] };
}

export interface DropdownItem {
    id?: string | number;
    name: {
        en: string;
        ar: string;
    } | string;
}

export interface DropdownBlockProps {
    title: string;
    items: any;
    categoryKey: string;
    isLoading?: boolean;
}
