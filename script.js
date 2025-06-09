// Base de données des prompts
        const prompts = [
            {
                id: 1,
                title: "Optimisation SEO On-Page",
                category: "SEO",
                content: "Génère une stratégie SEO on-page complète pour [sujet] en ciblant les mots-clés suivants : [liste de mots-clés]. Inclure méta descriptions, balises H1-H3 et recommandations de contenu.",
                tags: ["référencement", "contenu", "mots-clés"]
            },
            {
                id: 2,
                title: "Script YouTube Viral",
                category: "YouTube",
                content: "Crée un script captivant pour une vidéo YouTube sur [sujet] avec un hook en 5 secondes, structure en 3 actes et appel à l'action engageant. Durée : 8-10 minutes.",
                tags: ["vidéo", "marketing", "engagement"]
            },
            {
                id: 3,
                title: "Automatisation CRM",
                category: "Automatisation",
                content: "Développe un workflow d'automatisation CRM pour le suivi des leads avec déclencheurs basés sur le comportement, emails personnalisés et scoring des leads.",
                tags: ["marketing", "productivité", "lead"]
            },
            {
                id: 4,
                title: "Article de Blog Premium",
                category: "Rédaction",
                content: "Rédige un article approfondi (1500 mots) sur [sujet] avec introduction percutante, structure claire avec sous-titres, données récentes et conclusion actionnable.",
                tags: ["contenu", "long-form", "référencement"]
            },
            {
                id: 5,
                title: "Analyse Technique Trading",
                category: "Finance",
                content: "Produis une analyse technique complète du [crypto/action] incluant RSI, MACD, supports/résistances et prédiction de tendance sur 3 horizons temporels.",
                tags: ["trading", "crypto", "analyse"]
            },
            {
                id: 6,
                title: "Générateur de Scripts IA",
                category: "Code",
                content: "Code un script Python qui génère automatiquement des prompts d'IA optimisés à partir de mots-clés et d'exemples de structure. Doit inclure une interface CLI simple.",
                tags: ["python", "automatisation", "développement"]
            }
        ];

        // Initialisation
        document.addEventListener('DOMContentLoaded', () => {
            renderPrompts(prompts);
            setupEventListeners();
        });

        // Rendu des prompts
        function renderPrompts(promptsArray) {
            const container = document.getElementById('prompts-container');
            container.innerHTML = '';

            if (promptsArray.length === 0) {
                container.innerHTML = '<div class="no-results">Aucun prompt ne correspond à votre recherche</div>';
                return;
            }

            promptsArray.forEach(prompt => {
                const card = document.createElement('div');
                card.className = 'prompt-card';
                card.innerHTML = `
                    <div class="card-header">
                        <span class="card-category">${prompt.category}</span>
                        <h3 class="card-title">${prompt.title}</h3>
                    </div>
                    <div class="card-content">
                        <p class="prompt-text">${prompt.content}</p>
                    </div>
                    <div class="card-footer">
                        ${prompt.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                `;
                container.appendChild(card);
            });
        }

        // Filtrage et recherche
        function filterPrompts() {
            const searchTerm = document.getElementById('search').value.toLowerCase();
            const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
            
            const filtered = prompts.filter(prompt => {
                const matchesSearch = (
                    prompt.title.toLowerCase().includes(searchTerm) ||
                    prompt.content.toLowerCase().includes(searchTerm) ||
                    prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                    prompt.category.toLowerCase().includes(searchTerm)
                );
                
                const matchesCategory = activeCategory === 'all' || prompt.category === activeCategory;
                
                return matchesSearch && matchesCategory;
            });
            
            renderPrompts(filtered);
        }

        // Gestion des événements
        function setupEventListeners() {
            // Recherche en temps réel
            document.getElementById('search').addEventListener('input', filterPrompts);
            
            // Filtres par catégorie
            document.querySelectorAll('.filter-btn').forEach(button => {
                button.addEventListener('click', () => {
                    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    filterPrompts();
                });
            });
        }