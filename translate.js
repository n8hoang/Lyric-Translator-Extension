const ogLyrics = document.getElementById('oglyrics')
const translatedLyrics = document.getElementById('translatedLyrics')
const language = document.getElementById('language')
const translateBtn = document.getElementById('translate')

translateBtn.addEventListener('click', async () => {
    const lyricsUntranslated = ogLyrics.value;
    const translatelanguage = language.value;



    
    
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
    const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/gzip',
		'X-RapidAPI-Key': '1eb102c1ccmsh8787a73e30281e3p11f25ajsncb90c9ddb7c3',
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
	},
	body: new URLSearchParams({
		q: lyricsUntranslated,
		target: translatelanguage,
		source: 'en'
	})
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}


})