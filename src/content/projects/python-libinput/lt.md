Šis paketas yra gryno python aplankas (*wrapper*) *libinput* bibliotekai kuri valdo įvesties prietaisus
ekrano serveriams ir kitoms programoms, kurioms reikia tiesiogiai užsiimti įvesties prietaisais.
Ji suteikia prietaisų atradimą, prietaisų valdymą, įvesties prietaisų įvykių (*events*) apdorijimą ir abstrakcija.

*libinput* atlieka šias funkcijas skaitydama specialius prietaisų failus iš `/dev/input`, taigi norint naudotis šiuo paketu jums reikės savo kodą leisti su root privilegijomis arba priklausyti `input` grupei.

python-libinput galima gauti iš pypi:
```pip install python-libinput```

Daugiau rasite [pilnoje dokumentacijoje](https://python-libinput.readthedocs.io/en/latest/).
