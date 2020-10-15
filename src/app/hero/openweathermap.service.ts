import { Injectable } from "@angular/core";


export interface WeatherData {
	"coord": {
		"lon": number,
		"lat": number,
	};
	"weather": [
		{
			"id": number,
			"main": "Thunderstorm" | "Drizzle" | "Rain" | "Snow" | "Mist" | "Haze" | "Fog" | "Clear" | "Clouds",
			"description": string,
			"icon": string,
		},
	];
	"main": {
		"temp": number,
		"feels_like": number,
		"temp_min": number,
		"temp_max": number,
		"pressure": number,
		"humidity": number,
		"sea_level": number,
		"grnd_level": number,
	};
	"visibility": number;
	"wind": {
		"speed": number,
		"deg": number,
		"gust": number,
	};
	"clouds": {
		"all": number,
	};
	"rain": {
		"1h": number,
		"3h": number,
	};
	"snow": {
		"1h": number,
		"3h": number,
	};
	"dt": number;
	"sys": {
		"country": string,
		"sunrise": number,
		"sunset": number,
	};
	"timezone": number;
	"id": number;
	"name": string;
}


@Injectable({
	providedIn: "root"
})
export class OpenWeatherMapService {

	constructor() { }

	public getWeather(location: { lat: number, lon: number }): Promise<WeatherData> {
		return fetch(`https://pure-tor-21982.herokuapp.com/owm?lat=${location.lat}&lon=${location.lon}`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error(`${response.status} - ${response.statusText}`);
			});
	}

	public getIcon(icon: string): string {
		return `http://openweathermap.org/img/wn/${icon}@2x.png`;
	}
}
