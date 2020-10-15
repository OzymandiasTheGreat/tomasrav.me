import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter, Output } from "@angular/core";
import * as suncalc from "suncalc";

import { SunComponent } from "../sun/sun.component";
import { MoonComponent } from "../moon/moon.component";
import { GeolocationService } from "../geolocation.service";
import { GeocodingService, Geocode } from "../geocoding.service";
import { GeoIPService, GeoIP } from "../geoip.service";
import { OpenWeatherMapService, WeatherData } from "../openweathermap.service";
import { randInt } from "../../core/functions/random";


const HOME_COORDS = { lat: 54.94, lon: 23.93, city: "Kaunas", country: "LT" };
const KONAMI_CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

@Component({
	selector: "app-hero",
	templateUrl: "./hero.component.html",
	styleUrls: ["./hero.component.scss"]
})
export class HeroComponent implements OnInit, AfterViewInit {
	@ViewChild("hero", { static: true }) private hero: ElementRef<HTMLDivElement>;
	@ViewChild("sun") private sun: SunComponent;
	@ViewChild("moon") private moon: MoonComponent;
	@Output() public expand: EventEmitter<"hero">;
	public now: Date = new Date();
	public daytime: "day" | "dusk" | "night" | "dawn" = "day";
	public daytimes: string[] = ["day", "dusk", "night", "dawn"];
	public season: "spring" | "summer" | "fall" | "winter";
	public seasons: string[] = ["spring", "summer", "fall", "winter"];
	public location: { lat: number, lon: number, city: string, country: string } = HOME_COORDS;
	public weather: WeatherData;
	public skyBodyPos: { sunX: number, sunY: number, moonX: number, moonY: number } = { sunX: 1, sunY: 1, moonX: 1, moonY: 1 };
	public conditions = { clear: false, cloudy: false, rain: false, snow: false, fog: false };
	public conditonList: string[];
	public konami = false;
	public sequence: string[] = [];
	public lastKey = 0;

	constructor(
		private cdRef: ChangeDetectorRef,
		private geo: GeolocationService,
		private geocode: GeocodingService,
		private geoIP: GeoIPService,
		private owm: OpenWeatherMapService,
	) {
		this.expand = new EventEmitter<"hero">();
	}

	public ngOnInit(): void {
		this.conditonList = Object.keys(this.conditions);
		window.addEventListener("keydown", (event) => {
			if ((Date.now() - this.lastKey) > 30000) {
				this.lastKey = event.timeStamp;
			}
			if (KONAMI_CODE.includes(event.key) && (event.timeStamp - this.lastKey) <= 1750) {
				this.sequence.push(event.key);
				while (this.sequence.length > 10) {
					this.sequence.shift();
				}
				if (KONAMI_CODE.every((k, i) => k === this.sequence[i])) {
					this.expand.emit("hero");
					this.konami = true;
				}
			} else {
				this.sequence = [];
			}
			this.lastKey = event.timeStamp;
		});
		this.setSeason(this.now.getMonth());
		this.setSkyBodyPosition();
	}

	public ngAfterViewInit(): void {
		this.geolocate();
	}

	public shrink(): void {
		this.konami = false;
		this.expand.emit(null);
		this.geolocate();
	}

	public getConditions(): string[] {
		return this.conditonList.filter((c) => this.conditions[c]);
	}

	public setConditions<T extends keyof this["conditions"]>(keys: T[]): void {
		this.conditonList.forEach((k) => this.conditions[k] = false);
		for (const key of keys) {
			this.conditions[<any> key] = true;
		}
	}

	public skyCycle(): void {
		let h = 0;
		const timer = setInterval(() => {
			if (h === 24) {
				this.now = new Date();
				clearInterval(timer);
				this.setSkyBodyPosition();
				return;
			}
			this.now.setHours(h, 0, 0, 0);
			this.setDaytime();
			this.setSkyBodyPosition();
			h++;
		}, 950);
	}

	public geolocate(): void {
		this.geo.get().then((position) => this.geocode.lookup(position.coords.latitude, position.coords.longitude))
		.catch(() => this.geoIP.lookup()).catch(() => HOME_COORDS)
		.then((loc) => {
			this.location = {
				lat: (<Geocode> loc).latitude || (<GeoIP> loc).lat,
				lon: (<Geocode> loc).longitude || (<GeoIP> loc).lon,
				city: (<Geocode> loc).city || (<GeoIP> loc).city || "Unknown",
				country: (<Geocode> loc).countryCode || (<GeoIP> loc).countryCode || "Unknown",
			};
		}).then(() => this.owm.getWeather(this.location)).then((data) => {
			console.log(`Generating scenery for ${this.location.city}, ${this.location.country}...`);
			this.weather = data;
			this.setSeason(this.now.getMonth());
			this.setDaytime();
			this.setSkyBodyPosition();
			this.generateScenery();
			this.cdRef.detectChanges();
		}).catch(() => {
			console.log(`Generating random scenery for ${this.location.city}, ${this.location.country}...`);
			this.now.setHours(randInt(0, 23), 0, 0, 0);
			this.setSeason(randInt(1, 12));
			this.setDaytime();
			this.setSkyBodyPosition();
			this.weather = <any> { weather: [{ id: 0, main: null, description: "", icon: null }] };
			switch (randInt(1, 5)) {
				case 1:
					this.weather.weather[0].main = "Clear";
					break;
				case 2:
					this.weather.weather[0].main = "Clouds";
					break;
				case 3:
					this.weather.weather[0].main = "Fog";
					break;
				case 4:
					this.weather.weather[0].main = "Rain";
					break;
				case 5:
					this.weather.weather[0].main = "Snow";
			}
			this.generateScenery();
			this.cdRef.detectChanges();
		});
	}

	private setDaytime(): void {
		const now = this.now.getTime();
		const sunTimes = suncalc.getTimes(this.now, this.location.lat, this.location.lon);
		const day = sunTimes.sunriseEnd.getTime();
		const dusk = sunTimes.sunset.getTime();
		// Gives invalid date, TODO file a bug
		// const night = sunTimes.night.getTime();
		const night = sunTimes.dusk.getTime();
		const dawn = sunTimes.dawn.getTime();
		this.daytime = (now >= day && now < dusk)
			? "day"
			: (now >= dusk && now < night)
				? "dusk"
				: (now >= night && now < dawn)
					? "night"
					: (now >= dawn && now < day)
						? "dawn"
						: "day";
	}

	private setSeason(month: number): void {
		switch (month) {
			case 6:
			case 7:
			case 8:
				this.season = this.location.lat >= 0 ? "summer" : "winter";
				break;
			case 9:
			case 10:
			case 11:
				this.season = this.location.lat >= 0 ? "fall" : "spring";
				break;
			case 12:
			case 1:
			case 2:
				this.season = this.location.lat >= 0 ? "winter" : "summer";
				break;
			case 3:
			case 4:
			case 5:
				this.season = this.location.lat >= 0 ? "spring" : "fall";
		}
	}

	private setSkyBodyPosition(): void {
		const rect = this.hero.nativeElement.getBoundingClientRect();
		const sunMaxX = this.sun && (rect.width - this.sun.rect.width) || 0;
		const sunMaxY = this.sun && (rect.height - this.sun.rect.height) || 0;
		const moonMaxX = this.moon && (rect.width - this.moon.rect.width) || 0;
		const moonMaxY = this.moon && (rect.height - this.moon.rect.height) || 0;
		const maxAzimuth = Math.PI * (3 / 4);
		const sunPos = suncalc.getPosition(this.now, this.location.lat, this.location.lon);
		const moonPos = suncalc.getMoonPosition(this.now, this.location.lat, this.location.lat);
		const sunX = ((sunPos.azimuth + maxAzimuth) / (maxAzimuth * 2)) * sunMaxX;
		const sunY = sunPos.altitude * (sunMaxY / (Math.PI / 2));
		const moonX = ((moonPos.azimuth + maxAzimuth) / (maxAzimuth * 2)) * moonMaxX;
		const moonY = moonPos.altitude * (moonMaxY / (Math.PI / 2));
		this.skyBodyPos = { sunX, sunY, moonX, moonY };
	}

	private generateScenery(): void {
		switch (this.weather.weather[0].main) {
			case "Clear":
				Object.keys(this.conditions).map((key) => this.conditions[key] = false);
				this.conditions.clear = true;
				break;
			case "Clouds":
				Object.keys(this.conditions).map((key) => this.conditions[key] = false);
				this.conditions.cloudy = true;
				break;
			case "Drizzle":
			case "Rain":
			case "Thunderstorm":
				Object.keys(this.conditions).map((key) => this.conditions[key] = false);
				this.conditions.cloudy = true;
				this.conditions.rain = true;
				break;
			case "Snow":
				Object.keys(this.conditions).map((key) => this.conditions[key] = false);
				this.conditions.cloudy = true;
				this.conditions.snow = true;
				break;
			case "Fog":
			case "Haze":
			case "Mist":
				Object.keys(this.conditions).map((key) => this.conditions[key] = false);
				this.conditions.fog = true;
		}
		if (this.weather.weather.length > 1) {
			switch (this.weather.weather[0].main) {
				case "Clear":
					this.conditions.clear = true;
					break;
				case "Clouds":
					this.conditions.cloudy = true;
					break;
				case "Drizzle":
				case "Rain":
				case "Thunderstorm":
					this.conditions.cloudy = true;
					this.conditions.rain = true;
					break;
				case "Snow":
					this.conditions.cloudy = true;
					this.conditions.snow = true;
					break;
				case "Fog":
				case "Haze":
				case "Mist":
					this.conditions.fog = true;
			}
		}
	}
}
