import { useState } from "react";
import cvEnglish from "./data/cv-en.json";
import cvSpanish from "./data/cv-es.json";
import { Menu } from "./menu";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFDocument } from "./pdf-document";
// import CV from "./html-cv";

function App() {
  const [language, setLanguage] = useState("en");
  const cvData = language === "en" ? cvEnglish : cvSpanish;

  return (
    <div className="bg-gray-50 h-dvh">
      <Menu language={language} setLanguage={setLanguage} />
      {/* <CV cvData={cvData} /> */}
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        <PDFDocument cvData={cvData} lang={language.toUpperCase()} />
      </PDFViewer>
    </div>
  );
}

export default App;
