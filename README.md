 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
index c71d621d5316b706bbef33db5cd9f8a7e0a2f921..d3c8b7edc0e8ce254ead3258d33ccfcbcb028e35 100644
--- a/README.md
+++ b/README.md
@@ -1,42 +1,35 @@
-<!DOCTYPE html>
-<html lang="no">
-<head>
-<meta charset="UTF-8">
-<title>Dyrebalanse Butikk</title>
-<link rel="stylesheet" href="style.css">
-</head>
+# Dyrebalanse nettside
 
-<body>
+Statisk nettside med:
+- Informasjonssider om immunstøtte, ledd, tarmhelse og eldre dyr.
+- Enkel nettbutikk med handlekurv i `localStorage`.
+- Checkout-flyt med valg av betalingsmetode.
 
-<h1>Dyrebalanse Butikk</h1>
+## Lokalt oppsett
 
-<div class="product">
+```bash
+python3 -m http.server 8000
+```
 
-<h2>Lion's Mane – Naturlig støtte for hund</h2>
+Åpne `http://localhost:8000`.
 
-<p>Støtter kognitiv helse og nervesystem.</p>
+## Betalingsløsning før lansering
 
-<p><strong>349 kr</strong></p>
+Oppdater `PAYMENT_LINKS` i `script.js` med ekte lenker før lansering:
 
-<a href="https://buy.stripe.com/YOUR_LINK_HERE">
-<button>Kjøp</button>
-</a>
+```js
+const PAYMENT_LINKS = {
+  stripe: "https://din-stripe-lenke",
+  vipps: "https://din-vipps-lenke"
+};
+```
 
-</div>
+## Rask deploy til GitHub
 
-<div class="product">
+Bruk deploy-scriptet:
 
-<h2>Reishi – Immunstøtte</h2>
+```bash
+./deploy.sh
+```
 
-<p>Naturlig støtte for immunforsvar.</p>
-
-<p><strong>329 kr</strong></p>
-
-<a href="https://buy.stripe.com/YOUR_LINK_HERE">
-<button>Kjøp</button>
-</a>
-
-</div>
-
-</body>
-</html>
+Scriptet pusher `work` til GitHub og forsøker å oppdatere `main` automatisk.
 
EOF
)
