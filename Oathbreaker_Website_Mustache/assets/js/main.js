// Main JavaScript for site-wide functionality
// Cross-browser compatible version

(function() {
    'use strict';

    // Feature detection and polyfills
    // Polyfill for Element.closest() - Safari < 9, IE
    if (!Element.prototype.closest) {
        Element.prototype.closest = function(selector) {
            var el = this;
            while (el && el.nodeType === 1) {
                if (el.matches(selector)) return el;
                el = el.parentElement || el.parentNode;
            }
            return null;
        };
    }

    // Polyfill for Element.matches() - IE
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                    Element.prototype.webkitMatchesSelector;
    }

    // Polyfill for NodeList.forEach() - IE
    if (typeof NodeList !== 'undefined' && NodeList.prototype && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }

    // Allow browser to restore scroll position naturally
    if (window.history && window.history.scrollRestoration) {
        window.history.scrollRestoration = 'auto';
    }

    // Debounce utility for performance
    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this;
            var args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }

    // Main initialization
    function init() {
        initMobileMenu();
        initSmoothScrolling();
        initLazyLoading();
        initTomeAccordion();
        initTermsAccordion();
    }

    // Mobile menu functionality
    function initMobileMenu() {
        var burgerMenu = document.getElementById('burger-menu');
        var navMenu = document.getElementById('nav-menu');
        var menuOverlay = document.getElementById('menu-overlay');

        if (!burgerMenu || !navMenu) return;

        // Toggle menu on burger click
        burgerMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function() {
                closeMenu();
            });
        }

        // Close menu when clicking on a nav link
        var navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Close menu when resizing to desktop view
        var handleResize = debounce(function() {
            if (window.innerWidth >= 1024) {
                closeMenu();
            }
        }, 250);

        window.addEventListener('resize', handleResize);

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                closeMenu();
            }
        });

        function toggleMenu() {
            var isActive = burgerMenu.classList.contains('active');
            
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        function openMenu() {
            burgerMenu.classList.add('active');
            navMenu.classList.add('active');
            if (menuOverlay) {
                menuOverlay.classList.add('active');
            }
            document.body.style.overflow = 'hidden';
            
            // Focus trap for accessibility
            var firstLink = navMenu.querySelector('a');
            if (firstLink) {
                firstLink.focus();
            }
        }

        function closeMenu() {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        // Check for native smooth scroll support
        var supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;

        document.addEventListener('click', function(e) {
            var link = e.target.closest('a[href^="#"]');
            if (!link) return;

            var targetId = link.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            var headerHeight = 82; // Fixed header height
            var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            if (supportsNativeSmoothScroll) {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                // Fallback for browsers without smooth scroll
                window.scrollTo(0, targetPosition);
            }
        });
    }

    // Lazy loading for images (uses native loading="lazy" with fallback)
    function initLazyLoading() {
        // Check if browser supports native lazy loading
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading supported
            var lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(function(img) {
                img.src = img.dataset.src;
                img.loading = 'lazy';
            });
        } else {
            // Fallback: Intersection Observer API
            if ('IntersectionObserver' in window) {
                var lazyImageObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            var lazyImage = entry.target;
                            if (lazyImage.dataset.src) {
                                lazyImage.src = lazyImage.dataset.src;
                                lazyImage.removeAttribute('data-src');
                            }
                            lazyImageObserver.unobserve(lazyImage);
                        }
                    });
                }, {
                    rootMargin: '50px 0px',
                    threshold: 0.01
                });

                var lazyImages = document.querySelectorAll('img[data-src]');
                lazyImages.forEach(function(img) {
                    lazyImageObserver.observe(img);
                });
            } else {
                // Fallback: Load all images immediately
                var lazyImages = document.querySelectorAll('img[data-src]');
                lazyImages.forEach(function(img) {
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                });
            }
        }
    }

    // Tome of Knowledge FAQ Accordion
    function initTomeAccordion() {
        var questionHeaders = document.querySelectorAll('.question-header');
        
        if (!questionHeaders.length) return;
        
        questionHeaders.forEach(function(header) {
            header.addEventListener('click', function(e) {
                e.preventDefault();
                
                var questionItem = header.closest('.question-item');
                if (!questionItem) return;
                
                var isActive = questionItem.classList.contains('active');
                var parentCategory = questionItem.closest('.tome-category');
                
                // Optional: Close other open items in the same category
                if (parentCategory) {
                    var siblingItems = parentCategory.querySelectorAll('.question-item.active');
                    siblingItems.forEach(function(item) {
                        if (item !== questionItem) {
                            item.classList.remove('active');
                            var siblingHeader = item.querySelector('.question-header');
                            if (siblingHeader) {
                                siblingHeader.setAttribute('aria-expanded', 'false');
                            }
                        }
                    });
                }
                
                // Toggle current item
                if (isActive) {
                    questionItem.classList.remove('active');
                    header.setAttribute('aria-expanded', 'false');
                } else {
                    questionItem.classList.add('active');
                    header.setAttribute('aria-expanded', 'true');
                }
            });
            
            // Keyboard accessibility
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
                    e.preventDefault();
                    header.click();
                }
            });
        });
    }

    // Terms of Service Accordion
    function initTermsAccordion() {
        var termsHeaders = document.querySelectorAll('.terms-header');
        
        if (!termsHeaders.length) return;
        
        termsHeaders.forEach(function(header) {
            header.addEventListener('click', function(e) {
                e.preventDefault();
                
                var termsItem = header.closest('.terms-item');
                if (!termsItem) return;
                
                var isActive = termsItem.classList.contains('active');
                var parentCategory = termsItem.closest('.terms-category');
                
                // Close other open items in the same category
                if (parentCategory) {
                    var siblingItems = parentCategory.querySelectorAll('.terms-item.active');
                    siblingItems.forEach(function(item) {
                        if (item !== termsItem) {
                            item.classList.remove('active');
                            var siblingHeader = item.querySelector('.terms-header');
                            if (siblingHeader) {
                                siblingHeader.setAttribute('aria-expanded', 'false');
                            }
                        }
                    });
                }
                
                // Toggle current item
                if (isActive) {
                    termsItem.classList.remove('active');
                    header.setAttribute('aria-expanded', 'false');
                } else {
                    termsItem.classList.add('active');
                    header.setAttribute('aria-expanded', 'true');
                }
            });
            
            // Keyboard accessibility
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
                    e.preventDefault();
                    header.click();
                }
            });
        });
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
