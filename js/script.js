// récupération des elements du DOM
const navLinks = document.querySelectorAll('.nav a');
const mainContent = document.getElementById('main-content');

// On sauvegarde le contenu HTML d'origine du tableau de bord,
// pour pouvoir le réafficher quand on reclique sur "Tableau de bord"
const dashboardHTML = mainContent.innerHTML;

navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // empêche le lien "#" de faire remonter la page en haut

        // Retire la classe "active" de tous les liens, puis l'ajoute seulement au lien cliqué
        navLinks.forEach(function (l) {
            l.classList.remove('active');
        });

        link.classList.add('active');

        // Récupère le nom du module à afficher (ex: "resume", "chat"...)
        const module = link.getAttribute('data-module');
        afficherModule(module);
    });
});


function afficherModule(module) {
    if (module === 'dashboard') {
        mainContent.innerHTML = dashboardHTML;
    } else if (module === 'resume') {
        afficherModuleResume();
    } else if (module === 'traduction') {
        afficherModuleTraduction();
    } else if (module === 'chat') {
        afficherModuleChat();
    }
    // autre module
}
 


function afficherModuleResume() {

    // On vide la zone principale avant d'y construire le nouveau contenu
    mainContent.innerHTML = '';

    // --- Titre du module ---
    const titre = document.createElement('h1');
    titre.textContent = 'Résumé de texte';
    mainContent.appendChild(titre);

    const sousTitre = document.createElement('p');
    sousTitre.classList.add('subtitle');
    sousTitre.textContent = 'Bienvenue sur votre espace de travail intelligent. Saisissez ou collez votre texte, puis cliquez sur Résumer.';
    mainContent.appendChild(sousTitre);

    // --- Panel contenant le formulaire ---
    const panel = document.createElement('div');
    panel.classList.add('panel', 'panel--form');
    mainContent.appendChild(panel);

    // --- Label ---
    const label = document.createElement('label');
    label.classList.add('field-label');
    label.textContent = 'Texte à résumer';
    panel.appendChild(label);

    // --- Zone de saisie (textarea) ---
    const textarea = document.createElement('textarea');
    textarea.classList.add('resume-input');
    textarea.placeholder = 'Collez ou écrivez votre texte ici...';
    textarea.rows = 8;
    panel.appendChild(textarea);

    // --- Bouton "Résumer" ---
    const bouton = document.createElement('button');
    bouton.classList.add('btn-primary');
    bouton.textContent = 'Résumer';
    panel.appendChild(bouton);

    // --- Zone d'affichage du résumé ---
    const zoneResultat = document.createElement('div');
    zoneResultat.classList.add('resume-output');
    zoneResultat.textContent = 'Le résumé apparaîtra ici.';
    panel.appendChild(zoneResultat);

    // --- Comportement du bouton au clic ---
    bouton.addEventListener('click', function () {
        const texteSaisi = textarea.value.trim();

        // Si l'utilisateur n'a rien écrit, on ne fait rien de plus qu'un message d'erreur
        if (texteSaisi === '') {
            zoneResultat.textContent = 'Veuillez saisir un texte avant de le résumer.';
            return;
        }

        // On désactive le bouton et on affiche un état de chargement pendant la simulation
        bouton.disabled = true;
        zoneResultat.textContent = 'Génération du résumé en cours...';

        // setTimeout simule le délai d'un vrai appel API (1.2 seconde ici)
        setTimeout(function () {
            const resume = genererResumeSimule(texteSaisi);
            zoneResultat.textContent = resume;
            bouton.disabled = false;
        }, 1200);
    });
}


function genererResumeSimule(texte) {
    // Simulation très simple : on prend les 100 premiers caractères du texte
    // (dans un vrai projet, ceci serait remplacé par un appel à une API IA)
    const extrait = texte.substring(0, 100);
    return 'Résumé simulé : ' + extrait + (texte.length > 100 ? '...' : '');
}


// ===========================================================
// PARTIE 4 — MODULE TRADUCTION
// ===========================================================
function afficherModuleTraduction() {

    // On vide la zone principale avant d'y construire le nouveau contenu
    mainContent.innerHTML = '';

    // --- Titre du module ---
    const titre = document.createElement('h1');
    titre.textContent = 'Traduction';
    mainContent.appendChild(titre);

    const sousTitre = document.createElement('p');
    sousTitre.classList.add('subtitle');
    sousTitre.textContent = 'Traduisez votre texte dans la langue de votre choix.';
    mainContent.appendChild(sousTitre);

    // --- Panel contenant le formulaire ---
    const panel = document.createElement('div');
    panel.classList.add('panel', 'panel--form');
    mainContent.appendChild(panel);

    // --- Label + zone de saisie ---
    const label = document.createElement('label');
    label.classList.add('field-label');
    label.textContent = 'Texte à traduire';
    panel.appendChild(label);

    const textarea = document.createElement('textarea');
    textarea.classList.add('resume-input');
    textarea.placeholder = 'Écrivez ou collez votre texte ici...';
    textarea.rows = 6;
    panel.appendChild(textarea);

    // --- Label + choix de la langue (select) ---
    const labelLangue = document.createElement('label');
    labelLangue.classList.add('field-label');
    labelLangue.textContent = 'Langue cible';
    panel.appendChild(labelLangue);

    const select = document.createElement('select');
    select.classList.add('select-langue');
    panel.appendChild(select);

    // Liste des langues disponibles : value = code technique, texte = nom affiché
    const langues = [
        { value: 'en', texte: 'Anglais' },
        { value: 'es', texte: 'Espagnol' },
        { value: 'de', texte: 'Allemand' },
        { value: 'ar', texte: 'Arabe' }
    ];

    langues.forEach(function (langue) {
        const option = document.createElement('option');
        option.value = langue.value;
        option.textContent = langue.texte;
        select.appendChild(option);
    });

    // --- Bouton "Traduire" ---
    const bouton = document.createElement('button');
    bouton.classList.add('btn-primary');
    bouton.textContent = 'Traduire';
    panel.appendChild(bouton);

    // --- Zone d'affichage de la traduction ---
    const zoneResultat = document.createElement('div');
    zoneResultat.classList.add('resume-output');
    zoneResultat.textContent = 'La traduction apparaîtra ici.';
    panel.appendChild(zoneResultat);

    // --- Comportement du bouton au clic ---
    bouton.addEventListener('click', function () {
        const texteSaisi = textarea.value.trim();
        const langueChoisie = select.value;         // ex: "en"
        const langueTexte = select.options[select.selectedIndex].textContent; // ex: "Anglais"

        if (texteSaisi === '') {
            zoneResultat.textContent = 'Veuillez saisir un texte avant de le traduire.';
            return;
        }

        bouton.disabled = true;
        zoneResultat.textContent = 'Traduction en cours...';

        setTimeout(function () {
            const traduction = genererTraductionSimulee(texteSaisi, langueTexte);
            zoneResultat.textContent = traduction;
            bouton.disabled = false;
        }, 1200);
    });
}


// ===========================================================
// FONCTION DE SIMULATION DE LA TRADUCTION
// ===========================================================
function genererTraductionSimulee(texte, langue) {
    // Simulation très simple : on ne traduit pas réellement,
    // on indique juste dans quelle langue le texte "aurait" été traduit
    return 'Traduction simulée en ' + langue + ' : ' + texte;
}


// ===========================================================
// PARTIE 5 — MODULE CHAT IA
// ===========================================================
function afficherModuleChat() {
 
    // On vide la zone principale avant d'y construire le nouveau contenu
    mainContent.innerHTML = '';
 
    // --- Titre du module ---
    const titre = document.createElement('h1');
    titre.textContent = 'Chat IA';
    mainContent.appendChild(titre);
 
    const sousTitre = document.createElement('p');
    sousTitre.classList.add('subtitle');
    sousTitre.textContent = 'Posez une question à l\'assistant virtuel.';
    mainContent.appendChild(sousTitre);
 
    // --- Panel contenant tout le chat ---
    const panel = document.createElement('div');
    panel.classList.add('panel', 'panel--form');
    mainContent.appendChild(panel);
 
    // --- Zone qui va contenir tous les messages (question + réponses) ---
    const zoneMessages = document.createElement('div');
    zoneMessages.classList.add('chat-messages');
    panel.appendChild(zoneMessages);
 
    // Message d'accueil affiché au départ, avant toute question
    const messageAccueil = document.createElement('p');
    messageAccueil.classList.add('chat-message', 'chat-message--bot');
    messageAccueil.textContent = 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?';
    zoneMessages.appendChild(messageAccueil);
 
    // --- Zone de saisie + bouton d'envoi, groupés dans une même ligne ---
    const zoneSaisie = document.createElement('div');
    zoneSaisie.classList.add('chat-input-row');
    panel.appendChild(zoneSaisie);
 
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('chat-input');
    input.placeholder = 'Écrivez votre message...';
    zoneSaisie.appendChild(input);
 
    const boutonEnvoyer = document.createElement('button');
    boutonEnvoyer.classList.add('btn-primary');
    boutonEnvoyer.textContent = 'Envoyer';
    zoneSaisie.appendChild(boutonEnvoyer);
 
    // --- Fonction qui gère l'envoi d'un message ---
    function envoyerMessage() {
        const texteSaisi = input.value.trim();
 
        if (texteSaisi === '') {
            return; // on n'envoie rien si le champ est vide, pas besoin de message d'erreur ici
        }
 
        // 1. On affiche le message de l'utilisateur dans la conversation
        const messageUtilisateur = document.createElement('p');
        messageUtilisateur.classList.add('chat-message', 'chat-message--user');
        messageUtilisateur.textContent = texteSaisi;
        zoneMessages.appendChild(messageUtilisateur);
 
        // On vide le champ de saisie tout de suite, et on désactive le temps de la réponse
        input.value = '';
        input.disabled = true;
        boutonEnvoyer.disabled = true;
 
        // 2. On affiche un indicateur "en train d'écrire..."
        const indicateur = document.createElement('p');
        indicateur.classList.add('chat-message', 'chat-message--bot');
        indicateur.textContent = 'L\'assistant écrit...';
        zoneMessages.appendChild(indicateur);
 
        // 3. Après un délai simulé, on remplace l'indicateur par la vraie réponse
        setTimeout(function () {
            indicateur.textContent = genererReponseSimulee(texteSaisi);
            input.disabled = false;
            boutonEnvoyer.disabled = false;
            input.focus(); // remet le curseur dans le champ, prêt pour la prochaine question
        }, 1200);
    }
 
    // --- Déclenchement au clic sur le bouton ---
    boutonEnvoyer.addEventListener('click', envoyerMessage);
 
    // --- Déclenchement avec la touche Entrée ---
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            envoyerMessage();
        }
    });
}
 
 
// ===========================================================
// FONCTION DE SIMULATION DE LA RÉPONSE DU CHAT
// ===========================================================
function genererReponseSimulee(question) {
    // Quelques réponses toutes faites, choisies au hasard
    const reponses = [
        'C\'est une excellente question, laissez-moi y réfléchir.',
        'Je comprends votre demande, voici ce que je peux vous dire.',
        'Merci pour votre message, je traite votre requête.',
        'Voici une réponse simulée à votre question sur : "' + question + '".'
    ];
 
    const indexAleatoire = Math.floor(Math.random() * reponses.length);
    return reponses[indexAleatoire];
}
 