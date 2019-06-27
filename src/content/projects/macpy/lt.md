[mac]ro (makro) + [py]thon, tariama kaip magpie (šarka Angliškai).

Šis paketas leidžia lengvai valdyti klaviatūra, pelę ir programų langus, kurti makro ir automatizuoti grafines sąsajas (GUI). Veikia su python versijom 2.7 ir 3.4+.
Šiuo metu macpy veikia Window ir Linux (su X ir ribotai su Wayland) operacinėse sistemose.

macpy galima rasti pypi:
```pip install macpy```

Keletas iš macpy funkcijų:
- Žemo lygio kabliai klaviatūros ir pelės įvykiam (events)
- Kablys programų langų kūrimui, uždarymui ir dėmesio (focus) pasikeitimui
- Galimybė registruoti trumpinius (hotkeys ir hotstrings)
- Klaviatūros ir pelės įvylių simuliacija
- Nuo platformos nepriklausomas klavišų ir mygtukų apibrėžimas (definition ir mapping)
- Atvirų langų surašymas
- Atvirų langų tvarkymas
- Ir dar daugiau!

<div class="warning">

Įspėjimas:

Langų tvarkymas negalimas Wayland aplinkoje.
Taip yra dėl to, jog Wayland neturi jokio API šiom
funkcijom ir neplanuojo jo turėti dėl saugumo sumetimų.

Dar: klaviatūros ir pelės funkcijoms reikia root privielgijų Wayland aplinkoje, dėl tų pačių priežasčių.

</div>

Daugiau rasite [pilnoje dokumentacijoje](https://macpy.readthedocs.io/en/latest/).
