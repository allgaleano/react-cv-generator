# CV Generator

A modern, professional CV/Resume generator with **live JSON editing**, real-time PDF preview, and multi-language support. Built with React, TypeScript, and Monaco Editor for a VS Code-like editing experience.

## Features

### Core Features
- **Live JSON Editor** - Monaco Editor (VS Code) with syntax highlighting and validation
- **Real-time PDF Preview** - See changes instantly as you edit
- **Schema Validation** - JSON Schema ensures data integrity with autocomplete and error detection
- **Multi-language Support** - English and Spanish with easy language switching
- **Auto-save** - Changes persist in localStorage across sessions

### Technical Features
- **ATS-Optimized** - Designed for maximum compatibility with Applicant Tracking Systems
- **Custom Fonts** - Uses Open Sans for a modern, professional look
- **PDF Metadata** - Includes proper metadata for better discoverability
- **Type Safety** - Full TypeScript support with strict validation
- **Schema-driven** - JSON Schema ensures data consistency
- **Clean Architecture** - Well-organized, maintainable codebase

## Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd react-cv-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser and start editing! Changes save automatically.

## 💻 Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **@react-pdf/renderer** - PDF generation
- **@monaco-editor/react** - Code editor (VS Code engine)
- **JSON Schema** - Data validation
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## 📁 Project Structure

```
cv-generator/
├── src/
│   ├── data/
│   │   ├── en.json         # English CV data
│   │   ├── es.json         # Spanish CV data
│   │   └── schema.json     # JSON Schema for validation
│   │
│   ├── components/
│   │   ├── json-editor-panel.tsx   # Monaco editor panel
│   │   ├── menu.tsx                # Language selector
│   │   ├── pdf-document.tsx        # PDF generation
│   │   ├── pdf-header.tsx          # PDF header component
│   │   └── pdf-section.tsx         # PDF section component
│   │
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   │
│   ├── App.tsx                # Main app with split layout
│   └── main.tsx               # Entry point
│
├── public/
│   └── fonts/
│       ├── OpenSans-Regular.ttf
│       ├── OpenSans-Italic.ttf
│       └── OpenSans-SemiBold.ttf
│
└── package.json
```

## CV Data Structure

The CV follows a schema-validated JSON structure:

```json
{
  "$schema": "./schema.json",
  "personal": {
    "name": "Your Name",
    "contactData": [
      "email@example.com",
      "+1234567890",
      "City, Country"
    ],
    "urls": [
      ["linkedin.com/in/profile", "https://linkedin.com/in/profile"],
      ["github.com/username", "https://github.com/username"],
      ["yourwebsite.com", "https://yourwebsite.com"]
    ]
  },
  "sections": [
    {
      "id": "experience",
      "type": "bullets",
      "title": "Experience",
      "data": [
        {
          "title": "Company Name",
          "subtitle": "Job Title",
          "location": "City, Country",
          "startDate": "Feb 2025",
          "endDate": "May 2025",
          "list": [
            "Achievement 1 with metrics",
            "Achievement 2 with impact"
          ]
        }
      ]
    },
    {
      "id": "education",
      "type": "bullets",
      "title": "Education",
      "data": [
        {
          "title": "Degree Name",
          "subtitle": "University Name",
          "location": "City",
          "startDate": "Sep 2021",
          "endDate": "Jun 2025",
          "list": ["Notable achievement"]
        }
      ]
    },
    {
      "id": "skills",
      "type": "joinedList",
      "title": "Skills",
      "data": [
        {
          "title": "",
          "list": ["Skill 1", "Skill 2", "Skill 3"]
        }
      ]
    }
  ]
}
```

### Section Types

- **`bullets`** - For experience, education, projects with bullet points
- **`text`** - For paragraph-style content
- **`joinedList`** - For comma-separated lists (skills)

## 🎯 Usage Guide

### Editing Your CV

1. **Switch Language** - Click EN or ES buttons to switch languages
2. **Edit JSON** - Use the Monaco editor on the left with full autocomplete
3. **See Preview** - PDF updates instantly on the right
4. **Save** - Click "Save" button (or press Ctrl+S)
5. **Download** - Click "💾 Download" to export as PDF

### Editor Features

- **Autocomplete** - Press `Ctrl+Space` for suggestions
- **Validation** - Errors highlighted in real-time
- **Format** - Click "Format" button or press `Shift+Alt+F`
- **Status** - See validation state in status bar
- **Reset** - Restore original data if needed

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` | Save changes |
| `Shift+Alt+F` | Format JSON |
| `Ctrl+Space` | Autocomplete |
| `Ctrl+F` | Find |
| `Ctrl+H` | Find and replace |
| `F1` | Command palette |

### Resizing the Layout

- Hover over the divider between editor and PDF
- Click and drag to adjust width (30-70%)
- Your preference is saved automatically

## 🔧 Customization

### Adding New Languages

1. Create a new JSON file (e.g., `fr.json`):
```bash
cp src/data/en.json src/data/fr.json
```

2. Update `App.tsx`:
```tsx
import cvFrench from "./data/fr.json";

const [cvDataFr, setCvDataFr] = useState(cvFrench);

// Add to language selector
```

### Custom Fonts

1. Add font files to `public/fonts/`
2. Register in `pdf-document.tsx`:

```tsx
Font.register({
  family: "Your Font",
  fonts: [
    { src: "/fonts/YourFont-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/YourFont-Bold.ttf", fontWeight: 600 }
  ]
});
```

3. Update styles:
```tsx
const styles = StyleSheet.create({
  page: {
    fontFamily: "Your Font",
  }
});
```

### PDF Layout

Edit styling in `pdf-document.tsx`:
- Font sizes and spacing
- Colors and borders
- Section order
- Page margins

### Schema Customization

Modify `cv-schema.json` to:
- Add new fields
- Change validation rules
- Add new section types
- Customize descriptions

## Schema Validation

The JSON Schema provides:
- **Required field validation**
- **Type checking** (strings, arrays, objects)
- **Enum validation** (e.g., section types)
- **Pattern matching**
- **Min/max constraints**

### Example Validation Errors

```json
// Missing required field
{
  "personal": {
    "name": "Test"
    // ❌ Error: Missing 'contactData'
  }
}

// Invalid section type
{
  "sections": [{
    "type": "invalid"  // ❌ Must be: bullets, text, or joinedList
  }]
}
```

## 💾 Data Persistence

### LocalStorage

Your CV data is automatically saved to localStorage:
- **Key pattern**: `cv-data-{language}`
- **Storage**: `cv-data-en`, `cv-data-es`
- **Auto-save**: On every save
- **Auto-load**: On app start

### Reset Options

- **Reset Current** - Click "Reset to Original" in editor
- **Reset All** - Click "🔄 Reset All" in menu bar

### Download Backup

Click "💾 Download" to export your CV as JSON:
- Useful for backups
- Share across devices
- Version control

## 🎨 ATS Optimization

This CV generator follows ATS best practices:

### Layout
- ✅ Single-column layout
- ✅ Standard section headings
- ✅ Simple, clean formatting
- ✅ No tables or complex layouts

### Content
- ✅ Real, selectable text (not images)
- ✅ Standard fonts (Open Sans)
- ✅ Clear date formats
- ✅ Proper use of bullet points

### Technical
- ✅ Proper PDF structure
- ✅ Embedded fonts
- ✅ Metadata included
- ✅ No form fields or scripts

## 📄 PDF Metadata

Generated PDFs include:
- **Title** - `{NAME}_CV`
- **Author** - Your name
- **Subject** - Resume/CV description
- **Keywords** - "resume, cv, software engineer, developer"
- **Creator** - Your name
- **Producer** - Your website

This helps with document management and search indexing.

## 🏗️ Building for Production

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

Build artifacts are in `dist/` directory.

## Advanced Features

### Add Validation Script

```bash
# Install Ajv
npm install ajv ajv-formats

# Run validator
node validate-cv.js cv-en.json
```

### Backend Integration

```tsx
const handleSaveCV = async (data, lang) => {
  await fetch(`/api/cv/${lang}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  setCvData(data);
};
```

### Version Control

```tsx
const dataWithVersion = {
  version: "1.0",
  data: cvData,
  savedAt: new Date().toISOString()
};
localStorage.setItem(key, JSON.stringify(dataWithVersion));
```

## Resources

- [Monaco Editor API](https://microsoft.github.io/monaco-editor/api/index.html)
- [@react-pdf/renderer Docs](https://react-pdf.org/)
- [JSON Schema Guide](https://json-schema.org/understanding-json-schema/)
- [ATS Optimization Tips](https://www.jobscan.co/blog/ats-resume/)

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Acknowledgments

- **[@react-pdf/renderer](https://react-pdf.org/)** - PDF generation
- **[Monaco Editor](https://microsoft.github.io/monaco-editor/)** - Code editor
- **[Open Sans](https://fonts.google.com/specimen/Open+Sans)** - Font by Steve Matteson
- **[JSON Schema](https://json-schema.org/)** - Data validation standard