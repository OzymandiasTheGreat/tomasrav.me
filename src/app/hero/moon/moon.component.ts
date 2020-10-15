import { Component, ViewChild, ElementRef } from "@angular/core";


@Component({
	selector: "app-moon",
	templateUrl: "./moon.component.html",
	styleUrls: ["./moon.component.scss"]
})
export class MoonComponent {
	@ViewChild("container", { static: true }) private container: ElementRef<HTMLDivElement>;

	constructor() { }

	public get rect(): ClientRect {
		return this.container.nativeElement.getBoundingClientRect();
	}
}
