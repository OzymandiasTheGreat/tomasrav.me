import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { RecaptchaModule } from "ng-recaptcha";

import { MaterialModule } from "../material.module";
import { CoverFlowComponent } from "./components/cover-flow/cover-flow.component";



@NgModule({
	declarations: [CoverFlowComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
	],
	exports: [
		FormsModule,
		ReactiveFormsModule,
		TranslateModule,
		CoverFlowComponent,
	],
})
export class SharedModule { }
