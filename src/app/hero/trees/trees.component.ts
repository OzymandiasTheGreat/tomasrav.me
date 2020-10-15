import { Component, OnInit, Input } from "@angular/core";


import { randInt, randFloat } from "../../core/functions/random";
import { range } from "../../core/functions/array";


@Component({
	selector: "app-trees",
	templateUrl: "./trees.component.html",
	styleUrls: ["./trees.component.scss"]
})
export class TreesComponent implements OnInit {
	@Input() public season: "summer" | "fall" | "winter" | "spring";
	public seed: Array<{ seed: number, random: number }>;

	constructor() { }

	public ngOnInit(): void {
		this.seed = range(1, randInt(1, 13)).map(() => ({
			seed: randFloat(0.9, 1.2),
			random: Math.random(),
		}));
	}
}
