document.addEventListener("DOMContentLoaded", () => {
    const quotation = document.querySelector('#quotation');
    const author = document.querySelector('#author');
    quotation.innerHTML = '';
    author.innerHTML = '';

    fetch('/data/quotes.json')
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomQuote = data[randomIndex];
            quotation.textContent = `"${randomQuote.quote}"`;
            author.textContent = `- ${randomQuote.author}`;
        })
        .catch(error => {
            console.error('Error fetching quotes:', error);
            quotation.textContent = 'Failed to load quote.';
        });
});