// Premium Editorial Healthcare Blog - Bookmarks Page Controller
const ARTICLES = window.ARTICLES || [];

// Initialize State
let bookmarkedIds = JSON.parse(localStorage.getItem('pulse_bookmarks')) || [];

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initSearchDialog();
  renderBookmarkedArticles();
  initNewsletterForm();
});

// 1. Sticky Navbar
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
        <a href="${art.category}/${art.slug}.html" class="block p-3 rounded-xl hover:bg-neutral-50 transition border border-transparent hover:border-neutral-100 group">
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

// 3. Render Bookmarked Articles
function renderBookmarkedArticles() {
  const grid = document.getElementById('bookmarked-posts-grid');
  if (!grid) return;

  const filtered = ARTICLES.filter(art => bookmarkedIds.includes(art.id));

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-20 text-center flex flex-col items-center justify-center space-y-6">
        <div class="w-20 h-20 rounded-full bg-neutral-50 text-neutral-400 flex items-center justify-center border border-neutral-100 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          </svg>
        </div>
        <div class="space-y-1">
          <h3 class="text-xl font-bold text-neutral-900">No bookmarked articles yet</h3>
          <p class="text-sm text-neutral-500 max-w-sm mx-auto">Explore clinical insights and biohacking protocols, and save them here to build your personalized reference library.</p>
        </div>
        <a href="index.html" class="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white text-sm font-semibold transition duration-200 shadow-md">
          Explore Articles
        </a>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(art => {
    return `
      <article class="group bg-white rounded-3xl overflow-hidden border border-neutral-100 card-lift relative">
        <div class="zoom-img-container aspect-[16/10] relative">
          <img src="${art.image}" class="w-full h-full object-cover zoom-img" alt="${art.title}" loading="lazy">
          <button onclick="removeBookmark(${art.id}, this)" class="absolute top-4 right-4 bg-white/95 backdrop-blur p-2.5 rounded-full shadow-sm text-[#E23744] hover:scale-110 active:scale-95 transition focus:outline-none" aria-label="Remove bookmark">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#E23744" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
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
            <a href="${art.category}/${art.slug}.html">${art.title}</a>
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
}

// Remove bookmark helper specific to bookmarks management page
window.removeBookmark = function(id, buttonEl) {
  const index = bookmarkedIds.indexOf(id);
  if (index !== -1) {
    bookmarkedIds.splice(index, 1);
    localStorage.setItem('pulse_bookmarks', JSON.stringify(bookmarkedIds));
    showNotification("Bookmark removed successfully.");
    renderBookmarkedArticles(); // Dynamically refresh DOM list
  }
};

// 4. Custom toast notification
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

// 5. Newsletter custom interaction
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
