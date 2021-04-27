import { Component, OnInit } from "@angular/core";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";

import { randInt } from "../core/functions/random";
import { education, employment } from "../../assets/content/qualifications.json";


@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
	public lang: string;
	public profileURI: string;
	public picURI: string;
	public education = education;
	public educationCols = ["institution", "degree", "started", "ended", "status", "comment"];
	public employment = employment;
	public employmentCols = ["company", "started", "ended", "position"];

	constructor(
		private translate: TranslateService,
	) {
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			this.lang = event.lang;
			this.profileURI = `/assets/content/profile.${this.lang}.md`;
		});
	}

	public ngOnInit(): void {
		this.lang = this.translate.currentLang;
		this.profileURI = `/assets/content/profile.${this.lang}.md`;
		this.picURI = `/assets/profile/${randInt(1, 9)}.jpg`;
	}

	public print(): void {
		window.print();
	}

	public log(err: any): void {
		console.error(err);
	}
}
