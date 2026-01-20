// Updates page functionality - Advanced Filtering and Search

document.addEventListener('DOMContentLoaded', () => {
    const postsPerPage = 5;
    let currentPage = 1;
    let filteredPosts = [];
    let allPosts = [];
    let selectedCategory = '';

    // Get DOM elements
    const patchNotesContainer = document.getElementById('patch-notes-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const filterToggle = document.getElementById('filter-toggle');
    const categoryFilter = document.getElementById('category-filter');
    const filterCount = document.getElementById('filter-count');
    const activeFiltersDiv = document.getElementById('active-filters');
    const filterTagsContainer = document.getElementById('filter-tags-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');
    const noResults = document.getElementById('no-results');
    const pagination = document.getElementById('pagination');

    // Initialize
    function init() {
        if (!patchNotesContainer) return;

        // Get all patch items
        allPosts = Array.from(patchNotesContainer.querySelectorAll('.patch-item'));
        
        // Extract and display categories in each patch item
        extractAndDisplayCategories();
        
        filteredPosts = [...allPosts];
        
        // Show all posts initially
        allPosts.forEach(post => {
            post.style.display = 'block';
        });
        
        pagination.style.display = 'flex';
        noResults.style.display = 'none';
        
        // Set up pagination
        updatePagination();
        showPage(1);

        // Event listeners
        // Search only triggers on button click - no live/real-time filtering
        if (searchButton) {
            searchButton.addEventListener('click', handleSearch);
        }

        // Add Enter key support for search input
        if (searchInput) {
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent form submission if inside a form
                    handleSearch();
                }
            });
        }

        if (filterToggle) {
            filterToggle.addEventListener('click', toggleFilterDropdown);
        }

        if (categoryFilter) {
            categoryFilter.addEventListener('change', handleCategoryFilter);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => goToPage(currentPage - 1, true));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => goToPage(currentPage + 1, true));
        }

        // Close filter dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.controls-filter-wrapper') && categoryFilter.classList.contains('visible')) {
                categoryFilter.classList.remove('visible');
                filterToggle.classList.remove('active');
            }
        });
    }

    // Extract categories from each patch item and display them as tags
    function extractAndDisplayCategories() {
        allPosts.forEach(post => {
            const content = post.textContent.toLowerCase();
            const categoriesDiv = post.querySelector('.patch-categories');
            const categories = new Set();

            // Extract categories from content
            const categoryOptions = [
                'new features', 'bugfixes', 'balance changes', 
                'seasonal event', 'improvements', 'new content', 'major update'
            ];

            categoryOptions.forEach(cat => {
                if (content.includes(cat)) {
                    categories.add(cat);
                }
            });

            // Store categories in data attribute
            post.dataset.categories = Array.from(categories).join(',');

            // Display category tags
            categoriesDiv.innerHTML = '';
            if (categories.size > 0) {
                categories.forEach(category => {
                    const tag = document.createElement('span');
                    tag.className = 'patch-category-tag';
                    tag.textContent = capitalizeWords(category);
                    tag.addEventListener('click', () => {
                        categoryFilter.value = category;
                        handleCategoryFilter();
                        filterToggle.classList.add('active');
                    });
                    categoriesDiv.appendChild(tag);
                });
            }
        });
    }

    // Toggle filter dropdown visibility
    function toggleFilterDropdown() {
        const isVisible = categoryFilter.classList.contains('visible');
        categoryFilter.classList.toggle('visible', !isVisible);
        filterToggle.classList.toggle('active', !isVisible);
    }

    // Handle search
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        applyFilters(searchTerm);
    }

    // Handle category filter
    function handleCategoryFilter() {
        selectedCategory = categoryFilter.value.toLowerCase().trim();
        const searchTerm = searchInput.value.toLowerCase().trim();
        applyFilters(searchTerm);
        categoryFilter.classList.remove('visible');
        filterToggle.classList.remove('active');
    }

    // Apply both search and category filters
    function applyFilters(searchTerm) {
        if (searchTerm === '' && selectedCategory === '') {
            // Show all posts
            filteredPosts = [...allPosts];
            activeFiltersDiv.style.display = 'none';
        } else {
            // Filter posts based on search term and category
            filteredPosts = allPosts.filter(post => {
                const title = post.dataset.title.toLowerCase();
                const date = post.dataset.date.toLowerCase();
                const version = post.dataset.version.toLowerCase();
                const content = post.textContent.toLowerCase();
                const categories = post.dataset.categories.toLowerCase();

                // Search filter
                const matchesSearch = searchTerm === '' || 
                       title.includes(searchTerm) || 
                       date.includes(searchTerm) || 
                       version.includes(searchTerm) ||
                       content.includes(searchTerm);

                // Category filter
                const matchesCategory = selectedCategory === '' || 
                       categories.includes(selectedCategory);

                return matchesSearch && matchesCategory;
            });

            // Update active filters display
            updateActiveFiltersDisplay();
        }

        // Reset to page 1 and update display
        currentPage = 1;
        updatePagination();
        showPage(1);

        // Update filter button state
        updateFilterButtonState();

        // Show/hide no results message
        if (filteredPosts.length === 0) {
            noResults.style.display = 'block';
            pagination.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            pagination.style.display = 'flex';
        }
    }

    // Update active filters display
    function updateActiveFiltersDisplay() {
        filterTagsContainer.innerHTML = '';
        const filters = [];

        if (searchInput.value.trim()) {
            filters.push({
                type: 'search',
                label: `Search: "${searchInput.value.trim()}"`,
                value: searchInput.value.trim()
            });
        }

        if (selectedCategory) {
            filters.push({
                type: 'category',
                label: capitalizeWords(selectedCategory),
                value: selectedCategory
            });
        }

        if (filters.length > 0) {
            activeFiltersDiv.style.display = 'flex';
            filters.forEach((filter, index) => {
                const tag = document.createElement('div');
                tag.className = 'filter-tag';
                tag.innerHTML = `
                    <span>${filter.label}</span>
                    <div class="filter-tag-remove">✕</div>
                `;
                tag.querySelector('.filter-tag-remove').addEventListener('click', () => {
                    if (filter.type === 'search') {
                        searchInput.value = '';
                    } else if (filter.type === 'category') {
                        categoryFilter.value = '';
                        selectedCategory = '';
                    }
                    applyFilters(searchInput.value.toLowerCase().trim());
                });
                filterTagsContainer.appendChild(tag);
            });
        } else {
            activeFiltersDiv.style.display = 'none';
        }
    }

    // Update filter button state
    function updateFilterButtonState() {
        const hasFilters = selectedCategory || searchInput.value.trim();
        
        if (hasFilters) {
            filterToggle.classList.add('active');
            filterCount.style.display = 'inline-flex';
        } else {
            filterToggle.classList.remove('active');
            filterCount.style.display = 'none';
        }
    }

    // Show specific page
    function showPage(pageNumber) {
        currentPage = pageNumber;

        // Hide all posts
        allPosts.forEach(post => {
            post.style.display = 'none';
        });

        // Calculate start and end indices
        const startIndex = (pageNumber - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;

        // Show posts for current page
        const postsToShow = filteredPosts.slice(startIndex, endIndex);
        postsToShow.forEach(post => {
            post.style.display = 'block';
        });

        // Update pagination controls
        updatePaginationControls();
    }

    // Update pagination information
    function updatePagination() {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        totalPagesSpan.textContent = totalPages;
    }

    // Update pagination button states
    function updatePaginationControls() {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        
        currentPageSpan.textContent = currentPage;

        // Disable/enable buttons
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
        }

        if (nextBtn) {
            nextBtn.disabled = currentPage >= totalPages;
        }
    }

    // Go to specific page (scrollToTop defaults to false for programmatic calls)
    function goToPage(pageNumber, scrollToTop = false) {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }

        showPage(pageNumber);
        
        // Only scroll to top when explicitly requested (pagination button clicks)
        if (scrollToTop) {
            const updatesContent = document.getElementById('updates-content');
            const targetElement = updatesContent || document.body;
            
            // Get the target position
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            
            // Use scrollTo with fallback for Firefox mobile compatibility
            try {
                window.scrollTo({
                    top: targetPosition,
                    left: 0,
                    behavior: 'smooth'
                });
            } catch (e) {
                // Fallback for older browsers
                window.scrollTo(0, targetPosition);
            }
            
            // Additional fallback: setTimeout to ensure scroll happens
            setTimeout(() => {
                if (window.pageYOffset > targetPosition + 100 || window.pageYOffset < targetPosition - 100) {
                    window.scrollTo(0, targetPosition);
                }
            }, 100);
        }
    }

    // Utility: Capitalize words
    function capitalizeWords(str) {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    // Mobile: Initialize collapsible posts
    function initMobileCollapsible() {
        const isMobile = window.innerWidth < 768;
        const patchItems = document.querySelectorAll('.patch-item');
        
        patchItems.forEach(item => {
            const content = item.querySelector('.patch-content');
            const expandIndicator = item.querySelector('.patch-expand-indicator');
            
            if (isMobile) {
                // Remove expanded class on mobile by default
                item.classList.remove('expanded');
                
                // Add click handler for mobile
                if (content && !content.dataset.mobileHandler) {
                    content.dataset.mobileHandler = 'true';
                    content.addEventListener('click', (e) => {
                        // Only toggle if on mobile
                        if (window.innerWidth < 768) {
                            // Don't toggle if clicking a link
                            if (e.target.tagName === 'A') return;
                            
                            item.classList.toggle('expanded');
                            
                            // Update indicator text
                            if (expandIndicator) {
                                expandIndicator.textContent = item.classList.contains('expanded') 
                                    ? 'Tap to collapse' 
                                    : 'Tap to expand';
                            }
                        }
                    });
                }
            } else {
                // On desktop, ensure content is visible
                item.classList.add('expanded');
            }
        });
    }
    
    // Run on init and resize
    initMobileCollapsible();
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initMobileCollapsible, 150);
    });

    // Initialize the page
    init();
});
