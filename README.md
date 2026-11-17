# MX Master 4 — Guida introduttiva

App React con Next.js App Router, estratta dalla pagina R20 di Next14.
Guida navigabile al mouse MX Master 4: collegamento, panoramica dei comandi,
personalizzazione, batteria e una pagina di domande frequenti limitata all'uso
di tutti i giorni. I testi sono riscritti a partire dall'articolo
[«Iniziare – MX Master 4»](https://it.hub.sync.logitech.com/mx-master-4/post/getting-started---mx-master-4-LSEt5tZXsbeMP3c)
dell'hub Logitech; le figure sono quelle dell'articolo.

## Avvio

Richiede Node.js 22.12 o successivo e npm. Non richiede chiavi API o file `.env`.

```powershell
cd "C:\Users\torre\Desktop\I miei progetti\mx-master-4"
npm ci
npm run dev
```

Apri l'indirizzo indicato nel terminale (normalmente `http://localhost:3000`).
Per usare un'altra porta: `npm run dev -- --port 3120`.

## Comandi

| Comando                | Azione                              |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Server di sviluppo                  |
| `npm run build`        | Build di produzione                 |
| `npm start`            | Avvia la build di produzione        |
| `npm run lint`         | Controlla JavaScript e React        |
| `npm run lint:a11y`    | Include le regole di accessibilità  |
| `npm run format`       | Applica Prettier                    |
| `npm run format:check` | Verifica la formattazione           |
| `npm run check`        | Formattazione, accessibilità, build |

## Come si usa

- L'indice a sinistra elenca le 14 sezioni; la casella «Cerca nella guida»
  le filtra per testo. Su schermi stretti l'indice si apre dal pulsante ☰.
- Si cambia sezione anche con i tasti ← e →, o con i pulsanti in fondo alla
  pagina. Ogni sezione ha il suo indirizzo (`#magspeed`, `#batteria`, `#faq`…).
- Ogni figura si ingrandisce con «Ingrandisci»; nella Figura 1 i numeri 1–11
  sono cliccabili e portano alla sezione del comando.
- Nelle domande frequenti ogni risposta cita il pallino numerato del comando e
  mostra un ritaglio della Figura 1 con quel pallino cerchiato; toccando un
  pallino della legenda restano solo le domande che lo riguardano.
- Il pulsante ☾ / ☀ cambia tema; la scelta resta salvata nel browser.

## Struttura

- `src/app/`: pagina, layout, metadati, icona e stili globali con il footer.
- `src/components/mx-master-4/MxMaster4Guide.jsx`: l'intera guida.
  - `CSS`: stili, tutti limitati al contenitore `.mx4`.
  - `FIG`, `PARTS`, `VIEWS`, `FAQ`, `SECTIONS`: figure, comandi numerati,
    viste della Figura 1, domande frequenti e sezioni (liste di blocchi).
  - `Figure`, `Parts`, `Pin`, `Locator`, `Faq`, `Links`, `Block`: resa dei blocchi.
  - `MxMaster4Guide`: indice, ricerca, tema, navigazione e ingrandimento.
- `public/mx4/`: le 14 figure (`fig1.jpg` … `fig14.jpg`).

Il footer **All projects** rimanda all'[indice degli altri progetti](https://links-page-bennibeni.vercel.app/),
come negli altri progetti recenti. Il progetto è pronto per un deploy Next.js,
ad esempio su Vercel; non è stato pubblicato automaticamente.
