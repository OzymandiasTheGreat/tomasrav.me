import { Injectable } from "@angular/core";


const TRAKT_ENDPOINT = "https://api-ozymandias-tk.herokuapp.com/trakt";
const IMG_OMDB_ENDPOINT = "https://api-ozymandias-tk.herokuapp.com/iomdb";


export interface TraktResponse {
	"plays": number;
	"last_watched_at": string;
	"last_updated_at": string;
	"reset_at": string;
	"show": {
		"title": string;
		"year": number;
		"ids": {
			"trakt": number;
			"slug": string;
			"tvdb": number;
			"imdb": string;
			"tmdb": string;
			"tvrage": string;
		},
		"overview": string;
		"first_aired": string;
		"airs": {
			"day": "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
			"time": string;
			"timezone": string;
		};
		"runtime": number;
		"certification": string;
		"country": string;
		"trailer": string;
		"homepage": string;
		"status": string;
		"rating": number;
		"votes": number;
		"comment_count": number;
		"network": string;
		"updated_at": string;
		"language": string;
		"available_translations": string[];
		"genres": string[];
		"aired_episodes": number;
	};
	"movie": {
		"title": string;
		"year": number;
		"ids": {
			"trakt": number;
			"slug": string;
			"imdb": string;
			"tmdb": string;
		};
		"tagline": string;
		"overview": string;
		"released": string;
		"runtime": number;
		"country": string;
		"trailer": string;
		"homepage": string;
		"status": string;
		"rating": number;
		"votes": number;
		"comment_count": number;
		"updated_at": string;
		"language": string;
		"available_translations": string[];
		"genres": string[];
		"certification": string;
	};
}


export interface MediaItem {
	"title": string;
	"description": string;
	"tagline": string;
	"genres": string[];
	"year": number;
	"plays": number;
	"lastWatched": string;
	"slug": string;
	"imdb": string;
	"rating": number;
	"img": string;
}


@Injectable({
	providedIn: "root"
})
export class TraktService {

	constructor() {}

	public getMovies(slug: string): Promise<MediaItem[]> {
		const endpoint = new URL(`trakt/users/${slug}/history/movies`, TRAKT_ENDPOINT);
		endpoint.searchParams.append("page", "1");
		endpoint.searchParams.append("limit", "13");
		endpoint.searchParams.append("extended", "full");
		return fetch(endpoint.href).then((response) => {
			if (response.ok) {
				return <Promise<TraktResponse[]>> response.json();
			}
			throw new Error(`${response.status} - ${response.statusText}`);
		}).then((movies) => {
			return <MediaItem[]> movies.map((movie) => {
				const poster = new URL(IMG_OMDB_ENDPOINT);
				poster.searchParams.append("i", movie.movie.ids.imdb);
				return {
					title: movie.movie.title,
					tagline: movie.movie.tagline,
					description: movie.movie.overview,
					year: movie.movie.year,
					genres: movie.movie.genres,
					rating: movie.movie.rating,
					slug: movie.movie.ids.slug,
					imdb: movie.movie.ids.imdb,
					plays: movie.plays,
					lastWatched: movie.last_watched_at,
					img: poster.href,
				};
			});
		});
	}

	public getShows(slug: string): Promise<MediaItem[]> {
		const endpoint = new URL(`trakt/users/${slug}/history/shows`, TRAKT_ENDPOINT);
		endpoint.searchParams.append("page", "1");
		endpoint.searchParams.append("limit", "13");
		endpoint.searchParams.append("extended", "full");
		return fetch(endpoint.href).then((response) => {
			if (response.ok) {
				return <Promise<TraktResponse[]>> response.json();
			}
			throw new Error(`${response.status} - ${response.statusText}`);
		}).then((shows) => {
			return <MediaItem[]> shows.map((show) => {
				const poster = new URL(IMG_OMDB_ENDPOINT);
				poster.searchParams.append("i", show.show.ids.imdb);
				return {
					title: show.show.title,
					tagline: null,
					description: show.show.overview,
					year: show.show.year,
					genres: show.show.genres,
					rating: show.show.rating,
					slug: show.show.ids.slug,
					imdb: show.show.ids.imdb,
					plays: show.plays,
					lastWatched: show.last_watched_at,
					img: poster.href,
				};
			});
		});
	}
}
