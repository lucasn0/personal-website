document.addEventListener("DOMContentLoaded", () => {
    const starCount = 100;
    const body = document.body;

    const moon = document.createElement('div');
    moon.className = 'moon';
    moon.style.cursor = 'grab';
    body.appendChild(moon);

    let isDragging = false;
    let startX, startY;

    moon.addEventListener('mousedown', (e) => {
        isDragging = true;
        moon.style.cursor = 'grabbing';
        moon.style.transition = 'none';
        
        const rect = moon.getBoundingClientRect();
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;
        
        moon.style.right = 'auto';
        moon.style.left = `${rect.left}px`;
        moon.style.top = `${rect.top}px`;
        
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const x = e.clientX - startX;
        const y = e.clientY - startY;
        
        moon.style.left = `${x}px`;
        moon.style.top = `${y}px`;
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        moon.style.cursor = 'grab';
        
        moon.style.transition = 'all 1s ease-out';
        
        const targetTop = 80;
        const targetRight = 80;
        const moonWidth = 50;
        const targetLeft = window.innerWidth - targetRight - moonWidth;
        
        moon.style.left = `${targetLeft}px`;
        moon.style.top = `${targetTop}px`;
        
        setTimeout(() => {
            moon.style.transition = '';
            moon.style.left = '';
            moon.style.top = '';
            moon.style.right = '';
        }, 1000);
    });

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        const size = Math.random() * 2 + 1;
        
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;

        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        body.appendChild(star);
    }
});
