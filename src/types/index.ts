export interface CVData {
  personal: Personal;
  sections: Section[];
}

export interface Personal {
  name: string;
  contactData: string[];
  urls: string[][];
}

export interface SectionItem {
  title: string;
  subtitle?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  list?: string[];
  text?: string;
}

export interface Section {
  id: string;
  type: string;
  title: string;
  data: SectionItem[];
}
