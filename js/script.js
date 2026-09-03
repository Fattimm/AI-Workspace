// Récupération des éléments du DOM
const navLinks = document.querySelectorAll('.nav a');
const mainContent = document.getElementById('main-content');

// Sauvegarde du tableau de bord original
const dashboardHTML = mainContent.innerHTML;


// ===========================================================
// NAVIGATION
// ===========================================================

navLinks.forEach(function (link) {

    link.addEventListener('click', function (event) {

        event.preventDefault();

        // Retire active de tous les liens
        navLinks.forEach(function (l) {
            l.classList.remove('active');
        });

        // Active le lien cliqué
        link.classList.add('active');

        // Récupère le module demandé
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

    } else if (module === 'prediction') {

        afficherModulePrediction();

    } else if (module === 'historique') {

        afficherModuleHistorique();
    }
}


// ===========================================================
// PARTIE 3 — RÉSUMÉ DE TEXTE
// ===========================================================

function afficherModuleResume() {

    mainContent.innerHTML = '';

    const titre = document.createElement('h1');
    titre.textContent = 'Résumé de texte';
    mainContent.appendChild(titre);

    const sousTitre = document.createElement('p');
    sousTitre.classList.add('subtitle');
    sousTitre.textContent =
        'Bienvenue sur votre espace de travail intelligent. Saisissez ou collez votre texte, puis cliquez sur Résumer.';
    mainContent.appendChild(sousTitre);

    const panel = document.createElement('div');
    panel.classList.add('panel', 'panel--form');
    mainContent.appendChild(panel);

    const label = document.createElement('label');
    label.classList.add('field-label');
    label.textContent = 'Texte à résumer';
    panel.appendChild(label);

    const textarea = document.createElement('textarea');
    textarea.classList.add('resume-input');
    textarea.placeholder = 'Collez ou écrivez votre texte ici...';
    textarea.rows = 8;
    panel.appendChild(textarea);

    const bouton = document.createElement('button');
    bouton.classList.add('btn-primary');
    bouton.textContent = 'Résumer';
    panel.appendChild(bouton);

    const zoneResultat = document.createElement('div');
    zoneResultat.classList.add('resume-output');
    zoneResultat.textContent = 'Le résumé apparaîtra ici.';
    panel.appendChild(zoneResultat);

    bouton.addEventListener('click', function () {

        const texteSaisi = textarea.value.trim();

        if (texteSaisi === '') {

            zoneResultat.textContent =
                'Veuillez saisir un texte avant de le résumer.';

            return;
        }

        bouton.disabled = true;

        zoneResultat.textContent =
            'Génération du résumé en cours...';

        setTimeout(function () {

            // Appel de notre fausse API
            const resultat = apiResume({
                texte: texteSaisi
            });

            zoneResultat.textContent =
                resultat.resume;

            enregistrerHistorique(
                'Résumé de texte',
                resultat.resume
            );

            bouton.disabled = false;

        }, 1200);
    });
}


// ===========================================================
// FAUSSE API — RÉSUMÉ
// ===========================================================

function apiResume(donnees) {

    const extrait = donnees.texte.substring(0, 100);

    return {
        success: true,
        service: 'resume-simule',
        resume:
            'Résumé simulé : ' +
            extrait +
            (donnees.texte.length > 100 ? '...' : ''),
        timestamp: new Date().toISOString()
    };
}


// ===========================================================
// PARTIE 4 — TRADUCTION
// ===========================================================

function afficherModuleTraduction() {

    mainContent.innerHTML = '';

    const titre = document.createElement('h1');
    titre.textContent = 'Traduction';
    mainContent.appendChild(titre);

    const sousTitre = document.createElement('p');
    sousTitre.classList.add('subtitle');
    sousTitre.textContent =
        'Traduisez votre texte dans la langue de votre choix.';
    mainContent.appendChild(sousTitre);

    const panel = document.createElement('div');
    panel.classList.add('panel', 'panel--form');
    mainContent.appendChild(panel);

    const label = document.createElement('label');
    label.classList.add('field-label');
    label.textContent = 'Texte à traduire';
    panel.appendChild(label);

    const textarea = document.createElement('textarea');
    textarea.classList.add('resume-input');
    textarea.placeholder =
        'Écrivez ou collez votre texte ici...';
    textarea.rows = 6;
    panel.appendChild(textarea);

    const labelLangue = document.createElement('label');
    labelLangue.classList.add('field-label');
    labelLangue.textContent = 'Langue cible';
    panel.appendChild(labelLangue);

    const select = document.createElement('select');
    select.classList.add('select-langue');
    panel.appendChild(select);

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

    const bouton = document.createElement('button');
    bouton.classList.add('btn-primary');
    bouton.textContent = 'Traduire';
    panel.appendChild(bouton);

    const zoneResultat = document.createElement('div');
    zoneResultat.classList.add('resume-output');
    zoneResultat.textContent =
        'La traduction apparaîtra ici.';
    panel.appendChild(zoneResultat);

    bouton.addEventListener('click', function () {

        const texteSaisi = textarea.value.trim();

        const langueChoisie = select.value;

        const langueTexte =
            select.options[select.selectedIndex].textContent;

        if (texteSaisi === '') {

            zoneResultat.textContent =
                'Veuillez saisir un texte avant de le traduire.';

            return;
        }

        bouton.disabled = true;

        zoneResultat.textContent =
            'Traduction en cours...';

        setTimeout(function () {

            const resultat = apiTraduction({
                texte: texteSaisi,
                langue: langueChoisie
            });

            zoneResultat.textContent =
                resultat.traduction;

            enregistrerHistorique(
                'Traduction',
                resultat.traduction
            );

            bouton.disabled = false;

        }, 1200);
    });
}


// ===========================================================
// FAUSSE API — TRADUCTION
// ===========================================================

function apiTraduction(donnees) {

    const nomsLangues = {
        en: 'anglais',
        es: 'espagnol',
        de: 'allemand',
        ar: 'arabe'
    };

    const langue =
        nomsLangues[donnees.langue] || donnees.langue;

    return {
        success: true,
        service: 'traduction-simulee',
        traduction:
            'Traduction simulée en ' +
            langue +
            ' : ' +
            donnees.texte,
        timestamp: new Date().toISOString()
    };
}


// ===========================================================
// PARTIE 5 — CHAT IA
// ===========================================================

function afficherModuleChat() {

    mainContent.innerHTML = '';

    const titre = document.createElement('h1');
    titre.textContent = 'Chat IA';
    mainContent.appendChild(titre);

    const sousTitre = document.createElement('p');
    sousTitre.classList.add('subtitle');
    sousTitre.textContent =
        'Posez une question à l\'assistant virtuel.';
    mainContent.appendChild(sousTitre);

    const panel = document.createElement('div');
    panel.classList.add('panel', 'panel--form');
    mainContent.appendChild(panel);

    const zoneMessages = document.createElement('div');
    zoneMessages.classList.add('chat-messages');
    panel.appendChild(zoneMessages);

    const messageAccueil = document.createElement('p');

    messageAccueil.classList.add(
        'chat-message',
        'chat-message--bot'
    );

    messageAccueil.textContent =
        'Bonjour ! Comment puis-je vous aider aujourd\'hui ?';

    zoneMessages.appendChild(messageAccueil);

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


    function ajouterMessage(texte, type) {

        const message = document.createElement('p');

        message.classList.add(
            'chat-message',
            type
        );

        message.textContent = texte;

        zoneMessages.appendChild(message);

        zoneMessages.scrollTop =
            zoneMessages.scrollHeight;
    }


    function envoyerMessage() {

        const texteSaisi = input.value.trim();

        if (texteSaisi === '') {
            return;
        }

        ajouterMessage(
            texteSaisi,
            'chat-message--user'
        );

        input.value = '';

        input.disabled = true;
        boutonEnvoyer.disabled = true;

        const indicateur = document.createElement('p');

        indicateur.classList.add(
            'chat-message',
            'chat-message--bot'
        );

        indicateur.textContent =
            'L\'assistant écrit...';

        zoneMessages.appendChild(indicateur);

        setTimeout(function () {

            const resultat = apiChat({
                message: texteSaisi
            });

            indicateur.textContent =
                resultat.message;

            enregistrerHistorique(
                'Chat',
                resultat.message
            );

            input.disabled = false;
            boutonEnvoyer.disabled = false;

            input.focus();

        }, 1200);
    }


    boutonEnvoyer.addEventListener(
        'click',
        envoyerMessage
    );


    input.addEventListener(
        'keydown',
        function (event) {

            if (event.key === 'Enter') {
                envoyerMessage();
            }
        }
    );
}


// ===========================================================
// FAUSSE API — CHAT
// ===========================================================

function apiChat(donnees) {

    const reponses = [

        'C\'est une excellente question, laissez-moi y réfléchir.',

        'Je comprends votre demande, voici ce que je peux vous dire.',

        'Merci pour votre message, je traite votre requête.',

        'Voici une réponse simulée à votre question : "' +
        donnees.message +
        '".'
    ];

    const indexAleatoire =
        Math.floor(
            Math.random() * reponses.length
        );

    return {
        success: true,
        service: 'chat-simule',
        message: reponses[indexAleatoire],
        timestamp: new Date().toISOString()
    };
}


// ===========================================================
// PARTIE 6 — PRÉDICTION
// ===========================================================

function afficherModulePrediction() {

    mainContent.innerHTML = '';

    const titre = document.createElement('h1');
    titre.textContent = 'Prédiction';
    mainContent.appendChild(titre);

    const sousTitre = document.createElement('p');
    sousTitre.classList.add('subtitle');
    sousTitre.textContent =
        'Entrez les informations nécessaires pour effectuer une prédiction.';
    mainContent.appendChild(sousTitre);

    const panel = document.createElement('div');
    panel.classList.add('panel', 'panel--form');
    mainContent.appendChild(panel);


    // AGE
    const labelAge = document.createElement('label');
    labelAge.classList.add('field-label');
    labelAge.textContent = 'Âge';
    panel.appendChild(labelAge);

    const inputAge = document.createElement('input');
    inputAge.type = 'number';
    inputAge.classList.add('resume-input');
    inputAge.placeholder = 'Ex : 25';
    panel.appendChild(inputAge);


    // REVENU
    const labelRevenu = document.createElement('label');
    labelRevenu.classList.add('field-label');
    labelRevenu.textContent = 'Revenu';
    panel.appendChild(labelRevenu);

    const inputRevenu = document.createElement('input');
    inputRevenu.type = 'number';
    inputRevenu.classList.add('resume-input');
    inputRevenu.placeholder = 'Ex : 300000';
    panel.appendChild(inputRevenu);


    // VILLE
    const labelVille = document.createElement('label');
    labelVille.classList.add('field-label');
    labelVille.textContent = 'Ville';
    panel.appendChild(labelVille);

    const inputVille = document.createElement('input');
    inputVille.type = 'text';
    inputVille.classList.add('resume-input');
    inputVille.placeholder = 'Ex : Dakar';
    panel.appendChild(inputVille);


    // BOUTON
    const bouton = document.createElement('button');
    bouton.classList.add('btn-primary');
    bouton.textContent = 'Prédire';
    panel.appendChild(bouton);


    // RESULTAT
    const zoneResultat = document.createElement('div');
    zoneResultat.classList.add('resume-output');
    zoneResultat.textContent =
        'Le résultat de la prédiction apparaîtra ici.';
    panel.appendChild(zoneResultat);


    bouton.addEventListener('click', function () {

        const age = Number(inputAge.value);
        const revenu = Number(inputRevenu.value);
        const ville = inputVille.value.trim();


        // VALIDATION
        if (
            !age ||
            !revenu ||
            ville === ''
        ) {

            zoneResultat.textContent =
                'Veuillez remplir tous les champs.';

            return;
        }


        bouton.disabled = true;

        zoneResultat.textContent =
            'Prédiction en cours...';


        setTimeout(function () {

            // Appel de la fausse API
            const resultat = apiPrediction({

                age: age,

                revenu: revenu,

                ville: ville

            });


            // Affichage de la réponse
            zoneResultat.innerHTML =

                '<strong>Prédiction :</strong> ' +
                resultat.prediction +

                '<br><br>' +

                '<strong>Confiance :</strong> ' +
                resultat.confiance +
                '%';


            enregistrerHistorique(
                'Prédiction',
                resultat.prediction
            );

            bouton.disabled = false;

        }, 1200);
    });
}


// ===========================================================
// FAUSSE API — PRÉDICTION
// ===========================================================

function apiPrediction(donnees) {

    /*
     * Cette fonction représente une FAUSSE API.
     *
     * Elle reçoit les données envoyées par le frontend :
     * - age
     * - revenu
     * - ville
     *
     * Elle applique une logique fictive.
     *
     * IMPORTANT :
     * ce n'est PAS un véritable modèle de Machine Learning.
     */

    let prediction;
    let confiance;


    if (
        donnees.age < 25 &&
        donnees.revenu < 200000
    ) {

        prediction = 'Catégorie A';
        confiance = 72;

    } else if (
        donnees.revenu >= 500000
    ) {

        prediction = 'Catégorie C';
        confiance = 87;

    } else {

        prediction = 'Catégorie B';
        confiance = 78;
    }


    return {

        success: true,

        prediction: prediction,

        confiance: confiance,

        service: 'prediction-simulee',

        donnees: {

            age: donnees.age,

            revenu: donnees.revenu,

            ville: donnees.ville
        },

        timestamp: new Date().toISOString()
    };
}


// ===========================================================
// FAUSSE API — HISTORIQUE
// ===========================================================

function enregistrerHistorique(service, resultat) {

    const historique =
        JSON.parse(
            localStorage.getItem('aiWorkspaceHistorique')
        ) || [];

    historique.push({

        service: service,

        resultat: resultat,

        date: new Date().toLocaleString('fr-FR')
    });

    localStorage.setItem(
        'aiWorkspaceHistorique',
        JSON.stringify(historique)
    );
}

function afficherModuleHistorique() {

    mainContent.innerHTML = '';

    // =======================================================
    // TITRE
    // =======================================================

    const titre = document.createElement('h1');
    titre.textContent = 'Historique';
    mainContent.appendChild(titre);

    const sousTitre = document.createElement('p');
    sousTitre.classList.add('subtitle');
    sousTitre.textContent =
        'Consultez, recherchez ou supprimez vos opérations précédentes.';
    mainContent.appendChild(sousTitre);


    // =======================================================
    // PANEL
    // =======================================================

    const panel = document.createElement('div');
    panel.classList.add('panel');
    mainContent.appendChild(panel);


    // =======================================================
    // BARRE DE RECHERCHE
    // =======================================================

    const recherche = document.createElement('input');

    recherche.type = 'text';
    recherche.classList.add('resume-input');
    recherche.placeholder =
        'Rechercher dans l\'historique...';

    panel.appendChild(recherche);


    // =======================================================
    // BOUTON VIDER
    // =======================================================

    const boutonVider = document.createElement('button');

    boutonVider.classList.add('btn-primary');
    boutonVider.textContent = 'Vider l\'historique';

    panel.appendChild(boutonVider);


    // =======================================================
    // ZONE HISTORIQUE
    // =======================================================

    const zoneHistorique = document.createElement('div');

    panel.appendChild(zoneHistorique);


    // =======================================================
    // FONCTION AFFICHER HISTORIQUE
    // =======================================================

    function afficherListeHistorique() {

        zoneHistorique.innerHTML = '';

        const historique =
            JSON.parse(
                localStorage.getItem('aiWorkspaceHistorique')
            ) || [];


        // Aucun élément
        if (historique.length === 0) {

            const message = document.createElement('p');

            message.textContent =
                'Aucun historique disponible.';

            zoneHistorique.appendChild(message);

            return;
        }


        // Texte recherché
        const texteRecherche =
            recherche.value.toLowerCase().trim();


        // Filtrage
        const resultats =
            historique.filter(function (element) {

                return (
                    element.service
                        .toLowerCase()
                        .includes(texteRecherche)

                    ||

                    element.resultat
                        .toLowerCase()
                        .includes(texteRecherche)

                    ||

                    element.date
                        .toLowerCase()
                        .includes(texteRecherche)
                );
            });


        // Aucun résultat après recherche
        if (resultats.length === 0) {

            const message = document.createElement('p');

            message.textContent =
                'Aucun résultat trouvé.';

            zoneHistorique.appendChild(message);

            return;
        }


        // Affichage du plus récent au plus ancien
        resultats.reverse().forEach(function (element, index) {

            const bloc = document.createElement('div');

            bloc.style.marginBottom = '16px';
            bloc.style.paddingBottom = '16px';
            bloc.style.borderBottom =
                '1px solid var(--color-border)';


            // SERVICE
            const service = document.createElement('strong');

            service.textContent =
                element.service;

            bloc.appendChild(service);


            // RESULTAT
            const resultat = document.createElement('p');

            resultat.textContent =
                element.resultat;

            bloc.appendChild(resultat);


            // DATE
            const date = document.createElement('small');

            date.textContent =
                element.date;

            date.style.color =
                'var(--color-text-muted)';

            bloc.appendChild(date);


            // BOUTON SUPPRIMER
            const boutonSupprimer =
                document.createElement('button');

            boutonSupprimer.classList.add(
                'btn-primary'
            );

            boutonSupprimer.textContent =
                'Supprimer';

            boutonSupprimer.style.marginLeft =
                '10px';

            boutonSupprimer.addEventListener(
                'click',
                function () {

                    supprimerHistorique(element);

                }
            );

            bloc.appendChild(boutonSupprimer);


            zoneHistorique.appendChild(bloc);
        });
    }


    // =======================================================
    // RECHERCHE
    // =======================================================

    recherche.addEventListener(
        'input',
        afficherListeHistorique
    );


    // =======================================================
    // VIDER TOUT L'HISTORIQUE
    // =======================================================

    boutonVider.addEventListener(
        'click',
        function () {

            const confirmation =
                confirm(
                    'Voulez-vous vraiment vider tout l\'historique ?'
                );

            if (confirmation) {

                localStorage.removeItem(
                    'aiWorkspaceHistorique'
                );

                afficherListeHistorique();
            }
        }
    );


    // Affichage initial
    afficherListeHistorique();
}

function supprimerHistorique(elementASupprimer) {

    const historique =
        JSON.parse(
            localStorage.getItem('aiWorkspaceHistorique')
        ) || [];


    const nouvelHistorique =
        historique.filter(function (element) {

            return !(
                element.service === elementASupprimer.service &&
                element.resultat === elementASupprimer.resultat &&
                element.date === elementASupprimer.date
            );

        });


    localStorage.setItem(
        'aiWorkspaceHistorique',
        JSON.stringify(nouvelHistorique)
    );


    // Recharge l'affichage
    afficherModuleHistorique();
}