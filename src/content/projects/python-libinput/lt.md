<ul class="platforms collapsible">
	<li>
		<div class="collapsible-header"><i class="fas fa-laptop-code"></i>{{ platforms }}<i class="fas fa-caret-down"></i></div>
		<div class="collapsible-body">
			<ul>
				<li><i class="fab fa-linux"></i>Linux</li>
			</ul>
		</div>
	</li>
</ul>


Šis paketas yra gryno python aplankas (*wrapper*) *libinput* bibliotekai kuri valdo įvesties prietaisus
ekrano serveriams ir kitoms programoms, kurioms reikia tiesiogiai užsiimti įvesties prietaisais.
Ji suteikia prietaisų atradimą, prietaisų valdymą, įvesties prietaisų įvykių (*events*) apdorijimą ir abstrakcija.

*libinput* atlieka šias funkcijas skaitydama specialius prietaisų failus iš `/dev/input`, taigi norint naudotis šiuo paketu jums reikės savo kodą leisti su root privilegijomis arba priklausyti `input` grupei.

python-libinput galima gauti iš pypi:
```pip install python-libinput```

Daugiau rasite [pilnoje dokumentacijoje](https://python-libinput.readthedocs.io/en/latest/).
