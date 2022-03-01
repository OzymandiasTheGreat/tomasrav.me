import { TextStyle } from "react-native";

export const FONT_HEADING = "Fira Sans";
export const FONT_BODY = "PT Serif";
export const FONT_CODE = "Fira Code";
export const FONT_WEIGHT_H = "900";
export const FONT_WEIGHT_R = "400";
export const FONT_WEIGHT_E = FONT_WEIGHT_R;
export const FONT_WEIGHT_S = "700";
export const FONT_WEIGHT_C = FONT_WEIGHT_R;
export const FONT_STYLE_R = "normal";
export const FONT_STYLE_H = FONT_STYLE_R;
export const FONT_STYLE_S = FONT_STYLE_R;
export const FONT_STYLE_E = "italic";
export const FONT_SIZE_H1 = 26;
export const FONT_SIZE_H2 = 24;
export const FONT_SIZE_H3 = 22;
export const FONT_SIZE_H4 = 20;
export const FONT_SIZE_H5 = 18;
export const FONT_SIZE_H6 = 16;
export const FONT_SIZE_R = 16;
export const FONT_SIZE_C = 15;
export const FONT_LINK_H = { textDecorationLine: "underline" } as TextStyle;
export const FONT_LINK_R = { color: "#4fc3f7" } as TextStyle;
export const COLOR_SITE_BG = "#212121";
export const COLOR_TEXT_BG = "#fafafa";
export const COLOR_BUBBLE = "#efefef";
export const COLOR_TEXT_FG = "#212121";
export const COLOR_SUPPORT = "#d32f2f";
export const STYLE_H1 = {
	fontFamily: FONT_HEADING,
	fontWeight: FONT_WEIGHT_H,
	fontStyle: FONT_STYLE_H,
	fontSize: FONT_SIZE_H1,
	color: COLOR_TEXT_FG,
} as TextStyle;
export const STYLE_H2 = {
	fontFamily: FONT_HEADING,
	fontWeight: FONT_WEIGHT_H,
	fontStyle: FONT_STYLE_H,
	fontSize: FONT_SIZE_H2,
	color: COLOR_TEXT_FG,
} as TextStyle;
export const STYLE_H3 = {
	fontFamily: FONT_HEADING,
	fontWeight: FONT_WEIGHT_H,
	fontStyle: FONT_STYLE_H,
	fontSize: FONT_SIZE_H3,
	color: COLOR_TEXT_FG,
} as TextStyle;
export const STYLE_H4 = {
	fontFamily: FONT_HEADING,
	fontWeight: FONT_WEIGHT_H,
	fontStyle: FONT_STYLE_H,
	fontSize: FONT_SIZE_H4,
	color: COLOR_TEXT_FG,
} as TextStyle;
export const STYLE_H5 = {
	fontFamily: FONT_HEADING,
	fontWeight: FONT_WEIGHT_H,
	fontStyle: FONT_STYLE_H,
	fontSize: FONT_SIZE_H5,
	color: COLOR_TEXT_FG,
} as TextStyle;
export const STYLE_H6 = {
	fontFamily: FONT_HEADING,
	fontWeight: FONT_WEIGHT_H,
	fontStyle: FONT_STYLE_H,
	fontSize: FONT_SIZE_H6,
	color: COLOR_TEXT_FG,
} as TextStyle;
export const STYLE_BODY = {
	fontFamily: FONT_BODY,
	fontWeight: FONT_WEIGHT_R,
	fontStyle: FONT_STYLE_R,
	fontSize: FONT_SIZE_R,
	color: COLOR_TEXT_FG,
} as TextStyle;
export const STYLE_EM = {
	fontFamily: FONT_BODY,
	fontWeight: FONT_WEIGHT_E,
	fontStyle: FONT_STYLE_E,
	// fontSize: FONT_SIZE_R,
	color: COLOR_TEXT_FG,
} as TextStyle;
export const STYLE_STR = {
	fontFamily: FONT_BODY,
	fontWeight: FONT_WEIGHT_S,
	fontStyle: FONT_STYLE_S,
	// fontSize: FONT_SIZE_R,
	color: COLOR_TEXT_FG,
} as TextStyle;
export const STYLE_CODE = {
	fontFamily: FONT_CODE,
	fontWeight: FONT_WEIGHT_C,
	fontStyle: FONT_STYLE_R,
	// fontSize: FONT_SIZE_C,
	color: setOpacity(COLOR_TEXT_FG, 0.9),
	backgroundColor: setOpacity(COLOR_SITE_BG, 0.15),
} as TextStyle;

export function setOpacity(color: string, opacity: number): string {
	return (
		color +
		Math.floor(opacity * 255)
			.toString(16)
			.padStart(2, "0")
	);
}
