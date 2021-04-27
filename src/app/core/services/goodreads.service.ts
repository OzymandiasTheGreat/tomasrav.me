import { Injectable } from "@angular/core";
import { xml2js, Options } from "xml-js";


export interface GoodreadsAuthor {
	"id": {
		"_text": number,
	};
	"name": {
		"_text": string,
	};
	"role": {};
	"image_url": {
		"_attributes": {
			"nophoto": boolean,
		},
		"_cdata": string,
	};
	"small_image_url": {
		"_attributes": {
			"nophoto": boolean,
		},
		"_cdata": string,
	};
	"link": {
		"_cdata": string,
	};
	"average_rating": {
		"_text": number,
	};
	"ratings_count": {
		"_text": number,
	};
	"text_reviews_count": {
		"_text": number,
	};
}


export interface GoodreadsResponse {
	"GoodreadsResponse": {
		"Request": {
			"authentication": {
				"_text": boolean,
			},
			"key": {
				"_cdata": string,
			},
			"method": {
				"_cdata": string,
			},
		},
		"shelf": {
			"_attributes": {
				"exclusive": boolean,
				"id": number,
				"name": string,
				"sortable": boolean,
			},
		},
		"reviews": {
			"_attributes": {
				"start": number,
				"end": number,
				"total": number,
			},
			"review": [{
				"id": {
					"_text": number,
				},
				"book": {
					"id": {
						"_attributes": {
							"type": string,
						},
						"_text": number,
					},
					"isbn": {
						"_text": number,
					},
					"isbn13": {
						"_text": number,
					},
					"text_reviews_count": {
						"_attributes": {
							"type": string,
						},
						"_text": number,
					},
					"uri": {
						"_text": string,
					},
					"title": {
						"_text": string,
					},
					"title_without_series": {
						"_text": string,
					},
					"image_url": {
						"_text": string,
					},
					"small_image_url": {
						"_text": string,
					},
					"large_image_url": {
						"_text": string,
					},
					"link": {
						"_text": string,
					},
					"num_pages": {
						"_text": number,
					},
					"format": {
						"_text": number,
					},
					"edition_information": {},
					"publisher": {
						"_text": string,
					},
					"publication_day": {
						"_text": number,
					},
					"publication_year": {
						"_text": number,
					},
					"publication_month": {
						"_text": number,
					},
					"average_rating": {
						"_text": number,
					},
					"ratings_count": {
						"_text": number,
					},
					"description": {
						"_text": string,
					},
					"authors": {
						"author": GoodreadsAuthor | GoodreadsAuthor[],
					},
					"published": {
						"_text": number,
					},
					"work": {
						"id": {
							"_text": number,
						},
						"uri": {
							"_text": string,
						}
					}
				},
				"rating": {
					"_text": number,
				},
				"votes": {
					"_text": number,
				},
				"spoiler_flag": {
					"_text": boolean,
				},
				"spoilers_state": {
					"_text": string,
				},
				"shelves": {
					"shelf": {
						"_attributes": {
							"name": string,
							"exclusive": boolean,
							"id": number,
							"review_shelf_id": number,
						},
					},
				},
				"recommended_for": {},
				"recommended_by": {},
				"started_at": {},
				"read_at": {},
				"date_added": {
					"_text": string,
				},
				"date_updated": {
					"_text": string,
				},
				"read_count": {
					"_text": number,
				},
				"body": {},
				"comments_count": {
					"_text": number,
				},
				"url": {
					"_cdata": string,
				},
				"link": {
					"_cdata": string,
				},
				"owned": {
					"_text": number,
				},
			}]
		},
	};
}


export interface Author {
	name: string;
	img: string;
	thumb: string;
	rating: number;
	link: string;
}


export interface Book {
	title: string;
	authors: Author[];
	description: string;
	rating: number;
	img: string;
	thumb: string;
	link: string;
}


@Injectable({
	providedIn: "root"
})
export class GoodreadsService {

	constructor() { }

	public getBooks(userID: string): Promise<Book[]> {
		return fetch(`https://pure-tor-21982.herokuapp.com/gr?v=2&id=${userID}&shelf=read&sort=random&per_page=13`)
			.then((response) => {
				if (response.ok) {
					return response.text();
				}
				throw new Error(`${response.status} - ${response.statusText}`);
			}).then((xml) => xml2js(xml, {
				compact: true,
				trim: true,
				nativeType: true,
				nativeTypeAttributes: true,
				ignoreComment: true,
				ignoreDeclaration: true,
				ignoreDoctype: true,
				ignoreInstruction: true,
			} as Options.XML2JS)).then((data: GoodreadsResponse) => {
				const gr = data.GoodreadsResponse;
				if (gr) {
					const books: Book[] = [];
					for (const review of gr.reviews.review) {
						const grAuthors: GoodreadsAuthor[] = (<GoodreadsAuthor[]> review.book.authors.author).length
							? <GoodreadsAuthor[]> review.book.authors.author
							: [<GoodreadsAuthor> review.book.authors.author];
						const authors: Author[] = grAuthors.map((gra) => ({
							name: gra.name._text,
							img: gra.image_url._cdata,
							thumb: gra.small_image_url._cdata,
							rating: gra.average_rating._text,
							link: gra.link._cdata,
						}));
						books.push({
							title: review.book.title_without_series._text,
							authors,
							description: review.book.description._text,
							rating: review.rating._text,
							img: review.book.image_url._text,
							thumb: review.book.small_image_url._text,
							link: review.book.link._text,
						});
					}
					return books;
				}
				return [];
			});
	}

	public getComics(userID: string): Promise<Book[]> {
		return fetch(`https://pure-tor-21982.herokuapp.com/gr?v=2&id=${userID}&shelf=comics&sort=random&per_page=13`)
		.then((response) => {
			if (response.ok) {
				return response.text();
			}
			throw new Error(`${response.status} - ${response.statusText}`);
		}).then((xml) => xml2js(xml, {
			compact: true,
			trim: true,
			nativeType: true,
			nativeTypeAttributes: true,
			ignoreComment: true,
			ignoreDeclaration: true,
			ignoreDoctype: true,
			ignoreInstruction: true,
		} as Options.XML2JS)).then((data: GoodreadsResponse) => {
			const gr = data.GoodreadsResponse;
			if (gr) {
				const books: Book[] = [];
				for (const review of gr.reviews.review) {
					const grAuthors: GoodreadsAuthor[] = (<GoodreadsAuthor[]> review.book.authors.author).length
						? <GoodreadsAuthor[]> review.book.authors.author
						: [<GoodreadsAuthor> review.book.authors.author];
					const authors: Author[] = grAuthors.map((gra) => ({
						name: gra.name._text,
						img: gra.image_url._cdata,
						thumb: gra.small_image_url._cdata,
						rating: gra.average_rating._text,
						link: gra.link._cdata,
					}));
					books.push({
						title: review.book.title_without_series._text,
						authors,
						description: review.book.description._text,
						rating: review.rating._text,
						img: review.book.image_url._text,
						thumb: review.book.small_image_url._text,
						link: review.book.link._text,
					});
				}
				return books;
			}
			return [];
		});
	}
}
