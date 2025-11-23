import {
  Document,
  Page,
  Font,
} from "@react-pdf/renderer";
import type { CVData } from "@/types";
import { styles } from "@/styles";
import PDFHeader from "@/components/pdf-header";
import PDFSection from "@/components/pdf-section";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "/fonts/OpenSans-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "/fonts/OpenSans-Italic.ttf",
      fontStyle: "italic",
      fontWeight: 400,
    },
    {
      src: "/fonts/OpenSans-SemiBold.ttf",
      fontWeight: 600,
    }
  ]
});

const PDFDocument = ({ cvData, lang }: { cvData: CVData, lang: string }) => (
  <Document
    title={
      `${cvData.personal.name
        .toUpperCase()
        .split(" ")
        .join("_")}_${lang}_CV`
    }
    author={cvData.personal.name || ""}
    subject={`Resume/CV for ${cvData.personal.name || ""}`}
    keywords="resume, cv, software engineer, developer"
    creator={cvData.personal.name || ""}
    producer="albertogaleano.com"
  >
    <Page size="A4" style={styles.page}>
      <PDFHeader personal={cvData.personal}/>
      {cvData.sections.map((section, i) => (
        <PDFSection key={`section-${section.title}-${i}`} section={section}/>
      ))}
    </Page>
  </Document>
);

export default PDFDocument;
