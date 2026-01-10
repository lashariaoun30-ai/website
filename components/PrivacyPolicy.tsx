import React from 'react';
import { Badge } from "./ui/badge";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-10 text-center md:text-left">
          <Badge variant="brand" className="mb-4">Legale</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg">
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
          </p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Titolare del Trattamento dei Dati</h2>
            <p className="mb-2">
              <strong>Savante AI</strong><br />
              Via Guglielmo Marconi 129<br />
              60125 Ancona (AN), Italia
            </p>
            <p>
              <strong>Indirizzo email del Titolare:</strong> [lashariaoun30@gmail.com]
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Tipologie di Dati raccolti</h2>
            <p>
              Fra i Dati Personali raccolti da questa Applicazione, in modo autonomo o tramite terze parti, ci sono:
              Dati di contatto (Nome, Cognome, Email, Numero di Telefono), Dati di utilizzo, Cookie, e indirizzo IP.
            </p>
            <p className="mt-2">
              Dettagli completi su ciascuna tipologia di dati raccolti sono forniti nelle sezioni dedicate di questa privacy policy o mediante specifici testi informativi visualizzati prima della raccolta dei dati stessi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Modalità e luogo del trattamento dei Dati raccolti</h2>
            <h3 className="text-xl font-medium text-foreground mt-4 mb-2">Modalità di trattamento</h3>
            <p>
              Il Titolare adotta le opportune misure di sicurezza volte ad impedire l’accesso, la divulgazione, la modifica o la distruzione non autorizzate dei Dati Personali.
              Il trattamento viene effettuato mediante strumenti informatici e/o telematici, con modalità organizzative e con logiche strettamente correlate alle finalità indicate.
            </p>
            
            <h3 className="text-xl font-medium text-foreground mt-4 mb-2">Luogo</h3>
            <p>
              I Dati sono trattati presso le sedi operative del Titolare ed in ogni altro luogo in cui le parti coinvolte nel trattamento siano localizzate. Per ulteriori informazioni, contatta il Titolare.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Finalità del Trattamento dei Dati raccolti</h2>
            <p>
              I Dati dell’Utente sono raccolti per consentire al Titolare di fornire il Servizio, adempiere agli obblighi di legge, rispondere a richieste o azioni esecutive, tutelare i propri diritti ed interessi (o quelli di Utenti o di terze parti), individuare eventuali attività dolose o fraudolente, nonché per le seguenti finalità:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Contattare l'Utente (risposta a richieste di informazioni o demo).</li>
              <li>Gestione dei contatti e invio di messaggi.</li>
              <li>Statistica e analisi del traffico.</li>
              <li>Remarketing e behavioral targeting (previo consenso).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Diritti dell’Utente</h2>
            <p>
              Gli Utenti possono esercitare determinati diritti con riferimento ai Dati trattati dal Titolare.
              In particolare, l’Utente ha il diritto di:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Revocare il consenso</strong> in ogni momento.</li>
              <li><strong>Opporsi al trattamento</strong> dei propri Dati.</li>
              <li><strong>Accedere ai propri Dati</strong>.</li>
              <li><strong>Verificare e chiedere la rettificazione</strong>.</li>
              <li><strong>Ottenere la limitazione del trattamento</strong>.</li>
              <li><strong>Ottenere la cancellazione o rimozione</strong> dei propri Dati Personali (Diritto all'oblio).</li>
              <li><strong>Ricevere i propri Dati o farli trasferire</strong> ad altro titolare (Portabilità).</li>
              <li><strong>Proporre reclamo</strong> all’autorità di controllo della protezione dei dati personali competente o agire in sede giudiziaria.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Riferimenti legali</h2>
            <p>
              La presente informativa privacy è redatta sulla base di molteplici ordinamenti legislativi, inclusi gli artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
