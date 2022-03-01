import fs from "fs/promises";
import { join } from "path";
import type { GetStaticProps } from "next";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	useWindowDimensions,
	ImageBackground,
	SafeAreaView,
	ScrollView,
	View,
} from "react-native";
import { useTranslation } from "next-export-i18n";
import { A, H1, P, Strong } from "@expo/html-elements";
import Masonry from "@react-native-seoul/masonry-list";
import Header from "../components/header";
import Footer from "../components/footer";
import type { Offset } from "../types/interface";
import {
	COLOR_BUBBLE,
	COLOR_SITE_BG,
	COLOR_TEXT_BG,
	FONT_LINK_R,
	setOpacity,
	STYLE_BODY,
	STYLE_H1,
	STYLE_STR,
} from "../theme";
import { randInt } from "../util/math";

const Credits: React.FC<{
	data: {
		name: string;
		author: {
			name: string;
			link: string;
		};
		img: string;
		license: string;
	}[];
}> = ({ data }) => {
	const { t } = useTranslation();
	const { width } = useWindowDimensions();
	const offset = useRef<{
		offset: Offset;
		callback: (offset: Offset) => void;
	}>({
		offset: { dir: 0, x: 0, y: 0 },
		callback: () => {},
	});
	const [columns, setColumns] = useState(3);

	useEffect(() => setColumns(Math.floor((width - 100) / 286)), [width]);

	const renderItem = useCallback(
		({ item, i }: { item: typeof data[0]; i: number }) => (
			<View
				style={{
					backgroundColor: COLOR_TEXT_BG,
					width: 256,
					height: 256,
					shadowColor: COLOR_BUBBLE,
					shadowOpacity: 0.6,
					shadowRadius: 7,
					margin: 15,
				}}>
				<ImageBackground
					source={{
						uri: item.img,
						width: 256,
						height: 256,
					}}
					resizeMode="contain"
					style={{
						flex: 1,
						alignItems: "stretch",
						justifyContent: "flex-end",
					}}>
					<View
						style={{
							height: 64,
							backgroundColor: setOpacity(COLOR_SITE_BG, 0.9),
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							paddingHorizontal: 10,
						}}>
						<P style={[STYLE_BODY, { color: COLOR_TEXT_BG }]}>
							{item.name}
							{t("credits.byline")}
							<A href={item.author.link} style={[FONT_LINK_R]}>
								{item.author.name}
							</A>
						</P>
						<P style={[STYLE_BODY, { color: COLOR_TEXT_BG }]}>
							<Strong
								style={[STYLE_STR, { color: COLOR_TEXT_BG }]}>
								{item.license}
							</Strong>
						</P>
					</View>
				</ImageBackground>
			</View>
		),
		[t],
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				onScroll={(ev) => {
					offset.current.offset = {
						...ev.nativeEvent.contentOffset,
						dir:
							ev.nativeEvent.contentOffset.y -
							offset.current.offset.y,
					};
					offset.current.callback(offset.current.offset);
				}}
				scrollEventThrottle={100}
				stickyHeaderIndices={[0]}
				nestedScrollEnabled={true}>
				<Header setter={(fn) => (offset.current.callback = fn)} />
				<Masonry
					data={data.sort(() => randInt(-1, 1))}
					renderItem={renderItem}
					numColumns={columns}
					ListHeaderComponent={
						<View>
							<H1 style={[STYLE_H1, { color: COLOR_TEXT_BG }]}>
								{t("credits.title")}
							</H1>
							<P style={[STYLE_BODY, { color: COLOR_TEXT_BG }]}>
								{t("credits.intro")}
							</P>
						</View>
					}
					ListFooterComponent={
						<View>
							<P style={[STYLE_BODY, { color: COLOR_TEXT_BG }]}>
								{t("credits.noattr")}
								<A
									href="mailto:tomas.rav@gmail.com"
									style={[FONT_LINK_R]}>
									{t("credits.contact")}
								</A>
								.
							</P>
							<P style={[STYLE_BODY, { color: COLOR_TEXT_BG }]}>
								{t("credits.tech")}
								<A
									href="https://github.com/OzymandiasTheGreat/tomasrav.me/#readme"
									style={[FONT_LINK_R]}>
									{t("credits.repo")}
								</A>
								.
							</P>
						</View>
					}
					contentContainerStyle={{
						width: "80%",
						maxWidth: 800,
						backgroundColor: setOpacity(COLOR_SITE_BG, 0.6),
						alignSelf: "center",
						alignItems: "center",
						borderRadius: 3,
					}}
				/>
				<Footer />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Credits;

export const getStaticProps: GetStaticProps = async () => {
	const data = JSON.parse(
		await fs.readFile(join(process.cwd(), "content/credits.json"), "utf8"),
	);
	return { props: { data } };
};
