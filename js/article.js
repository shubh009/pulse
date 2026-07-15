// Premium Editorial Healthcare Blog - Article Page Controller
const ARTICLES = window.ARTICLES || [];

// Initialize State
let bookmarkedIds = JSON.parse(localStorage.getItem('pulse_bookmarks')) || [];
const articleId = parseInt(document.body.dataset.articleId);

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initSearchDialog();
  initReadingProgressBar();
  initBookmarkButton();
  renderRelatedArticles();
  initNewsletterForm();
  initCopyLinkButton();
  injectPremiumLayout();
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

// 3. Reading Progress bar
function initReadingProgressBar() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;
    const progress = (scrollPosition / scrollHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

// 4. Bookmark Button Sync on Detail View
function initBookmarkButton() {
  const btn = document.getElementById('bookmark-article-btn');
  if (!btn) return;

  const svg = btn.querySelector('svg');
  const isSaved = bookmarkedIds.includes(articleId);

  if (isSaved && svg) {
    svg.setAttribute('fill', '#E23744');
    svg.classList.add('text-[#E23744]');
  }

  btn.addEventListener('click', () => {
    const index = bookmarkedIds.indexOf(articleId);
    if (index === -1) {
      bookmarkedIds.push(articleId);
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
  });
}

// 5. Copy Link Button
function initCopyLinkButton() {
  const btn = document.getElementById('share-copy-link-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        showNotification("Article link copied to clipboard!");
      })
      .catch(() => {
        showNotification("Failed to copy link.");
      });
  });
}

// 6. Renders Related articles based on same category tag
function renderRelatedArticles() {
  const container = document.getElementById('related-articles-grid');
  if (!container) return;

  const currentArticle = ARTICLES.find(art => art.id === articleId);
  if (!currentArticle) return;

  // Filter 3 posts in the same category (excluding current)
  const related = ARTICLES.filter(art => art.category === currentArticle.category && art.id !== articleId).slice(0, 3);
  
  if (related.length === 0) {
    // Fallback: load any latest articles
    const fallback = ARTICLES.filter(art => art.id !== articleId).slice(0, 3);
    related.push(...fallback);
  }

  container.innerHTML = related.map(art => `
    <article class="group bg-white rounded-3xl overflow-hidden border border-neutral-100 card-lift relative">
      <div class="zoom-img-container aspect-[16/10] relative">
        <img src="${art.image}" class="w-full h-full object-cover zoom-img" alt="${art.title}" loading="lazy">
      </div>
      <div class="p-6">
        <div class="flex items-center gap-3 mb-3">
          <span class="text-[10px] uppercase tracking-wider font-extrabold text-[#E23744]">${art.categoryLabel}</span>
          <span class="text-xs text-neutral-400">${art.readTime}</span>
        </div>
        <h4 class="text-base font-semibold text-neutral-900 group-hover:text-[#E23744] transition line-clamp-2 leading-snug">
          <a href="../${art.category}/${art.slug}.html">${art.title}</a>
        </h4>
      </div>
    </article>
  `).join('');
}

// 7. Custom toast notification
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

// 8. Newsletter custom interaction
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

// 9. Inject Premium Layout features dynamically
function injectPremiumLayout() {
  const articleBody = document.querySelector('main article.lg\\:col-span-8');
  if (articleBody) {
    // 1. Inject dropcap class to first paragraph
    const firstP = articleBody.querySelector('p');
    if (firstP) {
      firstP.classList.add('dropcap');
    }

    // 2. Inject takeaways summary box
    const currentArt = ARTICLES.find(art => art.id === articleId);
    let summaryText = "This brief clinical analysis covers key preventative insights, biological mechanisms, and evidence-based protocols to optimize long-term healthspan.";
    if (currentArt) {
      summaryText = `This editorial analysis outlines key insights regarding ${currentArt.title.toLowerCase()}. It covers scientific guidelines, clinical pathways, and actionable lifestyle protocols.`;
    }

    const summaryBox = document.createElement('div');
    summaryBox.className = 'takeaways-box mb-8';
    summaryBox.innerHTML = `
      <h4 class="text-xs uppercase font-extrabold tracking-widest text-[#E23744] mb-2 flex items-center gap-1.5 font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 text-[#E23744]">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 2.24a4.81 4.81 0 013.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-2.22 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        Executive Summary
      </h4>
      <p class="text-sm text-neutral-600 leading-relaxed">${summaryText}</p>
    `;
    articleBody.insertBefore(summaryBox, articleBody.firstChild);
  }
}

