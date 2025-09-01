// Executa o script quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {

    // ===================================
    // 1. SELETOR DE TEMA (CLARO/ESCURO)
    // ===================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Função para aplicar o tema salvo
    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light-theme') {
            body.classList.add('light-theme');
        } else {
            body.classList.remove('light-theme');
        }
    };

    // Aplica o tema ao carregar a página
    applySavedTheme();

    // Evento de clique para trocar o tema
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        // Salva a preferência no localStorage
        if (body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light-theme');
        } else {
            localStorage.setItem('theme', 'dark-theme');
        }
    });


    // ===================================
    // 2. MENU MÓVEL (HAMBÚRGUER)
    // ===================================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Muda o ícone do botão
            mobileMenuToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
        });
    }


    // ===================================
    // 3. BOTÃO "COPIAR CÓDIGO"
    // ===================================
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.nextElementSibling; // O elemento <pre>
            const code = codeBlock.querySelector('code').innerText;

            navigator.clipboard.writeText(code).then(() => {
                // Feedback visual para o usuário
                button.textContent = 'Copiado!';
                button.classList.add('copied');
                setTimeout(() => {
                    button.textContent = 'Copiar';
                    button.classList.remove('copied');
                }, 2000); // Volta ao normal após 2 segundos
            }).catch(err => {
                console.error('Falha ao copiar o texto: ', err);
            });
        });
    });


    // ===================================
    // 4. SCROLL SPY (NAVEGAÇÃO LATERAL ATIVA)
    // ===================================
    const sections = document.querySelectorAll('.content-section');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

    if (sections.length > 0 && sidebarLinks.length > 0) {
        const observerOptions = {
            root: null, // relativo ao viewport
            rootMargin: `-${document.querySelector('.main-header').offsetHeight}px 0px -60% 0px`,
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(`.sidebar-nav a[href="#${id}"]`);

                if (entry.isIntersecting) {
                    // Remove 'active' de todos os links
                    sidebarLinks.forEach(link => link.classList.remove('active'));
                    // Adiciona 'active' ao link correspondente
                    if (correspondingLink) {
                        correspondingLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

});