import { Text, View, Link } from "@react-pdf/renderer";
import type { CVData } from "@/types";
import { styles } from "@/styles";

interface HeaderProps {
  personal: CVData["personal"];
}
const PDFHeader = ({ personal }: HeaderProps) => (
  <View style={styles.header}>
    <Text style={styles.name}>{personal.name}</Text>
    <View style={styles.contactInfo}>
      {personal.contactData.map((info, i) => (
        <View key={i} style={styles.contactInfo}>
          <Text style={styles.contactItem}>{info}</Text>
          <Text style={styles.separator}>|</Text>
        </View>
      ))}
      {personal.urls.map(([text, url], i) => (
        <View key={i} style={styles.contactInfo}>
          <Link src={url} style={styles.link}>
            {text}
          </Link>
          {i != personal.urls.length - 1 && (
            <Text style={styles.separator}>|</Text>
          )}
        </View>
      ))}
    </View>
  </View>
);

export default PDFHeader;
