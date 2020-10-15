export function randInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randFloat(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}
