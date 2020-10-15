import { Component, OnInit, Output, EventEmitter } from "@angular/core";


@Component({
	selector: "app-donate",
	templateUrl: "./donate.component.html",
	styleUrls: ["./donate.component.scss"]
})
export class DonateComponent implements OnInit {
	@Output() public expand: EventEmitter<"donate">;
	public expanded = false;

	constructor() {
		this.expand = new EventEmitter<"donate">();
	}

	public ngOnInit(): void {}

	public toggleExpand(state: boolean): void {
		this.expanded = state;
		this.expand.emit(state ? "donate" : null);
	}
}
