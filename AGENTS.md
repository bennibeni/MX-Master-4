# MX Master 4 — Guida introduttiva

App autonoma React/Next.js estratta da `Next14/src/app/rxx/R20`.
Usa JavaScript (JSX) e CSS semplice, senza altre dipendenze oltre a Next e React.

- Tutta la guida è in `src/components/mx-master-4/MxMaster4Guide.jsx`: stili
  (stringa `CSS`, limitati al contenitore `.mx4`), dati (`FIG`, `PARTS`,
  `FAQ`, `SECTIONS`) e componenti. Non introdurre dipendenze dal progetto Next14.
- I contenuti sono dati: una sezione è una voce di `SECTIONS` con una lista di
  blocchi (`p`, `steps`, `fig`, `table`, `note`, `links`, `faq`…) resi da `Block`.
- La sezione corrente è l'hash dell'URL (`#batteria`, `#faq`…) e il tema sta in
  `localStorage`: entrambi si leggono con `useSyncExternalStore`. Non usare
  `setState` dentro gli effect per sincronizzarli.
- I pallini numerati 1–11 sono quelli della Figura 1: coordinate in `PARTS`
  (percentuali dell'immagine), viste ritagliate in `VIEWS`. Nel testo delle FAQ
  `{3}` diventa il pallino 3.
- Le FAQ riguardano solo l'uso abituale del mouse: niente installazione,
  abbinamento, problemi, errori o manutenzione.
- Le figure sono in `public/mx4/` (`fig1.jpg` … `fig14.jpg`) e si mostrano con
  `next/image`. Testi riscritti dall'articolo dell'hub Logitech; le figure sono
  quelle originali dell'articolo.
- Conservare il footer con link `https://links-page-bennibeni.vercel.app/`
  (passato al componente con la prop `footer`, così segue il tema).
- Leggere i documenti pertinenti in `node_modules/next/dist/docs/` prima di
  modificare routing, layout o configurazione Next.js.
- Eseguire `npm run check` dopo modifiche sostanziali.
