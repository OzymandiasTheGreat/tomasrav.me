import { Image, StyleSheet, Text, View } from "react-native"
import MDI from "@expo/vector-icons/MaterialCommunityIcons"
import { Link } from "expo-router"
import { useStrings } from "@/hooks/useStrings"
import { createThemedStylesheet, useTheme } from "@/hooks/useTheme"

export default function NotFoundScreen() {
  const theme = useTheme()
  const styles = useStyle()
  const strings = useStrings()
  return (
    <View style={styles.root}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>{strings.droids}</Text>
        <Image source={{ uri: "/images/r2d2.svg", width: 256, height: 256 }} resizeMode="contain" style={styles.image} />
      </View>
      <Link href="/" style={styles.close}>
        <MDI name="close" size={32} color={theme.colors.text} />
      </Link>
    </View>
  )
}

const useStyle = createThemedStylesheet((theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    close: {
      position: "absolute",
      top: theme.spacing.small,
      right: theme.spacing.small,
    },
    wrapper: {
      backgroundColor: theme.colors.shadowInverted,
      borderRadius: 13,
      padding: theme.spacing.large,
    },
    text: {
      color: theme.colors.text,
      fontFamily: theme.fonts.regular,
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: theme.spacing.large,
    },
    image: {
      alignSelf: "center",
      opacity: 0.75,
    },
  }),
)
