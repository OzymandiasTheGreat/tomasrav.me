import { FONT_BODY, FONT_SIZE_R } from "../theme";

export function textSize(text: string, width: number): number {
	const span = document.createElement("span");
	span.style.display = "inline-block";
	span.style.position = "absolute";
	span.style.top = "-100vh";
	span.style.height = "min-content";
	span.style.maxWidth = `${width}px`;
	span.style.fontFamily = `"${FONT_BODY}", serif`;
	span.style.fontSize = `${FONT_SIZE_R}px`;
	span.innerText = text;
	document.body.appendChild(span);
	const rect = span.getBoundingClientRect();
	span.remove();
	return Math.max(rect.width, rect.height);
}
