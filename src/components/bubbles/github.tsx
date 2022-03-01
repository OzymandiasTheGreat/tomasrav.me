import React, { useEffect, useState } from "react";
import { useTranslation } from "next-export-i18n";
import Bubble, { D, Getter, Position, overlap } from "./bubble";
import { textSize } from "../../api/text";
import { downloads, stars } from "../../api/github";
import { randInt } from "../../util/math";

const USERNAME = "OzymandiasTheGreat";
const VARIANTS: {
	src: (username: string) => Promise<number>;
	key: string;
	img: string;
}[] = [
	{
		src: downloads,
		key: "bubbles.github.releases",
		img: "/bubbles/release.svg",
	},
	{ src: stars, key: "bubbles.github.stars", img: "/bubbles/star.svg" },
];
const variant = VARIANTS[randInt(0, 1)];

export const GithubBubble: React.FC<{
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
	const [img, setImg] = useState("");

	useEffect(() => {
		variant.src(USERNAME).then((count) => {
			setText(t(variant.key, { count }));
			setImg(variant.img);
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
			image={img}
			text={text}
		/>
	);
};
