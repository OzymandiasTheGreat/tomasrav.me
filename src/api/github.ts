// @ts-ignore
import { parse } from "human-format";

const USER_CACHE: Record<string, any> = {};
const REPO_CACHE: Record<string, any> = {};

async function raw(username: string): Promise<any> {
	if (username in USER_CACHE) {
		return USER_CACHE[username];
	}
	return fetch(`https://api.github.com/users/${username}/repos?per_page=250`)
		.then((response) => response.json())
		.then((data) => {
			USER_CACHE[username] = data;
			return data;
		});
}

export async function repositories(username: string): Promise<string[]> {
	return raw(username).then((data) =>
		Object.values(data).map((repo: any) => repo["name"]),
	);
}

export async function stars(
	username: string,
	repository?: string,
): Promise<number> {
	if (typeof repository === "undefined") {
		return raw(username).then((data) =>
			Object.values(data)
				.map((repo: any) => repo["stargazers_count"])
				.reduce((a, v) => a + v, 0),
		);
	}
	if (`${username}/${repository}` in REPO_CACHE) {
		return REPO_CACHE[`${username}/${repository}`]["stargazers_count"];
	}
	return fetch(`https://api.github.com/repos/${username}/${repository}`)
		.then((response) => response.json())
		.then((data) => {
			REPO_CACHE[`${username}/${repository}`] = data;
			return data["stargazers_count"];
		});
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
	return fetch(
		`https://img.shields.io/github/downloads/${username}/${repository}/total.json`,
	)
		.then((response) => response.json())
		.then((data) => {
			try {
				return parse(data["value"]);
			} catch {
				return 0;
			}
		});
}
