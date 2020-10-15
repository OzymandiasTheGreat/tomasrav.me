import { Component, Input } from "@angular/core";


export interface Item {
	img: string;
	title: string;
	subtitle: string;
	description: string;
	uri: string;
	rating: number;
}


@Component({
	selector: "app-cover-flow",
	templateUrl: "./cover-flow.component.html",
	styleUrls: ["./cover-flow.component.scss"]
})
export class CoverFlowComponent {
	@Input() public items: Item[];
	@Input() public bgColor: string;
	@Input() public itemSize: string;
	@Input() public shadowColor: string;
	public selected: Item = null;

	constructor() { }

	public select(item: Item): void {
		this.selected = item;
	}

	public selectTimeout(item: Item, timeout: number): void {
		setTimeout(() => {
			this.select(item);
		}, timeout);
	}
}
