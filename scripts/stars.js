document.addEventListener("DOMContentLoaded", () => {
    const starCount = 100;
    const body = document.body;

    const moon = document.createElement('div');
    moon.className = 'moon';
    moon.style.cursor = 'grab';
    body.appendChild(moon);

    function getMoonPhase(date) {
        // Epoch: January 6, 2000 (New Moon)
        const epoch = new Date('2000-01-06T18:14:00Z').getTime();
        const now = date.getTime();
        const diff = now - epoch;
        
        const days = diff / (1000 * 60 * 60 * 24);
        const cycle = 29.5305882;
        const phase = (days % cycle) / cycle;
        
        return phase; // 0 to 1
    }

    function getPhaseName(phase) {
        if (phase < 0.03 || phase > 0.97) return "New Moon";
        if (phase < 0.22) return "Waxing Crescent";
        if (phase < 0.28) return "First Quarter";
        if (phase < 0.47) return "Waxing Gibbous";
        if (phase < 0.53) return "Full Moon";
        if (phase < 0.72) return "Waning Gibbous";
        if (phase < 0.78) return "Last Quarter";
        return "Waning Crescent";
    }

    function updateMoonAppearance() {
        const phase = getMoonPhase(new Date());
        const phaseName = getPhaseName(phase);
        moon.title = `Current Phase: ${phaseName}`;

        const moonWidth = 50; 
        
        moon.style.backgroundColor = '#fffee0ff';
        moon.style.boxShadow = 'none';
        moon.style.borderRadius = '50%';

        const shadowColor = 'rgba(0, 3, 33, 0.95)';

        if (phase < 0.5) {
            const offset = moonWidth * (1 - (phase / 0.5));
            moon.style.boxShadow = `inset ${offset}px 0 0 0 ${shadowColor}`;
            
            if (phase < 0.05) moon.style.backgroundColor = shadowColor;

        } else {
            const offset = moonWidth * ((phase - 0.5) / 0.5);
            moon.style.boxShadow = `inset -${offset}px 0 0 0 ${shadowColor}`;
        }
    }

    updateMoonAppearance();

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
