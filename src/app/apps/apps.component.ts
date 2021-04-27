import { Component, OnInit } from "@angular/core";

import { GithubComponent } from "../github/github.component";

@Component({
	selector: "app-apps",
	templateUrl: "./apps.component.html",
	styleUrls: ["./apps.component.scss"]
})
export class AppsComponent extends GithubComponent implements OnInit {
	protected type: "apps" = "apps";
}
