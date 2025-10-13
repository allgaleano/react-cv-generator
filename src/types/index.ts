export interface CVData {
  personal: {
    name: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    linkedinURL: string;
    github: string;
    githubURL: string;
    website: string;
    websiteURL: string;
  };
  experience: {
    title: string;
    items: Array<{
      company: string;
      position: string;
      location: string;
      startDate: string;
      endDate: string;
      bullets: string[];
    }>;
  };
  projects: {
    title: string;
    items: Array<{
      name: string;
      startDate: string;
      endDate: string;
      bullets: string[];
    }>;
  };
  education: {
    title: string;
    items: Array<{
      degree: string;
      institution: string;
      startDate: string;
      endDate: string;
      bullets: string[];
    }>;
  };
  skills: {
    title: string;
    items: string[];
  };
}