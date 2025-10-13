import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";
import type { CVData } from "./types";

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
})

const styles = StyleSheet.create({
  page: {
    padding: "25pt",
    fontSize: 10,
    fontFamily: "Open Sans",
    lineHeight: 1.4,
  },
  header: {
    textAlign: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
  },
  contactItem: {
    marginHorizontal: 2,
  },
  separator: {
    marginHorizontal: 0,
  },
  section: {},
  sectionTitle: {
    fontWeight: 600,
    textAlign: "center",
    marginBottom: 4,
    paddingBottom: 2,
    borderBottom: "0.5pt solid rgba(0, 0, 0, 0.2)",
  },
  item: {
    marginBottom: 4,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    alignItems: "flex-end",
  },
  company: {
    fontWeight: 600,
    marginBottom: 0,
  },
  position: {
    fontStyle: "italic",
  },
  location: {
    fontStyle: "italic",
  },
  date: {
    fontStyle: "italic",
  },
  bulletList: {
    marginTop: 4,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 1,
    alignItems: "flex-start",
  },
  bulletPoint: {
    width: 10,
    marginTop: 0,
  },
  bulletText: {
    flex: 1,
    textAlign: "justify",
  },
  skills: {
    textAlign: "justify",
  },
  link: {
    color: "#000",
    textDecoration: "none",
  },
});

export const PDFDocument = ({ cvData, lang }: { cvData: CVData, lang: string }) => (
  <Document
    title={`${cvData.personal.name.replace("í", "I").toUpperCase().split(" ").join("_")}_${lang}_CV`}
    author={cvData.personal.name}
    subject={`Resume/CV for ${cvData.personal.name}`}
    keywords="resume, cv, software engineer, developer"
    creator={cvData.personal.name}
    producer="albertogaleano.com"
  >
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{cvData.personal.name}</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>{cvData.personal.email}</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.contactItem}>{cvData.personal.phone}</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.contactItem}>{cvData.personal.address}</Text>
          <Text style={styles.separator}>|</Text>
          <Link src={cvData.personal.linkedinURL} style={styles.link}>
            <Text style={styles.contactItem}>{cvData.personal.linkedin}</Text>
          </Link>
          <Text style={styles.separator}>|</Text>
          <Link src={cvData.personal.githubURL} style={styles.link}>
            <Text style={styles.contactItem}>{cvData.personal.github}</Text>
          </Link>
          <Text style={styles.separator}>|</Text>
          <Link src={cvData.personal.websiteURL} style={styles.link}>
            <Text style={styles.contactItem}>{cvData.personal.website}</Text>
          </Link>
        </View>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{cvData.experience.title}</Text>
        {cvData.experience.items.map((exp, index) => (
          <View key={index} style={styles.item} wrap={false}>
            <View style={styles.itemHeader}>
              <View style={styles.leftColumn}>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.position}>{exp.position}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.location}>{exp.location}</Text>
                <Text style={styles.date}>
                  {exp.startDate} - {exp.endDate}
                </Text>
              </View>
            </View>
            <View style={styles.bulletList}>
              {exp.bullets.map((bullet, idx) => (
                <View key={idx} style={styles.bullet}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{cvData.projects.title}</Text>
        {cvData.projects.items.map((project, index) => (
          <View key={index} style={styles.item} wrap={false}>
            <View style={styles.itemHeader}>
              <View style={styles.leftColumn}>
                <Text style={styles.company}>{project.name}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.date}>
                  {project.startDate} - {project.endDate}
                </Text>
              </View>
            </View>
            <View style={styles.bulletList}>
              {project.bullets.map((bullet, idx) => (
                <View key={idx} style={styles.bullet}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{cvData.education.title}</Text>
        {cvData.education.items.map((edu, index) => (
          <View key={index} style={styles.item} wrap={false}>
            <View style={styles.itemHeader}>
              <View style={styles.leftColumn}>
                <Text style={styles.company}>{edu.degree}</Text>
                <Text style={styles.position}>{edu.institution}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.date}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
            </View>
            <View style={styles.bulletList}>
              {edu.bullets.map((bullet, idx) => (
                <View key={idx} style={styles.bullet}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{cvData.skills.title}</Text>
        <Text style={styles.skills}>{cvData.skills.items.join(", ")}.</Text>
      </View>
    </Page>
  </Document>
);
