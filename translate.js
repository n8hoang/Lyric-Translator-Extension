document.addEventListener('DOMContentLoaded', function() {
    const ogLyrics = document.getElementById('oglyrics');
    const translatedLyrics = document.getElementById('translatedLyrics');
    const language = document.getElementById('language');
    const translateBtn = document.getElementById('translate');
    const errorDiv = document.getElementById('errorDiv')

    // Function to detect language
    async function detectLanguage(text) {
        const detectUrl = 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect';
        const detectOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': '1eb102c1ccmsh8787a73e30281e3p11f25ajsncb90c9ddb7c3', 
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            body: new URLSearchParams({ q: text })
        };

        const response = await fetch(detectUrl, detectOptions);
        const data = await response.json();
        console.log(data)
        return data.data.detections[0][0].language;
    }

    // Function to translate text
    async function translateText(text, sourceLanguage, targetLanguage) {
        const translateUrl = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
        const translateOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': '1eb102c1ccmsh8787a73e30281e3p11f25ajsncb90c9ddb7c3', 
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
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

    function decodeHTMLEntities(text) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }

    // Event listener for the translate button
    translateBtn.addEventListener('click', async () => {
        try {
            const lyricsUntranslated = ogLyrics.value;
            const targetLanguage = language.value;
            if (!targetLanguage.trim() || !lyricsUntranslated){
                errorDiv.textContent = "Please enter the lyrics and select a target language.";
                errorDiv.style.color = "red";
                errorDiv.style.fontWeight = "bold";
                return;
            }

            const sourceLanguage = await detectLanguage(lyricsUntranslated);

            const translatedText = await translateText(lyricsUntranslated, sourceLanguage, targetLanguage);
            console.log(translatedText)
            translatedLyrics.textContent = decodeHTMLEntities(translatedText);
        } catch (error) {
            console.error('Translation error:', error);
        }
    });
});
