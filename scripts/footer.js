document.addEventListener("DOMContentLoaded", () => {
    const footerContainer = document.querySelector('.footer-text');
    if (!footerContainer) return;

    const mainCursor = document.querySelector('.cursor');
    if (!mainCursor) return;

    const originalParent = mainCursor.parentElement;
    const originalNextSibling = mainCursor.nextSibling;

    const startDate = new Date('2003-03-27T08:30:00');

    const encodedKey = "MTlhMTgyNTc1Nzg0MDRkOTI0MTY0YzY2Y2Q4ZTM2ZTU=";
    const apiKey = atob(encodedKey);
    const username = "fardes1"; 

    function getUptime() {
        const now = new Date();
        const diff = now - startDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        return `Uptime: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }

    async function getListeningTo() {
        try {
            const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`);
            const data = await response.json();
            const track = data.recenttracks.track[0];
            const artist = track.artist['#text'];
            const name = track.name;
            return `Now listening to ${artist} - ${name}`;
        } catch (error) {
            console.error('Error fetching Last.fm:', error);
            return "Now listening to Silence";
        }
    }

    async function moveCursorTo(targetElement, appendFn) {
        // Get current position and styles
        const rect = mainCursor.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(mainCursor);
        
        // Set fixed position to current spot to prevent jumping
        mainCursor.style.position = 'fixed';
        mainCursor.style.left = `${rect.left}px`;
        mainCursor.style.top = `${rect.top}px`;
        mainCursor.style.margin = '0';
        mainCursor.style.transition = 'all 0.5s ease-in-out';
        mainCursor.style.zIndex = '1000';
        
        mainCursor.style.fontSize = computedStyle.fontSize;
        mainCursor.style.color = computedStyle.color;
        mainCursor.style.textShadow = computedStyle.textShadow;
        mainCursor.style.fontFamily = computedStyle.fontFamily;
        mainCursor.style.lineHeight = computedStyle.lineHeight;
        
        document.body.appendChild(mainCursor);

        mainCursor.getBoundingClientRect();

        const marker = document.createElement('span');
        marker.textContent = '█';
        marker.style.opacity = '0';
        appendFn(marker);
        
        const targetRect = marker.getBoundingClientRect();
        const targetStyle = window.getComputedStyle(marker);
        
        mainCursor.style.left = `${targetRect.left}px`;
        mainCursor.style.top = `${targetRect.top}px`;
        mainCursor.style.fontSize = targetStyle.fontSize;
        mainCursor.style.color = targetStyle.color;
        mainCursor.style.textShadow = targetStyle.textShadow;

        await new Promise(r => setTimeout(r, 500));

        marker.remove();

        mainCursor.style.position = '';
        mainCursor.style.left = '';
        mainCursor.style.top = '';
        mainCursor.style.margin = '';
        mainCursor.style.transition = '';
        mainCursor.style.zIndex = '';
        mainCursor.style.fontSize = '';
        mainCursor.style.color = '';
        mainCursor.style.textShadow = '';
        mainCursor.style.fontFamily = '';
        mainCursor.style.lineHeight = '';
        
        appendFn(mainCursor);
    }

    async function typeText(text) {
        if (mainCursor.parentElement !== footerContainer) {
            mainCursor.textContent = '█';
            await moveCursorTo(footerContainer, (el) => {
                footerContainer.innerHTML = '';
                footerContainer.appendChild(el);
            });
        }

        footerContainer.textContent = '';
        footerContainer.appendChild(mainCursor);

        for (let i = 0; i < text.length; i++) {
            footerContainer.textContent = text.substring(0, i + 1);
            footerContainer.appendChild(mainCursor);
            await new Promise(r => setTimeout(r, 50)); // writing speed
        }
    }

    async function deleteText() {
        const text = footerContainer.textContent.replace('█', ''); 

        for (let i = text.length; i >= 0; i--) {
            footerContainer.textContent = text.substring(0, i);
            footerContainer.appendChild(mainCursor);
            await new Promise(r => setTimeout(r, 30)); // del speed
        }
    }

    async function returnCursor() {
        mainCursor.innerHTML = '&nbsp;█';
        
        await moveCursorTo(originalParent, (el) => {
            if (originalNextSibling) {
                originalParent.insertBefore(el, originalNextSibling);
            } else {
                originalParent.appendChild(el);
            }
        });
    }

    async function cycle() {
        while (true) {
            const uptimeText = getUptime();
            await typeText(uptimeText);
            await new Promise(r => setTimeout(r, 5000));
            await deleteText();
            
            await returnCursor();
            await new Promise(r => setTimeout(r, 2000)); 

            const listeningText = await getListeningTo();
            await typeText(listeningText);
            await new Promise(r => setTimeout(r, 5000));
            await deleteText();

            await returnCursor();
            await new Promise(r => setTimeout(r, 2000));
        }
    }

    setTimeout(cycle, 1000);
});
