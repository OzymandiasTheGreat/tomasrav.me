import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	useWindowDimensions,
	Animated,
	FlexAlignType,
	View,
} from "react-native";
import type { Offset } from "../types/interface";
import { setOpacity, COLOR_TEXT_BG } from "../theme";

const SlideIn: React.FC<{
	setter: (fn: (offset: Offset) => void) => void;
	from: "left" | "right";
}> = ({ setter, from, children }) => {
	const { width, height } = useWindowDimensions();
	const [skewX, setSkewX] = useState("25deg");
	const outputRange = [
		from === "right" ? "100%" : "-200%",
		from === "right" ? "10%" : "-110%",
	];
	const [alignSelf, setAlignSelf] = useState<FlexAlignType>("flex-start");
	const [outerSkew, setOuterSkew] = useState({ skewX: "25deg" });
	const [innerSkew, setInnerSkew] = useState({ skewX: "-25deg" });
	const [paddingHorizontal, setPaddingHorizontal] = useState("10%");

	const container = useRef<View>(null);
	const animation = useRef(new Animated.Value(0)).current;
	const slidein = animation.interpolate({
		inputRange: [0, 1.5],
		outputRange,
	});

	useEffect(() => {
		setSkewX(width < 600 ? "15deg" : "25deg");
	}, [width]);
	useEffect(() => {
		setAlignSelf(from === "right" ? "flex-start" : "flex-end");
		setOuterSkew(
			from === "right" ? { skewX: `${skewX}` } : { skewX: `-${skewX}` },
		);
		setInnerSkew(
			from === "right" ? { skewX: `-${skewX}` } : { skewX: `${skewX}` },
		);
	}, [from, skewX]);
	useEffect(() => {
		setPaddingHorizontal(
			from === "right"
				? width < 600
					? "15%"
					: "10%"
				: width < 600
				? "55%"
				: "10%",
		);
	}, [from, width]);

	const callback = useCallback(
		(offset: Offset) => {
			container.current?.measure((x, y, w, h, pageX, pageY) => {
				const ratio = (height - pageY) / h;
				const normalized = Math.min(Math.max(ratio, 0), 1.5);
				if (
					offset?.dir > 0 &&
					// pageY <= height - 50 &&
					// pageY + h + height >= height &&
					ratio >= -0.5 &&
					ratio <= 1.75
				) {
					Animated.timing(animation, {
						toValue: normalized,
						duration: 125,
						useNativeDriver: false,
					}).start();
				} else if (
					offset?.dir < 0 &&
					// pageY <= height &&
					// pageY + h + height >= height - 50 &&
					ratio >= -0.5 &&
					ratio <= 1.75
				) {
					Animated.timing(animation, {
						toValue: normalized - 0.3,
						duration: 125,
						useNativeDriver: false,
					}).start();
				}
			});
		},
		[height, animation],
	);
	useEffect(() => setter(callback), [setter, callback]);

	return (
		<Animated.View
			style={[
				{
					width: "100%",
					height: 400,
					transform: [
						{ perspective: 1000 },
						{ translateX: slidein },
					],
				},
			]}>
			<View
				ref={container}
				style={[
					{
						backgroundColor: setOpacity(COLOR_TEXT_BG, 0.6),
						width: "200%",
						height: "80%",
						paddingHorizontal,
						marginVertical: "auto",
						justifyContent: "center",
						alignItems: "flex-start",
						transform: [{ perspective: 1000 }, outerSkew],
					},
				]}>
				<View
					style={[
						{
							alignSelf,
							transform: [{ perspective: 1000 }, innerSkew],
							maxWidth: "30%",
						},
					]}>
					{children}
				</View>
			</View>
		</Animated.View>
	);
};

export default SlideIn;
