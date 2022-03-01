import "../fallback.css";
import "./resume/resume.print.css";
import "setimmediate";
import Head from "next/head";
import { AppProps } from "next/app";
import React from "react";
import Particles from "preact-particles";
// @ts-ignore
import { loadSnowPreset } from "tsparticles-preset-snow/tsparticles.preset.snow";
import { COLOR_SITE_BG, COLOR_BUBBLE } from "../theme";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	const init = (main: any) => loadSnowPreset(main);

	return (
		<>
			<Head>
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="icon" type="image/png" href="/favicon.png" />
			</Head>

			<Particles
				width="100%"
				height="100%"
				init={init as any}
				options={{
					preset: "snow",
					fullScreen: {
						enable: true,
						zIndex: -1000,
					},
					background: {
						color: COLOR_SITE_BG,
						size: "cover",
					},
					particles: {
						color: {
							value: COLOR_BUBBLE,
						},
						opacity: {
							value: 0.25,
							random: {
								enable: true,
								minimumValue: 0.05,
							},
						},
						number: {
							value: 13,
							density: {
								enable: true,
								value_area: 1000,
							},
						},
						size: {
							value: 48,
							random: {
								enable: true,
								minimumValue: 8,
							},
						},
						move: {
							enable: true,
							speed: 0.5,
							direction: "none",
						},
					},
					retina_detect: true,
				}}
			/>
			<Component {...pageProps} />
		</>
	);
};

export default App;
