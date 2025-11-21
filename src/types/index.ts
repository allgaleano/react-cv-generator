export interface CVData {
  personal: Personal;
  sections: Section[];
}

export interface Personal {
  name: string;
  contactData: string[];
  urls: [string, string][];
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

export type SectionType = "bullets" | "text" | "joinedList";

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  data: SectionItem[];
}
