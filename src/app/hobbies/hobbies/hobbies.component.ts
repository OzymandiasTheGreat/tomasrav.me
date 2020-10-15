import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";

import { randInt } from "../../core/functions/random";
import data from "../../../assets/data/hobbies.json";
import { GoodreadsService } from "../services/goodreads.service";
import { KitsuService } from "../services/kitsu.service";
import { TraktService } from "../services/trakt.service";
import { Item } from "../../shared/components/cover-flow/cover-flow.component";
import { CookingService, Recipe } from "../services/cooking.service";


@Component({
	selector: "app-hobbies",
	templateUrl: "./hobbies.component.html",
	styleUrls: ["./hobbies.component.scss"]
})
export class HobbiesComponent implements OnInit {
	@Output() public expand: EventEmitter<"hobbies">;
	public expanded = false;
	public lang: string;
	public blurbURI: string;
	public grProfileLink = `https://www.goodreads.com/user/show/${data.goodreads.id}`;
	public kitsuProfileLink = `https://kitsu.io/users/${data.kitsu.id}`;
	public traktProfileLink = `https://trakt.tv/users/${data.trakt.slug}`;
	public books: Item[];
	public comics: Item[];
	public anime: Item[];
	public manga: Item[];
	public movies: Item[];
	public shows: Item[];
	public recipe: Recipe;

	constructor(
		private translate: TranslateService,
		private gr: GoodreadsService,
		private kitsu: KitsuService,
		private trakt: TraktService,
		private cooking: CookingService,
	) {
		this.expand = new EventEmitter<"hobbies">();
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			this.lang = event.lang;
			this.blurbURI = `/assets/content/hobbies.blurb.${this.lang}.md`;
		});
	}

	public ngOnInit(): void {
		this.gr.getBooks(data.goodreads.id).then((books) => {
			this.books = books.map((book) => ({
				title: book.title,
				subtitle: book.authors.map((author) => author.name).join(", "),
				description: book.description,
				rating: book.rating,
				img: book.img,
				uri: book.link,
			}));
		});
		this.gr.getComics(data.goodreads.id).then((comics) => {
			this.comics = comics.map((comic) => ({
				title: comic.title,
				subtitle: comic.authors.map((author) => author.name).join(", "),
				description: comic.description,
				rating: comic.rating,
				img: comic.img,
				uri: comic.link,
			}));
		});
		this.kitsu.getAnime(data.kitsu.id).then((animes) => {
			this.anime = animes.map((anime) => ({
				title: anime.title,
				subtitle: null,
				description: anime.synopsis,
				rating: anime.rating,
				img: anime.thumb,
				uri: `https://kitsu.io/anime/${anime.slug}`,
			}));
		});
		this.kitsu.getManga(data.kitsu.id).then((mangas) => {
			this.manga = mangas.map((manga) => ({
				title: manga.title,
				subtitle: null,
				description: manga.synopsis,
				rating: manga.rating,
				img: manga.thumb,
				uri: `https://kitsu.io/anime/${manga.slug}`,
			}));
		});
		this.trakt.getMovies(data.trakt.slug).then((movies) => {
			this.movies = movies.map((movie) => ({
				title: movie.title,
				subtitle: movie.tagline,
				description: movie.description,
				img: movie.img,
				rating: Math.round(movie.rating * 10) / 10,
				uri: `https://trakt.tv/movies/${movie.slug}/`,
			}));
		});
		this.trakt.getShows(data.trakt.slug).then((shows) => {
			this.shows = shows.map((show) => ({
				title: show.title,
				subtitle: null,
				description: show.description,
				rating: Math.round(show.rating * 10) / 10,
				img: show.img,
				uri: `https://trakt.tv/shows/${show.slug}/`,
			}));
		});
		this.cooking.getRecipeList().then((recipes) => {
			this.recipe = recipes[randInt(1, recipes.length) - 1];
		});
	}

	public toggleExpand(state: boolean): void {
		this.expanded = state;
		this.expand.emit(state ? "hobbies" : null);
	}
}
