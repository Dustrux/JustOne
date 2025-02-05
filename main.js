// just_one_game.js

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const joueurs = ['Joueur 1', 'Joueur 2', 'Joueur 3', 'Joueur 4', 'Joueur 5'];
let mancheActuelle = 1;
const donneesPartie = [];

let motsMysteres = [
    'Rhino','TC','Cable','Les Humas', 'La KFet', 'BDE', 'Partiels', 'Amphitéathre', 'BMC', 'EPS', 'Alumni'
];

let motsUtilises = [];
let score = 0;

function poserQuestion(question) {
    return new Promise(resolve => rl.question(question, reponse => resolve(reponse))); //MMMM
}

function choisirMotsAleatoires(motsDisponibles, nombre) {
    const motsChoisis = [];
    while (motsChoisis.length < nombre && motsDisponibles.length > 0) {
        const indexAleatoire = Math.floor(Math.random() * motsDisponibles.length);
        motsChoisis.push(motsDisponibles.splice(indexAleatoire, 1)[0]); //NNNNN
    }
    return motsChoisis;
}

async function jouerManche(indexJoueurActif) {     //async???
    console.log(`\n--- Manche ${mancheActuelle} ---`);

    const joueurActif = joueurs[indexJoueurActif];
    console.log(`${joueurActif} est le joueur actif.`); //NN

    // Filtrer les mots déjà utilisés
    const motsDisponibles = motsMysteres.filter(mot => !motsUtilises.includes(mot));
    const motsProposes = choisirMotsAleatoires([...motsDisponibles], 5);

    console.log("Voici les mots possibles :");
    motsProposes.forEach((mot, index) => {
        console.log(`${index + 1}. ${mot}`);
    });

    let numeroMot;
    while (true) {
        numeroMot = await poserQuestion(`${joueurActif}, choisissez un numéro (1-${motsProposes.length}) pour sélectionner le mot mystère : `);
        if (numeroMot >= 1 && numeroMot <= motsProposes.length) {
            break;
        } else {
            console.log(`Numéro invalide. Veuillez choisir un numéro entre 1 et ${motsProposes.length}.`);
        }
    }

    const motMystere = motsProposes[parseInt(numeroMot) - 1];
    motsUtilises.push(motMystere);

    console.log(`Le mot mystère est sélectionné.`);
    console.log(`Les autres joueurs vont écrire leurs indices pour le mot : ${motMystere}`);

    const indices = [];
    for (let i = 0; i < joueurs.length; i++) {
        if (i !== indexJoueurActif) {
            const indice = await poserQuestion(`${joueurs[i]}, entrez votre indice : `);
            indices.push({ joueur: joueurs[i], indice: indice.toLowerCase() });
        }
    }

    // Suppression des indices en double
    const indicesValides = indices.filter((item, index, self) => {
        const premiereOccurrence = self.findIndex(i => i.indice === item.indice);
        const nombreOccurrences = self.filter(i => i.indice === item.indice).length;
        
        return premiereOccurrence === index && nombreOccurrences === 1;
    });
    

    console.log("\nIndices valides :");
    if (indicesValides.length === 0) {
        console.log("Aucun indice valide.");
    } else {
        indicesValides.forEach(i => console.log(`- ${i.indice}`));
    }

    const proposition = await poserQuestion(`${joueurActif}, quelle est votre proposition ? `);

    const resultatManche = {
        manche: mancheActuelle,
        joueurActif,
        motMystere,
        indices,
        proposition,
        succes: proposition.toLowerCase() === motMystere.toLowerCase()
    };

    donneesPartie.push(resultatManche);

    if (resultatManche.succes) {
        console.log("Correct !");
        score++;
    } else {
        console.log(`Incorrect. Le mot était : ${motMystere}`);
    }

    mancheActuelle++;
}

async function demarrerPartie() {
    console.log("Bienvenue dans Just One\n");

    for (let i = 0; i < 5; i++) {  // Jouer 5 manches
        await jouerManche(i % joueurs.length);
    }

    fs.writeFileSync('resultats_partie.json', JSON.stringify(donneesPartie, null, 2));
    console.log(`\nPartie terminée ! Vous avez deviné ${score}/5 mots.`);
    console.log("Résultats enregistrés dans 'resultats_partie.json'.");

    rl.close();
}

demarrerPartie();
