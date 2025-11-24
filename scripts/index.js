document.addEventListener("DOMContentLoaded", () => {
    const quotation = document.querySelector('#quotation');
    const author = document.querySelector('#author');
    
    let allQuotes = [];
    
    let typingTimeout = null;

    function typeWriter(text, element, speed, callback) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                typingTimeout = setTimeout(type, speed);
            } else {
                if (callback) callback();
            }
        }
        type();
    }

    function showRandomQuote() {
        if (typingTimeout) clearTimeout(typingTimeout);

        quotation.textContent = '';
        author.textContent = '';

        const randomIndex = Math.floor(Math.random() * allQuotes.length);
        const randomQuote = allQuotes[randomIndex]; 

        typeWriter(`"${randomQuote.quote}"`, quotation, 20, () => {
            typeWriter(`- ${randomQuote.author}`, author, 10); 
        });
    }

    fetch('/data/quotes.json')
        .then(response => response.json())
        .then(data => {
            allQuotes = data;
            showRandomQuote();
        })
        .catch(error => {
            console.error('Error:', error);
            quotation.textContent = 'Failed to load quote.';
        });

    quotation.addEventListener('click', showRandomQuote);
    
    quotation.style.cursor = 'pointer';
    quotation.style.userSelect = 'none';
});