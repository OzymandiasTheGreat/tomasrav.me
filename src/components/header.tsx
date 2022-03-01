import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	useLanguageQuery,
	useSelectedLanguage,
	useTranslation,
} from "next-export-i18n";
import { A, Header } from "@expo/html-elements";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";
import type { Offset } from "../types/interface";
import { translations } from "../../i18n";
import { COLOR_TEXT_BG, COLOR_TEXT_FG } from "../theme";

const flagMap: Record<string, string> = {
	lt: "🇱🇹",
	en: "🇺🇸",
};

const AnimatedHeader = Animated.createAnimatedComponent(Header);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const SiteHeader: React.FC<{
	setter: (fn: (offset: Offset) => void) => void;
}> = ({ setter }) => {
	const router = useRouter();
	const { query } = useLanguageQuery();
	const { lang } = useSelectedLanguage();

	const colorAnim = useRef(new Animated.Value(0)).current;
	const color = colorAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [COLOR_TEXT_BG, COLOR_TEXT_FG],
	});
	const bgColorAnim = useRef(new Animated.Value(0)).current;
	const backgroundColor = bgColorAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [COLOR_TEXT_FG + "00", COLOR_TEXT_BG + "dd"],
	});

	const callback = useCallback(
		(offset: Offset) => {
			if (offset?.y >= 0 && offset?.y <= 512) {
				Animated.timing(colorAnim, {
					toValue: Math.min(offset.y, 256) / 256,
					duration: 50,
					useNativeDriver: false,
				}).start();
				Animated.timing(bgColorAnim, {
					toValue: Math.min(offset.y, 256) / 256,
					duration: 50,
					useNativeDriver: false,
				}).start();
			}
		},
		[colorAnim, bgColorAnim],
	);
	useEffect(() => setter(callback), [setter, callback]);

	return (
		<AnimatedHeader
			nativeID="header"
			style={{
				backgroundColor,
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				paddingHorizontal: 20,
				height: 48,
			}}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-around",
					width: 32,
				}}>
				{router.pathname !== "/" && (
					<Link
						passHref
						href={{ pathname: "/", query: { ...query, lang } }}>
						<A>
							<AnimatedIcon
								path={mdiArrowLeft}
								size="24px"
								title="Go back"
								style={{ color }}></AnimatedIcon>
						</A>
					</Link>
				)}
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-around",
					width: 64,
				}}>
				{Object.keys(translations).map((lang) => (
					<Link
						key={lang}
						passHref
						href={{ query: { ...query, lang } }}>
						<A style={{ fontSize: 24 }}>{flagMap[lang]}</A>
					</Link>
				))}
			</View>
		</AnimatedHeader>
	);
};

export default SiteHeader;
