# [klembord](https://github.com/OzymandiasTheGreat/klembord)

![stars](https://img.shields.io/github/stars/OzymandiasTheGreat/klembord.svg?style=social)
![downloads](https://img.shields.io/github/downloads/OzymandiasTheGreat/klembord/total.svg?style=social)
![installs](https://img.shields.io/pypi/dm/klembord.svg?label=Installs&style=social)

> Supported platforms: <span class="platform">Linux</span>, <span class="platform">Windows</span>

klembord (*clipboard*, Dutch) is a python 3 package that provides full, toolkit-agnostic clipboard access on supported platforms.

klembord has minimal dependencies, depending only on platform specific apis, which means it can be used with any graphics toolkit or without a toolkit at all.

klembord is available on pypi:
```pip install klembord```

Example usage:
```python
import klembord
klembord.init()
print(klembord.get_text())
# prints clipboard contents if they can be converted to plain text
klembord.set_text('some string')
# sets clipboard plain text target to 'some string'
```
Rich text formats are fully supported. Binary formats have limited support.

Windows specific binary formats currently are not supported.


<div class="more">

For more visit [github page](https://github.com/OzymandiasTheGreat/klembord)

</div>
