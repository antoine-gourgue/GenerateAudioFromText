import axios from 'axios';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
import ProgressBar from 'progress';

dotenv.config();

const directory: string = 'C:\\Users\\antoi\\Desktop\\Projet\\TikTokUploader\\audio';
const prefix: string = 'histoire_';
const extension: string = '.mp3';

function getNextIndex(directory: string, prefix: string, extension: string): number {
    const files: string[] = fs.readdirSync(directory);
    let maxIndex: number = 0;
    files.forEach((file: string) => {
        if (file.startsWith(prefix) && file.endsWith(extension)) {
            const index: number = parseInt(file.substring(prefix.length, file.length - extension.length), 10);
            if (index > maxIndex) {
                maxIndex = index;
            }
        }
    });
    return maxIndex + 1;
}

const generateAudioFromText = async (text: string): Promise<string> => {
    const modelId: string = 'eleven_monolingual_v1';
    const voiceId: string = '21m00Tcm4TlvDq8ikWAM';
    const apiKey: string | undefined = process.env.ELEVENLABS_API_KEY;

    const url: string = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    const headers: { [key: string]: string } = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey ? apiKey : ''
    };
    const data: object = {
        text: text,
        model_id: modelId,
        voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
        }
    };

    try {
        const response = await axios.post(url, data, { headers, responseType: 'stream' });
        const totalLength = parseInt(response.headers['content-length'], 10);
        const progressBar = new ProgressBar('-> downloading [:bar] :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 40,
            total: totalLength,
        });

        const nextIndex: number = getNextIndex(directory, prefix, extension);
        const fileName: string = `${prefix}${nextIndex}${extension}`;
        const fullPath: string = path.join(directory, fileName);
        const writer = fs.createWriteStream(fullPath);

        response.data.on('data', (chunk: Buffer) => {
            progressBar.tick(chunk.length);
        });

        response.data.pipe(writer);

        return new Promise<string>((resolve, reject) => {
            writer.on('finish', () => {
                console.log('Download completed.');
                resolve(fullPath);
            });
            writer.on('error', reject);
        });

    } catch (error) {
        console.error('Erreur lors de la requête à ElevenLabs:', error);
        throw error;
    }
};

export default generateAudioFromText;
