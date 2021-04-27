import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

import { randInt } from "./core/functions/random";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
	public title = "Tomas Ravinskas";
	public languages: string[] = ["en", "lt"];
	public lang: string;
	public avatar: string;

	constructor(private translate: TranslateService) {
		this.translate.setDefaultLang("en");
		this.translate.use(window.localStorage.getItem("lang") || this.translate.getBrowserLang());
	}

	public ngOnInit() {
		this.lang = window.localStorage.getItem("lang") || this.translate.getBrowserLang();
		this.avatar = `/assets/profile/${randInt(1, 9)}.jpg`;
	}

	public onLang(lang: string): void {
		this.lang = lang;
		window.localStorage.setItem("lang", lang);
		this.translate.use(lang);
	}
}
