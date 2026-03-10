# Dyrebalanse nettside

Statisk nettside med:
- Informasjonssider om immunstøtte, ledd, tarmhelse og eldre dyr.
- Enkel nettbutikk med handlekurv i `localStorage`.
- Checkout-flyt med valg av betalingsmetode.

## Lokalt oppsett

```bash
python3 -m http.server 8000
```

Åpne `http://localhost:8000`.

## Betalingsløsning før lansering

Oppdater `PAYMENT_LINKS` i `script.js` med ekte lenker før lansering:

```js
const PAYMENT_LINKS = {
  stripe: "https://din-stripe-lenke",
  vipps: "https://din-vipps-lenke"
};
```

## Rask deploy til GitHub

Bruk deploy-scriptet:

```bash
./deploy.sh
```

Scriptet pusher `work` til GitHub og forsøker å oppdatere `main` automatisk.
