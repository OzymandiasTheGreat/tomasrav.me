import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { CookingComponent } from "./hobbies/cooking/cooking.component";
import { GhPageComponent } from "./gh-page/gh-page.component";


const routes: Routes = [
	{ path: "", component: HomeComponent },
	{ path: "cooking", component: CookingComponent },
	{ path: "app/:id", component: GhPageComponent },
];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
