"use client";
// Guida introduttiva MX Master 4 — componente React autonomo.
// Le figure fig1.jpg … fig14.jpg vanno in una cartella servita come statica (default: /mx4, cioè public/mx4 in Next.js).
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";

const SOURCE =
  "https://it.hub.sync.logitech.com/mx-master-4/post/getting-started---mx-master-4-LSEt5tZXsbeMP3c";

const CSS = `
.mx4{
  --bg:#f4f5f3; --panel:#ffffff; --ink:#16201d; --muted:#5d6b66; --line:#dfe4e1;
  --accent:#0b8f76; --accent-soft:#dff5ef; --warn:#8a5a00; --warn-soft:#fff4d6;
  --shadow:0 1px 2px rgba(20,30,28,.06),0 8px 24px rgba(20,30,28,.06);
}
.mx4[data-theme="dark"]{
  --bg:#101614; --panel:#18211e; --ink:#e8efec; --muted:#9aaaa4; --line:#2a3632;
  --accent:#3fd9b8; --accent-soft:#12332c; --warn:#f1c661; --warn-soft:#33290f;
  --shadow:0 1px 2px rgba(0,0,0,.4),0 8px 24px rgba(0,0,0,.3);
}
.mx4,.mx4 *{box-sizing:border-box}
.mx4{min-height:100vh;background:var(--bg);color:var(--ink);font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.mx4 a{color:var(--accent)}
.mx4 button{font:inherit;color:inherit;cursor:pointer}
.mx4 :focus-visible{outline:2px solid var(--accent);outline-offset:2px}

.mx4 .shell{display:grid;grid-template-columns:290px 1fr;min-height:100vh}
.mx4 .side{background:var(--panel);border-right:1px solid var(--line);position:sticky;top:0;height:100vh;overflow:auto;padding:22px 14px}
.mx4 .brand{padding:0 10px 14px;border-bottom:1px solid var(--line);margin-bottom:12px}
.mx4 .brand small{display:block;color:var(--muted);letter-spacing:.08em;text-transform:uppercase;font-size:11px}
.mx4 .brand b{font-size:20px;letter-spacing:-.01em}
.mx4 .group{margin:14px 10px 6px;color:var(--muted);font-size:11px;letter-spacing:.08em;text-transform:uppercase}
.mx4 .nav a{display:flex;gap:10px;align-items:baseline;padding:7px 10px;border-radius:8px;color:var(--ink);text-decoration:none;font-size:14.5px}
.mx4 .nav a:hover{background:var(--bg)}
.mx4 .nav a.on{background:var(--accent-soft);color:var(--accent);font-weight:600}
.mx4 .nav .n{font-variant-numeric:tabular-nums;color:var(--muted);font-size:12px;min-width:18px}
.mx4 .nav a.on .n{color:var(--accent)}
.mx4 .search{width:100%;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink);font:inherit;font-size:14px}
.mx4 .tools{display:flex;gap:8px;padding:0 0 4px}
.mx4 .iconbtn{border:1px solid var(--line);background:var(--bg);border-radius:8px;padding:6px 10px;font-size:14px}

.mx4 .main{min-width:0}
.mx4 .topbar{display:none;position:sticky;top:0;z-index:5;background:var(--panel);border-bottom:1px solid var(--line);padding:10px 14px;align-items:center;gap:10px}
.mx4 .topbar b{flex:1;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mx4 .progress{height:3px;background:var(--line)}
.mx4 .progress i{display:block;height:100%;background:var(--accent);transition:width .25s}
.mx4 .page{max-width:860px;margin:0 auto;padding:36px 28px 80px}
.mx4 .kicker{color:var(--accent);font-size:12px;letter-spacing:.1em;text-transform:uppercase;font-weight:600}
.mx4 h1{font-size:34px;line-height:1.15;letter-spacing:-.02em;margin:6px 0 10px;text-wrap:balance}
.mx4 h2{font-size:21px;letter-spacing:-.01em;margin:34px 0 8px}
.mx4 .lead{color:var(--muted);font-size:18px;margin:0 0 22px}
.mx4 p{margin:10px 0}
.mx4 ul{padding-left:22px}
.mx4 li{margin:5px 0}

.mx4 .steps{list-style:none;padding:0;margin:16px 0;display:grid;gap:12px}
.mx4 .steps>li{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px 16px 14px 60px;position:relative;margin:0;box-shadow:var(--shadow)}
.mx4 .steps>li::before{content:attr(data-n);position:absolute;left:16px;top:14px;width:30px;height:30px;border-radius:50%;background:var(--accent);color:#fff;font-weight:700;display:grid;place-items:center;font-size:14px}
.mx4[data-theme="dark"] .steps>li::before{color:#06241d}
.mx4 .steps b.t{display:block;margin-bottom:2px}
.mx4 .sub{margin:8px 0 0;padding:0;list-style:none;display:grid;gap:6px}
.mx4 .sub li{border-left:3px solid var(--accent);padding-left:10px;margin:0}

.mx4 figure{margin:20px 0}
.mx4 .figbox{background:#fff;border:1px solid var(--line);border-radius:14px;padding:14px;display:block;width:100%;position:relative;box-shadow:var(--shadow)}
.mx4 .figbox img{display:block;max-width:100%;max-height:520px;height:auto;margin:0 auto}
.mx4 .zoom{position:absolute;right:10px;bottom:10px;background:rgba(22,32,29,.78);color:#fff;border:0;border-radius:8px;padding:4px 9px;font-size:12px}
.mx4 figcaption{color:var(--muted);font-size:13.5px;margin-top:8px}
.mx4 figcaption b{color:var(--ink)}

.mx4 .hotwrap{position:relative;max-width:924px;margin:0 auto}
.mx4 .hot{position:absolute;width:7%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;border:2px solid transparent;background:transparent;padding:0}
.mx4 .hot:hover,.mx4 .hot.on{border-color:#0b8f76;background:rgba(29,233,182,.25)}
.mx4 .parts{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px;margin:14px 0}
.mx4 .parts button{width:100%;text-align:left;display:flex;gap:10px;align-items:center;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:9px 12px}
.mx4 .parts button.on{border-color:var(--accent);background:var(--accent-soft)}
.mx4 .parts .num{width:26px;height:26px;border-radius:50%;background:var(--ink);color:var(--panel);display:grid;place-items:center;font-size:13px;font-weight:700;flex:none}
.mx4 .parts .go{margin-left:auto;color:var(--accent);font-size:12px}
.mx4 .detail{background:var(--accent-soft);border-radius:10px;padding:10px 14px;min-height:46px}

.mx4 .tablewrap{overflow-x:auto;border:1px solid var(--line);border-radius:12px;background:var(--panel);margin:14px 0}
.mx4 table{border-collapse:collapse;width:100%;font-size:15px}
.mx4 th,.mx4 td{text-align:left;padding:10px 14px;border-bottom:1px solid var(--line);vertical-align:top}
.mx4 th{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);background:var(--bg)}
.mx4 tr:last-child td{border-bottom:0}
.mx4 .dot{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:8px;vertical-align:-1px}
.mx4 .pulse{animation:pulse 1.2s ease-in-out infinite}
@keyframes pulse{50%{opacity:.25}}
@media (prefers-reduced-motion:reduce){.mx4 .pulse{animation:none}.mx4 .progress i{transition:none}}

.mx4 .note{border-radius:10px;padding:10px 14px;margin:14px 0;font-size:14.5px;background:var(--accent-soft)}
.mx4 .note.warn{background:var(--warn-soft);color:var(--warn)}
.mx4 .note b{font-weight:700}
.mx4 .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px;margin:16px 0}
.mx4 .card{display:block;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:12px 14px;text-decoration:none;color:var(--ink);box-shadow:var(--shadow)}
.mx4 .card:hover{border-color:var(--accent)}
.mx4 .card small{color:var(--muted);display:block}
.mx4 .links{list-style:none;padding:0;display:grid;gap:8px}
.mx4 .links a{display:block;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:10px 14px;text-decoration:none}
.mx4 .links small{display:block;color:var(--muted);word-break:break-all}

.mx4 .pager{display:flex;gap:12px;margin-top:40px;border-top:1px solid var(--line);padding-top:20px}
.mx4 .pager a{flex:1;border:1px solid var(--line);background:var(--panel);border-radius:12px;padding:12px 16px;text-decoration:none;color:var(--ink)}
.mx4 .pager a:hover{border-color:var(--accent)}
.mx4 .pager small{display:block;color:var(--muted);font-size:12px}
.mx4 .pager .next{text-align:right}
.mx4 .pager span{flex:1}
.mx4 .hint{color:var(--muted);font-size:12.5px;margin-top:12px;text-align:center}

.mx4 .lightbox{position:fixed;inset:0;background:rgba(8,12,11,.88);z-index:20;display:grid;place-items:center;padding:20px}
.mx4 .lightbox img{width:auto;height:auto;max-width:100%;max-height:calc(100vh - 90px);background:#fff;border-radius:10px}
.mx4 .lightbox .backdrop{position:absolute;inset:0;background:transparent;border:0;padding:0;cursor:zoom-out}
.mx4 .lightbox .lightbox-body{position:relative}
.mx4 .lightbox .close{position:fixed;top:14px;right:14px;background:#fff;color:#111;border:0;border-radius:8px;padding:8px 12px}
.mx4 .lightbox p{color:#fff;text-align:center;font-size:14px;margin:10px 0 0}

@media (max-width:860px){
  .mx4 .shell{grid-template-columns:1fr}
  .mx4 .side{position:fixed;z-index:10;width:min(310px,88vw);transform:translateX(-100%);transition:transform .2s;box-shadow:var(--shadow)}
  .mx4 .side.open{transform:none}
  .mx4 .scrim{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:9;border:0;padding:0;width:100%;height:100%}
  .mx4 .topbar{display:flex}
  .mx4 .page{padding:24px 16px 70px}
  .mx4 h1{font-size:27px}
  .mx4 .lead{font-size:16.5px}
}
.mx4 .fine{color:var(--muted);font-size:13.5px}
.mx4 .big{font-size:28px;letter-spacing:-.02em}
.mx4 .empty{padding:10px;color:var(--muted);font-size:14px}
.mx4 .count{color:var(--muted);font-size:13px}
.mx4 .pin{display:inline-grid;place-items:center;min-width:22px;height:22px;padding:0 5px;border-radius:11px;background:var(--ink);color:var(--panel);font-size:12.5px;font-weight:700;line-height:1;vertical-align:1px;font-variant-numeric:tabular-nums}
.mx4 .legend{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:0 0 18px}
.mx4 .legend p{margin:0 0 10px;font-size:14.5px}
.mx4 .pins{display:flex;flex-wrap:wrap;gap:6px}
.mx4 .pinbtn{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line);background:var(--bg);border-radius:999px;padding:4px 10px 4px 5px;font-size:13px}
.mx4 .pinbtn.on{border-color:var(--accent);background:var(--accent-soft)}
.mx4 .pinbtn.clear{padding-left:10px;color:var(--accent)}
.mx4 .faq{background:var(--panel);border:1px solid var(--line);border-radius:12px;margin:10px 0;box-shadow:var(--shadow)}
.mx4 .faq summary{display:flex;align-items:center;gap:12px;padding:13px 16px;cursor:pointer;list-style:none;font-weight:600}
.mx4 .faq summary::-webkit-details-marker{display:none}
.mx4 .faq summary::before{content:"+";color:var(--accent);font-size:20px;line-height:1;width:14px;flex:none}
.mx4 .faq[open] summary::before{content:"–"}
.mx4 .faq .q{flex:1}
.mx4 .faq .qpins{display:flex;gap:4px;flex:none}
.mx4 .faq .ans{padding:0 16px 14px 42px}
.mx4 .locs{display:flex;flex-wrap:wrap;gap:12px;margin:12px 0}
.mx4 .locfig{margin:0;flex:1 1 240px;max-width:340px}
.mx4 .loc{position:relative;overflow:hidden;background:#fff;border:1px solid var(--line);border-radius:12px}
.mx4 .loc img{position:absolute;display:block;max-width:none;height:auto}
.mx4 .ring{position:absolute;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;border:3px solid #0b8f76;background:rgba(29,233,182,.22);animation:ring 1.6s ease-in-out infinite}
@keyframes ring{50%{box-shadow:0 0 0 6px rgba(29,233,182,.25)}}
@media (prefers-reduced-motion:reduce){.mx4 .ring{animation:none}}
@media (max-width:860px){.mx4 .faq .ans{padding-left:16px}}
.mx4 .projects-footer{border-top-color:var(--line)}
.mx4 .projects-footer a{color:var(--muted)}
.mx4 .projects-footer a:hover{color:var(--ink)}
.mx4 .projects-footer a:focus-visible{outline-color:var(--accent)}
`;

/* ---------- Figure ---------- */
const FIG = {
  1: {
    src: "fig1.jpg",
    w: 924,
    h: 580,
    cap: "Le tre viste del mouse (dall'alto, da sotto, di lato) con gli undici elementi numerati.",
  },
  2: {
    src: "fig2.jpg",
    w: 620,
    h: 366,
    cap: "Il pannello tattile, evidenziato sull'appoggio del pollice.",
  },
  3: {
    src: "fig3.jpg",
    w: 930,
    h: 488,
    cap: "I due modi di usare l'Anello Azioni: «Opzione 1» premi e rilascia il pannello, poi clic principale sulla bolla; «Opzione 2» tieni premuto il pannello e rilascia sulla bolla.",
  },
  4: {
    src: "fig4.jpg",
    w: 926,
    h: 520,
    cap: "La rotella di scorrimento MagSpeed.",
  },
  5: {
    src: "fig5.jpg",
    w: 738,
    h: 308,
    cap: "A sinistra lo scorrimento a scatti (riga per riga), a destra la rotazione libera iperveloce.",
  },
  6: {
    src: "fig6.jpg",
    w: 924,
    h: 542,
    cap: "Il pulsante di cambio modalità, subito sotto la rotella.",
  },
  7: {
    src: "fig7.jpg",
    w: 981,
    h: 1080,
    cap: "Le impostazioni del mouse nel software: velocità del puntatore, modalità di scorrimento (Smart Shift, Ratchet, Free Spin), sensibilità, forza e direzione.",
  },
  8: {
    src: "fig8.jpg",
    w: 834,
    h: 460,
    cap: "La rotella del pollice, sul fianco sinistro.",
  },
  9: {
    src: "fig9.jpg",
    w: 918,
    h: 506,
    cap: "Il pulsante gesto e le quattro direzioni di movimento.",
  },
  10: {
    src: "fig10.jpg",
    w: 910,
    h: 410,
    cap: "I pulsanti Indietro e Avanti, sopra l'appoggio del pollice.",
  },
  11: {
    src: "fig11.jpg",
    w: 524,
    h: 376,
    cap: "Il cursore «Pointer speed» nel software: da 200 a 8000 DPI.",
  },
  12: {
    src: "fig12.jpg",
    w: 364,
    h: 688,
    cap: "La schermata «Button customization»: si sceglie un pulsante e gli si assegna una funzione.",
  },
  13: {
    src: "fig13.jpg",
    w: 678,
    h: 426,
    cap: "Il cavo USB-C si inserisce nella porta frontale.",
  },
  14: {
    src: "fig14.jpg",
    w: 770,
    h: 398,
    cap: "Il LED di stato della batteria, sotto il pulsante di cambio modalità.",
  },
};

/* ---------- Contenuto ---------- */
const PARTS = [
  {
    n: 1,
    t: "Rotella di scorrimento MagSpeed",
    to: "magspeed",
    x: 3.2,
    y: 15.5,
    d: "Rotella principale: passa da sola dagli scatti alla rotazione libera.",
  },
  {
    n: 2,
    t: "Pulsante di cambio modalità della rotella",
    to: "magspeed",
    x: 3.2,
    y: 27.6,
    d: "Cambia a mano tra scorrimento a scatti e libero.",
  },
  {
    n: 3,
    t: "Pannello tattile (Haptic Sense)",
    to: "pannello-tattile",
    x: 3.2,
    y: 37.6,
    d: "Restituisce vibrazioni e, se cliccato, apre l'Anello Azioni.",
  },
  {
    n: 4,
    t: "LED di stato della batteria",
    to: "batteria",
    x: 43.8,
    y: 31.4,
    d: "Verde, rosso o verde pulsante secondo il livello di carica.",
  },
  {
    n: 5,
    t: "Rotella del pollice",
    to: "rotella-pollice",
    x: 24.7,
    y: 76,
    d: "Scorrimento orizzontale e funzioni per singola app.",
  },
  {
    n: 6,
    t: "Pulsante gesto",
    to: "pulsante-gesto",
    x: 20.9,
    y: 84.5,
    d: "Tenuto premuto mentre muovi il mouse, lancia azioni di sistema.",
  },
  {
    n: 7,
    t: "Pulsanti Avanti / Indietro",
    to: "avanti-indietro",
    x: 74.7,
    y: 79.7,
    d: "Navigazione tra pagine web e documenti.",
  },
  {
    n: 8,
    t: "Porta di ricarica USB-C",
    to: "batteria",
    x: 53.9,
    y: 8.6,
    d: "Sul frontale, per il cavo di ricarica.",
  },
  {
    n: 9,
    t: "Pulsante di accensione / spegnimento",
    to: "configurazione",
    x: 53.9,
    y: 34.1,
    d: "Interruttore sul fondo del mouse.",
  },
  {
    n: 10,
    t: "Sensore da 8000 DPI",
    to: "sensore-dpi",
    x: 95.5,
    y: 34.1,
    d: "Sensore ottico: 1000 DPI di serie, fino a 8000 dal software.",
  },
  {
    n: 11,
    t: "Pulsante Easy-Switch e di connessione",
    to: "easy-switch",
    x: 95.5,
    y: 45.7,
    d: "Cambia canale e avvia l'abbinamento, fino a tre computer.",
  },
];

/* ---------- FAQ (solo uso abituale) ----------
   Nel testo, {3} diventa il pallino numerato 3 della Figura 1. */
const VIEWS = {
  top: {
    label: "Vista dall'alto",
    x: 0,
    y: 0,
    w: 50,
    h: 64,
    parts: [1, 2, 3, 4],
  },
  bottom: {
    label: "Vista da sotto",
    x: 50,
    y: 0,
    w: 50,
    h: 64,
    parts: [8, 9, 10, 11],
  },
  side: {
    label: "Vista laterale",
    x: 12,
    y: 66,
    w: 72,
    h: 34,
    parts: [5, 6, 7],
  },
};

const FAQ = [
  {
    q: "Come passo dallo scorrimento a scatti a quello libero?",
    refs: [1, 2],
    a: [
      "Di norma non devi fare nulla: la rotella {1} sente la velocità con cui la giri e passa da sola dagli scatti (riga per riga) alla rotazione libera per i contenuti lunghi.",
      "Se vuoi decidere tu, premi il pulsante {2}, subito sotto la rotella: ogni pressione alterna le due modalità.",
    ],
    viz: [{ k: "fig", n: 5 }],
  },
  {
    q: "Come scorro in orizzontale?",
    refs: [5],
    a: [
      "Con la rotella del pollice {5}, sul fianco: ruotandola ti sposti da sinistra a destra, per esempio in un foglio di calcolo largo o lungo una timeline.",
    ],
  },
  {
    q: "Come torno alla pagina precedente o vado alla successiva?",
    refs: [7],
    a: [
      "Con i due pulsanti {7} sopra l'appoggio del pollice: uno torna indietro, l'altro va avanti, nelle pagine web e nei documenti su cui si trova il puntatore.",
      "Su Mac funzionano solo con il software Logitech installato.",
    ],
  },
  {
    q: "A cosa serve il pulsante gesto?",
    refs: [6],
    a: [
      "Tieni premuto il pulsante {6} e intanto sposta il mouse in una delle quattro direzioni: ogni direzione lancia un'azione di sistema. Una pressione singola, senza movimento, mostra le finestre aperte.",
    ],
    viz: [
      { k: "fig", n: 9 },
      {
        k: "table",
        head: ["Gesto", "Windows", "macOS"],
        rows: [
          ["Pressione singola", "Task View", "Mission Control"],
          [
            "Tieni premuto + giù ↓",
            "Mostra / nascondi desktop",
            "Mission Control",
          ],
          ["Tieni premuto + su ↑", "Menu Start", "App Exposé"],
          [
            "Tieni premuto + destra → / sinistra ←",
            "Cambia desktop",
            "Cambia desktop",
          ],
        ],
      },
      {
        k: "small",
        text: "Gli abbinamenti direzione/azione sono la lettura più plausibile della tabella originale, poco leggibile.",
      },
    ],
  },
  {
    q: "Come apro l'Anello Azioni e scelgo una bolla?",
    refs: [3],
    a: [
      "Premi il pannello tattile {3} sotto il pollice: attorno al cursore compare l'Anello Azioni, un cerchio di bolle (i pallini con le icone).",
      "Puoi scegliere in due modi. Clic e selezione: premi e rilascia il pannello, porta il cursore sulla bolla e fai clic sinistro. Pressione prolungata: tieni premuto il pannello, spostati sulla bolla e rilascia.",
    ],
    viz: [{ k: "fig", n: 3 }],
  },
  {
    q: "Cosa sono le vibrazioni che sento sotto il pollice?",
    refs: [3],
    a: [
      "È il feedback aptico del pannello tattile {3}: brevi vibrazioni che confermano un'azione o segnalano un evento del mouse, come lo stato di alimentazione e connessione.",
    ],
  },
  {
    q: "Come passo da un computer all'altro?",
    refs: [11],
    a: [
      "Premi brevemente il pulsante Easy-Switch {11}, sul fondo del mouse: ogni pressione passa al canale successivo. I canali sono tre, uno per ciascun computer già abbinato.",
    ],
  },
  {
    q: "Come capisco quanta batteria resta?",
    refs: [4],
    a: [
      "Guarda il LED {4} sul dorso del mouse: il colore del pallino luminoso indica il livello di carica.",
    ],
    viz: [{ k: "fig", n: 14 }, { k: "leds" }],
  },
  {
    q: "Quanto dura la batteria e quanto tempo serve per ricaricarla?",
    refs: [8],
    a: [
      "Una carica completa può durare fino a 70 giorni, a seconda dell'uso. Se sei a secco bastano 3 minuti di ricarica per una giornata di lavoro.",
      "Il cavo USB-C si collega alla porta {8}, sul frontale.",
    ],
    viz: [{ k: "fig", n: 13 }],
  },
  {
    q: "Come rendo il puntatore più veloce o più lento?",
    refs: [10],
    a: [
      "La velocità dipende dai DPI del sensore {10}: di serie sono 1000 e dal software Logitech si regolano con un cursore, fino a 8000. Valori alti sono comodi sui monitor ad alta risoluzione.",
    ],
    viz: [{ k: "fig", n: 11 }],
  },
  {
    q: "Posso far fare ai pulsanti cose diverse in ogni programma?",
    refs: [5, 6, 7],
    a: [
      "Sì. Dal software Logitech, alla voce «Personalizzazione pulsanti», ogni comando può avere una funzione diversa per ciascuna applicazione.",
      "L'esempio tipico è la rotella del pollice {5}: zoom in Word e PowerPoint, dimensione del pennello in Photoshop, timeline in Premiere Pro, cambio scheda nel browser, volume. Lo stesso vale per il pulsante gesto {6} e per i pulsanti {7}.",
    ],
    viz: [{ k: "fig", n: 12 }],
  },
  {
    q: "Come accendo e spengo il mouse?",
    refs: [9],
    a: ["Con l'interruttore {9}, sul fondo del mouse."],
  },
];

const SECTIONS = [
  {
    id: "inizio",
    group: "Guida",
    title: "Guida introduttiva",
    kicker: "MX Master 4",
    lead: "Dalla prima accensione alle funzioni avanzate: collegamento, panoramica dei comandi, personalizzazione e batteria.",
    blocks: [
      { k: "toc" },
      {
        k: "note",
        warn: true,
        title: "Su questa ricostruzione",
        text: "I testi sono riscritti a partire dall'articolo dell'hub Logitech (versione italiana, tradotta automaticamente); le figure sono quelle originali. Dove la pagina di partenza è ambigua lo trovi segnalato in una nota gialla.",
      },
      { k: "links", items: [{ t: "Articolo originale", u: SOURCE }] },
    ],
  },

  {
    id: "configurazione",
    group: "Per iniziare",
    title: "Configurazione dettagliata",
    kicker: "Per iniziare",
    lead: "Tre passaggi: accendere, collegare, installare il software.",
    blocks: [
      {
        k: "steps",
        items: [
          {
            t: "Controlla che il mouse sia acceso",
            d: "Sul fondo del mouse il LED del canale 1 deve lampeggiare rapidamente. Se resta fermo, serve una pressione prolungata di 3 secondi.",
          },
          {
            t: "Scegli il tipo di collegamento",
            sub: [
              [
                "Ricevitore Logi Bolt (in dotazione)",
                "Basta inserirlo in una porta USB del computer.",
              ],
              [
                "Bluetooth",
                "Apri le impostazioni Bluetooth del computer e porta a termine l'associazione da lì.",
              ],
            ],
          },
          {
            t: "Installa il software Logi Tune",
            d: "Serve a personalizzare i pulsanti, regolare la velocità di scorrimento e tenere d'occhio la batteria.",
          },
        ],
      },
      {
        k: "note",
        warn: true,
        title: "Ambiguità nella fonte",
        text: "L'articolo non dice quale pulsante tenere premuto per 3 secondi: per coerenza con la sezione successiva è con ogni probabilità il pulsante Easy-Switch sul fondo.",
      },
      {
        k: "links",
        items: [
          {
            t: "Scarica Logi Tune",
            u: "https://www.logitech.com/en-us/video-collaboration/software/logi-tune-software.html",
          },
          {
            t: "Collegare un dispositivo Bluetooth Logitech",
            u: "https://support.logitech.com/article/Connect-your-Logitech-Bluetooth-device",
          },
          {
            t: "Risoluzione dei problemi Bluetooth",
            u: "https://sync.logitech.com/hub/mx-anywhere-3/post/bluetooth-troubleshooting-for-logitech-bluetooth-mice-keyboards-and-ivl0Hvx4vF4ILMJ",
          },
        ],
      },
    ],
  },

  {
    id: "easy-switch",
    group: "Per iniziare",
    title: "Secondo computer con Easy-Switch",
    kicker: "Per iniziare",
    lead: "Il mouse ricorda fino a tre computer e passa dall'uno all'altro con un pulsante.",
    blocks: [
      {
        k: "steps",
        items: [
          {
            t: "Seleziona il canale",
            d: "Ogni pressione breve del pulsante Easy-Switch porta al canale successivo.",
          },
          {
            t: "Rendi il mouse rilevabile",
            d: "Con una pressione di 3 secondi sullo stesso pulsante il LED inizia a lampeggiare velocemente: il mouse è pronto per l'abbinamento.",
          },
          {
            t: "Collega il computer",
            sub: [
              [
                "3a · Bluetooth",
                "Completa l'abbinamento dalle impostazioni Bluetooth del computer.",
              ],
              [
                "3b · Ricevitore USB",
                "Inserisci il ricevitore, apri Logitech Options+ e scegli di aggiungere un dispositivo Logi Bolt.",
              ],
            ],
          },
        ],
      },
      {
        k: "note",
        title: "Dall'Anello Azioni",
        text: "Easy-Switch si può configurare anche nell'Anello Azioni, così da spostare insieme due dispositivi Logitech da un computer all'altro.",
      },
      {
        k: "links",
        items: [
          {
            t: "Easy-Switch nell'Anello Azioni",
            u: "https://support.logi.com/hc/articles/34377296585111",
          },
        ],
      },
    ],
  },

  {
    id: "panoramica",
    group: "Il prodotto",
    title: "Presentazione del prodotto",
    kicker: "Scopri il prodotto",
    lead: "Undici elementi tra comandi, sensore e connessioni. Tocca un numero sulla figura o una voce dell'elenco.",
    blocks: [{ k: "parts" }],
  },

  {
    id: "pannello-tattile",
    group: "Il prodotto",
    title: "Pannello di rilevamento tattile",
    kicker: "Scopri il prodotto",
    lead: "La superficie sotto il pollice vibra per darti conferme e funziona anche da pulsante.",
    blocks: [
      { k: "fig", n: 2 },
      { k: "h2", text: "Due funzioni" },
      {
        k: "ul",
        items: [
          "Feedback aptico: Logi Tune governa le vibrazioni a livello di dispositivo, per esempio quelle legate ad alimentazione e connettività.",
          "Pulsante: un clic sul pannello richiama l'Anello Azioni, per il quale serve Logi Options+.",
        ],
      },
      { k: "h2", text: "Scegliere una bolla dell'Anello Azioni" },
      {
        k: "steps",
        items: [
          {
            t: "Clic e selezione",
            d: "Premi e rilascia il pannello, porta il cursore sulla bolla che ti interessa e confermala con il clic sinistro.",
          },
          {
            t: "Pressione prolungata",
            d: "Tieni premuto il pannello, spostati sulla bolla e rilascia quando ci sei sopra.",
          },
        ],
      },
      { k: "fig", n: 3 },
      {
        k: "links",
        items: [
          {
            t: "Guida al feedback aptico",
            u: "https://it.hub.sync.logitech.com/mx-master-4/post/haptic-feedback-guide-fgAEJmLZXL9iQXK",
          },
          {
            t: "Personalizzare l'Anello Azioni",
            u: "https://support.logi.com/hc/en-us/articles/17859866534423-How-can-I-customize-the-Actions-Ring",
          },
        ],
      },
    ],
  },

  {
    id: "magspeed",
    group: "Il prodotto",
    title: "Rotella adattiva MagSpeed",
    kicker: "Scopri il prodotto",
    lead: "Riconosce quanto velocemente la fai girare e sceglie da sola la modalità di scorrimento.",
    blocks: [
      { k: "fig", n: 4 },
      {
        k: "ul",
        items: [
          "A scatti, riga per riga: la più precisa, comoda per elenchi e voci da scorrere una alla volta.",
          "Iperveloce, a rotazione libera: la rotella gira senza attrito e attraversa in un attimo documenti e pagine lunghe.",
        ],
      },
      { k: "fig", n: 5 },
      { k: "h2", text: "Cambiare modalità manualmente" },
      {
        k: "p",
        text: "Il pulsante sulla parte superiore del mouse, appena sotto la rotella, alterna le due modalità quando vuoi decidere tu.",
      },
      { k: "fig", n: 6 },
      {
        k: "p",
        text: "In Logi Tune puoi stabilire quale modalità usare di partenza — SmartShift (automatica), Ratchet (a scatti) o Free-Spin (libera) — e ritoccare sensibilità, forza di scorrimento e direzione.",
      },
      { k: "fig", n: 7 },
    ],
  },

  {
    id: "rotella-pollice",
    group: "Il prodotto",
    title: "Rotella del pollice",
    kicker: "Scopri il prodotto",
    lead: "Sul fianco, per muoverti in orizzontale senza spostare la mano.",
    blocks: [
      { k: "fig", n: 8 },
      {
        k: "p",
        text: "Di base scorre i contenuti da sinistra a destra. Con Logi Tune ne cambi velocità e verso, oppure le dai un compito diverso in ogni applicazione:",
      },
      {
        k: "ul",
        items: [
          "zoom in Microsoft Word e PowerPoint",
          "dimensione del pennello in Adobe Photoshop",
          "spostamento lungo la timeline in Adobe Premiere Pro",
          "passaggio da una scheda all'altra nel browser",
          "regolazione del volume",
          "scorciatoie da tastiera personalizzate",
        ],
      },
    ],
  },

  {
    id: "pulsante-gesto",
    group: "Il prodotto",
    title: "Pulsante gesto",
    kicker: "Scopri il prodotto",
    lead: "Un pulsante più un movimento del mouse: quattro direzioni, quattro azioni di sistema. Richiede Logi Tune.",
    blocks: [
      { k: "fig", n: 9 },
      {
        k: "p",
        text: "Si usa tenendo premuto il pulsante mentre sposti il mouse in alto, in basso, a destra o a sinistra.",
      },
      {
        k: "table",
        head: ["Gesto", "Windows", "macOS"],
        rows: [
          ["Pressione singola", "Task View", "Mission Control"],
          [
            "Tieni premuto + giù ↓",
            "Mostra / nascondi desktop",
            "Mission Control",
          ],
          ["Tieni premuto + su ↑", "Menu Start", "App Exposé"],
          [
            "Tieni premuto + destra →",
            "Passa da un desktop all'altro",
            "Passa da un desktop all'altro",
          ],
          [
            "Tieni premuto + sinistra ←",
            "Passa da un desktop all'altro",
            "Passa da un desktop all'altro",
          ],
        ],
      },
      {
        k: "note",
        warn: true,
        title: "Tabella da verificare",
        text: "Nell'originale le frecce della tabella non sono ben leggibili e alcune righe sembrano ripetersi: l'abbinamento gesto/azione riportato qui è la lettura più plausibile, non una certezza.",
      },
      {
        k: "p",
        text: "Al pulsante gesto si possono associare fino a cinque azioni, e lo stesso tipo di mappatura si può spostare su altri pulsanti del mouse.",
      },
    ],
  },

  {
    id: "avanti-indietro",
    group: "Il prodotto",
    title: "Pulsanti Indietro / Avanti",
    kicker: "Scopri il prodotto",
    lead: "Sotto il pollice, per tornare alla pagina precedente o andare alla successiva.",
    blocks: [
      { k: "fig", n: 10 },
      {
        k: "p",
        text: "Funzionano su pagine web e documenti, a seconda di dove si trova il puntatore.",
      },
      {
        k: "note",
        title: "Su Mac",
        text: "Per attivarli è necessario Logi Tune.",
      },
      {
        k: "p",
        text: "Dal software possono anche diventare altro: annulla e ripristina, zoom, volume e ulteriori funzioni.",
      },
    ],
  },

  {
    id: "sensore-dpi",
    group: "Il prodotto",
    title: "Sensore da 8000 DPI",
    kicker: "Scopri il prodotto",
    lead: "Più DPI significa più strada sullo schermo con lo stesso movimento della mano.",
    blocks: [
      {
        k: "p",
        text: "Appena tolto dalla scatola il mouse lavora a 1000 DPI. Logi Tune permette di salire fino a 8000 DPI, cosa utile soprattutto con monitor ad alta risoluzione.",
      },
      { k: "fig", n: 11 },
    ],
  },

  {
    id: "app",
    group: "Il prodotto",
    title: "Impostazioni specifiche per app",
    kicker: "Scopri il prodotto",
    lead: "Lo stesso pulsante può fare cose diverse a seconda del programma in primo piano.",
    blocks: [
      {
        k: "p",
        text: "In Logi Tune la voce «Personalizzazione pulsanti» assegna a ogni pulsante una funzione distinta per ciascuna applicazione. Per l'Anello Azioni c'è una guida dedicata.",
      },
      { k: "fig", n: 12 },
      {
        k: "links",
        items: [
          {
            t: "Personalizzare l'Anello Azioni",
            u: "https://support.logi.com/hc/en-us/articles/17859866534423-How-can-I-customize-the-Actions-Ring",
          },
        ],
      },
    ],
  },

  {
    id: "batteria",
    group: "Uso quotidiano",
    title: "Batteria",
    kicker: "Uso quotidiano",
    lead: "Ricarica via USB-C e tre colori per capire a che punto sei.",
    blocks: [
      { k: "h2", text: "Ricaricare MX Master 4" },
      {
        k: "p",
        text: "Collega il cavo in dotazione alla porta USB-C del mouse e a una sorgente di alimentazione USB.",
      },
      { k: "fig", n: 13 },
      {
        k: "stats",
        items: [
          ["3 min", "di ricarica minima per un'intera giornata d'uso"],
          ["70 giorni", "di autonomia massima con una carica completa*"],
        ],
      },
      { k: "small", text: "* La durata dipende dall'uso e può variare." },
      { k: "h2", text: "Controllare lo stato della batteria" },
      {
        k: "p",
        text: "L'indicazione arriva dai LED sul mouse (l'articolo parla di tre LED sul lato; la figura evidenzia quello sul dorso).",
      },
      { k: "fig", n: 14 },
      { k: "leds" },
      {
        k: "note",
        title: "Notifiche",
        text: "Gli avvisi di batteria scarica sul computer richiedono Logi Options+.",
      },
    ],
  },

  {
    id: "faq",
    group: "Uso quotidiano",
    title: "Domande frequenti",
    kicker: "Uso quotidiano",
    lead: "Le risposte brevi per l'uso di tutti i giorni. Ogni risposta indica il pallino numerato del comando coinvolto e mostra dove si trova.",
    blocks: [{ k: "faq" }],
  },

  {
    id: "risorse",
    group: "Uso quotidiano",
    title: "Pulizia e risorse",
    kicker: "Uso quotidiano",
    lead: "Manutenzione, download e tutti i collegamenti citati nell'articolo.",
    blocks: [
      { k: "h2", text: "Come pulire il dispositivo" },
      {
        k: "p",
        text: "Per la pulizia l'articolo rimanda a una guida apposita.",
      },
      {
        k: "links",
        items: [
          {
            t: "Pulire il dispositivo Logitech",
            u: "https://it.hub.sync.logitech.com/mx-master-4/post/cleaning-your-logitech-device-rM5FoA3PNmP3kCK",
          },
        ],
      },
      { k: "h2", text: "Download" },
      {
        k: "links",
        items: [
          {
            t: "Logi Tune per Windows e Mac",
            u: "https://www.logitech.com/video-collaboration/software/logi-tune-software.html",
          },
        ],
      },
      { k: "h2", text: "Altri collegamenti" },
      {
        k: "links",
        items: [
          {
            t: "Collegare un dispositivo Bluetooth Logitech",
            u: "https://support.logitech.com/article/Connect-your-Logitech-Bluetooth-device",
          },
          {
            t: "Guida Bluetooth (hub MX Keys)",
            u: "https://sync.logitech.com/hub/mx-keys-combo/post/connect-your-logitech-bluetooth-device-asIdk0rKZZeB99a",
          },
          {
            t: "Risoluzione dei problemi Bluetooth",
            u: "https://sync.logitech.com/hub/mx-anywhere-3/post/bluetooth-troubleshooting-for-logitech-bluetooth-mice-keyboards-and-ivl0Hvx4vF4ILMJ",
          },
          {
            t: "Easy-Switch nell'Anello Azioni",
            u: "https://support.logi.com/hc/articles/34377296585111",
          },
          {
            t: "Guida al feedback aptico",
            u: "https://it.hub.sync.logitech.com/mx-master-4/post/haptic-feedback-guide-fgAEJmLZXL9iQXK",
          },
          {
            t: "Personalizzare l'Anello Azioni",
            u: "https://support.logi.com/hc/en-us/articles/17859866534423-How-can-I-customize-the-Actions-Ring",
          },
          {
            t: "Segnalare un problema di traduzione",
            u: "https://tally.so/r/PdOovV",
          },
          { t: "Articolo originale", u: SOURCE },
        ],
      },
      {
        k: "note",
        warn: true,
        title: "Incongruenze della pagina originale",
        text: "Il testo di partenza è tradotto con l'IA: in alcuni punti chiama il mouse «tastiera» e alterna i nomi Logi Tune e Logi Options+ senza chiarire se si tratti dello stesso programma. Qui ogni nome è riportato dove compare nell'originale.",
      },
    ],
  },
];
const IDS = SECTIONS.map(function (s) {
  return s.id;
});

function textOf(s) {
  var out = [s.title, s.lead];
  s.blocks.forEach(function (b) {
    if (b.text) out.push(b.text);
    if (b.title) out.push(b.title);
    if (b.items)
      b.items.forEach(function (i) {
        if (typeof i === "string") out.push(i);
        else if (Array.isArray(i)) out.push(i.join(" "));
        else {
          out.push(i.t || "", i.d || "");
          if (i.sub)
            i.sub.forEach(function (x) {
              out.push(x.join(" "));
            });
        }
      });
    if (b.rows)
      b.rows.forEach(function (r) {
        out.push(r.join(" "));
      });
    if (b.k === "fig") out.push(FIG[b.n].cap);
    if (b.k === "parts")
      PARTS.forEach(function (p) {
        out.push(p.t, p.d);
      });
    if (b.k === "faq")
      FAQ.forEach(function (f) {
        out.push(f.q, f.a.join(" "));
      });
    if (b.k === "leds") out.push("verde rosso verde pulsante ricarica LED");
  });
  return out.join(" ").toLowerCase();
}
SECTIONS.forEach(function (s) {
  s.text = textOf(s);
});

function currentId() {
  var x = (location.hash || "").replace(/^#/, "");
  return IDS.indexOf(x) >= 0 ? x : IDS[0];
}

/* ---------- Stato esterno: hash dell'URL e tema ---------- */
function subscribeHash(cb) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

const THEME_KEY = "mx4-theme";
const THEME_EVENT = "mx4-theme-change";
let themeFallback = null; // usato se localStorage non è disponibile

function readTheme() {
  let saved = themeFallback;
  try {
    saved = localStorage.getItem(THEME_KEY) || saved;
  } catch {}
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function writeTheme(value) {
  themeFallback = value;
  try {
    localStorage.setItem(THEME_KEY, value);
  } catch {}
  window.dispatchEvent(new Event(THEME_EVENT));
}

function subscribeTheme(cb) {
  const mq = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;
  window.addEventListener(THEME_EVENT, cb);
  window.addEventListener("storage", cb);
  if (mq && mq.addEventListener) mq.addEventListener("change", cb);
  return () => {
    window.removeEventListener(THEME_EVENT, cb);
    window.removeEventListener("storage", cb);
    if (mq && mq.removeEventListener) mq.removeEventListener("change", cb);
  };
}

/* ---------- Componenti ---------- */
const ImgBase = createContext("");

function Figure({ n, onZoom }) {
  const base = useContext(ImgBase);
  const f = FIG[n];
  return (
    <figure>
      <div className="figbox">
        <Image
          src={`${base}/${f.src}`}
          width={f.w}
          height={f.h}
          alt={f.cap}
          loading="lazy"
        />
        <button
          className="zoom"
          onClick={() => onZoom(n)}
          aria-label={`Ingrandisci figura ${n}`}
        >
          ⤢ Ingrandisci
        </button>
      </div>
      <figcaption>
        <b>Figura {n}. </b>
        {f.cap}
      </figcaption>
    </figure>
  );
}

function Parts({ onZoom }) {
  const base = useContext(ImgBase);
  const [sel, setSel] = useState(null);
  const cur = PARTS.find((x) => x.n === sel);
  const f = FIG[1];
  return (
    <>
      <figure>
        <div className="figbox">
          <div className="hotwrap">
            <Image
              src={`${base}/${f.src}`}
              width={f.w}
              height={f.h}
              alt={f.cap}
            />
            {PARTS.map((x) => (
              <button
                key={x.n}
                className={"hot" + (sel === x.n ? " on" : "")}
                style={{ left: x.x + "%", top: x.y + "%" }}
                aria-label={`${x.n}: ${x.t}`}
                title={x.t}
                onClick={() => setSel(x.n)}
              />
            ))}
          </div>
          <button className="zoom" onClick={() => onZoom(1)}>
            ⤢ Ingrandisci
          </button>
        </div>
        <figcaption>
          <b>Figura 1. </b>
          {f.cap}
        </figcaption>
      </figure>
      <div className="detail" aria-live="polite">
        {cur ? (
          <>
            <b>
              {cur.n}. {cur.t} —{" "}
            </b>
            {cur.d} <a href={"#" + cur.to}>Vai alla sezione →</a>
          </>
        ) : (
          "Seleziona un elemento per leggerne la descrizione."
        )}
      </div>
      <ol className="parts">
        {PARTS.map((x) => (
          <li key={x.n}>
            <button
              className={sel === x.n ? "on" : ""}
              onClick={() => setSel(x.n)}
            >
              <span className="num">{x.n}</span>
              <span>{x.t}</span>
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}

function Links({ items }) {
  return (
    <ul className="links">
      {items.map((l, i) => (
        <li key={i}>
          <a href={l.u} target="_blank" rel="noopener noreferrer">
            {l.t} ↗<small>{l.u}</small>
          </a>
        </li>
      ))}
    </ul>
  );
}

/* Pallino numerato: stesso numero della Figura 1. */
function Pin({ n }) {
  const p = PARTS.find((x) => x.n === n);
  return (
    <span
      className="pin"
      title={p ? p.t : undefined}
      aria-label={`pallino ${n}${p ? ": " + p.t : ""}`}
    >
      {n}
    </span>
  );
}

/* Trasforma "premi {2}" in testo + pallino. */
function rich(text) {
  return text
    .split(/\{(\d+)\}/)
    .map((t, i) => (i % 2 ? <Pin key={i} n={Number(t)} /> : t));
}

/* Ritaglio della Figura 1 su una sola vista, con i pallini indicati cerchiati. */
function Locator({ view, nums }) {
  const base = useContext(ImgBase);
  const v = VIEWS[view];
  const f = FIG[1];
  return (
    <figure className="locfig">
      <div
        className="loc"
        style={{ aspectRatio: `${v.w * f.w} / ${v.h * f.h}` }}
      >
        <Image
          src={`${base}/${f.src}`}
          width={f.w}
          height={f.h}
          alt={`${v.label} del mouse, pallini ${nums.join(", ")} evidenziati`}
          style={{
            width: (100 / v.w) * 100 + "%",
            left: (-v.x / v.w) * 100 + "%",
            top: (-v.y / v.h) * 100 + "%",
          }}
        />
        {nums.map((n) => {
          const p = PARTS.find((x) => x.n === n);
          return (
            <span
              key={n}
              className="ring"
              style={{
                left: ((p.x - v.x) / v.w) * 100 + "%",
                top: ((p.y - v.y) / v.h) * 100 + "%",
                width: (7.6 / v.w) * 100 + "%",
              }}
            />
          );
        })}
      </div>
      <figcaption>
        <b>{v.label}. </b>
        {nums.map((n, i) => (
          <span key={n}>
            {i > 0 && " · "}
            <Pin n={n} /> {PARTS.find((x) => x.n === n).t}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

function Faq({ onZoom }) {
  const [filter, setFilter] = useState(null);
  const items = FAQ.filter((f) => filter === null || f.refs.includes(filter));
  return (
    <>
      <div className="legend">
        <p>
          <b>Come leggere i pallini. </b>
          I pallini numerati <Pin n={1} />–<Pin n={11} /> sono gli stessi della
          Figura 1 in «Presentazione del prodotto». Tocca un pallino per vedere
          solo le domande che lo riguardano.
        </p>
        <div className="pins">
          {PARTS.map((p) => (
            <button
              key={p.n}
              className={"pinbtn" + (filter === p.n ? " on" : "")}
              aria-pressed={filter === p.n}
              onClick={() => setFilter(filter === p.n ? null : p.n)}
            >
              <Pin n={p.n} /> {p.t}
            </button>
          ))}
          {filter !== null && (
            <button className="pinbtn clear" onClick={() => setFilter(null)}>
              Mostra tutte ✕
            </button>
          )}
        </div>
      </div>

      {items.length === 0 && (
        <p className="empty">Nessuna domanda riguarda questo pallino.</p>
      )}

      {items.map((f) => (
        <details className="faq" key={f.q}>
          <summary>
            <span className="q">{f.q}</span>
            <span className="qpins">
              {f.refs.map((n) => (
                <Pin key={n} n={n} />
              ))}
            </span>
          </summary>
          <div className="ans">
            {f.a.map((t, i) => (
              <p key={i}>{rich(t)}</p>
            ))}
            <div className="locs">
              {Object.keys(VIEWS)
                .map((k) => [
                  k,
                  f.refs.filter((n) => VIEWS[k].parts.includes(n)),
                ])
                .filter(([, nums]) => nums.length)
                .map(([k, nums]) => (
                  <Locator key={k} view={k} nums={nums} />
                ))}
            </div>
            {(f.viz || []).map((b, i) => (
              <Block key={i} b={b} onZoom={onZoom} />
            ))}
          </div>
        </details>
      ))}
    </>
  );
}

function Block({ b, onZoom }) {
  switch (b.k) {
    case "p":
      return <p>{b.text}</p>;
    case "small":
      return <p className="fine">{b.text}</p>;
    case "h2":
      return <h2>{b.text}</h2>;
    case "ul":
      return (
        <ul>
          {b.items.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      );
    case "fig":
      return <Figure n={b.n} onZoom={onZoom} />;
    case "parts":
      return <Parts onZoom={onZoom} />;
    case "links":
      return <Links items={b.items} />;
    case "note":
      return (
        <div className={"note" + (b.warn ? " warn" : "")}>
          <b>{b.title}. </b>
          {b.text}
        </div>
      );
    case "steps":
      return (
        <ol className="steps">
          {b.items.map((s, i) => (
            <li key={i} data-n={i + 1}>
              <b className="t">{s.t}</b>
              {s.d}
              {s.sub && (
                <ul className="sub">
                  {s.sub.map((x, j) => (
                    <li key={j}>
                      <b>{x[0]}: </b>
                      {x[1]}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                {b.head.map((c, i) => (
                  <th key={i} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "stats":
      return (
        <div className="cards">
          {b.items.map((s, i) => (
            <div className="card" key={i}>
              <b className="big">{s[0]}</b>
              <small>{s[1]}</small>
            </div>
          ))}
        </div>
      );
    case "leds":
      return (
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Colore del LED</th>
                <th scope="col">Significato</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="dot" style={{ background: "#1faa55" }} />
                  Verde
                </td>
                <td>Carica tra il 100% e il 10%</td>
              </tr>
              <tr>
                <td>
                  <span className="dot" style={{ background: "#d63a3a" }} />
                  Rosso
                </td>
                <td>Carica al 10% o meno</td>
              </tr>
              <tr>
                <td>
                  <span
                    className="dot pulse"
                    style={{ background: "#1faa55" }}
                  />
                  Verde pulsante
                </td>
                <td>Ricarica in corso</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    case "faq":
      return <Faq onZoom={onZoom} />;
    case "toc":
      return (
        <div className="cards">
          {SECTIONS.slice(1).map((s, i) => (
            <a className="card" key={s.id} href={"#" + s.id}>
              <small>
                {i + 1} · {s.group}
              </small>
              <b>{s.title}</b>
            </a>
          ))}
        </div>
      );
    default:
      return null;
  }
}

/**
 * Guida introduttiva MX Master 4.
 * @param {string} imgBase cartella (URL) che contiene fig1.jpg … fig14.jpg; default "/mx4"
 * @param {React.ReactNode} footer contenuto mostrato in fondo alla colonna principale (segue il tema)
 */
export default function MxMaster4Guide({ imgBase = "/mx4", footer = null }) {
  // Sezione corrente e tema vivono fuori da React (hash dell'URL, localStorage):
  // si leggono con useSyncExternalStore, senza setState dentro gli effect.
  const id = useSyncExternalStore(subscribeHash, currentId, () => IDS[0]);
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "light");
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(null);
  const [open, setOpen] = useState(false);

  const idx = IDS.indexOf(id);
  const sec = SECTIONS[idx];
  const prev = SECTIONS[idx - 1];
  const next = SECTIONS[idx + 1];

  useEffect(() => {
    const onHash = () => {
      setOpen(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setZoom(null);
        setOpen(false);
        return;
      }
      const tag = (e.target && e.target.tagName) || "";
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        zoom
      )
        return;
      if (e.key === "ArrowRight" && next) window.location.hash = next.id;
      if (e.key === "ArrowLeft" && prev) window.location.hash = prev.id;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, next, prev]);

  const groups = useMemo(() => {
    const ql = query.trim().toLowerCase();
    const out = [];
    SECTIONS.filter((s) => !ql || s.text.includes(ql)).forEach((s) => {
      let g = out[out.length - 1];
      if (!g || g.name !== s.group) {
        g = { name: s.group, items: [] };
        out.push(g);
      }
      g.items.push(s);
    });
    return out;
  }, [query]);

  return (
    <ImgBase.Provider value={imgBase.replace(/\/$/, "")}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="mx4" data-theme={theme}>
        <div className="shell">
          {open && (
            <button
              type="button"
              className="scrim"
              aria-label="Chiudi l'indice"
              onClick={() => setOpen(false)}
            />
          )}

          <aside className={"side" + (open ? " open" : "")}>
            <div className="brand">
              <small>Guida introduttiva</small>
              <b>MX Master 4</b>
            </div>
            <div className="tools">
              <input
                className="search"
                type="search"
                placeholder="Cerca nella guida…"
                aria-label="Cerca nella guida"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="iconbtn"
                onClick={() => writeTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Cambia tema"
                title="Tema chiaro/scuro"
              >
                {theme === "dark" ? "☀" : "☾"}
              </button>
            </div>
            <nav className="nav" aria-label="Sezioni">
              {groups.length ? (
                groups.map((g) => (
                  <div key={g.name}>
                    <div className="group">{g.name}</div>
                    {g.items.map((s) => (
                      <a
                        key={s.id}
                        href={"#" + s.id}
                        className={s.id === id ? "on" : ""}
                        aria-current={s.id === id ? "page" : undefined}
                      >
                        <span className="n">{IDS.indexOf(s.id) + 1}</span>
                        <span>{s.title}</span>
                      </a>
                    ))}
                  </div>
                ))
              ) : (
                <p className="empty">Nessuna sezione contiene «{query}».</p>
              )}
            </nav>
          </aside>

          <div className="main">
            <div className="topbar">
              <button
                className="iconbtn"
                onClick={() => setOpen(true)}
                aria-label="Apri l'indice"
              >
                ☰
              </button>
              <b>{sec.title}</b>
              <span className="count">
                {idx + 1}/{SECTIONS.length}
              </span>
            </div>
            <div className="progress">
              <i style={{ width: ((idx + 1) / SECTIONS.length) * 100 + "%" }} />
            </div>

            <main id="contenuto" className="page" key={id}>
              <div className="kicker">
                {sec.kicker} · {idx + 1} di {SECTIONS.length}
              </div>
              <h1>{sec.title}</h1>
              <p className="lead">{sec.lead}</p>
              {sec.blocks.map((b, i) => (
                <Block key={i} b={b} onZoom={setZoom} />
              ))}

              <div className="pager">
                {prev ? (
                  <a href={"#" + prev.id}>
                    <small>← Precedente</small>
                    {prev.title}
                  </a>
                ) : (
                  <span />
                )}
                {next ? (
                  <a className="next" href={"#" + next.id}>
                    <small>Successiva →</small>
                    {next.title}
                  </a>
                ) : (
                  <span />
                )}
              </div>
              <p className="hint">
                Puoi cambiare sezione anche con i tasti ← e →.
              </p>
            </main>
            {footer}
          </div>
        </div>

        {zoom && (
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Figura ${zoom}`}
          >
            <button
              type="button"
              className="backdrop"
              aria-label="Chiudi la figura"
              onClick={() => setZoom(null)}
            />
            <div className="lightbox-body">
              <Image
                src={`${imgBase.replace(/\/$/, "")}/${FIG[zoom].src}`}
                width={FIG[zoom].w}
                height={FIG[zoom].h}
                alt={FIG[zoom].cap}
              />
              <p>
                Figura {zoom}. {FIG[zoom].cap}
              </p>
            </div>
            <button
              type="button"
              className="close"
              onClick={() => setZoom(null)}
            >
              Chiudi ✕
            </button>
          </div>
        )}
      </div>
    </ImgBase.Provider>
  );
}
