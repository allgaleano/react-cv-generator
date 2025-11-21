import { useState } from "react";
import cvEnglish from "./data/en.json";
import cvSpanish from "./data/es.json";
import { Menu } from "./components/menu";
import { PDFViewer } from "@react-pdf/renderer";
import PDFDocument from "./pdf-document";
import type { CVData } from "./types";

function App() {
  const [language, setLanguage] = useState("en");
  const cvData = (language === "en" ? cvEnglish : cvSpanish) as unknown as CVData;

  return (
    <div className="bg-gray-50 h-dvh">
      <Menu language={language} setLanguage={setLanguage} />
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        <PDFDocument cvData={cvData} lang={language.toUpperCase()} />
      </PDFViewer>
    </div>
  );
}

export default App;
