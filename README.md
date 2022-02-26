# bart-tretia-uloha

## Inštalácia
Na nainštalovanie dependencies zadaj do terminálu príkaz:
```bash
npm install
```
Projekt spustíš zadaním príkazu: 
```bash
npx cypress open
```
a následne si vyberieš verziu stránky (AJ alebo SVK), ktorú chceš spustiť.

## Popis projektu
Projekt má za úlohu preskúmať, či funguje kontaktný formulár na stránke bart.sk podľa očakávaní.

## Zmeny v projekte
 1. Na elementy sa odkazujem len cez IDčká, až na case, kde kontrolujem či submit button má danú classu, pretože ona ovláda jeho animáciu
 2. Kontrolujem aj anglickú verziu stránky
 3. Keďže kontrolujem dve verzie pomaly tej istej stránky a sú tam len malé jazykové rozdiely, tak aby som predišiel duplikovaniu kódu,
    vytvoril som súbor utils.js, kde sú zdieľané funkcie ako pre slovenský, tak aj anglický form
 4. Odstránený node-modules
 5. Vymazal som časť kódu, kde som kontroloval name attribute na inpute
 6. Prerobil som scenáre podľa tebou navrhovanej štruktúry a zgrupil som adekvátne funkcionality do "it" blokov
 
 ## Poznámky k projektu
 Natrafil som na zvláštne správanie, kedy pri počiatočnom spustení mi niektore testy zlyhajú, no po refreshi stránky ďalej bez problémov prejdú.
 Sú to testy, kde kontrolujem či po kliku má input border danej farby. Pri počiatočnom teste test na input klikne, no potom odklikne preč, čo spôsobí,
 že input očakávaný border už nemá. Tieto testy som tam nechal, lebo, ako vravím, po refreshi stále fungujú a prejdú, len pri počiatočnom sputení neidú
 a aj to len niekedy. Nechápem prečo sa tak deje.
 Preto je tam aj funkcia cy.wait(), pretože som chcel docielit to, aby čakal test na kliknutom inpute, až kým sa neoverí jeho border.
 Ponechal som aj test s osobnými údajmi, kde hodí cors chybu.

## Použité technológie
Cypress
