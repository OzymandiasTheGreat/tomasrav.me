export function randInt(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function distance(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
): number {
	return Math.ceil(Math.hypot(x2 - x1, y2 - y1));
}
