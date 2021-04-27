import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";


@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
	public konami: boolean;
	public lang: string;
	public aboutUri: string;
	public appsUri: string;
	public libsUri: string;
	public hobbiesUri: string;

	constructor(
		private router: Router,
		private translate: TranslateService,
	) {
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			this.aboutUri = `/assets/content/profile.blurb.${event.lang}.md`;
			this.appsUri = `/assets/content/apps.blurb.${event.lang}.md`;
			this.libsUri = `/assets/content/libs.blurb.${event.lang}.md`;
			this.hobbiesUri = `/assets/content/hobbies.blurb.${event.lang}.md`;
		});
	}

	public ngOnInit(): void {
		this.lang = window.localStorage.getItem("lang") || this.translate.getBrowserLang();
		this.aboutUri = `/assets/content/profile.blurb.${this.lang}.md`;
		this.appsUri = `/assets/content/apps.blurb.${this.lang}.md`;
		this.libsUri = `/assets/content/libs.blurb.${this.lang}.md`;
		this.hobbiesUri = `/assets/content/hobbies.blurb.${this.lang}.md`;
	}

	public navigate(uri: string): void {
		// setTimeout(() => {
		// 	this.router.navigate(["/", uri]);
		// }, 750);
	}
}
