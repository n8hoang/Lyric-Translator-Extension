document.addEventListener('DOMContentLoaded', function() {
    const ogLyrics = document.getElementById('oglyrics');
    const translatedLyrics = document.getElementById('translatedLyrics');
    const language = document.getElementById('language');
    const translateBtn = document.getElementById('translate');

    // Function to detect language
    async function detectLanguage(text) {
        const detectUrl = 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect';
        const detectOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': '1eb102c1ccmsh8787a73e30281e3p11f25ajsncb90c9ddb7c3', 
            },
            body: new URLSearchParams({ q: text })
        };

        const response = await fetch(detectUrl, detectOptions);
        const data = await response.json();
        console.log(data)
        return data.data.detections[0][0].language; 
    // Function to translate text
    async function translateText(text, sourceLanguage, targetLanguage) {
        const translateUrl = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
        const translateOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': '1eb102c1ccmsh8787a73e30281e3p11f25ajsncb90c9ddb7c3', 
            },
            body: new URLSearchParams({
                q: text,
                target: targetLanguage,
                source: sourceLanguage
            })
        };

        const response = await fetch(translateUrl, translateOptions);
        const data = await response.json();
        return data.data.translations[0].translatedText; 
    }
    }
});
