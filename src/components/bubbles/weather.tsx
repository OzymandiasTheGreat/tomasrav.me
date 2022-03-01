import React, { useEffect, useState } from "react";
import { useTranslation } from "next-export-i18n";
import day from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import format from "dayjs/plugin/customParseFormat";
import Bubble, { D, Getter, Position, overlap } from "./bubble";
import { textSize } from "../../api/text";
import { weather, WttrIn } from "../../api/wttr.in";

day.extend(utc);
day.extend(tz);
day.extend(format);

const TZ = "Europe/Vilnius";
const FORMAT = "hh:mm A";
const REPLACESTR = "REPLACEME";
const IMGROOT = "/bubbles/weather";

const WEATHER_CODE: Record<string, string> = {
	"113": "Sunny",
	"116": "PartlyCloudy",
	"119": "Cloudy",
	"122": "VeryCloudy",
	"143": "Fog",
	"176": "LightShowers",
	"179": "LightSleetShowers",
	"182": "LightSleet",
	"185": "LightSleet",
	"200": "ThunderyShowers",
	"227": "LightSnow",
	"230": "HeavySnow",
	"248": "Fog",
	"260": "Fog",
	"263": "LightShowers",
	"266": "LightRain",
	"281": "LightSleet",
	"284": "LightSleet",
	"293": "LightRain",
	"296": "LightRain",
	"299": "HeavyShowers",
	"302": "HeavyRain",
	"305": "HeavyShowers",
	"308": "HeavyRain",
	"311": "LightSleet",
	"314": "LightSleet",
	"317": "LightSleet",
	"320": "LightSnow",
	"323": "LightSnowShowers",
	"326": "LightSnowShowers",
	"329": "HeavySnow",
	"332": "HeavySnow",
	"335": "HeavySnowShowers",
	"338": "HeavySnow",
	"350": "LightSleet",
	"353": "LightShowers",
	"356": "HeavyShowers",
	"359": "HeavyRain",
	"362": "LightSleetShowers",
	"365": "LightSleetShowers",
	"368": "LightSnowShowers",
	"371": "HeavySnowShowers",
	"374": "LightSleetShowers",
	"377": "LightSleet",
	"386": "ThunderyShowers",
	"389": "ThunderyHeavyRain",
	"392": "ThunderySnowShowers",
	"395": "HeavySnowShowers",
};

const WEATHER_IMG: Record<string, string> = {
	Unknown: `${IMGROOT}/Unknown.svg`,
	Cloudy: `${IMGROOT}/Cloudy.svg`,
	Fog: `${IMGROOT}/Fog-${REPLACESTR}.svg`,
	HeavyRain: `${IMGROOT}/Rain-${REPLACESTR}.svg`,
	HeavyShowers: `${IMGROOT}/RainShowers-${REPLACESTR}.svg`,
	HeavySnow: `${IMGROOT}/Snow-${REPLACESTR}.svg`,
	HeavySnowShowers: `${IMGROOT}/SnowShowers-${REPLACESTR}.svg`,
	LightRain: `${IMGROOT}/Rain-${REPLACESTR}.svg`,
	LightShowers: `${IMGROOT}/RainShowers-${REPLACESTR}.svg`,
	LightSleet: `${IMGROOT}/Sleet-${REPLACESTR}.svg`,
	LightSleetShowers: `${IMGROOT}/SleetShowers-${REPLACESTR}.svg`,
	LightSnow: `${IMGROOT}/Snow-${REPLACESTR}.svg`,
	LightSnowShowers: `${IMGROOT}/SnowShowers-${REPLACESTR}.svg`,
	PartlyCloudy: `${IMGROOT}/PartlyCloudy-${REPLACESTR}.svg`,
	Sunny: `${IMGROOT}/Clear-${REPLACESTR}.svg`,
	ThunderyHeavyRain: `${IMGROOT}/ThunderRain-${REPLACESTR}.svg`,
	ThunderyShowers: `${IMGROOT}/ThunderRain-${REPLACESTR}.svg`,
	ThunderySnowShowers: `${IMGROOT}/ThunderSnow-${REPLACESTR}.svg`,
	VeryCloudy: `${IMGROOT}/VeryCloudy.svg`,
};

function parseWttr(data: WttrIn): {
	keys: [string, Record<string, string>][];
	img: string;
} {
	const degrees = parseFloat(data.current_condition[0].temp_C);
	const temp = `${degrees}°C`;
	const keyOne =
		degrees <= -10
			? "-10"
			: degrees <= 0
			? "-0"
			: degrees <= 10
			? "10"
			: degrees <= 20
			? "20"
			: degrees < 25
			? "25"
			: "+25";
	const keyTwo =
		degrees <= 0
			? "weather-0"
			: degrees <= 20
			? "weather10"
			: "weather+25";
	const condition = WEATHER_CODE[data.current_condition[0].weatherCode];
	const now = day().tz(TZ).valueOf();
	const sunrise = day
		.tz(data.weather[0].astronomy[0].sunrise, FORMAT, TZ)
		.valueOf();
	const sunset = day
		.tz(data.weather[0].astronomy[0].sunset, FORMAT, TZ)
		.valueOf();
	const img = WEATHER_IMG[condition].replace(
		REPLACESTR,
		sunrise <= now && sunset >= now ? "Day" : "Night",
	);
	return {
		img,
		keys: [
			[`bubbles.weather.${keyOne}`, { temp }],
			[`bubbles.${keyTwo}.${condition}`, {}],
		],
	};
}

export const WeatherBubble: React.FC<{
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
		weather("Kaunas")
			.then((wttr) => parseWttr(wttr))
			.then((data) => {
				setText(data.keys.map((k) => t(...k)).join(""));
				setImg(data.img);
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
