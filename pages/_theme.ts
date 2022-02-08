import { useEffect, useState } from "react";
import { useColorScheme, StyleSheet } from "react-native";

const dark = StyleSheet.create({
	text: {
		color: "#efefef",
	},
	container: {
		backgroundColor: "#212121",
	},
});

const light = StyleSheet.create({
	text: {
		color: "#212121",
	},
	container: {
		backgroundColor: "#efefef",
	},
});

const Theme = { dark, light };

const useTheme = (): typeof Theme["dark"] => {
	const scheme = useColorScheme();
	const [theme, setTheme] = useState<"light" | "dark">("light");
	useEffect(() => setTheme(scheme || "light"), [scheme]);
	return Theme[theme];
};

export default useTheme;
