/* ===================================
   IAFECOLE - Script JavaScript Complet
   === Fonctionnalités Interactives ===
   =================================== */

// ===== GESTION DU MENU HAMBURGER =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    }

    // Fermer le menu au clic sur un lien
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    });
});

// ===== ANNÉE DYNAMIQUE FOOTER =====
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// ===== RECHERCHE DYNAMIQUE =====
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const documentCards = document.querySelectorAll('.document-card');
            let foundCount = 0;

            documentCards.forEach(card => {
                const title = card.querySelector('.document-title').textContent.toLowerCase();
                const subject = card.querySelector('.document-subject').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || subject.includes(searchTerm) || searchTerm === '') {
                    card.style.display = 'flex';
                    foundCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (searchTerm && foundCount === 0) {
                showNotification('Aucun document trouvé pour votre recherche', 'warning');
            }
        });
    }
});

// ===== PRÉVISUALISATION PDF =====
document.addEventListener('DOMContentLoaded', function() {
    const previewButtons = document.querySelectorAll('.btn-preview');
    const pdfModal = document.getElementById('pdfModal');
    const pdfClose = document.getElementById('pdfClose');
    const pdfTitle = document.getElementById('pdfTitle');
    const backBtn = document.getElementById('backBtn');

    previewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.document-card');
            const title = card.querySelector('.document-title').textContent;
            
            if (pdfModal && pdfTitle) {
                pdfTitle.textContent = title;
                pdfModal.classList.add('active');
                showNotification('Aperçu du document - Version limitée', 'info');
            }
        });
    });

    if (pdfClose) {
        pdfClose.addEventListener('click', function() {
            pdfModal.classList.remove('active');
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', function() {
            pdfModal.classList.remove('active');
        });
    }

    if (pdfModal) {
        pdfModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }
});

// ===== TÉLÉCHARGEMENT AVEC NOTIFICATION =====
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.btn-download');

    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.document-card');
            const title = card.querySelector('.document-title').textContent;
            const filename = title.replace(/\s+/g, '_') + '.pdf';
            
            // Simuler le téléchargement
            showNotification(`Téléchargement de: ${filename}`, 'success');
            
            // Créer un lien de téléchargement virtuel
            const link = document.createElement('a');
            link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MNCjEgMCBvYmo=';
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
});

// ===== NOTIFICATION TOAST =====
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    
    if (notification) {
        notification.textContent = message;
        notification.className = 'notification show ' + type;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// ===== TOGGLER DES SUJETS =====
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const subjectId = this.getAttribute('data-subject');
            const subjectContent = document.getElementById(subjectId);
            
            if (subjectContent) {
                if (subjectContent.style.display === 'none') {
                    subjectContent.style.display = 'block';
                    this.textContent = '▲';
                } else {
                    subjectContent.style.display = 'none';
                    this.textContent = '▼';
                }
            }
        });
    });
});

// ===== FAQ ACCORDION =====
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const toggle = this.querySelector('.faq-toggle');

            // Fermer les autres réponses
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    const otherAnswer = item.querySelector('.faq-answer');
                    const otherToggle = item.querySelector('.faq-toggle');
                    if (otherAnswer) {
                        otherAnswer.style.display = 'none';
                        if (otherToggle) {
                            otherToggle.textContent = '+';
                        }
                    }
                }
            });

            // Basculer la réponse actuelle
            if (answer) {
                if (answer.style.display === 'none') {
                    answer.style.display = 'block';
                    if (toggle) toggle.textContent = '-';
                } else {
                    answer.style.display = 'none';
                    if (toggle) toggle.textContent = '+';
                }
            }
        });
    });
});

// ===== FORMULAIRE CONTACT =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Récupérer les données
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Validation simple
            if (!name || !email || !subject || !message) {
                showNotification('Veuillez remplir tous les champs obligatoires', 'warning');
                return;
            }

            // Validation email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Veuillez entrer une adresse email valide', 'warning');
                return;
            }

            // Simuler l'envoi (en production, cela irait à un serveur)
            console.log({
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: new Date()
            });

            showNotification('Message envoyé avec succès! Nous vous répondrons bientôt.', 'success');
            contactForm.reset();
        });
    }
});

// ===== CHAT SUPPORT =====
document.addEventListener('DOMContentLoaded', function() {
    const chatBtn = document.getElementById('chatBtn');

    if (chatBtn) {
        chatBtn.addEventListener('click', function() {
            showNotification('Chat en construction - Bientôt disponible!', 'info');
        });
    }
});

// ===== PROTECTION CONTRE LE CLIC DROIT =====
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showNotification('Les documents sont protégés. Accès aux menus contextuels désactivé.', 'warning');
    return false;
});

// ===== BLOCAGE DE CERTAINS RACCOURCIS CLAVIER =====
document.addEventListener('keydown', function(e) {
    // Bloquer F12 (DevTools)
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }

    // Bloquer Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }

    // Bloquer Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
    }

    // Bloquer Ctrl+S (Enregistrer)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        showNotification('L\'enregistrement direct est désactivé. Utilisez le bouton Télécharger.', 'warning');
        return false;
    }

    // Bloquer Ctrl+C sur les documents (copie)
    if (e.ctrlKey && e.key === 'c') {
        // Optionnel: vous pouvez bloquer ou autoriser la copie
        // e.preventDefault();
    }
});

// ===== CHARGEMENT DYNAMIQUE =====
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter une classe de chargement au corps
    document.body.classList.add('loaded');

    // Simuler le chargement des ressources
    const resourceCount = document.querySelectorAll('.document-card').length;
    console.log(`${resourceCount} ressources chargées`);
});

// ===== NAVIGATION ACTIVE =====
document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation || 
            (currentLocation === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ===== SCROLL TO TOP BUTTON =====
window.addEventListener('scroll', function() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    
    if (scrollBtn) {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    }
});

// Créer le bouton scroll to top
document.addEventListener('DOMContentLoaded', function() {
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollTopBtn';
    scrollBtn.innerHTML = '⬆️';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #d4af37;
        color: #1a3a52;
        border: none;
        padding: 0.75rem 1rem;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollBtn.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#e6c200';
    });

    scrollBtn.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#d4af37';
    });

    document.body.appendChild(scrollBtn);
});

// ===== ANIMATIONS AU DÉFILEMENT =====
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.document-card, .testimonial-card, .value-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ===== GESTION DES ERREURS GLOBALES =====
window.addEventListener('error', function(e) {
    console.error('Erreur globale:', e.message);
    // Optionnel: afficher une notification d'erreur
    // showNotification('Une erreur est survenue. Veuillez rafraîchir la page.', 'error');
});

// ===== INITIALISATION LOCALSTORAGE POUR LES FAVORIS =====
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour ajouter aux favoris
    window.addToFavorites = function(documentTitle) {
        let favorites = JSON.parse(localStorage.getItem('iafecole_favorites')) || [];
        
        if (!favorites.includes(documentTitle)) {
            favorites.push(documentTitle);
            localStorage.setItem('iafecole_favorites', JSON.stringify(favorites));
            showNotification(`"${documentTitle}" ajouté aux favoris!`, 'success');
        } else {
            showNotification(`"${documentTitle}" est déjà dans vos favoris.`, 'info');
        }
    };

    // Fonction pour obtenir les favoris
    window.getFavorites = function() {
        return JSON.parse(localStorage.getItem('iafecole_favorites')) || [];
    };
});

// ===== SUIVI DES STATISTIQUES (OPTIONNEL) =====
document.addEventListener('DOMContentLoaded', function() {
    // Tracker les clics sur les documents
    const documentCards = document.querySelectorAll('.document-card');
    
    documentCards.forEach(card => {
        const downloadBtn = card.querySelector('.btn-download');
        const previewBtn = card.querySelector('.btn-preview');
        const title = card.querySelector('.document-title').textContent;

        if (downloadBtn) {
            downloadBtn.addEventListener('click', function() {
                // Tracker le téléchargement
                console.log(`Téléchargement: ${title}`);
            });
        }

        if (previewBtn) {
            previewBtn.addEventListener('click', function() {
                // Tracker la prévisualisation
                console.log(`Prévisualisation: ${title}`);
            });
        }
    });
});

// ===== GESTION DE LA VISIBILITÉ DE LA PAGE =====
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Utilisateur a quitté la page');
    } else {
        console.log('Utilisateur est revenu');
    }
});

// ===== MODE SOMBRE (FUTUR) =====
// Cette fonction peut être intégrée plus tard
window.toggleDarkMode = function() {
    const body = document.body;
    const isDarkMode = localStorage.getItem('iafecole_darkmode') === 'true';
    
    if (!isDarkMode) {
        body.style.backgroundColor = '#1a1a1a';
        body.style.color = '#ffffff';
        localStorage.setItem('iafecole_darkmode', 'true');
    } else {
        body.style.backgroundColor = '#ffffff';
        body.style.color = '#333333';
        localStorage.setItem('iafecole_darkmode', 'false');
    }
};

// ===== PERFORMANCE MONITORING =====
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Temps de chargement de la page: ${pageLoadTime}ms`);
    });
}

// ===== SERVICE WORKER (OPTIONNEL POUR PWA) =====
if ('serviceWorker' in navigator) {
    // À décommenter si vous avez un service worker
    // navigator.serviceWorker.register('/sw.js').then(() => {
    //     console.log('Service Worker enregistré');
    // });
}

// ===== FONCTION D'AIDE GÉNÉRALE =====
window.iafecoleHelp = {
    version: '1.0.0',
    showHelp: function() {
        console.log('IAFECOLE v1.0.0 - Plateforme Éducative Universitaire');
        console.log('Fonctionnalités disponibles:');
        console.log('- Recherche dynamique de ressources');
        console.log('- Prévisualisation de documents');
        console.log('- Système de favoris (localStorage)');
        console.log('- Navigation responsive');
        console.log('- Formulaire de contact');
    },
    getStats: function() {
        const stats = {
            documents: document.querySelectorAll('.document-card').length,
            subjects: document.querySelectorAll('.subject-block').length,
            favorites: window.getFavorites().length
        };
        console.table(stats);
        return stats;
    }
};

// Afficher le message de bienvenue en console
console.log('%cBienvenue sur IAFECOLE! 🎓', 'color: #d4af37; font-size: 16px; font-weight: bold;');
console.log('%cPlateforme Éducative Universitaire 100%% Gratuite', 'color: #1a3a52; font-size: 12px;');
console.log('Pour plus d\'informations, tapez: iafecoleHelp.showHelp()');
document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', function () {

        const subjectId = this.dataset.subject;
        const content = document.getElementById(subjectId);

        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            this.textContent = '▲';
        } else {
            content.style.display = 'none';
            this.textContent = '▼';
        }

    });
});
