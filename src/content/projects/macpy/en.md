<ul class="platforms collapsible">
	<li>
		<div class="collapsible-header"><i class="fas fa-laptop-code"></i>{{ platforms }}<i class="fas fa-caret-down"></i></div>
		<div class="collapsible-body">
			<ul>
				<li><i class="fab fa-linux"></i>Linux</li>
				<li><i class="fab fa-windows"></i>Windows</li>
			</ul>
		</div>
	</li>
</ul>

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

You can read the rest in [full documentation](https://macpy.readthedocs.io/en/latest/).
