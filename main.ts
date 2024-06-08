import generateAudioFromText from './services/elevenLabsService';
import fs from 'fs';
import path from 'path';

(async () => {
    try {
        const filePath = path.join(__dirname, 'data', 'storyText.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);

        await generateAudioFromText(jsonData.text);
        console.log("Audio généré avec succès et enregistré.");
    } catch (error) {
        console.error("Erreur lors de la génération de l'audio:", error);
    }
})();
