import { Injectable } from "@angular/core";

import { randInt } from "../../core/functions/random";


const ENDPOINT = "https://pure-tor-21982.herokuapp.com/kitsu/library-entries";


export type Kind = "manga" | "anime";


export interface KitsuResponse {
	"data": [{
		"id": string,
		"type": Kind,
		"attributes": {
			"status": "completed" | "current" | "dropped" | "on_hold" | "planned",
			"ratingTwenty": number
		},
		"relationships": {
			[key in Kind]: {
				"data": {
					"type": Kind,
					"id": string,
				},
			};
		},
	}];
	"included": [{
		"id": string,
		"type": Kind,
		"attributes": {
			"slug": string,
			"synopsis": string,
			"canonicalTitle": string,
			"posterImage": {
				"tiny": string,
				"small": string,
				"medium": string,
				"large": string,
				"original": string,
			},
		},
	}];
	"meta": {
		"statusCounts": {
			"current": number,
			"planned": number,
			"completed": number,
			"onHold": number,
			"dropped": number,
		},
		"count": number,
	};
}


export interface MediaItem {
	slug: string;
	title: string;
	synopsis: string;
	rating: number;
	img: string;
	thumb: string;
}


function buildQuery(kind: Kind, userId: string): string {
	const uri = new URL(ENDPOINT);
	// Breaks API: "-ratingTwenty"
	const sort = ["-startedAt", `-${kind}.averageRating`, `-${kind}.userCount`];
	uri.searchParams.append("page[limit]", "13");
	uri.searchParams.append("page[offset]", `${randInt(1, 7) - 1}`);
	uri.searchParams.append("include", kind);
	uri.searchParams.append("fields[library-entries]", `status,ratingTwenty,${kind}`);
	uri.searchParams.append(`fields[${kind}]`, "slug,synopsis,canonicalTitle,posterImage");
	uri.searchParams.append("filter[userId]", userId);
	uri.searchParams.append("filter[kind]", kind);
	uri.searchParams.append("filter[status]", "completed,current");
	uri.searchParams.append("sort", sort[randInt(1, sort.length) - 1]);
	return uri.href;
}


@Injectable({
	providedIn: "root",
})
export class KitsuService {

	constructor() {}

	public getAnime(userId: string): Promise<MediaItem[]> {
		return fetch(buildQuery("anime", userId)).then((response) => {
			if (response.ok) {
				return <Promise<KitsuResponse>> response.json();
			}
			throw new Error(`${response.status} - ${response.statusText}`);
		}).then((data) => data.data.map((entry) => {
			const anime = data.included.find((a) => a.id === entry.relationships.anime.data.id);
			return <MediaItem> {
				slug: anime.attributes.slug,
				title: anime.attributes.canonicalTitle,
				synopsis: anime.attributes.synopsis,
				rating: Math.round(entry.attributes.ratingTwenty / 4 * 100) / 100,
				img: anime.attributes.posterImage.small,
				thumb: anime.attributes.posterImage.tiny,
			};
		}));
	}

	public getManga(userId: string): Promise<MediaItem[]> {
		return fetch(buildQuery("manga", userId)).then((response) => {
			if (response.ok) {
				return <Promise<KitsuResponse>> response.json();
			}
			throw new Error(`${response.status} - ${response.statusText}`);
		}).then((data) => data.data.map((entry) => {
			const manga = data.included.find((m) => m.id === entry.relationships.manga.data.id);
			return <MediaItem> {
				slug: manga.attributes.slug,
				title: manga.attributes.canonicalTitle,
				synopsis: manga.attributes.synopsis,
				rating: Math.round(entry.attributes.ratingTwenty / 4 * 100) / 100,
				img: manga.attributes.posterImage.small,
				thumb: manga.attributes.posterImage.tiny,
			};
		}));
	}
}
