import React, { useEffect, useState } from "react";
import { useTranslation } from "next-export-i18n";
import day from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import Bubble, { D, Getter, Position, overlap } from "./bubble";
import { textSize } from "../../api/text";

day.extend(utc);
day.extend(tz);

const TZ = "Europe/Vilnius";
const ROOT = "/bubbles/time";
const IMG: Record<string, string> = {
	"0": `${ROOT}/awake.svg`,
	"1": `${ROOT}/sleep.svg`,
	"2": `${ROOT}/sleep.svg`,
	"3": `${ROOT}/sleep.svg`,
	"4": `${ROOT}/morning-coffee.svg`,
	"5": `${ROOT}/coding.svg`,
	"6": `${ROOT}/coding.svg`,
	"7": `${ROOT}/coffee-break.svg`,
	"8": `${ROOT}/coding.svg`,
	"9": `${ROOT}/morning-coffee.svg`,
	"10": `${ROOT}/coding.svg`,
	"11": `${ROOT}/coding.svg`,
	"12": `${ROOT}/coffee-break.svg`,
	"13": `${ROOT}/testing.svg`,
	"14": `${ROOT}/coffee-break.svg`,
	"15": `${ROOT}/coding.svg`,
	"16": `${ROOT}/coding.svg`,
	"17": `${ROOT}/overtime.svg`,
	"18": `${ROOT}/morning-coffee.svg`,
	"19": `${ROOT}/manga.svg`,
	"20": `${ROOT}/coding.svg`,
	"21": `${ROOT}/overtime.svg`,
	"22": `${ROOT}/bedtime.svg`,
	"23": `${ROOT}/sleep.svg`,
};

export const TimeBubble: React.FC<{
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
		const now = day().tz(TZ);
		const hour = now.hour();
		setText(t(`bubbles.time.${hour}`, { time: now.format("HH:mm") }));
		setImg(IMG[`${hour}`]);
	}, [t]);
	useEffect(() => {
		if (ready) {
			const d = textSize(text, D);
			const r = d / 2;
			try {
				let pos = getter();
				while (
					taken.some((p) =>
						overlap(pos.cx, pos.cy, r, p.cx, p.cy, r),
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
