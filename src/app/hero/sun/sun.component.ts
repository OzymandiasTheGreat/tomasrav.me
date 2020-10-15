import { Component, ViewChild, ElementRef } from "@angular/core";


import { range } from "../../core/functions/array";


@Component({
	selector: "app-sun",
	templateUrl: "./sun.component.html",
	styleUrls: ["./sun.component.scss"]
})
export class SunComponent {
	@ViewChild("container", { static: true }) private container: ElementRef<HTMLDivElement>;
	public beams: number[] = range(0, 13);

	constructor() { }

	public get rect(): ClientRect {
		return this.container.nativeElement.getBoundingClientRect();
	}
}
