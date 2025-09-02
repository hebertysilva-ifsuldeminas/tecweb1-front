document.addEventListener('DOMContentLoaded', () => {

    // Lógica para a animação de SCROLL (Exemplo 3.2)
    const hiddenElements = document.querySelectorAll('.fade-in');
    if (hiddenElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        });
        hiddenElements.forEach((el) => observer.observe(el));
    }

    // Lógica para a chuva digital de MATRIX (Exemplo 8.2)
    const matrixDemo = document.querySelector('.matrix-demo');
    if (matrixDemo) {
        const chars = "01";
        let stream = "";
        const charCount = 200; // Aumente para mais "chuva"
        for(let i = 0; i < charCount; i++){
            const char = chars[Math.floor(Math.random() * chars.length)];
            const delay = Math.random() * 10;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            stream += `<span style="animation-delay: ${delay}s; top: ${top}%; left: ${left}%;">${char}</span>`;
        }
        matrixDemo.innerHTML = stream;
    }
    
});