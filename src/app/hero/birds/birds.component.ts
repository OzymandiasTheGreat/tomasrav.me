import { Component, OnInit } from "@angular/core";


import { range } from "../../core/functions/array";
import { randFloat } from "../../core/functions/random";


@Component({
	selector: "app-birds",
	templateUrl: "./birds.component.html",
	styleUrls: ["./birds.component.scss"]
})
export class BirdsComponent {
	public birdSeed: Array<{ seed: number, random: number }>;

	constructor() {
		this.birdSeed = range(0, 13).map(() => ({ seed: randFloat(0.45, 0.95), random: Math.random() }));
	}
}
