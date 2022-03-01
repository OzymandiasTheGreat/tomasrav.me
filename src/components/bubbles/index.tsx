import React, { useEffect, useState } from "react";
import { useWindowDimensions, SafeAreaView, View } from "react-native";
import { randInt } from "../../util/math";
import { Getter, Position } from "./bubble";
import { FunBubble } from "./fun";
import { GithubBubble } from "./github";
import { GreetingBubble } from "./greeting";
import { LocationBubble } from "./location";
import { PackageBubble } from "./packages";
import { TimeBubble } from "./time";
import { WeatherBubble } from "./weather";

const TAKEN: Position[] = [];
const AVAILABLE: { cx: number; cy: number }[] = [];

const getter: Getter = () => {
	const pos = AVAILABLE.pop();
	if (!pos) {
		throw new Error("No position available");
	}
	return pos;
};

const Bubbles: React.FC<{ width: number; height: number }> = ({
	width,
	height,
}) => {
	const { width: wWidth, height: wHeight } = useWindowDimensions();
	const [ready, setReady] = useState(false);
	const [dimensions, setDimensions] =
		useState<{ width: number; height: number }>();

	useEffect(() => {
		if (wWidth && wHeight) {
			if (width < wWidth) {
				setDimensions({ width, height });
			} else {
				setDimensions({ width: height, height: width });
			}
		}
	}, [wWidth, wHeight, width, height]);
	useEffect(() => {
		if (dimensions) {
			const x = new Array(Math.ceil(dimensions.width / 32))
				.fill(null)
				.map((_, i) => i * 32);
			const y = new Array(Math.ceil(dimensions.height / 32))
				.fill(null)
				.map((_, i) => i * 32);
			const positons: { cx: number; cy: number }[] = x
				.map((cx) => y.map((cy) => ({ cx, cy })))
				.flat()
				.sort(() => randInt(-1, 1));
			TAKEN.splice(0, TAKEN.length);
			AVAILABLE.splice(0, AVAILABLE.length, ...positons);
			setReady(true);
		}
	}, [dimensions]);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				height: "100vh",
				alignSelf: "center",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<View
				style={{
					position: "relative",
					width: dimensions?.width || width,
					height: dimensions?.height || height,
				}}>
				<GreetingBubble ready={ready} getter={getter} taken={TAKEN} />
				<LocationBubble ready={ready} getter={getter} taken={TAKEN} />
				<GithubBubble ready={ready} getter={getter} taken={TAKEN} />
				<PackageBubble ready={ready} getter={getter} taken={TAKEN} />
				<WeatherBubble ready={ready} getter={getter} taken={TAKEN} />
				<FunBubble ready={ready} getter={getter} taken={TAKEN} />
				<TimeBubble ready={ready} getter={getter} taken={TAKEN} />
			</View>
		</SafeAreaView>
	);
};

export default Bubbles;
