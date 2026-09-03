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