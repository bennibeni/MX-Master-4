import "./globals.css";

export const metadata = {
  title: "MX Master 4 — Guida introduttiva",
  description:
    "Guida navigabile al mouse MX Master 4: collegamento, comandi, personalizzazione, batteria e domande frequenti sull'uso di tutti i giorni.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <a href="#contenuto" className="skip-link">
          Salta al contenuto
        </a>
        {children}
      </body>
    </html>
  );
}
