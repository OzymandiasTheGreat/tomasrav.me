import MDI from "@expo/vector-icons/MaterialCommunityIcons"
import { Link } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

import SharedInfo from "@/assets/content/shared-info.json"
import { createThemedStylesheet } from "@/hooks/use-theme"

export default function Footer() {
  const styles = useStyles()

  return (
    <View style={styles.copyright}>
      <Link
        href={SharedInfo.copyright.link as any}
        target="_blank"
        style={styles.copyrightLink}
      >
        {SharedInfo.copyright.icons.map((name, i) => (
          <MDI
            key={`${i}-${name}`}
            name={name as any}
            size={24}
            color={styles.copyrightIcon.color}
            style={styles.copyrightIcon}
          />
        ))}
        {SharedInfo.copyright.license}
        <Text style={styles.copyrightText}>
          {" "}
          - {SharedInfo.copyright.year} - {SharedInfo.me}
        </Text>
      </Link>
    </View>
  )
}

const useStyles = createThemedStylesheet((theme, portrait) =>
  StyleSheet.create({
    copyright: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 32,
    },
    copyrightIcon: {
      color: theme.colors.text,
      marginEnd: 8,
      verticalAlign: "middle",
    },
    copyrightLink: {
      ...theme.fonts.ui.bold,
      fontSize: 16,
      color: theme.colors.text,
    },
    copyrightText: {
      ...theme.fonts.ui.regular,
      fontSize: 16,
      color: theme.colors.text,
    },
  }),
)
