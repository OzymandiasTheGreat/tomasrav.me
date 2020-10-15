import { Injectable } from "@angular/core";


export interface Recipe {
	id: number;
	title: string;
	modified: number;
	content: string;
}


@Injectable({
	providedIn: "root"
})
export class CookingService {

	constructor() { }

	public getRecipeList(): Promise<Recipe[]> {
		return fetch(`https://pure-tor-21982.herokuapp.com/cooking?exclude=category%2Cfavorite`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error(`${response.status} - ${response.statusText}`);
			});
	}
}
