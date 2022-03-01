// @ts-ignore
import { parse } from "human-format";

const QUALIFIER = "/month";
// There's gotta be a way to get this list programmatically
// but I can't seem to find it
const PACKAGES = [
	"mopidy-ytmusic",
	"j2dx",
	"klembord",
	"macpy",
	"winnotify",
	"python-libinput",
	"liepa-tts",
];

export async function downloads(pkg?: string): Promise<number> {
	if (typeof pkg === "undefined") {
		return Promise.all(PACKAGES.map((pkg) => downloads(pkg))).then(
			(data) => data.reduce((a, v) => a + v, 0),
		);
	}
	return fetch(`https://img.shields.io/pypi/dm/${pkg}.json`)
		.then((response) => response.json())
		.then((data) => parse(data["value"].replace(QUALIFIER, "")));
}
