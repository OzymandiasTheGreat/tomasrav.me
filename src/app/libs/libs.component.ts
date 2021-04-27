import { Component, OnInit } from "@angular/core";

import { GithubComponent } from "../github/github.component";


@Component({
	selector: "app-libs",
	templateUrl: "./libs.component.html",
	styleUrls: ["./libs.component.scss"]
})
export class LibsComponent extends GithubComponent implements OnInit {
	protected type: "libs" = "libs";
}
