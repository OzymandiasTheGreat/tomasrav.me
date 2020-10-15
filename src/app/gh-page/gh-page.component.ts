import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as Luminous from "luminous-lightbox";

import ghData from "../../assets/data/github.json";
import { GithubService, Repository } from "../core/services/github.service";


@Component({
	selector: "app-gh-page",
	templateUrl: "./gh-page.component.html",
	styleUrls: ["./gh-page.component.scss"]
})
export class GhPageComponent implements OnInit {
	private repos: { [repo: string]: Repository};
	public repo: Repository;

	constructor(
		private route: ActivatedRoute,
		private gh: GithubService,
	) { }

	public ngOnInit(): void {
		this.gh.getRepos(ghData.user, ghData.apps.concat(ghData.libs)).subscribe((repos) => {
			this.repos = repos;
			this.route.paramMap.subscribe((params) => {
				const slug = params.get("id");
				if (slug) {
					this.repo = repos[slug.replace(/\-/g, "_")];
					setTimeout(() => {
						new Luminous.LuminousGallery(document.querySelectorAll(".screenshot-wrapper"), {}, { sourceAttribute: "src" });
					}, 100);
				}
			});
		});
	}
}
