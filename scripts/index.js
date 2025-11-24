document.addEventListener("DOMContentLoaded", () => {
    const quotation = document.querySelector('#quotation');
    const author = document.querySelector('#author');
    
    let allQuotes = []; 

    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * allQuotes.length);
        const randomQuote = allQuotes[randomIndex];

        quotation.textContent = `"${randomQuote.quote}"`;
        author.textContent = `- ${randomQuote.author}`;
    }

    fetch('/data/quotes.json')
        .then(response => response.json())
        .then(data => {
            allQuotes = data;
            showRandomQuote();
        })
        .catch(error => {
            console.error('Error fetching quotes:', error);
            quotation.textContent = 'Failed to load quote.';
        });

    quotation.addEventListener('click', showRandomQuote);
    quotation.style.cursor = 'pointer';
});