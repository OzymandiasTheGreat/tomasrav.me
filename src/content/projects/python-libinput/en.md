This package is a pure python wrapper for *libinput*,
a library that handles input devices for display servers and other applications that need to directly
deal with input devices. It provides device detection, device handling, input device event processing and abstraction.

*libinput* does this by reading character files in `/dev/input`, so to use this package you need to run your code as root or to belong to `input` group.

python-libinput is available on pypi:
```pip install python-libinput```

You can read the rest in [full documentation](https://python-libinput.readthedocs.io/en/latest/).
