import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DomSanitizer } from "@angular/platform-browser";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatListModule } from "@angular/material/list";
import { MatBadgeModule } from "@angular/material/badge";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSidenavModule } from "@angular/material/sidenav";
import { PlatformModule } from "@angular/cdk/platform";

import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatToolbarModule,
		MatFormFieldModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MatCardModule,
		MatTableModule,
		MatListModule,
		MatBadgeModule,
		MatExpansionModule,
		MatSidenavModule,
		PlatformModule,
		NgxSkeletonLoaderModule,
	],
	exports: [
		MatToolbarModule,
		MatFormFieldModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MatCardModule,
		MatTableModule,
		MatListModule,
		MatBadgeModule,
		MatExpansionModule,
		MatSidenavModule,
		PlatformModule,
		NgxSkeletonLoaderModule,
	],
})
export class MaterialModule {
	constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
		matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl("/assets/fonts/mdi.svg"));
		matIconRegistry.addSvgIcon("en", domSanitizer.bypassSecurityTrustResourceUrl("/assets/flags/gb.svg"));
		matIconRegistry.addSvgIcon("lt", domSanitizer.bypassSecurityTrustResourceUrl("/assets/flags/lt.svg"));
		matIconRegistry.addSvgIcon("ru", domSanitizer.bypassSecurityTrustResourceUrl("/assets/flags/ru.svg"));
	}
}
