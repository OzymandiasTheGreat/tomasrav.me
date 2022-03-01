import React, { useEffect, useRef, useState } from "react";
import { Animated, ImageBackground, Text } from "react-native";
import { Markdown } from "@ozymandiasthegreat/react-native-markdown/src";
import { distance, randInt } from "../../util/math";
import {
	setOpacity,
	COLOR_BUBBLE,
	COLOR_TEXT_FG,
	COLOR_TEXT_BG,
	STYLE_BODY,
} from "../../theme";

const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground);

export type Getter = () => { cx: number; cy: number };
export type Position = {
	cx: number;
	cy: number;
	d: number;
	r: number;
};

export const D = 176;

export function overlap(
	cx1: number,
	cy1: number,
	r1: number,
	cx2: number,
	cy2: number,
	r2: number,
): boolean {
	const dist = distance(cx1, cy1, cx2, cy2);
	const min = r1 + r2;
	return dist < min;
}

const Bubble: React.FC<{
	visible: boolean;
	text: string;
	image: string;
	x: number;
	y: number;
	d: number;
}> = ({ visible, x, y, d, text, image }) => {
	const [rd, setRD] = useState(d);
	const opacity = useRef(new Animated.Value(0)).current;
	const backgroundColor = opacity.interpolate({
		inputRange: [0, 1],
		outputRange: [
			setOpacity(COLOR_BUBBLE, 0),
			setOpacity(COLOR_BUBBLE, 0.6),
		],
	});

	useEffect(() => setRD(d * (randInt(9, 12) / 10)), [d]);
	useEffect(() => {
		if (visible) {
			Animated.timing(opacity, {
				toValue: randInt(224, 255) / 255,
				duration: randInt(500, 3000),
				delay: 500,
				useNativeDriver: false,
			}).start();
		} else {
			opacity.setValue(0);
		}
	}, [visible, opacity]);

	return (
		<Animated.View
			style={{
				display: visible ? "flex" : "none",
				position: "absolute",
				top: y,
				left: x,
				width: rd,
				height: rd,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor,
				borderRadius: "50%" as any,
			}}>
			<AnimatedBackground
				source={{
					uri: image,
					width: d * 0.67,
					height: d * 0.67,
				}}
				imageStyle={{
					position: "absolute",
					top: `${randInt(5, 45)}%`,
					left: `${randInt(60, 80)}%`,
					width: d * 0.67,
					height: d * 0.67,
					resizeMode: "cover",
					opacity: 0.75,
					borderRadius: "50%" as any,
				}}
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
					opacity,
				}}>
				<Markdown
					source={{ markdown: text }}
					style={{
						width: "100%",
						paddingHorizontal: d * 0.1,
						justifyContent: "center",
					}}
					pStyle={{
						...STYLE_BODY,
						color: COLOR_TEXT_BG,
						textShadowColor: COLOR_TEXT_FG,
						textShadowRadius: 13,
						textAlign: "center",
					}}
				/>
			</AnimatedBackground>
		</Animated.View>
	);
};

export default Bubble;
