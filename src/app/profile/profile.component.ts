import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";

import { randInt } from "../core/functions/random";
import { education, employment } from "../../assets/content/qualifications.json";


@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
	@Output() public expand: EventEmitter<string>;
	public lang: string;
	public blurbURI: string;
	public profileURI: string;
	public picURI: string;
	public expanded = false;
	public education = education;
	public educationCols = ["institution", "degree", "started", "ended", "status", "comment"];
	public employment = employment;
	public employmentCols = ["company", "started", "ended", "position"];

	constructor(
		private translate: TranslateService,
	) {
		this.expand = new EventEmitter<string>();
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			this.lang = event.lang;
			this.blurbURI = `/assets/content/profile.blurb.${this.lang}.md`;
			this.profileURI = `/assets/content/profile.${this.lang}.md`;
		});
	}

	public ngOnInit(): void {
		this.picURI = `/assets/profile/${randInt(1, 9)}.jpg`;
	}

	public toggleExpand(state: boolean): void {
		this.expanded = state;
		this.expand.emit(state ? "about" : null);
	}
}
