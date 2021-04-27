import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as Luminous from "luminous-lightbox";

import data from "../../assets/data/github.json";
import { GithubService, Repository } from "../core/services/github.service";


@Component({
	selector: "app-code",
	templateUrl: "./code.component.html",
	styleUrls: ["./code.component.scss"]
})
export class CodeComponent implements OnInit {
	public repo: Repository;
	public type: string;

	constructor(
		private route: ActivatedRoute,
		private gh: GithubService,
	) { }

	public ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			this.type = params.get("type");
			const slug = params.get("id");
			this.gh.getRepos(data.user, data[this.type]).subscribe((repos) => {
				this.repo = repos[slug.replace(/\-/g, "_")];
				if (this.repo) {
					setTimeout(() => {
						const gallery = new Luminous.LuminousGallery(document.querySelectorAll(".screenshot"), {}, { sourceAttribute: "src" });
					}, 100);
				}
			});
		});
	}
}
