import { useState, useEffect } from "react";
import cvEnglish from "./data/en.json";
import cvSpanish from "./data/es.json";
import cvSchema from "./data/schema.json";
import { PDFViewer } from "@react-pdf/renderer";
import PDFDocument from "./components/pdf-document";
import { JsonEditor } from "@/components/json-editor";
import type { CVData } from "./types";

const STORAGE_KEY = "cv-data";

function App() {
  const [language, setLanguage] = useState<"en" | "es">("en");
  
  // State to hold the CV data
  const [cvDataEn, setCvDataEn] = useState<CVData>(cvEnglish);
  const [cvDataEs, setCvDataEs] = useState<CVData>(cvSpanish);
  const [pdfKey, setPdfKey] = useState(0);
  
  // Load from localStorage on mount
  useEffect(() => {
    const load = (lang: "en" | "es", def: CVData, setter: (d: CVData) => void) => {
      try {
        const raw = localStorage.getItem(`${STORAGE_KEY}-${lang}`);
        if (raw) {
          setter(JSON.parse(raw));
          console.log("Loaded", lang);
        } else {
          setter(def);
        }
      } catch {
        setter(def);
      }
    };

    load("en", cvEnglish, setCvDataEn);
    load("es", cvSpanish, setCvDataEs);
  }, []);

  const cvData = language === "en" ? cvDataEn : cvDataEs;

  const handleSaveCV = (data: CVData, lang: "en" | "es") => {
    if (lang === "en") {
      setCvDataEn(data);
    } else {
      setCvDataEs(data);
    }
    console.log(`Saved ${lang} CV:`, data);
    setPdfKey(k => k + 1);
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

  const handleResetAll = () => {
    if (window.confirm("Reset ALL data to original? This will clear localStorage for both languages.")) {
      localStorage.removeItem(`${STORAGE_KEY}-en`);
      localStorage.removeItem(`${STORAGE_KEY}-es`);
      setCvDataEn(cvEnglish);
      setCvDataEs(cvSpanish);
      console.log("Reset all CV data to original");
    }
  };

  const onReset = () => {
    if (language == "en") {
      setCvDataEn(cvEnglish);
    } else {
      setCvDataEs(cvDataEs);
    }

    setPdfKey(k => k + 1);
    console.log(`Reset ${language} CV to original`);
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Top Menu Bar */}
      <div className="bg-[#3c3c3c] flex items-center justify-between px-4 shrink-0">
        <div className="flex gap-2 py-1">
          <button
            onClick={handleDownloadJSON}
            className="px-3 py-1 text-sm text-white bg-[#303030] hover:bg-[#4d4d4d] rounded"
          >
            💾 Download
          </button>
          <button
            onClick={handleResetAll}
            className="px-3 py-1 text-sm text-white bg-red-900 hover:bg-red-600 rounded"
          >
            🔄 Reset All
          </button>
        </div>
        <span className="text-white">v2.0.1</span>
      </div>

      {/* Resizable split layout */}
      <div 
        className="
          flex-1 flex overflow-hidden
          flex-row                     /* default: side-by-side */
          max-[1200px]:flex-col-reverse /* <600px: PDF on top, editor on bottom */
        "
      >
        {/* JSON Editor - Left Side */}
        <div 
          className="
            border-r border-gray-700
            w-[50%]                /* desktop width */
            max-[1200px]:w-full     /* full width on mobile */
            max-[1200px]:h-1/2      /* half height on mobile */
          "
        >
          <JsonEditor
            language={language}
            onLanguageChange={setLanguage}
            cvData={cvData}
            onSave={handleSaveCV}
            onReset={onReset}
            schema={cvSchema}
          />
        </div>

        {/* PDF Viewer - Right Side */}
        <div 
          className="
            bg-gray-800
            w-[50%]                /* desktop width */
            max-[1200px]:w-full     /* full width on mobile */
            max-[1200px]:h-1/2      /* half height on mobile */
          "
        >
          <PDFViewer key={pdfKey} style={{ width: "100%", height: "100%", border: "none" }}>
            <PDFDocument cvData={cvData} lang={language.toUpperCase()} />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
}

export default App;