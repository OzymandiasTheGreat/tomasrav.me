import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { MaterialModule } from "./material.module";
import { MarkdownModule, MarkedOptions, MarkedRenderer } from "ngx-markdown";
import { HobbiesModule } from "./hobbies/hobbies.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SunComponent } from "./hero/sun/sun.component";
import { HeroComponent } from "./hero/hero/hero.component";
import { MoonComponent } from "./hero/moon/moon.component";
import { GrassComponent } from "./hero/grass/grass.component";
import { RainComponent } from "./hero/rain/rain.component";
import { SnowComponent } from "./hero/snow/snow.component";
import { TreesComponent } from "./hero/trees/trees.component";
import { SnowbankComponent } from "./hero/snowbank/snowbank.component";
import { CloudsComponent } from "./hero/clouds/clouds.component";
import { BirdsComponent } from "./hero/birds/birds.component";
import { FogComponent } from "./hero/fog/fog.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { GhCardComponent } from "./gh-card/gh-card.component";
import { GhPageComponent } from "./gh-page/gh-page.component";
import { DonateComponent } from './donate/donate.component';


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
		SunComponent,
		HeroComponent,
		MoonComponent,
		GrassComponent,
		RainComponent,
		SnowComponent,
		TreesComponent,
		SnowbankComponent,
		CloudsComponent,
		BirdsComponent,
		FogComponent,
		HomeComponent,
		ProfileComponent,
		GhCardComponent,
		GhPageComponent,
		DonateComponent,
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
			loader: HttpClient,
			markedOptions: {
				provide: MarkedOptions,
				useFactory: markedOptionsFactory,
			},
		}),
		HobbiesModule,
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
