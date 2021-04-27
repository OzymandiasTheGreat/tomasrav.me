import { Component, OnInit } from "@angular/core";

import { GithubService, Repository } from "../core/services/github.service";
import data from "../../assets/data/github.json";


@Component({
	selector: "app-github",
	templateUrl: "./github.component.html",
	styleUrls: ["./github.component.scss"]
})
export class GithubComponent implements OnInit {
	protected type: "apps" | "libs";
	public repos: Repository[];

	constructor(private gh: GithubService) { }

	public ngOnInit(): void {
		this.gh.getRepos(data.user, data[this.type])
			.subscribe((repos) => {
				this.repos = Object.values(repos).sort((a, b) => b.stars - a.stars);
			});
	}
}
