import "setimmediate";
import Head from "next/head";
import { AppProps } from "next/app";
import {
	useColorScheme,
	View,
	ScrollView,
	ImageBackground,
} from "react-native";

function App({ Component, pageProps }: AppProps) {
	const scheme = useColorScheme();
	const bg =
		scheme === "dark"
			? require("../assets/bg-dark.svg")
			: require("../assets/bg-light.svg");

	return (
		<>
			<Head>
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="icon" type="image/png" href="/favicon.png" />
			</Head>

			<ImageBackground source={bg} style={{ flex: 1 }}>
				<Component {...pageProps} />
			</ImageBackground>
		</>
	);
}

export default App;
