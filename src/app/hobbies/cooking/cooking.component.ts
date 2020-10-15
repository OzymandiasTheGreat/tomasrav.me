import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as Luminous from "luminous-lightbox";

import { CookingService, Recipe } from "../services/cooking.service";


@Component({
	selector: "app-cooking",
	templateUrl: "./cooking.component.html",
	styleUrls: ["./cooking.component.scss"]
})
export class CookingComponent implements OnInit, AfterViewInit {
	public recipes: Recipe[];
	public current: number;
	public form: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private cooking: CookingService,
	) { }

	public ngOnInit(): void {
		this.cooking.getRecipeList().then((recipes) => this.recipes = recipes);
		this.form = new FormGroup({
			"g-recaptcha-response": new FormControl(null, Validators.required),
		});
	}

	public ngAfterViewInit() {
		this.route.fragment.subscribe((fragment) => this.current = parseInt(fragment, 10));
	}

	public open(id: number) {
		this.router.navigate([], { fragment: id.toString() });
		setTimeout(() => {
			new Luminous.LuminousGallery(document.querySelectorAll(".md-image-wrapper"), {}, { sourceAttribute: "src" });
		}, 100);
	}

	public close() {
		this.router.navigate([]);
	}
}
