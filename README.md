# [<img src="./public/favicon.svg" style="width: 48px; height: 48px; vertical-align: middle;" /> tomasrav.me](https://tomasrav.me/)

This is my personal website, version 3.0 (I think, I wasn't keeping track).

It's built using:

- [expo](https://github.com/expo/expo)
	- While I have no intention of distributing my website as an app, I wanted to use react-native for it's CSS-in-JS and other perks, and expo has excellent support for react-native-web
- [next.js](https://github.com/vercel/next.js)
	- I wanted to use Gatsby initially, but Gatsby support was broken in expo at the time. Static site generation FTW!
	- While next has built-in support for localization, it doesn't work with SSG.
	Thankfully there's [next-export-i18n](https://github.com/martinkr/next-export-i18n)
- [preact](https://github.com/preactjs/preact)
	- Why not? Makes bundles over 30kb smaller.
- [Material Design Icons](https://github.com/templarian/MaterialDesign)
	- The only constant between various iterations of my website. I really love these.
- [Graphics from the Noun Project](https://thenounproject.com/)
- [unified](https://github.com/unifiedjs/unified)
	- I wanted to keep my content as markdown for easy migration in case I want to rewrite my website yet again. This seemed like the most popular and best-supported parser.
	- For actually rendering parsed markdown I wrote [react-native-markdown](https://github.com/OzymandiasTheGreat/react-native-markdown)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)
- [tsparticles](https://github.com/matteobruni/tsparticles)
	- Why not have an animated background? Performance could be better though.
- I also use [dayjs](https://github.com/iamkun/dayjs) as a lightweight alternative to moment.

The website is intended to serve as CV/Resume/Portfolio for potential recruiters and clients
(I'm a freelance developer).

It also serves as intro point for my various doings around the web.

Do check it out and if you like it, gimme a ⭐
