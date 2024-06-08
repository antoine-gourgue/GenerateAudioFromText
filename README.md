
# Generateur Audio From Text

Ce projet utilise l'API ElevenLabs pour convertir du texte en audio, puis enregistrer les fichiers audio sur le disque local. Cela peut être utile pour automatiser la création de contenus audio pour des plateformes comme TikTok.

## Fonctionnalités

- **Conversion de Texte en Audio** : Convertit le texte issu d'un fichier JSON en fichier audio en utilisant une voix spécifique via l'API ElevenLabs.
- **Sauvegarde Automatique** : Enregistre automatiquement les fichiers audio générés avec un index incrémental pour éviter les écrasements.

## Prérequis

- Node.js
- npm (Node Package Manager)
- Compte et clé API ElevenLabs (nécessaire pour l'accès à l'API de synthèse vocale)

## Installation

1. Clonez ce dépôt sur votre machine locale en utilisant :
   ```
   git clone <URL_DU_DEPOT>
   ```
2. Installez les dépendances nécessaires en exécutant :
   ```
   npm install
   ```

## Configuration

Créez un fichier `.env` à la racine du projet et ajoutez votre clé API ElevenLabs comme suit :
```
ELEVENLABS_API_KEY=votre_clé_api_ici
```

## Utilisation

Pour générer un fichier audio, assurez-vous que le fichier `data/storyText.json` contient un objet JSON avec une clé `text` contenant le texte à convertir. Ensuite, exécutez :
```
npm run start
```
Le fichier audio généré sera enregistré dans le répertoire spécifié avec un index pour le nom du fichier.

## Structure des Fichiers

- `main.ts` : Point d'entrée du script pour générer les fichiers audio.
- `services/elevenLabsService.ts` : Contient la logique de communication avec l'API ElevenLabs et de gestion des fichiers.
- `data/storyText.json` : Fichier source contenant le texte à convertir en audio.

## Contribution

Les contributions à ce projet sont les bienvenues. Veuillez suivre les pratiques standard de pull request et de revue de code pour proposer des améliorations.

## Licence

Ce projet est distribué sous la licence MIT. Voir le fichier `LICENSE` pour plus de détails.
