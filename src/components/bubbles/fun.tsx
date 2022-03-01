import React, { useEffect, useState } from "react";
import { useTranslation } from "next-export-i18n";
import Bubble, { D, Getter, Position, overlap } from "./bubble";
import { textSize } from "../../api/text";
import { randInt } from "../../util/math";

const VARIANTS: { key: string; img: string }[] = [
	{ key: "bubbles.fun.facts.cats", img: "/bubbles/cats.svg" },
	{ key: "bubbles.fun.facts.flowers", img: "/bubbles/flower.svg" },
	{ key: "bubbles.fun.facts.cook", img: "/bubbles/cook.svg" },
];

export const FunBubble: React.FC<{
	ready: boolean;
	getter: Getter;
	taken: Position[];
}> = ({ ready, getter, taken }) => {
	const { t } = useTranslation();
	const [variant] = useState(VARIANTS[randInt(0, 2)]);

	const [visible, setVisible] = useState(false);
	const [position, setPosition] = useState<Position>({
		cx: 0,
		cy: 0,
		d: 0,
		r: 0,
	});
	const [text, setText] = useState("");
	const [img, setImg] = useState("");

	useEffect(() => {
		setText(t("bubbles.fun.intro") + t(variant.key));
		setImg(variant.img);
	}, [t, variant]);
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
			image={img}
			text={text}
		/>
	);
};
