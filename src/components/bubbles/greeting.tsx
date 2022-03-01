import React, { useEffect, useState } from "react";
import { useTranslation } from "next-export-i18n";
import Bubble, { D, Getter, Position, overlap } from "./bubble";
import { textSize } from "../../api/text";
import { randInt } from "../../util/math";

const IMG = `/profile/${randInt(1, 10)}.jpg`;

export const GreetingBubble: React.FC<{
	ready: boolean;
	getter: Getter;
	taken: Position[];
}> = ({ ready, getter, taken }) => {
	const { t } = useTranslation();
	const [visible, setVisible] = useState(false);
	const [position, setPosition] = useState<Position>({
		cx: 0,
		cy: 0,
		d: 0,
		r: 0,
	});
	const [text, setText] = useState("");

	useEffect(() => setText(t("bubbles.greeting")), [t]);
	useEffect(() => {
		if (ready) {
			const d = textSize(text, D);
			const r = d / 2;
			try {
				let pos = getter();
				while (
					taken.some((p) =>
						overlap(pos.cx, pos.cy, r, p.cx, p.cy, p.r),
					)
				) {
					pos = getter();
				}
				const position = { ...pos, d, r };
				taken.push(position);
				setPosition(position);
			} catch {
				console.warn("Skipping bubble");
			}
		}
		setVisible(ready);
	}, [ready, getter, taken, text]);

	return (
		<Bubble
			visible={visible}
			x={position.cx - position.r}
			y={position.cy - position.r}
			d={position.d}
			image={IMG}
			text={text}
		/>
	);
};
