This package allows you to show native Windows toast notifications on Windows 10 and balloon popups on earlier versions. Since it directly deals with Windows API and requires special compile time flags it is implemented as a C python extension.

There are other packages that provide similar functionality but they depend on pywin32 extensions and as such do not compile under mingw.

Note, that while this package works with mingw, mingw is not a requirement to use this package.

winnotify is available on pypi:
```pip install winnotify```

Usage example:
```python
import notify
notify.init('tray.ico', callback)
notify.notify('Notification body text.', 'Title', 'notification.ico', False, 5, notify.dwInfoFlags.NIIF_USER | notify.dwInfoFlags.NIIF_LARGE_ICON)
notify.uninit()
```

To check if notification is currently visible:
```python
notify.isvisible()
# prints True or False respectively
```

Supported image file types are ICO and PNG.
Complete documentation available through `help()` function.
