import React, { useEffect, useState } from "react";
import { useTranslation } from "next-export-i18n";
import Bubble, { D, Getter, Position, overlap } from "./bubble";
import { textSize } from "../../api/text";
import { downloads as npm } from "../../api/npm";
import { downloads as pypi } from "../../api/pypi";
import { randInt } from "../../util/math";

const USERNAME = "ozymandiasthegreat";
const VARIANTS: {
	src: () => Promise<number>;
	key: string;
}[] = [
	{ src: () => npm(USERNAME), key: "bubbles.packages.npm" },
	{ src: pypi, key: "bubbles.packages.pypi" },
];
const IMG = "/bubbles/package.svg";
const variant = VARIANTS[randInt(0, 1)];

export const PackageBubble: React.FC<{
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

	useEffect(() => {
		variant.src().then((count) => {
			setText(t(variant.key, { count }));
		});
	}, [t]);
	useEffect(() => {
		if (ready && text) {
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
				setVisible(ready);
			} catch {
				console.warn("Skipping bubble");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ready, text]);

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
