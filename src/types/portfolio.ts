import type { Root } from "remark-parse/lib";

export interface Item {
	[lang: string]: {
		name: string;
		owner: string;
		repository: string;
		license?: string;
		npm?: string;
		pypi?: string;
		image?: string;
		demo?: string;
		tags: string[];
		root: Root;
	};
}
