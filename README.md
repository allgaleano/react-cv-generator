# CV Generator

A modern, ATS-friendly CV/Resume generator built with React and @react-pdf/renderer. Create professional resumes with real-time PDF preview and multi-language support.

## Features

- **Real-time PDF Preview** - See your CV update instantly as you edit
- **Multi-language Support** - Switch between English and Spanish versions
- **ATS-Optimized** - Designed for maximum compatibility with Applicant Tracking Systems
- **Custom Fonts** - Uses Open Sans for a modern, professional look
- **PDF Metadata** - Includes proper metadata for better discoverability
- **Clean Structure** - Simple, single-column layout that ATS systems can parse easily
- **Downloadable** - Export your CV as a high-quality PDF

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **@react-pdf/renderer** - PDF generation
- **Tailwind CSS** - Styling
- **Vite** - Build tool (assumed)

## Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd cv-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
├── src/
│   ├── data/
│   │   ├── cv-en.json       # English CV data
│   │   └── cv-es.json       # Spanish CV data
│   ├── components/
│   │   ├── App.tsx          # Main application component
│   │   ├── menu.tsx         # Language selector and download options
│   │   ├── section.tsx      # Reusable section component
│   │   ├── bullet-list.tsx  # Bullet point list component
│   │   └── pdf-document.tsx # PDF generation component
│   └── types.ts             # TypeScript type definitions
├── public/
│   └── fonts/
│       ├── OpenSans-Regular.ttf
│       ├── OpenSans-Italic.ttf
│       └── OpenSans-SemiBold.ttf
└── package.json
```

## CV Data Structure

The CV data is stored in JSON format with the following structure:

```json
{
  "personal": {
    "name": "Your Name",
    "email": "email@example.com",
    "phone": "+1234567890",
    "linkedin": "linkedin.com/in/yourprofile",
    "linkedinURL": "https://linkedin.com/in/yourprofile",
    "github": "github.com/yourusername",
    "githubURL": "https://github.com/yourusername",
    "website": "yourwebsite.com",
    "websiteURL": "https://yourwebsite.com"
  },
  "experience": {
    "title": "Professional Experience",
    "items": [
      {
        "company": "Company Name",
        "position": "Job Title",
        "location": "City, Country",
        "startDate": "MM/YYYY",
        "endDate": "MM/YYYY",
        "bullets": [
          "Achievement or responsibility 1",
          "Achievement or responsibility 2"
        ]
      }
    ]
  },
  "projects": {
    "title": "Projects",
    "items": [
      {
        "name": "Project Name",
        "startDate": "MM/YYYY",
        "endDate": "MM/YYYY",
        "bullets": [
          "Project description and achievements"
        ]
      }
    ]
  },
  "education": {
    "title": "Education",
    "items": [
      {
        "degree": "Degree Name",
        "institution": "University Name",
        "startDate": "MM/YYYY",
        "endDate": "MM/YYYY",
        "bullets": [
          "Relevant coursework or achievements"
        ]
      }
    ]
  },
  "skills": {
    "title": "Technical Skills",
    "items": [
      "Skill 1",
      "Skill 2",
      "Skill 3"
    ]
  }
}
```

## Customization

### Adding Custom Fonts

1. Place your `.ttf` font files in `public/fonts/`
2. Register them in `pdf-document.tsx`:

```typescript
Font.register({
  family: "Your Font",
  fonts: [
    { src: "/fonts/YourFont-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/YourFont-Bold.ttf", fontWeight: 600 }
  ]
});
```

3. Update the `fontFamily` in styles:

```typescript
const styles = StyleSheet.create({
  page: {
    fontFamily: "Your Font",
    // ... other styles
  }
});
```

### Modifying PDF Layout

Edit `pdf-document.tsx` to adjust:
- Font sizes
- Spacing and margins
- Section order
- Colors and borders

### Adding More Languages

1. Create a new JSON file in `src/data/` (e.g., `cv-fr.json`)
2. Update the language selector in `menu.tsx`
3. Add the import in `App.tsx`

## ATS Optimization Tips

This CV generator follows ATS best practices:

- Single-column layout
- Standard section headings
- Simple, clean formatting
- No images or graphics
- Standard fonts (Open Sans/Helvetica)
- Real, selectable text (not images)
- Proper use of bullet points
- Clear date formats

## PDF Metadata

The generated PDF includes metadata for better organization:
- Title
- Author
- Subject
- Keywords
- Creator
- Producer

This helps with document management systems and search indexing.

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Acknowledgments

- [@react-pdf/renderer](https://react-pdf.org/) - PDF generation library
- [Open Sans](https://fonts.google.com/specimen/Open+Sans) - Font by Steve Matteson