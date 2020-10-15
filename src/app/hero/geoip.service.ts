import { Injectable } from "@angular/core";


export interface GeoIP {
	"query": string;
	"status": string;
	"message": string;
	"countryCode": string;
	"city": string;
	"lat": number;
	"lon": number;
}


@Injectable({
	providedIn: "root"
})
export class GeoIPService {

	constructor() { }

	public lookup(ip?: string): Promise<GeoIP> {
		ip = ip ? `/${ip}` : "";
		return fetch(`https://ip-api.com/json${ip}?fields=status,message,countryCode,city,lat,lon,query`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error(`${response.status} - ${response.statusText}`);
			});
	}
}
