import { BrowserModule } from "@angular/platform-browser";
import { NgModule, SecurityContext } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { MaterialModule } from "./material.module";
import { MarkdownModule, MarkedOptions, MarkedRenderer } from "ngx-markdown";
import { HeroComponent } from "./hero/hero/hero.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { GithubComponent } from "./github/github.component";
import { AppsComponent } from "./apps/apps.component";
import { LibsComponent } from "./libs/libs.component";
import { CodeComponent } from "./code/code.component";
import { HobbiesComponent } from "./hobbies/hobbies.component";
import { DonateComponent } from "./donate/donate.component";
import { FourOhFourComponent } from "./four-oh-four/four-oh-four.component";


export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}


export function markedOptionsFactory(): MarkedOptions {
	const renderer = new MarkedRenderer();

	renderer.image = (href: string, title: string, text: string): string => {
		if (href.startsWith("http")) {
			return `<a class="md-image-wrapper" src="${href}"><img class="md-image" src="${href}" alt="${text}"/></a>`;
		}
		return "";
	};

	return {
		renderer,
		gfm: true,
		smartLists: true,
		smartypants: false,
	};
	}


@NgModule({
	declarations: [
		AppComponent,
		HeroComponent,
		HomeComponent,
		ProfileComponent,
		GithubComponent,
		AppsComponent,
		LibsComponent,
		CodeComponent,
		HobbiesComponent,
		DonateComponent,
		FourOhFourComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		TranslateModule.forRoot({
			defaultLanguage: "en",
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient],
			},
		}),
		CoreModule,
		SharedModule,
		MaterialModule,
		MarkdownModule.forRoot({
			sanitize: SecurityContext.NONE,
			loader: HttpClient,
			markedOptions: {
				provide: MarkedOptions,
				useFactory: markedOptionsFactory,
			},
		}),
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
