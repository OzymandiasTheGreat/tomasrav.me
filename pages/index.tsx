// @generated: @expo/next-adapter@3.1.17
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Link from "next/link";
import { useTranslation, useLanguageQuery } from "next-export-i18n";
import {
	useFonts,
	FiraSansCondensed_400Regular,
} from "@expo-google-fonts/dev";

export default function App() {
	const { t } = useTranslation();
	const [query] = useLanguageQuery();
	const [enq] = useLanguageQuery("en");
	const [ltq] = useLanguageQuery("lt");

	useFonts({ fira: FiraSansCondensed_400Regular });

	return (
		<View style={styles.container}>
			<Link passHref href={{ query: query?.lang === "en" ? ltq : enq }}>
				<Text style={styles.text}>{t("hi")} 👋</Text>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontFamily: "fira",
		fontSize: 16,
	},
});
