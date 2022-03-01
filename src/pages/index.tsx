// @generated: @expo/next-adapter@3.1.17
import React, { useEffect, useRef, useState } from "react";
import {
	useWindowDimensions,
	Image,
	SafeAreaView,
	ScrollView,
	View,
} from "react-native";
import Link from "next/link";
import { useSelectedLanguage, useTranslation } from "next-export-i18n";
import { A, H2, P } from "@expo/html-elements";
import Icon from "@mdi/react";
import { mdiHeart } from "@mdi/js";
import { Offset } from "../types/interface";
import {
	COLOR_SITE_BG,
	COLOR_SUPPORT,
	setOpacity,
	STYLE_BODY,
	STYLE_H2,
} from "../theme";
import Header from "../components/header";
import Footer from "../components/footer";
import SlideIn from "../components/slidein";
import Bubbles from "../components/bubbles";

const App: React.FC = () => {
	const { t } = useTranslation();
	const { lang } = useSelectedLanguage();
	const { width } = useWindowDimensions();

	const offset = useRef<Offset>({
		dir: 0,
		x: 0,
		y: 0,
	});
	const slideCallbacks = useRef<((offset: Offset) => void)[]>([]);
	const [size, setSize] = useState(256);

	useEffect(() => setSize(width < 600 ? 128 : 256), [width]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				stickyHeaderIndices={[0]}
				onScroll={(ev) => {
					offset.current = {
						...ev.nativeEvent.contentOffset,
						dir: ev.nativeEvent.contentOffset.y - offset.current.y,
					};
					slideCallbacks.current.forEach((cb) => cb(offset.current));
				}}
				scrollEventThrottle={100}>
				<Header setter={() => {}}></Header>
				<View
					style={{
						alignSelf: "center",
						alignItems: "center",
						justifyContent: "center",
						width: "100%",
						height: "100vh",
					}}>
					<Bubbles width={700} height={280}></Bubbles>
				</View>
				<SlideIn
					setter={(fn) => slideCallbacks.current.push(fn)}
					from="right">
					<Link
						passHref
						href={{
							pathname: "/resume",
							query: { lang },
						}}>
						<A>
							<View
								style={{
									flex: 1,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "flex-start",
								}}>
								<Image
									source={{
										uri: "/home/resume.svg",
										width: size,
										height: size,
									}}
									style={{
										resizeMode: "contain",
										opacity: 0.6,
									}}></Image>
								<View style={{ flex: 1 }}>
									<H2 style={[STYLE_H2]}>
										{t("home.resume.title")}
									</H2>
									<P style={[STYLE_BODY]}>
										{t("home.resume.blurb")}
									</P>
								</View>
							</View>
						</A>
					</Link>
				</SlideIn>
				<SlideIn
					setter={(fn) => slideCallbacks.current.push(fn)}
					from="left">
					<Link
						passHref
						href={{
							pathname: "/portfolio",
							query: { lang },
						}}>
						<A>
							<View
								style={{
									flex: 1,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "flex-end",
								}}>
								<Image
									source={{
										uri: "/home/portfolio.svg",
										width: size,
										height: size,
									}}
									style={{
										resizeMode: "contain",
										opacity: 0.6,
									}}></Image>
								<View style={{ flex: 1 }}>
									<H2 style={[STYLE_H2]}>
										{t("home.portfolio.title")}
									</H2>
									<P style={[STYLE_BODY]}>
										{t("home.portfolio.blurb")}
									</P>
								</View>
							</View>
						</A>
					</Link>
				</SlideIn>
				<SlideIn
					setter={(fn) => slideCallbacks.current.push(fn)}
					from="right">
					<A href="https://tech.tomasrav.me/">
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "flex-end",
							}}>
							<Image
								source={{
									uri: "/tech.svg",
									width: size,
									height: size,
								}}
								style={{
									resizeMode: "contain",
									opacity: 0.6,
								}}></Image>
							<View style={{ flex: 1 }}>
								<H2 style={[STYLE_H2]}>
									{t("home.tech.title")}
								</H2>
								<P style={[STYLE_BODY]}>
									{t("home.tech.blurb")}
								</P>
							</View>
						</View>
					</A>
				</SlideIn>
				<SlideIn
					setter={(fn) => slideCallbacks.current.push(fn)}
					from="left">
					<A href="https://kitchen.tomasrav.me/">
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "flex-end",
							}}>
							<Image
								source={{
									uri: "/kitchen.svg",
									width: size,
									height: size,
								}}
								style={{
									resizeMode: "contain",
									opacity: 0.6,
								}}></Image>
							<View style={{ flex: 1 }}>
								<H2 style={[STYLE_H2]}>
									{t("home.kitchen.title")}
								</H2>
								<P style={[STYLE_BODY]}>
									{t("home.kitchen.blurb")}
								</P>
							</View>
						</View>
					</A>{" "}
				</SlideIn>
				<SlideIn
					setter={(fn) => slideCallbacks.current.push(fn)}
					from="right">
					<Link
						passHref
						href={{
							pathname: "/support",
							query: { lang },
						}}>
						<A>
							<View
								style={{
									flex: 1,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "flex-start",
								}}>
								<Icon
									path={mdiHeart}
									size={`${size}px`}
									color={COLOR_SUPPORT}
								/>
								<View style={{ flex: 1 }}>
									<H2 style={[STYLE_H2]}>
										{t("home.support.title")}
									</H2>
									<P style={[STYLE_BODY]}>
										{t("home.support.blurb")}
									</P>
								</View>
							</View>
						</A>
					</Link>
				</SlideIn>
				<Footer />
			</ScrollView>
		</SafeAreaView>
	);
};

export default App;
