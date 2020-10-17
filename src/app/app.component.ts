import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

import { CoreService } from "./core/services/core.service";


@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
	public title = "Tomas Ravinskas";
	public languages: string[] = ["en", "lt"];
	public lang: string;

	constructor(private translate: TranslateService, public core: CoreService) {
		this.translate.setDefaultLang("en");
		this.translate.use(window.localStorage.getItem("lang") || this.translate.getBrowserLang());
	}

	public ngOnInit() {
		this.translate.get("profile.me").subscribe((me) => this.core.setInfo(me));
		this.lang = window.localStorage.getItem("lang") || this.translate.getBrowserLang();
	}

	public onLang(lang: string): void {
		this.lang = lang;
		window.localStorage.setItem("lang", lang);
		this.translate.use(lang);
	}
}
