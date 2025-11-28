document.addEventListener("DOMContentLoaded", () => {
    const starCount = 100;
    const body = document.body;

    const moon = document.createElement('div');
    moon.className = 'moon';
    body.appendChild(moon);

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 2 + 1; // 1px to 3px
        
        // Random duration and delay for twinkling
        const duration = Math.random() * 3 + 2; // 2s to 5s
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
