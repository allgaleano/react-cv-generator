import { Text, View } from "@react-pdf/renderer";
import type { Section, SectionItem } from "@/types";
import { styles } from "@/styles";

interface SectionProps {
  section: Section;
}
const PDFSection = ({ section }: SectionProps) => {
  const contentRenderers = {
    bullets: (item: SectionItem) => (
      <View style={styles.bulletList}>
        {item.list?.map((bullet, i) => (
          <View key={i} style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>{bullet}</Text>
          </View>
        ))}
      </View>
    ),
    text: (item: SectionItem) => (
      <Text style={styles.paragraph}>{item.text}</Text>
    ),
    joinedList: (item: SectionItem) => (
      <Text style={styles.paragraph}>{item.list?.join(", ")}</Text>
    ),
  };
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
          {contentRenderers[section.type]?.(item)}
        </View>
      ))}
    </View>
  );
};
export default PDFSection;
