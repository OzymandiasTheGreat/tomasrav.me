import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class GeolocationService {

	constructor() { }

	public get(): Promise<Position> {
		return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
			.then((position: Position) => position)
			.catch((err: PositionError) => {
				throw new Error(`${err.code} - ${err.message}`);
			});
	}
}
