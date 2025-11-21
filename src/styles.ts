import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
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
  itemTitle: {
    fontWeight: 600,
    marginBottom: 0,
  },
  itemSubtitle: {
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
  paragraph: {
    textAlign: "justify",
  },
  link: {
    color: "#000",
    textDecoration: "none",
  },
});
