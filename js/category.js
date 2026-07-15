// Premium Editorial Healthcare Blog - Category Pages Controller
const ARTICLES = window.ARTICLES || [];

// Initialize State
let bookmarkedIds = JSON.parse(localStorage.getItem('pulse_bookmarks')) || [];
let currentPage = 1;
const ITEMS_PER_PAGE = 6;

// Detect Category from directory structure
// E.g. path ".../pushpanjali-blogs/wellness/index.html" -> wellness
const pathParts = window.location.pathname.split('/');
// Handle trailing slashes or index.html names
let categoryKey = "";
if (pathParts[pathParts.length - 1] === "index.html" || pathParts[pathParts.length - 1] === "") {
  categoryKey = pathParts[pathParts.length - 2];
} else {
  categoryKey = pathParts[pathParts.length - 1];
}

const CATEGORY_META = {
  medicine: {
    title: "Medicine & Clinical Research",
    desc: "Evidence-based medical updates, breakthroughs in cardiology, gene editing trials, and preventative healthcare guidelines."
  },
  wellness: {
    title: "Wellness & Sleep Science",
    desc: "Chronobiology protocols, vagus nerve stimulation, stress resilience, and evidence-based mental health practices."
  },
  nutrition: {
    title: "Nutrition & Metabolic Health",
    desc: "Scientific updates on dietary patterns, calorie management, glucose biohacking, and gut microbiome optimization."
  },
  technology: {
    title: "Health Tech & Digital Diagnostics",
    desc: "AI innovations in clinical settings, medical diagnostics, mobile wearables integration, and remote patient monitoring."
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initSearchDialog();
  setupCategoryHeader();
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

// 2. Search Dialog
function initSearchDialog() {
  const searchInput = document.getElementById('search-input');
  const closeDialogBtn = document.getElementById('close-search-btn');
  const searchDialog = document.getElementById('search-dialog');
  const headerSearchInput = document.getElementById('header-search-input');

  if (headerSearchInput && searchDialog) {
    headerSearchInput.addEventListener('click', () => {
      searchDialog.showModal();
      setTimeout(() => searchInput.focus(), 100);
    });
  }

  if (closeDialogBtn && searchDialog) {
    closeDialogBtn.addEventListener('click', () => {
      searchDialog.close();
    });
  }

  if (searchDialog) {
    searchDialog.addEventListener('click', (e) => {
      if (e.target === searchDialog) {
        searchDialog.close();
      }
    });
  }

  if (searchInput) {
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
        <a href="../${art.category}/${art.slug}.html" class="block p-3 rounded-xl hover:bg-neutral-50 transition border border-transparent hover:border-neutral-100 group">
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

// 3. Set page titles based on detected category
function setupCategoryHeader() {
  const meta = CATEGORY_META[categoryKey];
  if (!meta) return;

  const titleEl = document.getElementById('category-page-title');
  const descEl = document.getElementById('category-page-desc');
  const breadcrumbEl = document.getElementById('category-breadcrumb-current');

  if (titleEl) titleEl.textContent = meta.title;
  if (descEl) descEl.textContent = meta.desc;
  if (breadcrumbEl) breadcrumbEl.textContent = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
}

// 4. Render category articles with Pagination
function renderArticles() {
  const latestGrid = document.getElementById('latest-posts-grid');
  if (!latestGrid) return;

  const filtered = ARTICLES.filter(art => art.category === categoryKey);

  if (filtered.length === 0) {
    latestGrid.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <p class="text-neutral-500 text-lg">No articles found in this category.</p>
      </div>
    `;
    renderPagination(0);
    return;
  }

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
            <a href="${art.slug}.html">${art.title}</a>
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

// 4.1. Pagination Rendering
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

// Helper to switch pages
window.changePage = function(pageNumber) {
  currentPage = pageNumber;
  renderArticles();
  
  const section = document.getElementById('category-landing-content');
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
  
  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// 7. Newsletter custom interaction
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
