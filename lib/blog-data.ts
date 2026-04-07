export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  author: string;
  published: string;
  image: string;
  tags: string[];
  content: string; // HTML content
}

export const blogPosts: BlogPost[] = [
  {
    slug: "chiamate-perse-studio-dentistico",
    title: "Chiamate perse: quante ne perde il tuo studio ogni giorno?",
    metaTitle: "Chiamate Perse Studio Dentistico: Quante Ne Perdi? | Calcolatore Gratuito",
    metaDescription: "Il 20-35% delle chiamate negli studi dentistici non riceve risposta. Scopri quante ne perde il tuo studio e quanto fatturato ti costa con il nostro calcolatore gratuito.",
    summary: "1 chiamata su 3 non riceve risposta. Il problema non è la segreteria — è strutturale. Ecco i numeri reali e quanto ti costa ogni mese.",
    author: "Aoun Muhammad",
    published: "31 Mar 2026",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800",
    tags: ["Chiamate Perse", "Efficienza"],
    content: `
<p>C'è un dato che la maggior parte dei titolari di studio non conosce — o preferisce ignorare.</p>

<p><strong>Tra il 20% e il 35% delle chiamate che arrivano al tuo studio non riceve risposta.</strong></p>

<p>Non è un'ipotesi. È un dato documentato da diverse ricerche di settore (<a href="https://www.getreach.co/blog/32-of-dental-calls-go-unanswered-how-to-fix-it" target="_blank" rel="noopener noreferrer">Reach</a>, <a href="https://www.resonateapp.com/resources/missed-calls-dental-practices-statistics" target="_blank" rel="noopener noreferrer">Resonate</a>, <a href="https://www.peerlogic.com/post/turning-missed-dental-phone-calls-into-profit" target="_blank" rel="noopener noreferrer">Peerlogic</a>).</p>

<p>E la parte peggiore? <strong>Il 75% di chi non trova risposta non richiama mai.</strong> Cerca un altro studio.</p>

<h2>Il problema non è la segreteria</h2>

<p>È la reazione istintiva: "La segretaria deve rispondere meglio". Ma il problema è strutturale, non personale.</p>

<p>Pensa alla giornata tipo della tua segreteria:</p>

<ul>
<li>Gestisce il paziente allo sportello</li>
<li>Il telefono squilla</li>
<li>Deve inserire un pagamento nel gestionale</li>
<li>Arriva un messaggio WhatsApp</li>
<li>Un paziente chiede conferma dell'appuntamento</li>
</ul>

<p>Tutto questo — contemporaneamente. Per 8-9 ore al giorno.</p>

<p>Non è umanamente possibile fare tutto bene. Se la segretaria sorride al paziente davanti a lei, non può rispondere al telefono. Se risponde al telefono, trascura la persona in sala.</p>

<h2>Quando arrivano le chiamate perse?</h2>

<p>Le chiamate non si perdono a caso. C'è uno schema preciso:</p>

<ul>
<li><strong>Pausa pranzo (12:30-14:30):</strong> lo studio è chiuso o a organico ridotto, ma i pazienti chiamano durante la loro pausa</li>
<li><strong>Picchi mattutini (10:00-11:00):</strong> quando il volume di pazienti in studio è massimo</li>
<li><strong>Dopo le 19:00:</strong> lo studio è chiuso, ma il paziente ha appena finito di lavorare</li>
<li><strong>Weekend:</strong> lo studio è chiuso. Il paziente ha tempo per cercare un dentista. Chiama il primo che trova — e se non rispondi, chiama il secondo</li>
</ul>

<p>Il punto chiave: <strong>i pazienti chiamano quando LORO possono, non quando TU sei disponibile.</strong></p>

<h2>Quanto ti costa in euro?</h2>

<p>Facciamo i conti con numeri conservativi.</p>

<p>Prendiamo uno studio che riceve <strong>25 chiamate al giorno</strong>:</p>

<ul>
<li>Il 20% va perso → <strong>5 chiamate perse al giorno</strong></li>
<li>Il 30% di queste sono nuovi pazienti → <strong>1,5 nuovi pazienti persi</strong></li>
<li>Il 75% non richiama → <strong>~1,1 pazienti persi per sempre, ogni giorno</strong></li>
<li>Con un valore medio di €400 per paziente → <strong>~€440 al giorno</strong></li>
<li>Per 22 giorni lavorativi → <strong>~€9.900 al mese</strong></li>
</ul>

<p>E questo è solo il conto delle chiamate perse. Aggiungi i no-show e i preventivi mai seguiti, e il numero sale rapidamente.</p>

<p><strong><a href="/#/calcolatore">Calcola quanto perde il tuo studio →</a></strong></p>

<h2>La soluzione non è assumere un'altra persona</h2>

<p>Una seconda segretaria costa €1.300-1.500 al mese (più contributi). E comunque non copre pausa pranzo, sera e weekend.</p>

<p>Un call center esterno non conosce il tuo studio, non accede alla tua agenda, e i pazienti lo percepiscono.</p>

<p>La soluzione che funziona nel 2026 è un sistema che:</p>

<ul>
<li>Risponde a ogni chiamata in automatico, anche fuori orario</li>
<li>Qualifica il paziente (urgenza? prima visita? informazioni?)</li>
<li>Prenota direttamente in agenda</li>
<li>Lascia la segretaria libera di fare ciò che l'automazione non può fare: guardare il paziente negli occhi e farlo sentire a casa</li>
</ul>

<p>Questo è esattamente ciò che facciamo con <strong>14 studi in Italia</strong>. Il risultato medio: <strong>23 appuntamenti recuperati nel primo mese</strong> per singolo studio.</p>

<h2>Vuoi vedere i numeri del tuo studio?</h2>

<p>Abbiamo costruito un <strong><a href="/#/calcolatore">calcolatore gratuito</a></strong> che ti mostra in 30 secondi quanto fatturato perde il tuo studio da chiamate perse, no-show e preventivi abbandonati.</p>

<p>I numeri sono calcolati con parametri conservativi — la perdita reale potrebbe essere più alta.</p>

<p><strong><a href="/#/calcolatore">Prova il calcolatore →</a></strong></p>

<p>Se vuoi capire come recuperare quei soldi, <strong><a href="https://app.cal.eu/savante-ai/15min" target="_blank" rel="noopener noreferrer">prenota una call di 10 minuti</a></strong>. Nessun impegno. Ti facciamo sentire come funziona il sistema e ti mostriamo cosa cambierebbe nel tuo studio.</p>
`,
  },
  {
    slug: "assistente-ai-studi-dentistici",
    title: "AI in Odontoiatria nel 2026: la rivoluzione non è clinica, è organizzativa",
    metaTitle: "Assistente AI per Studi Dentistici: Cos'è e Come Funziona | Savant-e",
    metaDescription: "L'AI operativa per studi dentistici: come un sistema automatico gestisce chiamate, no-show e preventivi. Non un chatbot — un'infrastruttura che lavora 24/7.",
    summary: "La tecnologia clinica è nel 2026. La gestione è ferma al 2010. Ecco come la segreteria virtuale avanzata sta cambiando gli studi che la adottano.",
    author: "Aoun Muhammad",
    published: "8 Feb 2026",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    tags: ["AI Operativa", "Gestione Studio"],
    content: `
<p>Siamo nel 2026. Scanner intraorali, CBCT, stampanti 3D sono lo standard in qualsiasi studio di alto livello.</p>

<p>Eppure, c'è un paradosso che vedo ogni giorno.</p>

<p>Entri in uno studio con 200.000€ di tecnologia alla poltrona… e trovi una segreteria bloccata nel caos degli anni '90.</p>

<p>Il telefono squilla a vuoto mentre la segretaria sta gestendo un incasso. Preventivi da 10.000€ restano in un cassetto perché "non c'è stato tempo di richiamare". Il titolare chiude la giornata sfinito — non dalla clinica, ma dalla gestione.</p>

<p><strong>Se la clinica è nel 2026, la gestione è ferma al 2010.</strong></p>

<h2>Il mito della "super-segretaria" è finito</h2>

<p>Per anni abbiamo chiesto alla segreteria di essere tre cose contemporaneamente:</p>

<ul>
<li><strong>Un'accogliente padrona di casa</strong> (empatia)</li>
<li><strong>Una commerciale aggressiva</strong> (richiamare lead e preventivi)</li>
<li><strong>Un contabile preciso</strong> (fatture e agenda)</li>
</ul>

<p>È umanamente impossibile fare bene tutte e tre le cose insieme. Se la segretaria sorride al paziente davanti a lei, non può rispondere al telefono. Se risponde al telefono, trascura la persona in sala.</p>

<p>Il risultato? Sedie vuote e piani di cura persi.</p>

<h2>Il "collega invisibile": cos'è l'AI operativa</h2>

<p>Gli studi ad alte prestazioni non assumono più personale per fare data entry o richiamare i contatti. Hanno aggiunto un layer di automazione intelligente.</p>

<p>Non è un chatbot. È un membro del team che non dorme mai. Ecco come sta trasformando gli studi in tre aree.</p>

<h3>1. Triage istantaneo: addio chiamate perse</h3>

<p><strong>Prima:</strong> Una chiamata alle 13:00 o di sabato era un lead perso.</p>

<p><strong>Oggi:</strong> Il sistema risponde, comprende la richiesta (urgenza? prima visita? informazioni?), qualifica il paziente e lo inserisce direttamente in agenda.</p>

<p>Risultato: la segreteria trova un appuntamento già confermato, non un numero da rincorrere.</p>

<h3>2. Recupero dei piani di cura: il tesoro nascosto</h3>

<p>Quanti piani di cura finiscono nel limbo del "ci devo pensare"?</p>

<p>Il sistema gestisce i follow-up in modo naturale e non invasivo: ricorda le scadenze, risponde alle domande organizzative e riporta il paziente in studio per accettare il trattamento.</p>

<p>Risultato: tassi di accettazione più alti, senza che il dentista debba prendere il telefono.</p>

<h3>3. Pace in segreteria</h3>

<p>È il beneficio più sottovalutato.</p>

<p>Togliendo telefoni e data entry dalle spalle della segreteria, le permettiamo di tornare a fare ciò che l'automazione non può fare: <strong>guardare il paziente negli occhi, sorridere e farlo sentire a casa.</strong></p>

<h2>Il nuovo standard</h2>

<p>Uno studio che nel 2026 gestisce i pazienti con post-it e memoria umana sta perdendo una quantità invisibile di fatturato che nessuna campagna marketing potrà mai compensare.</p>

<p>Non si tratta di essere "moderni". Si tratta di sopravvivenza dei margini.</p>

<p><strong>Vuoi sapere quanto sta perdendo il tuo studio?</strong> <a href="/#/calcolatore">Usa il nostro calcolatore gratuito →</a></p>

<h2>Come implementarla nel tuo studio</h2>

<p>Un sistema di gestione automatica delle chiamate e prenotazioni può essere attivato sopra il tuo gestionale esistente in pochi giorni. Nessuna migrazione, nessun cambio di software.</p>

<p>Lo facciamo già con <strong>14 studi in Italia</strong>. Garanzia: <strong>15 appuntamenti in più nel primo mese o non paghi il canone.</strong></p>

<p><a href="https://app.cal.eu/savante-ai/15min" target="_blank" rel="noopener noreferrer"><strong>Prenota una consulenza gratuita di 10 minuti →</strong></a></p>
`,
  },
  {
    slug: "come-ai-dentale-evita-perdita-pazienti",
    title: "Come il sistema evita che i tuoi migliori pazienti vadano da un altro studio",
    metaTitle: "Gestione Chiamate Studio Dentistico: Come Non Perdere Pazienti | Savant-e",
    metaDescription: "I pazienti migliori spariscono perché un altro studio ha risposto prima. Ecco come un sistema automatico di gestione richieste cambia tutto.",
    summary: "Ogni giorno ci sono pazienti perfetti per il tuo studio. Scrivono, chiedono informazioni, lasciano il numero. E poi spariscono. Non perché cambiano idea — ma perché un altro studio ha risposto prima.",
    author: "Aoun Muhammad",
    published: "13 Feb 2026",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
    tags: ["Gestione Chiamate", "Retention"],
    content: `
<p>Ogni giorno ci sono pazienti perfetti per il tuo studio. Scrivono un messaggio, chiedono informazioni, lasciano il numero.</p>

<p>E poi… spariscono.</p>

<p>Non perché cambiano idea, ma perché <strong>nel frattempo un altro studio ha risposto prima.</strong></p>

<h2>Come vengono gestite oggi le richieste</h2>

<p>Nella maggior parte degli studi funziona così:</p>

<ul>
<li>Le richieste arrivano su WhatsApp, dal sito, da Instagram, da Google</li>
<li>La segreteria le vede "quando ha un attimo"</li>
<li>Se è sera o weekend, si rimanda al giorno dopo</li>
<li>Alcuni messaggi si perdono tra notifiche e urgenze</li>
</ul>

<p><strong>Risultato:</strong></p>

<ul>
<li>Il paziente più motivato resta senza risposta per ore</li>
<li>Nel frattempo cerca un altro studio e prenota altrove</li>
<li>Il titolare si accorge tardi che "le prime visite di qualità sono poche"</li>
<li>La segreteria ha sempre la sensazione di rincorrere le richieste</li>
</ul>

<p>Non è un problema di persone. È un problema di velocità, metodo e continuità.</p>

<h2>Cosa cambia con un sistema automatico</h2>

<p>Quando metti un sistema di gestione automatica al centro delle richieste, il flusso cambia completamente.</p>

<p>Appena arriva un messaggio (WhatsApp, sito, social), il sistema risponde in pochi secondi, 24/7. Usa un tono umano, in linea con lo stile del tuo studio.</p>

<p>Fa 2-3 domande mirate per capire:</p>

<ul>
<li>Che problema ha il paziente</li>
<li>Da quanto tempo</li>
<li>Se vuole solo informazioni o è pronto a iniziare</li>
</ul>

<p>Quando capisce che è un caso in target, propone direttamente fasce orarie per la prima visita. Una volta scelto giorno e orario: conferma la visita, invia il promemoria, registra tutto nel gestionale.</p>

<p><strong>Senza che nessuno in studio debba rincorrere messaggi la sera.</strong></p>

<h2>Un esempio concreto: studio focalizzato sugli impianti</h2>

<p>Stiamo usando questo sistema con uno studio che lavora molto su trattamenti ad alto valore, in particolare implantologia.</p>

<p><strong>Prima:</strong></p>
<ul>
<li>Molte richieste arrivavano la sera ("Ho perso un dente, cosa posso fare?")</li>
<li>La segreteria le vedeva il giorno dopo</li>
<li>Quando richiamava, spesso il paziente aveva già parlato con un altro studio</li>
</ul>

<p><strong>Ora:</strong></p>
<ul>
<li>Il sistema risponde subito</li>
<li>Spiega in modo semplice il percorso implantare</li>
<li>Fa poche domande chiare</li>
<li>Propone direttamente una prima visita dedicata</li>
</ul>

<p>La mattina, la segreteria trova richieste già gestite, prime visite già prenotate, dati già inseriti.</p>

<p>Il risultato non è solo "più richieste". Sono: più prime visite qualificate, meno tempo perso al telefono, più controllo sul flusso, meno caos operativo.</p>

<h2>Vuoi capire quanto sta perdendo il tuo studio?</h2>

<p>Abbiamo costruito un <strong><a href="/#/calcolatore">calcolatore gratuito</a></strong> che ti mostra esattamente quanto fatturato perdi ogni mese da chiamate senza risposta, no-show e preventivi abbandonati.</p>

<p><strong><a href="/#/calcolatore">Prova il calcolatore →</a></strong></p>

<p>Se vuoi vedere come funziona per il tuo studio specifico, <strong><a href="https://app.cal.eu/savante-ai/15min" target="_blank" rel="noopener noreferrer">prenota una call di 10 minuti</a></strong>. Nessun impegno.</p>
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
