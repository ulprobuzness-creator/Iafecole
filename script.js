
// Base de données simulée pour les matières et ressources
const subjectsData = {
    "6ème": ["Mathématiques", "Français", "Histoire-Géo", "SVT"],
    "5ème": ["Mathématiques", "Français", "Anglais", "Physique-Chimie"],
    "4ème": ["Mathématiques", "Français", "Histoire-Géo", "SVT"],
    "3ème": ["Mathématiques", "Français", "Physique-Chimie", "SVT"],
    "2nde (S & L)": ["Mathématiques S", "Français", "Physique", "Philosophie L"],
    "1ère (S & L)": ["Algèbre S", "Littérature L", "Chimie S", "Histoire"],
    "Terminal (D & A4)": ["Mathématiques D", "Philosophie A4", "SVT D", "Littérature A4"],
    "1ère Année Université": ["Analyse I", "Algorithmique", "Physique Quantique"],
    "2ème Année Université": ["Algèbre Linéaire", "Structure de Données", "Électromagnétisme"],
    "3ème Année Université": ["Base de Données", "Intelligence Artificielle", "Thermodynamique"]
};

// Gestion de l'historique de navigation pour le bouton retour
let navigationHistory = ['hero-section'];

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Affiche une section principale du menu
function showSection(sectionId) {
    const views = document.querySelectorAll('.content-view');
    views.forEach(view => view.classList.remove('active'));

    const targetView = document.getElementById(sectionId);
    if(targetView) {
        targetView.classList.add('active');
        if (navigationHistory[navigationHistory.length - 1] !== sectionId) {
            navigationHistory.push(sectionId);
        }
    }
    
    // Gérer l'affichage du bouton retour
    updateBackButton();
    // Fermer le menu si ouvert
    document.getElementById('sidebar').classList.remove('active');
}

// Génère dynamiquement les sous-sections et matières
function showSubjectPage(levelName) {
    const sectionTitle = document.getElementById('current-level-title');
    const container = document.querySelector('.subjects-grid');
    
    sectionTitle.innerText = `Ressources pour : ${levelName}`;
    container.innerHTML = ''; // Clear

    const subjects = subjectsData[levelName] || ["Tronc Commun"];

    subjects.forEach(subject => {
        const block = document.createElement('div');
        block.className = 'subject-block';
        block.innerHTML = `
            <h3>📚 ${subject}</h3>
            <ul class="document-list">
                <li>📄 Cours / Livre <button class="download-btn" onclick="triggerDownload('${subject}', 'Cours')">Télécharger</button></li>
                <li>📝 TD <button class="download-btn" onclick="triggerDownload('${subject}', 'TD')">Télécharger</button></li>
                <li>⏱️ Contrôle Continu <button class="download-btn" onclick="triggerDownload('${subject}', 'Contrôle')">Télécharger</button></li>
                <li>🎓 Session d'examen <button class="download-btn" onclick="triggerDownload('${subject}', 'Session')">Télécharger</button></li>
            </ul>
        `;
        container.appendChild(block);
    });

    showSection('subjects-section');
}

// Gestion des téléchargements & Limites du forfait
let monthlyDownloads = 0;
const downloadLimit = 4;

function triggerDownload(subject, type) {
    if (monthlyDownloads >= downloadLimit) {
        alert(`⚠️ Limite atteinte ! Vous avez épuisé vos ${downloadLimit} téléchargements gratuits ce mois-ci.\n\nPassez au forfait Premium (1 500 FCFA/mois) pour un accès illimité !`);
    } else {
        monthlyDownloads++;
        alert(`📥 Téléchargement réussi : ${type} - ${subject}.\nForfait Gratuit : ${monthlyDownloads}/${downloadLimit} téléchargements utilisés ce mois-ci.`);
    }
}

// Logique du bouton retour
function goBack() {
    if (navigationHistory.length > 1) {
        navigationHistory.pop(); // Supprime l'état actuel
        const previousSection = navigationHistory[navigationHistory.length - 1];
        
        const views = document.querySelectorAll('.content-view');
        views.forEach(view => view.classList.remove('active'));
        
        document.getElementById(previousSection).classList.add('active');
    }
    updateBackButton();
}

function updateBackButton() {
    const backBtn = document.getElementById('back-btn');
    if (navigationHistory.length > 1) {
        backBtn.style.display = 'block';
    } else {
        backBtn.style.display = 'none';
    }
}

// Barre de recherche simple
function executeSearch() {
    const query = document.getElementById('search-input').value.toLowerCase();
    if(!query) return alert("Veuillez saisir un mot-clé.");

    // Recherche de niveau correspondant
    let foundLevel = null;
    for (let level in subjectsData) {
        if (level.toLowerCase().includes(query) || subjectsData[level].some(s => s.toLowerCase().includes(query))) {
            foundLevel = level;
            break;
        }
    }

    if (foundLevel) {
        showSubjectPage(foundLevel);
    } else {
        alert("Aucun niveau ou matière spécifique trouvé pour cette recherche. Essayez '3ème' ou 'Mathématiques'.");
    }
}

function selectPlan(planName) {
    alert(`Merci d'avoir choisi le Plan ${planName} ! Cette fonctionnalité de paiement sera bientôt disponible.`);
          }
