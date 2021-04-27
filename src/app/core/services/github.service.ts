import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";

const GRAPHQL = "https://api-ozymandias-tk.herokuapp.com/gh";


export interface Repository {
	name: string;
	description: string;
	updated: Date;
	stars: number;
	screenshots: string[];
	readme: string;
}


export interface GraphRepository {
	name: string;
	description: string;
	updatedAt: string;
	stargazers: {
		totalCount: number,
	};
	screenshots: {
		entries: Array<{ name: string }>,
	};
	readme: {
		text: string,
	};
	rst: {
		text: string,
	};
}


export interface GraphResponse {
	data: {
		rateLimit: {
			remaining: number,
			resetAt: string,
			cost: number,
		}
	} & {
		[repo: string]: GraphRepository,
	};
}


@Injectable({
	providedIn: "root"
})
export class GithubService {
	private repos: { [repo: string]: Repository };

	constructor() { }

	public getURI(user: string, repo: string, path: string): string {
		return `https://cdn.jsdelivr.net/gh/${user}/${repo}@master/${path}`;
	}

	public getRepos(user: string, repos: string[]): Observable<{ [repo: string]: Repository }> {
		const repoQueries: string[] = [];
		for (const repo of repos) {
			const slug = repo.replace(/\-/g, "_");
			repoQueries.push(`
				${slug}: repository(name: "${repo}", owner: "${user}") {
					name
					description
					updatedAt
					stargazers {
						totalCount
					}
					screenshots: object(expression: "master:screenshots") {
						... on Tree {
							entries {
								... on TreeEntry {
									name
								}
							}
						}
					}
					readme: object(expression: "master:README.md") {
						... on Blob {
							text
						}
					}
					rst: object(expression: "master:README.rst") {
						... on Blob {
							text
						}
					}
				}
			`);
		}
		const query = `
			{
				rateLimit {
					remaining
					resetAt
					cost
				}
				${repoQueries.join("")}
			}
		`;
		const body = JSON.stringify({ query });
		return from(fetch(GRAPHQL, {
			method: "POST",
			body,
		}).then((response) => {
			if (response.ok) {
				return <Promise<GraphResponse>> response.json();
			}
			throw new Error(`${response.status} - ${response.statusText}`);
		}).then((response) => {
			const data = response.data;
			delete data.rateLimit;
			const repositories: { [repo: string]: Repository } = {};
			for (const [slug, d] of Object.entries(data)) {
				repositories[slug] = {
					name: d.name,
					description: d.description,
					updated: new Date(d.updatedAt),
					stars: d.stargazers.totalCount,
					screenshots: d.screenshots && d.screenshots.entries.map((e) => this.getURI(user, d.name, `screenshots/${e.name}`)),
					readme: d.readme && d.readme.text || d.rst && d.rst.text,
				};
			}
			return repositories;
		}).catch((err) => {
			console.error(err);
			return {};
		}));
	}
}
