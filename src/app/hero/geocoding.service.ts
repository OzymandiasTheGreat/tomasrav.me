import { Injectable } from "@angular/core";


export interface Geocode {
	"latitude": number;
	"longitude": number;
	"plusCode": string;
	"localityLanguageRequested": string;
	"continent": string;
	"continentCode": string;
	"countryName": string;
	"countryCode": string;
	"principalSubdivision": string;
	"principalSubdivisionCode": string;
	"city": string;
	"locality": string;
	"postcode": string;
	"localityInfo": {
		"administrative": [
			{
				"order": number;
				"adminLevel": number;
				"name": string;
				"description": string;
				"isoName": string;
				"isoCode": string;
				"wikidataId": string;
				"geonameId": number;
			},
		],
		"informative": [
			{
				"order": number;
				"name": string;
				"description": string;
				"isoCode": string;
				"wikidataId": string;
				"geonameId": number;
			},
		],
	};
}


@Injectable({
	providedIn: "root"
})
export class GeocodingService {
	constructor() { }

	public lookup(lat: number, lon: number): Promise<Geocode> {
		return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error(`${response.status} - ${response.statusText}`);
			});
	}
}
