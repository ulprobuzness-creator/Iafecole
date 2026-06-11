/* ===================================
   IAFECOLE - SCRIPT.JS
   Plateforme Éducative Universitaire
   Fonctionnalités JavaScript Avancées
   ==================================== */

// ===== SÉCURITÉ ET PROTECTION =====
// Désactiver le clic droit
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showNotification('⚠️ Les documents sont protégés. Le clic droit est désactivé.', 'warning');
    return false;
});

// Désactiver la sélection de texte
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
});

// Bloquer les raccourcis clavier courants
document.addEventListener('keydown', function(e) {
    // F12 (Outils de développement)
    if (e.key === 'F12') {
        e.preventDefault();
        showNotification('⚠️ Les outils de développement sont bloqués.', 'warning');
        return false;
    }
    // Ctrl+U (Voir le code source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        showNotification('⚠️ L\'affichage du code source est bloqué.', 'warning');
        return false;
    }
    // Ctrl+Shift+I (Inspecter)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        showNotification('⚠️ L\'inspection d\'éléments est bloquée.', 'warning');
        return false;
    }
    // Ctrl+Shift+C (Inspecter par sélection)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        showNotification('⚠️ L\'inspection d\'éléments est bloquée.', 'warning');
        return false;
    }
});

// ===== BASE DE DONNÉES DOCUMENTS =====
const documents = {
    'session1': {
        'dessin-technique-1': [
            { id: 1, name: 'Cours Dessin Technique 1', type: 'Cours', pages: 45, image: '📐' },
            { id: 2, name: 'TD Dessin Technique 1', type: 'TD', pages: 25, image: '📐' },
            { id: 3, name: 'Contrôles Continus DT1', type: 'Contrôle', pages: 15, image: '📐' },
            { id: 4, name: 'Examen DT1 Session 1', type: 'Examen', pages: 8, image: '📐' },
            { id: 5, name: 'Livre Dessin Technique', type: 'Livre', pages: 250, image: '📚' },
            { id: 6, name: 'Corrigés DT1', type: 'Corrigé', pages: 30, image: '✓' }
        ],
        'thermodynamique': [
            { id: 7, name: 'Cours Thermodynamique', type: 'Cours', pages: 60, image: '🔥' },
            { id: 8, name: 'TD Thermodynamique', type: 'TD', pages: 35, image: '🔥' },
            { id: 9, name: 'Examens Thermodynamique', type: 'Examen', pages: 20, image: '🔥' },
            { id: 10, name: 'Livre Thermodynamique Avancée', type: 'Livre', pages: 320, image: '📚' }
        ],
        'analyse-1': [
            { id: 11, name: 'Cours Analyse 1', type: 'Cours', pages: 80, image: '📊' },
            { id: 12, name: 'TD Analyse 1', type: 'TD', pages: 50, image: '📊' },
            { id: 13, name: 'Problèmes Analyse 1', type: 'Problème', pages: 40, image: '📊' },
            { id: 14, name: 'Corrigés Analyse 1', type: 'Corrigé', pages: 60, image: '✓' }
        ],
        'algebre': [
            { id: 15, name: 'Cours Algèbre', type: 'Cours', pages: 70, image: '✖️' },
            { id: 16, name: 'TD Algèbre', type: 'TD', pages: 45, image: '✖️' },
            { id: 17, name: 'Examen Algèbre', type: 'Examen', pages: 12, image: '✖️' }
        ],
        'mecanique': [
            { id: 18, name: 'Cours Mécanique Classique', type: 'Cours', pages: 75, image: '⚙️' },
            { id: 19, name: 'TD Mécanique', type: 'TD', pages: 48, image: '⚙️' },
            { id: 20, name: 'Livre Mécanique Théorique', type: 'Livre', pages: 400, image: '📚' }
        ],
        'electricite': [
            { id: 21, name: 'Cours Électricité', type: 'Cours', pages: 65, image: '⚡' },
            { id: 22, name: 'TD Électricité', type: 'TD', pages: 40, image: '⚡' },
            { id: 23, name: 'Laboratoire Électricité', type: 'Pratique', pages: 35, image: '⚡' }
        ],
        'technologie-base': [
            { id: 24, name: 'Cours Technologie de Base', type: 'Cours', pages: 50, image: '🔧' },
            { id: 25, name: 'TD Technologie', type: 'TD', pages: 30, image: '🔧' }
        ],
        'chimie-generale': [
            { id: 26, name: 'Cours Chimie Générale', type: 'Cours', pages: 72, image: '🧪' },
            { id: 27, name: 'TD Chimie Générale', type: 'TD', pages: 42, image: '🧪' },
            { id: 28, name: 'Livre Chimie Générale', type: 'Livre', pages: 350, image: '📚' }
        ],
        'geologie': [
            { id: 29, name: 'Cours Géologie', type: 'Cours', pages: 55, image: '🪨' },
            { id: 30, name: 'TD Géologie', type: 'TD', pages: 32, image: '🪨' }
        ],
        'technique-expression': [
            { id: 31, name: 'Cours Technique d\'Expression', type: 'Cours', pages: 40, image: '📝' },
            { id: 32, name: 'Exercices Expression', type: 'Exercice', pages: 28, image: '📝' }
        ],
        'anglais-1': [
            { id: 33, name: 'Cours Anglais 1', type: 'Cours', pages: 60, image: '🌍' },
            { id: 34, name: 'Exercices Anglais', type: 'Exercice', pages: 50, image: '🌍' }
        ],
        'informatique-1': [
            { id: 35, name: 'Cours Informatique 1', type: 'Cours', pages: 85, image: '💻' },
            { id: 36, name: 'TP Informatique', type: 'Pratique', pages: 60, image: '💻' },
            { id: 37, name: 'Livre Programmation', type: 'Livre', pages: 400, image: '📚' }
        ]
    },
    'session2': {
        'mecanique-rationnelle': [
            { id: 38, name: 'Cours Mécanique Rationnelle', type: 'Cours', pages: 90, image: '⚙️' },
            { id: 39, name: 'TD Mécanique Rationnelle', type: 'TD', pages: 55, image: '⚙️' }
        ],
        'mecanique-fluides': [
            { id: 40, name: 'Cours Mécanique des Fluides', type: 'Cours', pages: 80, image: '💧' },
            { id: 41, name: 'TD Mécanique des Fluides', type: 'TD', pages: 50, image: '💧' }
        ],
        'dessin-technique-2': [
            { id: 42, name: 'Cours Dessin Technique 2', type: 'Cours', pages: 50, image: '📐' },
            { id: 43, name: 'TD Dessin Technique 2', type: 'TD', pages: 35, image: '📐' }
        ],
        'physique-atomique': [
            { id: 44, name: 'Cours Physique Atomique', type: 'Cours', pages: 70, image: '⚛️' },
            { id: 45, name: 'TD Physique Atomique', type: 'TD', pages: 42, image: '⚛️' }
        ],
        'anglais-2': [
            { id: 46, name: 'Cours Anglais 2', type: 'Cours', pages: 65, image: '🌍' },
            { id: 47, name: 'Exercices Anglais 2', type: 'Exercice', pages: 55, image: '🌍' }
        ],
        'resistance-materiaux': [
            { id: 48, name: 'Cours Résistance des Matériaux', type: 'Cours', pages: 75, image: '💪' },
            { id: 49, name: 'TD Résistance des Matériaux', type: 'TD', pages: 48, image: '💪' }
        ],
        'chimie-organique': [
            { id: 50, name: 'Cours Chimie Organique', type: 'Cours', pages: 85, image: '🧬' },
            { id: 51, name: 'TD Chimie Organique', type: 'TD', pages: 55, image: '🧬' }
        ],
        'optique': [
            { id: 52, name: 'Cours Optique', type: 'Cours', pages: 60, image: '🔬' },
            { id: 53, name: 'TD Optique', type: 'TD', pages: 38, image: '🔬' }
        ],
        'informatique-2': [
            { id: 54, name: 'Cours Informatique 2', type: 'Cours', pages: 90, image: '💻' },
            { id: 55, name: 'TP Informatique 2', type: 'Pratique', pages: 70, image: '💻' }
        ]
    }
};

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    renderDocuments();
    updateCopyright();
    initializeAITutor();
    initializeQuizGenerator();
    initializeCourseReviewer();
});

// ===== GESTION DU MENU HAMBURGER =====
function initializeEventListeners() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const navMenu = document.getElementById('nav-menu');
    const sidebar = document.getElementById('sidebar');
    const backButton = document.getElementById('back-button');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const backToTopBtn = document.getElementById('back-to-top');

    // Toggle menu hamburger
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            sidebar.classList.toggle('active');
        });
    }

    // Fermer le menu
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function() {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
            sidebar.classList.remove('active');
        });
    }

    // Fermer le menu en cliquant sur un lien
    const navLinks = document.querySelectorAll('.nav-link, .sidebar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
            sidebar.classList.remove('active');
        });
    });

    // Bouton retour
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    }

    // Recherche
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Bouton retour en haut
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Toast notification
    const toastClose = document.getElementById('toast-close');
    if (toastClose) {
        toastClose.addEventListener('click', function() {
            const toast = document.getElementById('toast-notification');
            toast.classList.remove('show');
        });
    }

    // FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('open');
        });
    });

    // Filtres
    const sessionFilter = document.getElementById('session-filter');
    const typeFilter = document.getElementById('type-filter');
    const subjectFilter = document.getElementById('subject-filter');

    if (sessionFilter) {
        sessionFilter.addEventListener('change', applyFilters);
    }
    if (typeFilter) {
        typeFilter.addEventListener('change', applyFilters);
    }
    if (subjectFilter) {
        subjectFilter.addEventListener('change', applyFilters);
    }

    // Modal
    const previewModal = document.getElementById('preview-modal');
    const modalClose = document.getElementById('modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            previewModal.classList.remove('show');
        });
    }

    if (previewModal) {
        previewModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    }

    // Boutons de session
    const toggleSessionBtns = document.querySelectorAll('.toggle-session');
    toggleSessionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const sessionSection = this.closest('.session-section');
            const subjectSections = sessionSection.querySelectorAll('.subject-section');
            subjectSections.forEach(section => {
                section.style.display = section.style.display === 'none' ? 'block' : 'none';
            });
        });
    });

    // Formulaire de contact
    const contactForm = document.getElementById('contact-form-element');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

// ===== RENDU DES DOCUMENTS =====
function renderDocuments() {
    for (const session in documents) {
        for (const subject in documents[session]) {
            const containerId = `docs-${subject}`;
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = '';
                documents[session][subject].forEach(doc => {
                    const docCard = createDocumentCard(doc);
                    container.appendChild(docCard);
                });
            }
        }
    }

    // Documents populaires sur l'accueil
    const popularDocsContainer = document.querySelector('.popular-docs .documents-grid');
    if (popularDocsContainer) {
        popularDocsContainer.innerHTML = '';
        const allDocs = getAllDocuments().slice(0, 6);
        allDocs.forEach(doc => {
            popularDocsContainer.appendChild(createDocumentCard(doc));
        });
    }

    // Derniers cours
    const latestCoursesContainer = document.querySelector('.latest-courses .courses-list');
    if (latestCoursesContainer) {
        latestCoursesContainer.innerHTML = '';
        const courseDocs = getAllDocuments().filter(d => d.type === 'Cours').slice(0, 5);
        courseDocs.forEach(doc => {
            const courseItem = document.createElement('div');
            courseItem.style.cssText = `
                background: white;
                padding: 1rem;
                margin-bottom: 0.5rem;
                border-radius: 5px;
                border-left: 4px solid #FFD700;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
            `;
            courseItem.innerHTML = `
                <div>
                    <h4 style="color: #001f3f; margin-bottom: 0.25rem;">${doc.name}</h4>
                    <small style="color: #666;">${doc.pages} pages</small>
                </div>
                <button onclick="downloadDocument(${doc.id})" style="
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                ">⬇️ Télécharger</button>
            `;
            latestCoursesContainer.appendChild(courseItem);
        });
    }
}

// ===== CRÉER UNE CARTE DE DOCUMENT =====
function createDocumentCard(doc) {
    const card = document.createElement('div');
    card.className = 'document-card';
    card.innerHTML = `
        <div class="document-header">
            <span class="document-type">${doc.type}</span>
            <h3>${doc.name}</h3>
        </div>
        <div class="document-body">
            <div class="document-info">
                <span class="document-pages">${doc.pages} pages</span>
            </div>
            <div class="document-actions">
                <button class="doc-btn doc-btn-view" onclick="previewDocument(${doc.id})">👁️ Voir</button>
                <button class="doc-btn doc-btn-download" onclick="downloadDocument(${doc.id})">⬇️ Télécharger</button>
            </div>
        </div>
    `;
    return card;
}

// ===== OBTENEZ TOUS LES DOCUMENTS =====
function getAllDocuments() {
    const allDocs = [];
    for (const session in documents) {
        for (const subject in documents[session]) {
            allDocs.push(...documents[session][subject]);
        }
    }
    return allDocs;
}

// ===== PRÉVISUALISER UN DOCUMENT =====
function previewDocument(docId) {
    const doc = getAllDocuments().find(d => d.id === docId);
    if (!doc) return;

    const modal = document.getElementById('preview-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalPreview = document.getElementById('modal-preview');
    const modalDownloadBtn = document.getElementById('modal-download-btn');

    modalTitle.textContent = doc.name;
    modalPreview.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">${doc.image}</div>
            <h3>${doc.name}</h3>
            <p><strong>Type:</strong> ${doc.type}</p>
            <p><strong>Nombre de pages:</strong> ${doc.pages}</p>
            <p style="margin-top: 1rem; color: #666; font-size: 0.9rem;">
                Cliquez sur "Télécharger" pour obtenir le document complet.
            </p>
            <div style="margin-top: 1.5rem; padding: 1rem; background: #f0f0f0; border-radius: 5px;">
                <p style="color: #666;">📄 Aperçu du document disponible</p>
                <p style="font-size: 0.85rem; color: #999;">Le contenu complet sera disponible après téléchargement.</p>
            </div>
        </div>
    `;

    modalDownloadBtn.onclick = function() {
        downloadDocument(docId);
    };

    modal.classList.add('show');
    showNotification(`📄 Prévisualisation de "${doc.name}"`, 'success');
}

// ===== TÉLÉCHARGER UN DOCUMENT =====
function downloadDocument(docId) {
    const doc = getAllDocuments().find(d => d.id === docId);
    if (!doc) return;

    // Simulation du téléchargement
    showNotification(`✅ Téléchargement de "${doc.name}" en cours...`, 'success');
    
    // Fermer le modal si ouvert
    const modal = document.getElementById('preview-modal');
    if (modal.classList.contains('show')) {
        modal.classList.remove('show');
    }

    // Simulation avec un délai
    setTimeout(() => {
        showNotification(`✅ "${doc.name}" a été téléchargé avec succès!`, 'success');
    }, 1500);
}

// ===== NOTIFICATION =====
function showNotification(message, type = 'info') {
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');

    toastMessage.textContent = message;
    toast.style.backgroundColor = getColorByType(type);
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function getColorByType(type) {
    const colors = {
        'success': '#28a745',
        'danger': '#dc3545',
        'warning': '#ffc107',
        'info': '#001f3f'
    };
    return colors[type] || colors['info'];
}

// ===== RECHERCHE =====
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
        showNotification('⚠️ Veuillez entrer un terme de recherche', 'warning');
        return;
    }

    const allDocs = getAllDocuments();
    const results = allDocs.filter(doc => 
        doc.name.toLowerCase().includes(query) || 
        doc.type.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        showNotification(`❌ Aucun résultat pour "${query}"`, 'warning');
        return;
    }

    showNotification(`🔍 ${results.length} résultat(s) trouvé(s) pour "${query}"`, 'success');

    // Afficher les résultats
    const resultsHtml = results.map(doc => {
        return `
            <div style="
                background: white;
                padding: 1rem;
                margin: 0.5rem 0;
                border-radius: 5px;
                border-left: 4px solid #FFD700;
                display: flex;
                justify-content: space-between;
                
