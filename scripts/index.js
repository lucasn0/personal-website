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

    /* glitch bullshti */
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________'; 
    
    const links = document.querySelectorAll('.navigation a');

    links.forEach(link => {
        link.dataset.original = link.innerText;

        link.addEventListener('mouseover', event => {
            let iteration = 0;
            const originalText = event.target.dataset.original;
            
            if (event.target.interval) clearInterval(event.target.interval);

            event.target.interval = setInterval(() => {
                event.target.innerText = originalText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    })
                    .join("");

                if (iteration >= originalText.length) { 
                    clearInterval(event.target.interval);
                }
                
                iteration += 1 / 4; 
            }, 30);
        });
        
    });

});