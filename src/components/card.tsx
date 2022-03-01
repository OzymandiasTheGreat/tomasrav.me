import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import { A, H4, Strong } from "@expo/html-elements";
import { useSelectedLanguage, useTranslation } from "next-export-i18n";
import Icon from "@mdi/react";
import {
	mdiGithub,
	mdiDownload,
	mdiApplication,
	mdiLibrary,
	mdiLanguagePython,
	mdiWeb,
	mdiMicrosoftWindows,
	mdiNodejs,
	mdiLanguageJavascript,
	mdiLinux,
	mdiLanguageTypescript,
	mdiAndroid,
	mdiLanguageC,
	mdiAppleFinder,
} from "@mdi/js";
import { Markdown } from "@ozymandiasthegreat/react-native-markdown/src";
import * as github from "../api/github";
import { downloads as npm } from "../api/npm";
import { downloads as pypi } from "../api/pypi";
import type { Item } from "../types/portfolio";
import {
	COLOR_BUBBLE,
	COLOR_SITE_BG,
	COLOR_TEXT_BG,
	setOpacity,
	STYLE_BODY,
	STYLE_H4,
	FONT_LINK_R,
} from "../theme";

const TagMap: Record<string, string> = {
	app: mdiApplication,
	lib: mdiLibrary,
	node: mdiNodejs,
	web: mdiWeb,
	linux: mdiLinux,
	windows: mdiMicrosoftWindows,
	mac: mdiAppleFinder,
	android: mdiAndroid,
	python: mdiLanguagePython,
	javascript: mdiLanguageJavascript,
	typescript: mdiLanguageTypescript,
	c: mdiLanguageC,
};

const PortfolioCard: React.FC<{ item: Item }> = ({ item }) => {
	const { t } = useTranslation();
	const { lang } = useSelectedLanguage();
	const [image, setImage] = useState("");
	const [stars, setStars] = useState(0);
	const [downloads, setDownloads] = useState("UNKNOWN/month");

	useEffect(
		() =>
			setImage(
				item[lang].image ||
					(item[lang].tags.includes("app")
						? "/portfolio/app.svg"
						: "/portfolio/lib.svg"),
			),
		[item, lang],
	);
	useEffect(() => {
		github
			.stars(item[lang].owner, item[lang].repository)
			.then((s) => setStars(s));
	}, [item, lang]);
	useEffect(() => {
		if (item[lang].npm) {
			npm(item[lang].owner, item[lang].npm).then((d) =>
				setDownloads(`${d}/${t("portfolio.month")}`),
			);
		} else if (item[lang].pypi) {
			pypi(item[lang].pypi).then((d) =>
				setDownloads(`${d}/${t("portfolio/month")}`),
			);
		} else {
			github
				.downloads(item[lang].owner, item[lang].repository)
				.then((d) => setDownloads(`${d}`));
		}
	}, [item, t, lang]);

	return (
		<View
			style={{
				backgroundColor: COLOR_TEXT_BG,
				shadowColor: COLOR_BUBBLE,
				shadowOpacity: 0.6,
				shadowRadius: 7,
				width: 350,
				minHeight: 250,
				borderRadius: 3,
				margin: 10,
			}}>
			<ImageBackground
				source={{
					uri: image,
					width: 350,
					height: 250,
				}}
				resizeMode="contain"
				style={{
					width: 350,
					height: 250,
					justifyContent: "flex-end",
				}}>
				<View
					style={{
						backgroundColor: setOpacity(COLOR_SITE_BG, 0.75),
						width: "100%",
						height: 64,
						flexDirection: "row",
						alignItems: "flex-start",
						justifyContent: "space-between",
						paddingVertical: 10,
						paddingHorizontal: 15,
					}}>
					<View>
						<Text style={[STYLE_BODY, { color: COLOR_TEXT_BG }]}>
							<Icon
								path={mdiGithub}
								color={COLOR_TEXT_BG}
								size="24px"
								title={t("portfolio.stars")}
								style={{ verticalAlign: "middle" }}
							/>{" "}
							<Strong>{stars}</Strong>
						</Text>
						<Text style={[STYLE_BODY, { color: COLOR_TEXT_BG }]}>
							<Icon
								path={mdiDownload}
								color={COLOR_TEXT_BG}
								size="24px"
								title={t("portfolio.downloads")}
								style={{ verticalAlign: "middle" }}
							/>{" "}
							<Strong>{downloads}</Strong>
						</Text>
					</View>
					<View
						style={{
							alignSelf: "stretch",
							alignItems: "flex-end",
							justifyContent: "space-between",
						}}>
						<A
							href={item[lang].demo}
							style={[STYLE_BODY, FONT_LINK_R]}>
							{!!item[lang].demo && t("portfolio.action")}
						</A>
						<View
							style={{
								alignSelf: "flex-end",
								flexDirection: "row",
								alignItems: "flex-end",
								justifyContent: "flex-end",
							}}>
							{item[lang].tags.map((tag) => (
								<Icon
									key={tag}
									path={TagMap[tag]}
									color={COLOR_TEXT_BG}
									size="24px"
									title={tag[0].toUpperCase() + tag.slice(1)}
								/>
							))}
						</View>
					</View>
				</View>
			</ImageBackground>
			<H4
				style={[
					STYLE_H4,
					{ marginTop: 25, marginBottom: 0, marginHorizontal: 25 },
				]}>
				<A
					href={`https://github.com/${item[lang].owner}/${item[lang].repository}/#readme`}>
					{item[lang].name}
				</A>
			</H4>
			<Markdown
				source={{ ast: item[lang].root }}
				style={{ width: "100%" }}
				pStyle={{ ...STYLE_BODY }}
			/>
		</View>
	);
};

export default PortfolioCard;
