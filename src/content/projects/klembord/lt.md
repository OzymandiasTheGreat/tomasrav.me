# [klembord](https://github.com/OzymandiasTheGreat/klembord)

![stars](https://img.shields.io/github/stars/OzymandiasTheGreat/klembord.svg?style=social)
![downloads](https://img.shields.io/github/downloads/OzymandiasTheGreat/klembord/total.svg?style=social)
![installs](https://img.shields.io/pypi/dm/klembord.svg?label=Installs&style=social)

> Palaikomos platformos: <span class="platform">Linux</span>, <span class="platform">Windows</span>

klembord (*iškarpinė* Olandiškai) yra python 3 paketas, kuris leidžia pilnai manipuliuoti iškarpinę, nepriklausomai nuo grafikos rinkinio kurį naudojate.

klembord turi minimalias priklausomybes, priklausomas tik nuo platformos specifiniu API. Tai reiškia, jog galite jį naudoti su bet kokiu grafikos rinkiniu ar iš vis be rinkinio.

klembord galima gauti iš pypi:
```pip install klembord```

Naudojimo pavyzdys:
```python
import klembord
klembord.init()
print(klembord.get_text())
# atspausdins iškarpinės turinį, jei jį galima paversti papratu tekstu
klembord.set_text('kažkokia eilutė')
# įdeda 'kažkokia eilutė' į iškarpinės paprasto teksto taikinį
```

Turtingo teksto formatai yra pilnai palaikomi. Dvejetainiai formatai turi ribotą palaikyma.

Windows specifiniai dvejetainiai formatai šiuo metu nepalaikomi.


<div class="more">

Daugiau [github puslapyje](https://github.com/OzymandiasTheGreat/klembord)

</div>
