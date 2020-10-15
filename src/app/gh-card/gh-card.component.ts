import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";

import { randInt } from "../core/functions/random";
import { GithubService, Repository } from "../core/services/github.service";
import ghData from "../../assets/data/github.json";


@Component({
	selector: "app-gh-card",
	templateUrl: "./gh-card.component.html",
	styleUrls: ["./gh-card.component.scss"]
})
export class GhCardComponent implements OnInit {
	@Input() public type: "apps" | "libs";
	@Output() public expand: EventEmitter<"apps" | "libs">;
	public expanded = false;
	public lang: string;
	public blurbURI: string;
	public repositories: Repository[];
	public screenshots: string[] = [];

	constructor(
		private translate: TranslateService,
		private gh: GithubService,
	) {
		this.expand = new EventEmitter<"apps" | "libs">();
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			this.lang = event.lang;
			this.blurbURI = `/assets/content/${this.type}.blurb.${this.lang}.md`;
		});
	}

	public ngOnInit(): void {
		this.gh.getRepos(ghData.user, ghData[this.type])
			.subscribe((repos) => {
				this.repositories = Object.values(repos).sort((a, b) => b.updated.getTime() - a.updated.getTime());
				this.repositories.forEach((repo) => this.screenshots.push(this.getScreenshot(repo)));
			});
	}

	public getScreenshot(repo: Repository): string {
		return repo.screenshots && repo.screenshots[randInt(0, repo.screenshots.length - 1)];
	}

	public toggleExpand(state: boolean): void {
		this.expanded = state;
		this.expand.emit(state ? this.type : null);
	}
}
