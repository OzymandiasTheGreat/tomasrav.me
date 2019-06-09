# [winnotify](https://github.com/OzymandiasTheGreat/winnotify)

![stars](https://img.shields.io/github/stars/OzymandiasTheGreat/winnotify.svg?style=social)
![downloads](https://img.shields.io/github/downloads/OzymandiasTheGreat/winnotify/total.svg?style=social)
![installs](https://img.shields.io/pypi/dm/winnotify.svg?label=Installs&style=social)

> Palaikomos platformos: <span class="platform">Windows</span>

Šis paketas leidžia rodyti vietinius pranešimus (*native toast notification*) Window 10 operacinėje sistemoje ir „balionus“ (*balloon popups*) ankstesnėse Windows versijose.
Kadangi jis tiesiogiai bendrauja su Windows API ir šiam funkcionalumui reika tam tikrų kompiliavimo metu nustatytų vėliavų (*flags*), šis paketas yra implementuotas kaip C python plėtinys.

Yra kitų paketų kurie suteikia panašu funkcionalumą, tačiau jie priklausomi nuo pywin32 plėtinio, taigi nesikompiliuoja mingw aplinkoje.

Nors šis paketas veikia mingw aplinkoje, mingw nėra šio paketo priklausomybė.

winnotify pasiekiamas iš pypi:
```pip install winnotify```

Naudojimo pavyzdys:
```python
notify.init('tray.ico', callback)
notify.notify('Pranešimo tekstas', 'Antraštė', 'ikona.png', False, 5, notify.dwInfoFlags.NIIF_USER, notify.dwInfoFlags.NIIF_LARGE_ICON)
notify.uninit()
```

Norint patikrinti ar pranešimas šiuo metu matomas:
```python
notify.isvisible()
# spausdina True or False, atitinkamai
```

Palaikomi paveikslėlių formatai yra ICO ir PNG.
Pilna naudojimo instrucija pasiekiama per `help()` funkcija.


<div class="more">

For more visit [github page](https://github.com/OzymandiasTheGreat/winnotify)

</div>
