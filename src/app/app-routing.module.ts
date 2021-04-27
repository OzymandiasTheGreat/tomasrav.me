import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { AppsComponent } from "./apps/apps.component";
import { LibsComponent } from "./libs/libs.component";
import { CodeComponent } from "./code/code.component";
import { HobbiesComponent } from "./hobbies/hobbies.component";
import { DonateComponent } from "./donate/donate.component";
import { FourOhFourComponent } from "./four-oh-four/four-oh-four.component";


const routes: Routes = [
	{ path: "about", component: ProfileComponent },
	{ path: ":type/:id", component: CodeComponent },
	{ path: "apps", component: AppsComponent },
	{ path: "libs", component: LibsComponent },
	{ path: "hobbies", component: HobbiesComponent },
	{ path: "donate", component: DonateComponent },
	{ path: "404" , component: FourOhFourComponent },
	{ path: "", component: HomeComponent },
	{ path: "**", redirectTo: "404" },
];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
