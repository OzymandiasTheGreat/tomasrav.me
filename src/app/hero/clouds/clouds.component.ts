import { Component } from "@angular/core";

import { randInt } from "../../core/functions/random";


@Component({
	selector: "app-clouds",
	templateUrl: "./clouds.component.html",
	styleUrls: ["./clouds.component.scss"]
})
export class CloudsComponent {
	public seed = 0;

	constructor() {
		this.seed = randInt(13, 1024);
	}
}
