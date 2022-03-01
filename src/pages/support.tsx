import React, { useEffect, useRef, useState } from "react";
import {
	useWindowDimensions,
	SafeAreaView,
	ScrollView,
	View,
} from "react-native";
import Script from "next/script";
import { A, Article, H1, Main, P } from "@expo/html-elements";
import Icon from "@mdi/react";
import { mdiPatreon } from "@mdi/js";
import { useTranslation } from "next-export-i18n";
import type { Offset } from "../types/interface";
import Header from "../components/header";
import Footer from "../components/footer";
import {
	COLOR_SUPPORT,
	COLOR_TEXT_BG,
	FONT_LINK_R,
	setOpacity,
	STYLE_BODY,
	STYLE_H1,
} from "../theme";

type ResponsiveStyles = {
	container: {
		width: string;
		paddingHorizontal: number;
	};
	content: {
		width: string;
	};
	skewX: string;
};

const Support: React.FC = () => {
	const { t } = useTranslation();
	const offset = useRef<{
		offset: Offset;
		callback: (offset: Offset) => void;
	}>({
		offset: { dir: 0, x: 0, y: 0 },
		callback: () => {},
	});
	const { width } = useWindowDimensions();
	const [rStyles, setRStyles] = useState<ResponsiveStyles>();

	useEffect(() => {
		setRStyles({
			container: {
				width: width < 600 ? "95%" : "80%",
				paddingHorizontal: width < 600 ? 32 : 128,
			},
			content: {
				width: width < 600 ? "95%" : "80%",
			},
			skewX:
				width < 600
					? "0deg"
					: width < 1000
					? `${Math.floor(width / 360) * 2.5}deg`
					: `${Math.floor(width / 360) * 3.5}deg`,
		});
	}, [width]);

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
				stickyHeaderIndices={[0]}>
				<Header setter={(fn) => (offset.current.callback = fn)} />
				<Main
					style={{
						flex: 1,
						width: rStyles?.container.width,
						alignSelf: "center",
						backgroundColor: setOpacity(COLOR_TEXT_BG, 0.75),
						paddingVertical: 30,
						paddingHorizontal:
							rStyles?.container.paddingHorizontal,
						marginVertical: 45,
						transform: [
							{ perspective: 1000 },
							{ skewX: `-${rStyles?.skewX}` },
						],
					}}>
					<Article
						style={[
							{
								width: rStyles?.content.width,
								maxWidth: 800,
								alignSelf: "center",
								transform: [
									{ perspective: 1000 },
									{ skewX: `${rStyles?.skewX}` },
								],
							},
						]}>
						<H1 style={[STYLE_H1]}>{t("support.title")}</H1>
						<P style={[STYLE_BODY]}>{t("support.p1")}</P>
						<P style={[STYLE_BODY]}>{t("support.p2")}</P>
						<A href="https://www.patreon.com/ozymandias/">
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "flex-start",
									width: "100%",
								}}>
								<Icon
									path={mdiPatreon}
									color={COLOR_SUPPORT}
									size="256px"
									title="Patreon"
								/>
								<P style={[STYLE_BODY, { marginLeft: 15 }]}>
									{t("support.patreon")}
								</P>
							</View>
						</A>
						<View style={{ flex: 1 }}>
							<P style={[STYLE_BODY, { marginBottom: 50 }]}>
								{t("support.donorbox")}
								<A
									href="https://donorbox.org/tomasrav-open-source-development"
									style={[FONT_LINK_R]}>
									DonorBox
								</A>
								.
							</P>
							<Script
								src="https://donorbox.org/widget.js"
								// @ts-ignore
								paypalExpress="false"></Script>
							<iframe
								src="https://donorbox.org/embed/tomasrav-open-source-development?default_interval=o&amount=20"
								name="donorbox"
								// @ts-ignore
								allowpaymentrequest="allowpaymentrequest"
								seamless={true}
								frameBorder="0"
								scrolling="no"
								height="900px"
								width="100%"
								style={{
									alignSelf: "center",
									maxWidth: "500px",
									minWidth: "310px",
								}}></iframe>
						</View>
						<P style={[STYLE_BODY]}>{t("support.p3")}</P>
					</Article>
				</Main>
				<Footer />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Support;
