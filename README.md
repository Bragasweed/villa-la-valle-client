# Villa La Valle — sito web

Questa è la guida completa per gestire, pubblicare e aggiornare il sito da soli, senza bisogno di assistenza esterna.

Il sito è **statico**: niente database, niente server complicato da mantenere. È un insieme di file (HTML, CSS, immagini, video) che qualunque hosting può servire. Questo lo rende semplice ed economico da gestire nel tempo.

---

## Indice

1. [Cosa serve prima di iniziare](#1-cosa-serve-prima-di-iniziare)
2. [Scaricare il progetto](#2-scaricare-il-progetto)
3. [Provare il sito sul proprio computer](#3-provare-il-sito-sul-proprio-computer)
4. [Modificare i contenuti (testi, prezzi, contatti)](#4-modificare-i-contenuti-testi-prezzi-contatti)
5. [Gestire foto e video](#5-gestire-foto-e-video)
6. [Modulo di contatto (Web3Forms)](#6-modulo-di-contatto-web3forms)
7. [Statistiche e pubblicità (opzionale)](#7-statistiche-e-pubblicità-opzionale)
8. [Pubblicare il sito online](#8-pubblicare-il-sito-online)
9. [Collegare il proprio dominio](#9-collegare-il-proprio-dominio)
10. [Aggiornare il sito in futuro](#10-aggiornare-il-sito-in-futuro)
11. [Domande frequenti](#11-domande-frequenti)

---

## 1. Cosa serve prima di iniziare

Installare **una sola cosa** sul computer: **Node.js** (serve per "costruire" il sito a partire dal codice).

1. Andare su [nodejs.org](https://nodejs.org)
2. Scaricare la versione **LTS** (quella consigliata, non "Current")
3. Installarla come un programma qualsiasi (Avanti, Avanti, Fine)
4. Verificare che sia installata: aprire il **Prompt dei comandi** (Windows: tasto Windows → scrivere `cmd` → Invio) e digitare:

```
node -v
```

Se risponde con un numero tipo `v20.x.x`, è tutto pronto.

Facoltativo ma consigliato: un account gratuito su [GitHub](https://github.com) — serve solo se si sceglie l'opzione di pubblicazione "automatica" descritta al punto 8.

---

## 2. Scaricare il progetto

Se questo README è già dentro una cartella sul computer (perché consegnata via chiavetta/email/GitHub), si può saltare questo passaggio.

Se invece il progetto è su GitHub, scaricarlo con il pulsante verde **Code → Download ZIP** e poi estrarre lo ZIP in una cartella a piacere (es. `Documenti\villa-la-valle`).

---

## 3. Provare il sito sul proprio computer

1. Aprire il Prompt dei comandi dentro la cartella `frontend` del progetto (dentro la cartella, tenere premuto Shift e cliccare col tasto destro → "Apri finestra PowerShell qui" oppure "Apri terminale qui")
2. Installare le dipendenze (va fatto una sola volta, o ogni volta che si scaricano nuovi file dal progetto):

```
npm install
```

Ci mette qualche minuto la prima volta, è normale.

3. Avviare l'anteprima:

```
npm run dev
```

4. Aprire il browser su [http://localhost:3000](http://localhost:3000) — questo è il sito, identico a quello online, che gira sul proprio computer. Ogni modifica ai file si vede qui in tempo reale.

Per fermare l'anteprima: tornare al Prompt dei comandi e premere `Ctrl + C`.

---

## 4. Modificare i contenuti (testi, prezzi, contatti)

**Tutto il testo del sito** (nome, descrizione, prezzi mostrati, numero di telefono, email, link ad Airbnb, punti di interesse vicini, recensioni, ecc.) si trova in **un solo file**:

```
frontend/src/data/villa.config.js
```

È un file di testo commentato in italiano/inglese: ogni sezione è chiaramente etichettata (`location`, `capacity`, `pricing`, `contacts`, ecc.). Si apre con un editor di testo qualsiasi (anche il Blocco Note va bene, ma è più comodo con [Visual Studio Code](https://code.visualstudio.com), gratuito).

Regola pratica: cambiare solo il testo tra virgolette (`"..."`), non toccare virgolette, parentesi o due punti circostanti. Dopo ogni modifica, salvare il file e ricaricare la pagina dell'anteprima (`npm run dev`, punto 3) per controllare che sia tutto a posto prima di pubblicare.

---

## 5. Gestire foto e video

Le immagini vivono in `frontend/public/images/`, i video in `frontend/public/videos/`. Ogni sottocartella ha un proprio file `README.md` con istruzioni precise su nomi file e dimensioni consigliate — leggerlo prima di aggiungere foto:

- `frontend/public/images/README.md`
- `frontend/public/videos/README.md`

Per la galleria fotografica principale, dopo aver aggiunto o tolto foto dalle cartelle, lanciare questo comando (dentro `frontend`) per aggiornare automaticamente il sito:

```
npm run gallery:build
```

---

## 6. Modulo di contatto (Web3Forms)

Il modulo "Contattaci" del sito invia le richieste via email usando un servizio gratuito esterno chiamato **Web3Forms** (non serve un server proprio).

1. Andare su [web3forms.com](https://web3forms.com)
2. Inserire l'email dove si vogliono ricevere le richieste (es. quella già in uso per le prenotazioni)
3. Verrà inviata una **Access Key** via email: copiarla
4. Nella cartella `frontend`, creare un file chiamato `.env` (copiando `.env.example` e rinominandolo) e incollare la chiave così:

```
VITE_WEB3FORMS_ACCESS_KEY=incolla-qui-la-chiave
```

Senza questa chiave il modulo di contatto non invierà le email.

---

## 7. Statistiche e pubblicità (opzionale)

Nello stesso file `.env` si possono aggiungere, se si usano:

- `VITE_GA4_MEASUREMENT_ID` — per Google Analytics 4 (statistiche visite)
- `VITE_GOOGLE_ADS_ID` — per il tracciamento di Google Ads
- `VITE_META_PIXEL_ID` — per il tracciamento di Facebook/Instagram Ads

Sono tutti opzionali: se lasciati vuoti, semplicemente quegli script non vengono caricati. Vengono comunque attivati solo dopo che il visitatore accetta i cookie relativi, come richiesto dalla normativa GDPR (il sito include già il banner cookie).

---

## 8. Pubblicare il sito online

Ci sono due strade. **Per chi non ha già un proprio hosting/server, la Opzione A è la più semplice e va benissimo per questo sito.**

### Opzione A — Netlify (consigliata, gratuita, nessuna manutenzione)

Netlify ospita il sito, rinnova da solo il certificato di sicurezza (HTTPS) e non richiede di gestire alcun server.

1. Creare un account gratuito su [netlify.com](https://netlify.com) (si può usare l'account GitHub per accedere)
2. Sul computer, dentro la cartella `frontend`, generare la versione pubblicabile del sito:

```
npm run build
```

Questo crea una cartella `frontend/dist` con tutti i file pronti.

3. Su Netlify, nella dashboard, trascinare (drag & drop) la cartella `dist` nella zona indicata ("Deploy manually" / "drag and drop your site output folder")
4. Dopo pochi secondi il sito è online, con un indirizzo tipo `nome-a-caso.netlify.app`

**Per aggiornamenti futuri più comodi** (senza dover ritrascinare la cartella ogni volta), conviene collegare Netlify direttamente al repository GitHub del progetto: Netlify ricostruirà e ripubblicherà il sito da solo a ogni modifica. In tal caso, in fase di configurazione su Netlify impostare:

- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/dist`
- Nelle impostazioni "Environment variables" di Netlify, aggiungere le stesse variabili spiegate ai punti 6 e 7 (`VITE_WEB3FORMS_ACCESS_KEY`, ecc.)

### Opzione B — Server/VPS proprio con Docker (solo se già si dispone di un server)

Il progetto include già tutto il necessario per chi ha un proprio server e sa (o ha chi sa) usare Docker:

- `frontend/Dockerfile` — costruisce il sito e lo serve con **nginx**
- `frontend/nginx.conf` — configurazione del webserver

Su un server con Docker installato, dentro la cartella `frontend`:

```
docker build -t villa-la-valle \
  --build-arg VITE_WEB3FORMS_ACCESS_KEY=la-tua-chiave \
  .
docker run -d -p 80:80 villa-la-valle
```

Questa opzione richiede competenze tecniche (gestione del server, del dominio, del certificato HTTPS): se non si ha già qualcuno che se ne occupa, l'Opzione A resta la scelta più semplice e sicura.

---

## 9. Collegare il proprio dominio

Se si ha già un dominio (es. `villalavalle.com`) acquistato presso un registrar (Aruba, Register.it, GoDaddy, ecc.):

1. Su Netlify: Site settings → Domain management → Add a domain → inserire il proprio dominio
2. Netlify mostrerà uno o più record DNS da impostare (di solito un record `A` o `CNAME`)
3. Accedere al pannello del proprio registrar (dove è stato comprato il dominio) e inserire quei record nella sezione "Gestione DNS"
4. La propagazione può richiedere da qualche minuto a 24-48 ore
5. Una volta propagato, Netlify attiva automaticamente l'HTTPS (lucchetto verde) gratuitamente

Se non si possiede ancora un dominio, si può acquistarne uno da un qualsiasi registrar (costo indicativo 10-15€/anno) oppure usare temporaneamente l'indirizzo `.netlify.app` fornito gratis.

---

## 10. Aggiornare il sito in futuro

- **Se pubblicato con drag & drop (Opzione A, senza GitHub):** rifare le modifiche ai file, lanciare di nuovo `npm run build`, e ritrascinare la nuova cartella `dist` su Netlify.
- **Se collegato a GitHub:** basta caricare le modifiche sul repository (anche tramite l'interfaccia web di GitHub, senza riga di comando) — Netlify ripubblica da solo in 1-2 minuti.
- **Se pubblicato con Docker (Opzione B):** rifare la build dell'immagine Docker e riavviare il container.

---

## 11. Domande frequenti

**Ho modificato `villa.config.js` ma il sito online non cambia.**
Le modifiche ai file vanno "pubblicate" di nuovo (punto 10) — modificare il file da solo cambia solo la copia sul computer, non il sito online.

**Il modulo di contatto non invia email.**
Controllare che `VITE_WEB3FORMS_ACCESS_KEY` sia impostata correttamente (punto 6) e che sia stata inserita anche nelle variabili d'ambiente della piattaforma di hosting scelta, non solo nel file `.env` locale.

**Una foto non si vede sul sito.**
Verificare che il nome del file corrisponda esattamente (maiuscole/minuscole comprese) a quanto scritto in `villa.config.js` o nelle cartelle indicate nei README di `public/images` e `public/videos`.

**Serve una modifica più complessa (nuova sezione, nuova funzionalità).**
Questo README copre la gestione ordinaria dei contenuti e la pubblicazione. Per modifiche strutturali al sito serve intervento di sviluppo: rivolgersi a uno sviluppatore o a un'agenzia web con questo stesso codice sorgente.
