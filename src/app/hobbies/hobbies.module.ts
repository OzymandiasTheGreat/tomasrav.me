import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "../app-routing.module";
import { MarkdownModule } from "ngx-markdown";
import { MaterialModule } from "../material.module";
import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";
import { HobbiesComponent } from "./hobbies/hobbies.component";
import { CookingComponent } from './cooking/cooking.component';



@NgModule({
	declarations: [HobbiesComponent, CookingComponent],
	imports: [
		CommonModule,
		AppRoutingModule,
		MaterialModule,
		MarkdownModule.forChild(),
		CoreModule,
		SharedModule,
	],
	exports: [
		HobbiesComponent,
		CookingComponent,
	],
})
export class HobbiesModule { }
