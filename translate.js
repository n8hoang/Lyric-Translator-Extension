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
            'X-RapidAPI-Key': 'YOUR_API_KEY', // Replace with your API key
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: new URLSearchParams({ q: text })
    };

    const response = await fetch(detectUrl, detectOptions);
    const data = await response.json();
    return data.data.detections[0][0].language; // Assuming the API response has this structure
}

