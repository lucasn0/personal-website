const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

function attachGlitchEffect(element) {
    if (element.dataset.glitchAttached) return;
    element.dataset.glitchAttached = "true";
    
    element.dataset.original = element.innerText;

    element.addEventListener('mouseover', event => {
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
}

function processTextForGlitch(element) {
    element.dataset.glitchProcessed = "true";

    const text = element.innerText;
    if (!text.trim()) return;

    const words = text.split(' ');
    element.innerHTML = '';
    
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.innerText = word;
        attachGlitchEffect(span);
        element.appendChild(span);
        
        if (index < words.length - 1) {
            element.appendChild(document.createTextNode(' '));
        }
    });
}

function applyGlitch(node) {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    
    if (node.closest && (node.closest('.navbar') || node.closest('.prompt'))) return;
    if (node.id === 'quotation' || node.id === 'author') return;
    if (node.dataset.glitchProcessed || node.dataset.glitchAttached) return;

    const tagName = node.tagName.toLowerCase();

    if (tagName === 'a') {
        attachGlitchEffect(node);
    } else if (['p', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'span'].includes(tagName)) {
        if (node.children.length === 0 && node.innerText.trim().length > 0) {
            processTextForGlitch(node);
        }
    }
    
    if (node.children.length > 0) {
        node.querySelectorAll('a, p, h2, h3, h4, h5, h6, li, span').forEach(child => {
            applyGlitch(child);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a, p, h2, h3, h4, h5, h6, li, span').forEach(el => {
        applyGlitch(el);
    });

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                applyGlitch(node);
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
