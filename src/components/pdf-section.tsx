import { Text, View } from "@react-pdf/renderer";
import type { Section } from "@/types";
import { styles } from "@/styles";

interface SectionProps {
  section: Section;
}
const PDFSection = ({ section }: SectionProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.data.map((item, i) => (
        <View key={i} style={styles.item} wrap={false}>
          <View style={styles.itemHeader}>
            <View style={styles.leftColumn}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              {item.subtitle && (
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              )}
            </View>
            {((item.startDate && item.endDate) || item.location) && (
              <View style={styles.rightColumn}>
                {item.location && (
                  <Text style={styles.location}>{item.location}</Text>
                )}
                {item.startDate && item.endDate && (
                  <Text style={styles.date}>
                    {item.startDate} - {item.endDate}
                  </Text>
                )}
              </View>
            )}
          </View>
          {section.type == "bullets" && (
            <View style={styles.bulletList}>
              {item.list?.map((bullet, i) => (
                <View key={i} style={styles.bullet}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          )} 
          {section.type == "text" && (
            <Text style={styles.paragraph}>{item.text}</Text>
          )}
          {section.type == "joinedList" && (
            <Text style={styles.paragraph}>{item.list?.join(", ")}</Text>
          )}
        </View>
      ))}
    </View>
  );
};
export default PDFSection;
