// Premium Editorial Healthcare Blog - Core JavaScript Interactivity

// Sample Articles Database (Healthcare & Wellness)
const ARTICLES = [
  {
    id: 1,
    title: "How AI is Revolutionizing Modern Diagnostics & Clinical Care",
    excerpt: "New machine learning architectures are helping doctors identify pulmonary illnesses and cardiovascular issues years before symptoms manifest.",
    category: "technology",
    categoryLabel: "Health Tech",
    author: "Dr. Sarah Jenkins",
    date: "July 12, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    featured: true,
    editorsPick: true
  },
  {
    id: 2,
    title: "The Science of Circadian Rhythms: Optimizing Sleep Patterns",
    excerpt: "Understanding how exposure to blue light and regular wake patterns regulate melatonin production to maximize deep REM cycles.",
    category: "wellness",
    categoryLabel: "Wellness",
    author: "Michael Sterling, sleep therapist",
    date: "July 10, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    featured: false,
    editorsPick: true
  },
  {
    id: 3,
    title: "Cardiologist-Approved Habits for Longevity and Vitality",
    excerpt: "Five core lifestyle alterations, from micro-exercise patterns to heart-rate zone management, that dramatically reduce stroke risk.",
    category: "medicine",
    categoryLabel: "Medicine",
    author: "Dr. Aaron Patel, FACC",
    date: "July 08, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    featured: false,
    editorsPick: true
  },
  {
    id: 4,
    title: "Nutritional Myths Debunked: Intermittent Fasting vs. Calorie Deficits",
    excerpt: "A deep dive into metabolic research comparing cellular autophagy triggered by fasting with daily energy-in vs. energy-out approaches.",
    category: "nutrition",
    categoryLabel: "Nutrition",
    author: "Elena Rostov, RD",
    date: "July 07, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
    featured: false,
    editorsPick: true
  },
  {
    id: 5,
    title: "De-escalating Chronic Stress: Practical Vagus Nerve Stimulation",
    excerpt: "Neurological techniques, breathing protocols, and hot-cold therapies that trigger the parasympathetic response in under five minutes.",
    category: "wellness",
    categoryLabel: "Mental Health",
    author: "Claire Moreau, PsyD",
    date: "July 05, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80",
    featured: false,
    editorsPick: true
  },
  // Latest articles database
  {
    id: 6,
    title: "The Next Frontier: CRISPR Therapy for Inherited Heart Disease",
    excerpt: "Clinical trials begin for gene editing cures addressing hypertrophic cardiomyopathy, offering hope to millions worldwide.",
    category: "medicine",
    categoryLabel: "Medicine",
    author: "Dr. Sarah Jenkins",
    date: "July 03, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    featured: false,
    editorsPick: false
  },
  {
    id: 7,
    title: "Microbiome Health: How Gut Bacteria Shape Mood and Anxiety",
    excerpt: "Exploring the gut-brain axis and how dietary prebiotics directly influence neurotransmitter Synthesis including serotonin.",
    category: "nutrition",
    categoryLabel: "Nutrition",
    author: "Elena Rostov, RD",
    date: "July 01, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    featured: false,
    editorsPick: false
  },
  {
    id: 8,
    title: "Wearables & Biohacking: Tracking Biomarkers in Real Time",
    excerpt: "From continuous glucose monitors to heart rate variability tracking, how real-time insights are shaping preventative medical practices.",
    category: "technology",
    categoryLabel: "Health Tech",
    author: "Michael Sterling",
    date: "June 28, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80",
    featured: false,
    editorsPick: false
  },
  {
    id: 9,
    title: "Understanding Cognitive Fatigue in the Hybrid Work Era",
    excerpt: "Mental health experts discuss patterns of zoom-exhaustion and psychological protocols to reset concentration levels.",
    category: "wellness",
    categoryLabel: "Mental Health",
    author: "Claire Moreau, PsyD",
    date: "June 25, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80",
    featured: false,
    editorsPick: false
  },
  {
    id: 10,
    title: "Cardiology Breakthroughs: Synthesizing New Valve Tissues",
    excerpt: "Bio-engineered heart valves using patient-derived cells enter human clinical trial phase, promising lifetimes of bypass-free recovery.",
    category: "medicine",
    categoryLabel: "Medicine",
    author: "Dr. Aaron Patel, FACC",
    date: "June 20, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80",
    featured: false,
    editorsPick: false
  },
  {
    id: 11,
    title: "The Longevity Protocol: High-Intensity Interval Training vs Zone 2 Endurance",
    excerpt: "Physiology studies compare cellular mitochondrial respiration rates triggered by intense anaerobic bursts against prolonged steady-state cardio.",
    category: "wellness",
    categoryLabel: "Wellness",
    author: "Michael Sterling",
    date: "June 18, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    featured: false,
    editorsPick: false
  },
  {
    id: 12,
    title: "Plant-Based Nutrition: Key Biomarkers that Vegan Practitioners Must Monitor",
    excerpt: "From ferritin and serum B12 to methylmalonic acid, understanding essential panels to optimize long-term cognitive health.",
    category: "nutrition",
    categoryLabel: "Nutrition",
    author: "Elena Rostov, RD",
    date: "June 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    featured: false,
    editorsPick: false
  },
  {
    id: 13,
    title: "AI Diagnostics in Telehealth: What Rural Patients Need to Know",
    excerpt: "How remote screening systems are bridging diagnostic gaps, transmitting clinical imaging directly to cloud analysis hubs.",
    category: "technology",
    categoryLabel: "Health Tech",
    author: "Dr. Sarah Jenkins",
    date: "June 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    featured: false,
    editorsPick: false
  }
];

// Initialize State
let bookmarkedIds = JSON.parse(localStorage.getItem('pulse_bookmarks')) || [];
let activeCategoryFilter = 'all';
let currentPage = 1;
const ITEMS_PER_PAGE = 6;

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initSearchDialog();
  initCategoryFilters();
  renderArticles();
  initNewsletterForm();
});

// 1. Sticky Navbar Dynamic Shadow/Shrink
function initNavbarScroll() {
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
}

// 2. Dialog search management
function initSearchDialog() {
  const searchBtn = document.getElementById('search-trigger-btn');
  const headerSearchInput = document.getElementById('header-search-input');
  const searchDialog = document.getElementById('search-dialog');
  const closeDialogBtn = document.getElementById('close-search-btn');
  const searchInput = document.getElementById('search-input');
  
  if (searchDialog) {
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        searchDialog.showModal();
        setTimeout(() => searchInput.focus(), 100);
      });
    }

    if (headerSearchInput) {
      headerSearchInput.addEventListener('click', () => {
        const val = headerSearchInput.value;
        searchDialog.showModal();
        searchInput.value = val;
        searchInput.dispatchEvent(new Event('input'));
        headerSearchInput.value = '';
        headerSearchInput.blur();
        setTimeout(() => searchInput.focus(), 100);
      });
    }
    
    closeDialogBtn.addEventListener('click', () => {
      searchDialog.close();
    });
    
    // Close on backdrop click
    searchDialog.addEventListener('click', (e) => {
      if (e.target === searchDialog) {
        searchDialog.close();
      }
    });

    // Real-time search inside the dialog
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const resultsContainer = document.getElementById('search-results-list');
      
      if (!query) {
        resultsContainer.innerHTML = '';
        return;
      }

      const filtered = ARTICLES.filter(art => 
        art.title.toLowerCase().includes(query) || 
        art.excerpt.toLowerCase().includes(query) || 
        art.author.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        resultsContainer.innerHTML = `<p class="text-sm text-neutral-500 py-4 text-center">No articles found matching "${query}"</p>`;
        return;
      }

      resultsContainer.innerHTML = filtered.map(art => `
        <a href="#" class="block p-3 rounded-xl hover:bg-neutral-50 transition border border-transparent hover:border-neutral-100 group">
          <div class="flex items-center gap-3">
            <img src="${art.image}" class="w-12 h-12 rounded-lg object-cover" alt="">
            <div>
              <span class="text-xs uppercase tracking-wider text-[#E23744] font-semibold">${art.categoryLabel}</span>
              <h4 class="text-sm font-medium text-neutral-900 group-hover:text-[#E23744] transition line-clamp-1">${art.title}</h4>
              <p class="text-xs text-neutral-500">${art.author} • ${art.readTime}</p>
            </div>
          </div>
        </a>
      `).join('');
    });
  }
}

// 3. Category Filter buttons logic
function initCategoryFilters() {
  const buttons = document.querySelectorAll('.cat-filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('bg-[#E23744]', 'text-white'));
      buttons.forEach(b => b.classList.add('bg-neutral-100', 'text-neutral-700', 'hover:bg-neutral-200'));
      
      btn.classList.remove('bg-neutral-100', 'text-neutral-700', 'hover:bg-neutral-200');
      btn.classList.add('bg-[#E23744]', 'text-white');
      
      activeCategoryFilter = btn.dataset.category;
      currentPage = 1; // Reset to page 1 on category change
      renderArticles();
    });
  });
}

// 4. Render articles dynamically with Pagination (6 items per page)
function renderArticles() {
  const latestGrid = document.getElementById('latest-posts-grid');
  if (!latestGrid) return;

  // Filter latest articles
  const filtered = ARTICLES.filter(art => {
    if (activeCategoryFilter === 'all') return true;
    return art.category === activeCategoryFilter;
  });

  if (filtered.length === 0) {
    latestGrid.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <p class="text-neutral-500 text-lg">No articles found in this category.</p>
      </div>
    `;
    renderPagination(0);
    return;
  }

  // Slice list to display 6 articles per page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  latestGrid.innerHTML = paginatedArticles.map(art => {
    const isBookmarked = bookmarkedIds.includes(art.id);
    return `
      <article class="group bg-white rounded-3xl overflow-hidden border border-neutral-100 card-lift relative">
        <div class="zoom-img-container aspect-[16/10] relative">
          <img src="${art.image}" class="w-full h-full object-cover zoom-img" alt="${art.title}" loading="lazy">
          <button onclick="toggleBookmark(${art.id}, this)" class="absolute top-4 right-4 bg-white/95 backdrop-blur p-2.5 rounded-full shadow-sm text-neutral-500 hover:text-[#E23744] transition-colors focus:outline-none" aria-label="Bookmark article">
            <svg xmlns="http://www.w3.org/2000/svg" fill="${isBookmarked ? '#E23744' : 'none'}" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 transition-transform duration-200 ${isBookmarked ? 'text-[#E23744]' : ''}">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
        </div>
        
        <div class="p-6 md:p-8">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-xs uppercase tracking-wider font-semibold text-[#E23744] bg-[#E23744]/5 px-3 py-1 rounded-full">${art.categoryLabel}</span>
            <span class="text-xs text-neutral-400">${art.readTime}</span>
          </div>
          
          <h3 class="text-xl md:text-2xl font-medium text-neutral-900 group-hover:text-[#E23744] transition-colors line-clamp-2 mb-3">
            <a href="#" onclick="event.preventDefault();">${art.title}</a>
          </h3>
          
          <p class="text-neutral-500 text-sm leading-relaxed mb-6 line-clamp-3">${art.excerpt}</p>
          
          <div class="flex items-center justify-between pt-4 border-t border-neutral-100">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-[#E23744]/10 text-[#E23744] flex items-center justify-center font-bold text-xs uppercase">
                ${art.author.charAt(0)}
              </div>
              <span class="text-xs font-medium text-neutral-700">${art.author}</span>
            </div>
            <span class="text-xs text-neutral-400">${art.date}</span>
          </div>
        </div>
      </article>
    `;
  }).join('');

  renderPagination(filtered.length);
}

// 4.1. Render Premium Pagination Controls
function renderPagination(totalItems) {
  const container = document.getElementById('pagination-container');
  if (!container) return;

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = `
    <nav class="flex items-center justify-center gap-2 mt-12 py-4" aria-label="Pagination">
      <!-- Previous Button -->
      <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} 
        class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-neutral-200 hover:border-[#E23744] text-neutral-500 hover:text-[#E23744] bg-white transition duration-200 disabled:opacity-40 disabled:hover:border-neutral-200 disabled:hover:text-neutral-500 disabled:cursor-not-allowed">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      html += `
        <button class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#E23744] text-white text-sm font-semibold transition duration-200 shadow-sm">
          ${i}
        </button>
      `;
    } else {
      html += `
        <button onclick="changePage(${i})" 
          class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-neutral-200 hover:border-[#E23744] text-neutral-700 hover:text-[#E23744] bg-white text-sm font-semibold transition duration-200">
          ${i}
        </button>
      `;
    }
  }

  html += `
      <!-- Next Button -->
      <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} 
        class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-neutral-200 hover:border-[#E23744] text-neutral-500 hover:text-[#E23744] bg-white transition duration-200 disabled:opacity-40 disabled:hover:border-neutral-200 disabled:hover:text-neutral-500 disabled:cursor-not-allowed">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </nav>
  `;

  container.innerHTML = html;
}

// 4.2. Helper to switch pages
window.changePage = function(pageNumber) {
  currentPage = pageNumber;
  renderArticles();
  
  // Smooth scroll back to top of latest articles section
  const section = document.getElementById('latest-articles');
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 100,
      behavior: 'smooth'
    });
  }
};

// 5. Bookmark toggling system
window.toggleBookmark = function(id, buttonEl) {
  const index = bookmarkedIds.indexOf(id);
  const svg = buttonEl.querySelector('svg');
  
  if (index === -1) {
    bookmarkedIds.push(id);
    svg.setAttribute('fill', '#E23744');
    svg.classList.add('text-[#E23744]');
    showNotification("Article bookmarked successfully!");
  } else {
    bookmarkedIds.splice(index, 1);
    svg.setAttribute('fill', 'none');
    svg.classList.remove('text-[#E23744]');
    showNotification("Bookmark removed.");
  }
  
  localStorage.setItem('pulse_bookmarks', JSON.stringify(bookmarkedIds));
};

// 6. Custom toast notifications
function showNotification(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'bg-[#1C1C1C] text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-medium flex items-center gap-2 transform translate-y-4 opacity-0 transition duration-300';
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-[#E23744]">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    ${message}
  `;
  
  container.appendChild(toast);
  
  // Animation intro
  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 10);

  // Remove toast
  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


// 8. Newsletter custom interaction with user-valid state
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput.validity.valid) {
        showNotification("Thank you for subscribing to Pulse!");
        emailInput.value = '';
      }
    });
  }
}
