// @ts-ignore
import { parse } from "human-format";

export async function repositories(username: string): Promise<string[]> {
	return fetch(
		`https://api.npms.io/v2/search?q=maintainer:${username}&size=250&from=0`,
	)
		.then((response) => response.json())
		.then((results) =>
			results["results"].map((result: any) => result["package"]["name"]),
		);
}

export async function downloads(
	username: string,
	repository?: string,
): Promise<number> {
	if (typeof repository === "undefined") {
		return repositories(username)
			.then((repos) =>
				Promise.all(repos.map((repo) => downloads(username, repo))),
			)
			.then((dls) => dls.reduce((a, v) => a + v, 0));
	}
	return fetch(`https://img.shields.io/npm/dm/${repository}.json`)
		.then((response) => response.json())
		.then((data) => parse(data["value"]));
}
