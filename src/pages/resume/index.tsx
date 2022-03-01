import fs from "fs/promises";
import { basename, extname, join } from "path";
import klaw from "klaw";
import type { GetStaticProps } from "next";
import type { Root } from "mdast";
import { parseMarkdown } from "../../util/markdown";

import React, { useEffect, useRef, useState } from "react";
import {
	useWindowDimensions,
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import NextImage from "next/image";
import { printAsync } from "expo-print";
import { A, Aside, H2, Main, P } from "@expo/html-elements";
import Icon from "@mdi/react";
import {
	mdiFacebookMessenger,
	mdiGithub,
	mdiGmail,
	mdiPrinter,
	mdiWhatsapp,
} from "@mdi/js";
import { useSelectedLanguage, useTranslation } from "next-export-i18n";
import { Markdown } from "@ozymandiasthegreat/react-native-markdown/src";
import type { Offset } from "../../types/interface";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {
	setOpacity,
	COLOR_TEXT_BG,
	COLOR_TEXT_FG,
	STYLE_H2,
	STYLE_BODY,
	FONT_LINK_H,
	FONT_LINK_R,
	FONT_BODY,
	FONT_CODE,
	FONT_HEADING,
} from "../../theme";

type Body = { [lang: string]: Root };
type ResponsiveStyles = {
	container: {
		width: string;
		paddingVertical: number;
		marginVertical: number;
	};
	contact: {
		width: number;
		right: string;
	};
	article: {
		width: string;
		tableWidth: number;
	};
	skewX: string;
};

const Resume: React.FC<{ body: Body }> = ({ body }) => {
	// Responsive design
	const { width } = useWindowDimensions();
	const [rStyles, setRStyles] = useState<ResponsiveStyles>();

	const { t } = useTranslation();
	const { lang } = useSelectedLanguage();
	const offset = useRef<{
		offset: Offset;
		callback: (offset: Offset) => void;
	}>({
		offset: { dir: 0, x: 0, y: 0 },
		callback: () => {},
	});

	useEffect(() => {
		setRStyles({
			container: {
				width: width < 600 ? "95%" : "80%",
				paddingVertical: width < 600 ? 32 : 64,
				marginVertical: width < 600 ? 50 : 200,
			},
			contact: {
				width: width < 600 ? 320 : 600,
				right: width < 800 ? "-3%" : "-13%",
			},
			article: {
				width: width < 600 ? "95%" : "80%",
				tableWidth:
					width < 600
						? Math.floor(width * 0.9)
						: Math.floor((width - 200) * 0.6),
			},
			skewX:
				width < 600
					? "0deg"
					: width < 1000
					? `${Math.floor(width / 360) * 1.5}deg`
					: `${Math.floor(width / 360) * 2}deg`,
		});
	}, [width]);

	return (
		<SafeAreaView nativeID="resume-container" style={{ flex: 1 }}>
			<ScrollView
				stickyHeaderIndices={[0]}
				onScroll={(ev) => {
					offset.current.offset = {
						...ev.nativeEvent.contentOffset,
						dir:
							ev.nativeEvent.contentOffset.y -
							offset.current.offset.y,
					};
					offset.current.callback(offset.current.offset);
				}}
				scrollEventThrottle={100}>
				<Header
					setter={(fn) => (offset.current.callback = fn)}></Header>
				<View
					style={{
						backgroundColor: setOpacity(COLOR_TEXT_BG, 0.75),
						width: rStyles?.container.width,
						paddingVertical: rStyles?.container.paddingVertical,
						marginVertical: rStyles?.container.marginVertical,
						alignSelf: "center",
						transform: [
							{ perspective: 1000 },
							{ skewX: `${rStyles?.skewX}` },
						],
					}}>
					<Aside
						nativeID="display-contact"
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-around",
							width: rStyles?.contact.width,
							position: "absolute",
							top: "-10vw",
							right: rStyles?.contact.right,
							transform: [
								{ perspective: 1000 },
								{ skewX: `-${rStyles?.skewX}` },
							],
						}}>
						<A
							style={styles.contactLink}
							onPress={() => printAsync({})}>
							<Icon
								path={mdiPrinter}
								size="32px"
								color={COLOR_TEXT_FG}
								title={t("resume.contact.print")}></Icon>
						</A>
						<A
							href={t("resume.contact.gmail.href")}
							style={styles.contactLink}>
							<Icon
								path={mdiGmail}
								size="32px"
								color={COLOR_TEXT_FG}
								title={t("resume.contact.gmail.title")}></Icon>
						</A>
						<A
							href={t("resume.contact.whatsapp.href")}
							style={styles.contactLink}>
							<Icon
								path={mdiWhatsapp}
								size="32px"
								color={COLOR_TEXT_FG}
								title={t(
									"resume.contact.whatsapp.title",
								)}></Icon>
						</A>
						<A
							href={t("resume.contact.fb.href")}
							style={styles.contactLink}>
							<Icon
								path={mdiFacebookMessenger}
								size="32px"
								color={COLOR_TEXT_FG}
								title={t("resume.contact.fb.title")}></Icon>
						</A>
						<A
							href={t("resume.contact.gh.href")}
							style={styles.contactLink}>
							<Icon
								path={mdiGithub}
								size="32px"
								color={COLOR_TEXT_FG}
								title={t("resume.contact.gh.title")}></Icon>
						</A>
						<Image
							accessibilityLabel={t("resume.contact.fullname")}
							source={{
								uri: "/profile/7.jpg",
								width: 256,
								height: 256,
							}}
							resizeMode="contain"
							style={{
								width: "20vw",
								height: "20vw",
								borderRadius: "50%" as any,
								borderColor: COLOR_TEXT_BG,
								borderWidth: 8,
							}}></Image>
					</Aside>
					<Main
						style={{
							width: rStyles?.article.width,
							maxWidth: 800,
							alignSelf: "center",
							transform: [
								{ perspective: 1000 },
								{ skewX: `-${rStyles?.skewX}` },
							],
						}}>
						<Aside
							nativeID="print-contact"
							style={{
								display: "none",
								paddingVertical: 10,
								paddingHorizontal: 15,
								borderRadius: 3,
								borderColor: setOpacity(COLOR_TEXT_FG, 0.75),
								borderWidth: 1,
								margin: 20,
							}}>
							<View>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									id="print-avatar"
									src="/profile/7.jpg"
									style={{
										width: "256px",
										height: "256px",
										objectFit: "cover",
									}}
								/>
								<A
									style={[
										FONT_LINK_H,
										STYLE_BODY,
										{ fontSize: 14, marginVertical: 5 },
									]}>
									<Icon
										path={mdiGmail}
										size="24px"
										color={COLOR_TEXT_FG}
										style={{
											verticalAlign: "middle",
										}}></Icon>
									{t("resume.contact.gmail.mail")}
								</A>
								<A
									style={[
										FONT_LINK_H,
										STYLE_BODY,
										{ fontSize: 14, marginVertical: 5 },
									]}>
									<Icon
										path={mdiWhatsapp}
										size="24px"
										color={COLOR_TEXT_FG}
										style={{
											verticalAlign: "middle",
										}}></Icon>
									{t("resume.contact.whatsapp.href")}
								</A>
								<A
									style={[
										FONT_LINK_H,
										STYLE_BODY,
										{ fontSize: 14, marginVertical: 5 },
									]}>
									<Icon
										path={mdiFacebookMessenger}
										size="24px"
										color={COLOR_TEXT_FG}
										style={{
											verticalAlign: "middle",
										}}></Icon>
									{t("resume.contact.fb.href")}
								</A>
								<A
									style={[
										FONT_LINK_H,
										STYLE_BODY,
										{ fontSize: 14, marginVertical: 5 },
									]}>
									<Icon
										path={mdiGithub}
										size="24px"
										color={COLOR_TEXT_FG}
										style={{
											verticalAlign: "middle",
										}}></Icon>
									{t("resume.contact.gh.href")}
								</A>
							</View>
						</Aside>
						<Markdown
							source={{ ast: body[lang] }}
							fontMap={{
								normal: FONT_BODY,
								bold: FONT_BODY,
								italic: FONT_BODY,
								monospace: FONT_CODE,
							}}
							pStyle={{
								...STYLE_BODY,
							}}
							hStyle={{
								fontFamily: FONT_HEADING,
							}}
							tableStyle={{
								width: rStyles?.article.tableWidth as any,
								color: COLOR_TEXT_FG,
								borderWidth: 2,
								paddingVertical: 10,
								paddingHorizontal: 15,
							}}></Markdown>
						<H2 style={[STYLE_H2]}>
							{t("resume.tech-stack.title")}
						</H2>
						<P style={[STYLE_BODY]}>
							{t("resume.tech-stack.intro")}
						</P>
						<P
							nativeID="tech-stack"
							style={{
								textAlign: "center",
							}}>
							<Markdown
								source={{ ast: body.tech }}
								style={{ width: rStyles?.article.width }}
								fontMap={{
									normal: FONT_BODY,
									bold: FONT_BODY,
									italic: FONT_BODY,
									monospace: FONT_CODE,
								}}></Markdown>
						</P>
					</Main>
				</View>
				<Footer />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	contactLink: {
		width: 48,
		height: 48,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLOR_TEXT_BG,
		borderRadius: "50%" as any,
	},
});

export default Resume;

export const getStaticProps: GetStaticProps = async () => {
	const dir = join(process.cwd(), "content/resume");
	const body: Body = {};
	for await (const { path, stats } of klaw(dir, { depthLimit: 1 })) {
		if (stats.isFile()) {
			const lang = basename(path, extname(path));
			const root = parseMarkdown(await fs.readFile(path, "utf8"));
			body[lang] = root;
		}
	}
	return { props: { body } };
};
