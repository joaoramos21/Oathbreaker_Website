/**
 * Hero Video Background - Local Video Integration
 * Handles video playback with fallback to static banner image
 * Supports desktop and mobile with proper cross-browser compatibility
 */

(function() {
    'use strict';

    const FALLBACK_TIMEOUT = 5000; // 5 seconds to wait for video to start
    let videoStarted = false;
    let fallbackTimer = null;

    // Check if video container exists
    const videoContainer = document.getElementById('hero-video-container');
    if (!videoContainer) return;

    const video = document.getElementById('hero-video-player');
    if (!video) {
        console.log('Hero video: No video element found');
        showFallback();
        return;
    }

    // Detect if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        console.log('Hero video: User prefers reduced motion, showing static image');
        showFallback();
        return;
    }

    // Set up video event listeners
    function initVideo() {
        // Video can play
        video.addEventListener('canplay', function() {
            console.log('Hero video: Can play');
            attemptPlay();
        });

        // Video is playing
        video.addEventListener('playing', function() {
            videoStarted = true;
            clearTimeout(fallbackTimer);
            videoContainer.classList.add('video-playing');
            
            const heroSection = videoContainer.closest('.hero');
            if (heroSection) {
                heroSection.classList.add('video-active');
            }
            
            console.log('Hero video: Playing successfully');
        });

        // Video error
        video.addEventListener('error', function(e) {
            console.log('Hero video: Error loading video', e);
            showFallback();
        });

        // Video stalled
        video.addEventListener('stalled', function() {
            console.log('Hero video: Stalled, waiting...');
        });

        // Set fallback timer
        fallbackTimer = setTimeout(function() {
            if (!videoStarted) {
                console.log('Hero video: Timeout waiting for video to start');
                showFallback();
            }
        }, FALLBACK_TIMEOUT);

        // Attempt initial play
        attemptPlay();
    }

    function attemptPlay() {
        if (videoStarted) return;

        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(function() {
                // Autoplay started
                console.log('Hero video: Autoplay started');
            }).catch(function(error) {
                // Autoplay was prevented
                console.log('Hero video: Autoplay prevented', error.name);
                
                // On mobile, autoplay may be blocked - show fallback
                if (error.name === 'NotAllowedError') {
                    showFallback();
                }
            });
        }
    }

    function showFallback() {
        clearTimeout(fallbackTimer);
        
        // Pause and hide video
        if (video) {
            try {
                video.pause();
                video.removeAttribute('src');
                video.load();
            } catch (e) {
                // Ignore cleanup errors
            }
        }
        
        // Hide video container
        if (videoContainer) {
            videoContainer.style.display = 'none';
        }
        
        // Remove has-video class to show the ::before background image
        const heroSection = document.querySelector('.hero.has-video');
        if (heroSection) {
            heroSection.classList.remove('has-video');
            heroSection.classList.add('video-fallback');
        }
        
        console.log('Hero video: Showing fallback banner image');
    }

    // Handle visibility changes - pause/resume video when tab is hidden/visible
    document.addEventListener('visibilitychange', function() {
        if (!video || !videoStarted) return;
        
        try {
            if (document.hidden) {
                video.pause();
            } else {
                video.play();
            }
        } catch (e) {
            // Ignore visibility change errors
        }
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVideo);
    } else {
        initVideo();
    }

})();
