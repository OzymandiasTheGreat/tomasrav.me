---
title: Tauri Apps without Rust? Write Your Backend in Javascript
slug: tauri-plugin-bare-kit
author: Tomas Ravinskas
published: 2026-08-23T04:00:00+0300
---

TL;DR I wrote Tauri-specific rust bindings for [BareKit](https://github.com/holepunchto/bare-kit) as a Tauri plugin so you can write your backend in javascript without touching rust at all (other than enabling the plugin) or split your logic between javascript and rust. Most modules on NPM work out of the box. Native addons are autolinked. Mobile is supported as well. Interested? Read on!

<!--more-->

The plugin: [tauri-plugin-bare-kit](https://github.com/getbullet-app/tauri-plugin-bare-kit).

I have to preface this by saying that I have nothing against rust at all. I found it quite rewarding writing this plugin in rust and I believe rust is the future of systems programming. My actual reason for writing this plugin is a dependency problem: I depend on [Holepunch](https://holepunch.to/) [stack](https://docs.pears.com/reference/building-blocks/hypercore/), which is primarily javascript and there's nothing quite like it for rust (although there's [a long running effort to port the stack to rust](https://github.com/datrs)). That said, you can't deny that javascript has a much lower barrier-to-entry than rust, regardless of how you feel about it.

Now to understand what this plugin is all about we have to talk about [Bare](https://github.com/holepunchto/bare) and [BareKit](https://github.com/holepunchto/bare-kit).

Bare, created and maintained by Holepunch, in the words of it's creators:

> Small and modular JavaScript runtime for desktop and mobile. Like Node.js, it provides an asynchronous, event-driven architecture for writing applications in the lingua franca of modern software. Unlike Node.js, it makes embedding and cross-device support core use cases, aiming to run just as well on your phone as on your laptop.

It's built around libuv and V8, just like node, though it supports switching out V8 for other engines, like javascriptcore or quickjs. Similarities to node go as far as supporting N-API addons out of the box. There's also C-API for writing Bare-native addons modeled after the underlying C-API of N-API. What this means is that most modules on NPM just work in Bare. Official replacements for node's built in modules are also available (bare has no built in modules).

BareKit is toolkit that makes embedding Bare in your application trivial, with bindings for various languages. It provides a web worker-like API to start and manage isolated Bare threads, called worklets, that expose an IPC abstraction. BareKit's IPC is just a duplex stream though, so you need a library like [bare-rpc](https://github.com/holepunchto/bare-rpc) to get experience similar to Tauri's native IPC.

While BareKit supports many languages, runtimes like Tauri or [React Native](https://github.com/holepunchto/react-native-bare-kit) require additional handling, because UI and backend run on separate runtimes. tauri-plugin-bare-kit uses the stable but not-quite-public BareKit C-API through FFI to deeply integrate BareKit with Tauri so you can simply import the worklet from webview, run your javascript, and have a simple but powerful two-way communication between code running in the webview and on Bare.

Code running on Bare has no restrictions that front-end code has, and through native addons can access the filesystem and OS APIs.
This can be a security concern, so you should never run code you didn't write yourself on a worklet. That said, loading remote code in your backend is not a common practice, but I still felt necessary mentioning how bad of an idea it would be.

tauri-plugin-bare-kit autolinks native addons as part of the application build for all supported platforms (Windows, macOS, Linux, iOS, and Android currently) and it can also optionally pack your backend logic into a Bare bundle you simply import in your front-end code. Bundling can also be done manually with [bare-pack](https://github.com/holepunchto/bare-pack). There's no configuration to speak of, the postinstall (requires allowing scripts on NPM 12) and build scripts take care of everything automagically.

Now this plugin does not expose any of the Tauri APIs to Bare, so for more complex use cases and deeper OS integration you'll probably want to write at least some rust code. However for simpler apps the only rust required is one line to enable the plugin.

To wrap this up, here's an example of importing a worklet and executing code on it, taken from the README:

```javascript
import { Worklet } from "tauri-plugin-bare-kit-api"
import b4a from "b4a"
// import bundle from "../app.bundle.json"

const worklet = await Worklet.init({ assets, memoryLimit })
const bundle = `
const { IPC } = BareKit
IPC.on("data", (data) => console.log(b4a.toString(data)))
IPC.write(b4a.from("Hello from Bare!"))
`

await worklet.start("/app.bundle", bundle, args)

const { IPC } = worklet

IPC.on("data", (data) => console.log(b4a.toString(data)))
IPC.write(b4a.from("Hello from Tauri!"))
```
