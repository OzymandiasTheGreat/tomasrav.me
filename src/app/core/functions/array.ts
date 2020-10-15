export function range(min: number, max: number): number[] {
	return Array.from(new Array(min ? max - min : max).keys()).map((n) => min ? n + min : n);
}
