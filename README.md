# JustOne

Just One

# Description

Le jeu suit les règles classiques : un joueur doit deviner un mot mystère en se basant sur les indices donnés par les autres joueurs. Cependant, si plusieurs joueurs donnent le même indice, ces indices sont supprimés !

# Prérequis

Avant d'exécuter le jeu, assurez-vous d'avoir installé :
Node.js

Installation
Installez les dépendances (si nécessaire) :
  npm install


# Lancement du jeu

Pour démarrer une partie, exécutez la commande suivante :

node main.js


# Règles du jeu

Le jeu se joue avec 5 joueurs.

À chaque manche, un joueur est désigné comme "joueur actif" et doit deviner un mot mystère.

Les autres joueurs choisissent un indice pour aider le joueur actif.

Les indices en double sont supprimés.

Le joueur actif tente ensuite de deviner le mot mystère.

La partie dure 5 manches.

Les résultats sont sauvegardés dans un fichier resultats_partie.json.


# Structure du projet

just_one_game.js : Code principal du jeu

resultats_partie.json : Historique des parties jouées


# Fonctionnalités

✅ Sélection aléatoire des mots mystères
✅ Vérification et suppression des indices en double
✅ Saisie interactive pour les joueurs
✅ Sauvegarde automatique des résultats


# Améliorations possibles

Ajouter une interface graphique pour une meilleure expérience utilisateur

Permettre un nombre de joueurs configurable

Ajouter un mode multi-joueurs en ligne via WebSockets