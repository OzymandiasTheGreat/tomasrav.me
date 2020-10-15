import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { TranslateService } from "@ngx-translate/core";

import { randInt } from "../core/functions/random";
import { HeroComponent } from "../hero/hero/hero.component";
import { ProfileComponent } from "../profile/profile.component";
import { GhCardComponent } from "../gh-card/gh-card.component";
import { HobbiesComponent } from "../hobbies/hobbies/hobbies.component";
import { DonateComponent } from "../donate/donate.component";
import { CoreService } from "../core/services/core.service";


@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, AfterViewInit {
	@ViewChild("hero") private hero: HeroComponent;
	@ViewChild("about") private about: ProfileComponent;
	@ViewChild("apps") private apps: GhCardComponent;
	@ViewChild("libs") private libs: GhCardComponent;
	@ViewChild("hobbies") private hobbies: HobbiesComponent;
	@ViewChild("donate") private donate: DonateComponent;
	public portrait = false;
	public lang: string;
	public languages: string[] = ["en", "lt", "ru"];
	public expanded: string;
	public info: string;
	public profile: string;
	public testString: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private cdRef: ChangeDetectorRef,
		private breakpoint: BreakpointObserver,
		private translate: TranslateService,
		private core: CoreService,
	) {
		this.breakpoint.observe([
			Breakpoints.HandsetPortrait,
			Breakpoints.TabletPortrait,
			Breakpoints.WebPortrait,
			Breakpoints.HandsetLandscape,
			Breakpoints.TabletLandscape,
			Breakpoints.WebLandscape,
		]).subscribe((state) => {
			if (state.breakpoints[Breakpoints.HandsetPortrait]
				|| state.breakpoints[Breakpoints.TabletPortrait]
				|| state.breakpoints[Breakpoints.WebPortrait]
			) {
				this.portrait = true;
			} else {
				this.portrait = false;
			}
		});
	}

	public ngOnInit(): void {
		this.translate.get("profile.me").subscribe((me) => {
			this.info = me;
			this.core.setInfo(me);
		});
		this.lang = window.localStorage.getItem("lang") || this.translate.getBrowserLang();
		this.profile = `/assets/profile/${randInt(1, 9)}.jpg`;
	}

	public ngAfterViewInit() {
		this.route.fragment.subscribe((fragment) => {
			this.toggleExpand(fragment);
			this.cdRef.detectChanges();
		});
	}

	public onLang(lang: string): void {
		this.lang = lang;
		window.localStorage.setItem("lang", lang);
		this.translate.use(lang);
	}

	public toggleExpand(component: string): void {
		this.expanded = component;
		this.core.setExpanded(component);
		this.info = component === "hero"
			? `${this.hero.now.toLocaleTimeString()} at ${this.hero.location.city}, ${this.hero.location.country}`
			: this.translate.instant("profile.me");
		this.core.setInfo(component === "hero"
			? `${this.hero.now.toLocaleTimeString()} at ${this.hero.location.city}, ${this.hero.location.country}`
			: this.translate.instant("profile.me"));
		if (component) {
			this.hero.konami = false;
			this.about.expanded = false;
			this.apps.expanded = false;
			this.libs.expanded = false;
			this.hobbies.expanded = false;
			this.donate.expanded = false;
			this[component].expanded = true;
		} else {
			this.hero.konami = false;
			this.about.expanded = false;
			this.apps.expanded = false;
			this.libs.expanded = false;
			this.hobbies.expanded = false;
			this.donate.expanded = false;
		}
	}

	public navigate(component: string): void {
		this.router.navigate([], { fragment: component });
	}
}
