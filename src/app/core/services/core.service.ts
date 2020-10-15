import { Injectable } from "@angular/core";


@Injectable({
	providedIn: "root",
})
export class CoreService {
	public info: string;
	public expanded: string;

	constructor() { }

	public setInfo(info: string) {
		this.info = info;
	}

	public setExpanded(expanded: string) {
		this.expanded = expanded;
	}
}
