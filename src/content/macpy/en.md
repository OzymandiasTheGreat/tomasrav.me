# [macpy](https://github.com/OzymandiasTheGreat/macpy)

![stars](https://img.shields.io/github/stars/OzymandiasTheGreat/macpy.svg?style=social)
![downloads](https://img.shields.io/github/downloads/OzymandiasTheGreat/macpy/total.svg?style=social)
![installs](https://img.shields.io/pypi/dm/macpy.svg?label=Installs&style=social)

> Supported platforms: <span class="platform">Linux</span>, <span class="platform">Windows</span>

[mac]ro + [py]thon, pronounced like magpie.

This package provides easy keyboard/pointer/window management, macro creation and GUI automation for python versions 2.7 and 3.4+.
Currently it works on Windows and Linux (both under X and with limited functionality under Wayland).

macpy is available on pypi:
```pip install pypi```

Some of it's features are:
- Low level hooks for keyboard, pointer events
- A hook for window creation, destruction and focus change
- Support for registering hotkeys and hotstrings
- Simulating keyboard, pointer events
- Providing platform-independent definitions and mappings of keys and buttons
- Listing open windows
- Managing open windows
- And quite a bit more!

<div class="warning">

> Note:
>
> Window management functionality is not available under Wayland.
> This is due to lack of an API on Wayland side. They don't plan on
> providing anything useable due to security concerns.
>
> More, keyboard and pointer functions require root access under Wayland
> for reasons stated above.

</div>


<div class="more">

For more visit [github page](https://github.com/OzymandiasTheGreat/macpy) or [read the docs](https://macpy.readthedocs.io/)

</div>
