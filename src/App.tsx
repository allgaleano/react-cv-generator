import { useState } from "react";
import cvEnglish from "./data/en.json";
import cvSpanish from "./data/es.json";
import { Menu } from "./components/menu";
import { PDFViewer } from "@react-pdf/renderer";
import PDFDocument from "./pdf-document";
import type { CVData } from "./types";
import { JsonEditorDialog } from "./components/json-editor-dialog";

function App() {
  const [language, setLanguage] = useState<"en"|"es">("en");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [cvDataEn, setCvDataEn] = useState<CVData>(cvEnglish);
  const [cvDataEs, setCvDataEs] = useState<CVData>(cvSpanish);

  const cvData = language === "en" ? cvDataEn : cvDataEs;

  const handleSaveCV = (data: CVData, lang: "en" | "es") => {
    if (lang === "en") {
      setCvDataEn(data);
    } else {
      setCvDataEs(data);
    }
    console.log(`Saved ${lang} CV:`, data);
    // TODO: Save to localStorage
  };

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(cvData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cv-${language}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-50 h-dvh">
      <Menu 
        language={language}
        setLanguage={setLanguage}
        setIsEditorOpen={setIsEditorOpen}
        handleDownloadJSON={handleDownloadJSON} 
      />
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        <PDFDocument cvData={cvData} lang={language.toUpperCase()} />
      </PDFViewer>
      <JsonEditorDialog
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        language={language}
        onLanguageChange={setLanguage}
        cvData={cvData}
        onSave={handleSaveCV}
      />
    </div>
  );
}

export default App;
