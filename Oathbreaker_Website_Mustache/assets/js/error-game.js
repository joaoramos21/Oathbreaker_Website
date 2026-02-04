/**
 * OATHBREAKER Error Page - Dynamic Image & Mini-Game
 * A playful, fantasy-themed 404 experience
 */

(function() {
    'use strict';

    // ========================================
    // RANDOM CHARACTER IMAGE LOADER
    // ========================================
    
    var characterData = [
        {
            image: 'assets/images/Error-Img/BeHel\'Mor - Gluttony.png',
            name: 'BeHel\'Mor',
            title: 'Consumed by the Void',
            message: 'Gluttony devours all paths... including this one.'
        },
        {
            image: 'assets/images/Error-Img/Galahad - Redemption.png',
            name: 'Galahad',
            title: 'Redemption Denied',
            message: 'The path to salvation does not lead here, seeker.'
        },
        {
            image: 'assets/images/Error-Img/Lancelot - Honor.png',
            name: 'Lancelot',
            title: 'Honor Misguided',
            message: 'Even the most valiant knight can lose their way.'
        },
        {
            image: 'assets/images/Error-Img/Mane - Pride.png',
            name: 'Mane',
            title: 'Pride Before the Fall',
            message: 'Your pride led you astray. This realm exists not.'
        },
        {
            image: 'assets/images/Error-Img/The Architect.png',
            name: 'The Architect',
            title: 'Unwritten Blueprint',
            message: 'This page was never designed. Return to the plans.'
        },
        {
            image: 'assets/images/Error-Img/The Seeker.png',
            name: 'The Seeker',
            title: 'Quest Unfulfilled',
            message: 'What you seek lies elsewhere, wanderer.'
        },
        {
            image: 'assets/images/Error-Img/Void.png',
            name: 'The Void',
            title: 'The Void Answers',
            message: 'You have gazed into nothingness... and found it.'
        },
        {
            image: 'assets/images/Error-Img/Watcher.png',
            name: 'The Watcher',
            title: 'Observed and Lost',
            message: 'The Watcher sees all... except this page.'
        },
        {
            image: 'assets/images/Error-Img/Crest.png',
            name: 'Oathbreaker Crest',
            title: 'Oath Unfulfilled',
            message: 'The seal remains, but the path is broken.'
        },
        {
            image: 'assets/images/Error-Img/comunity.png',
            name: 'Lost Community',
            title: 'Wanderers United',
            message: 'Even together, we cannot find what does not exist.'
        }
    ];

    function loadRandomCharacter() {
        var img = document.getElementById('random-character-img');
        if (!img) return;
        
        // Select random character
        var randomIndex = Math.floor(Math.random() * characterData.length);
        var character = characterData[randomIndex];
        
        // Add cache-busting timestamp to prevent caching
        var cacheBuster = '?t=' + Date.now();
        
        img.src = character.image + cacheBuster;
        img.alt = character.name;
        
        // Update text based on character
        var titleEl = document.getElementById('error-title');
        var messageEl = document.getElementById('error-message');
        
        if (titleEl) titleEl.textContent = character.title;
        if (messageEl) messageEl.textContent = character.message;
        
        // Add loaded class for animation
        img.onload = function() {
            img.classList.add('loaded');
            var charContainer = document.getElementById('error-character');
            if (charContainer) {
                charContainer.classList.add('visible');
            }
        };
    }

    // ========================================
    // FLOATING PARTICLES
    // ========================================
    
    function createParticles() {
        var container = document.getElementById('error-particles');
        if (!container) return;
        
        var particleCount = 20;
        
        for (var i = 0; i < particleCount; i++) {
            var particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (5 + Math.random() * 5) + 's';
            particle.style.opacity = 0.3 + Math.random() * 0.5;
            particle.style.width = particle.style.height = (3 + Math.random() * 5) + 'px';
            container.appendChild(particle);
        }
    }

    // ========================================
    // SOUL RUNNER MINI-GAME
    // ========================================
    
    var Game = {
        canvas: null,
        ctx: null,
        isRunning: false,
        isGameOver: false,
        score: 0,
        highScore: 0,
        animationFrame: null,
        lastTime: 0,
        
        // Game objects
        player: {
            x: 80,
            y: 0,
            width: 40,
            height: 50,
            velocityY: 0,
            isJumping: false,
            jumpForce: -15,
            gravity: 0.8,
            groundY: 0
        },
        
        obstacles: [],
        souls: [],
        groundTiles: [],
        
        // Game settings
        speed: 5,
        spawnTimer: 0,
        soulTimer: 0,
        
        init: function() {
            this.canvas = document.getElementById('game-canvas');
            if (!this.canvas) return;
            
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            
            // Load high score from localStorage
            try {
                this.highScore = parseInt(localStorage.getItem('oathbreaker_highscore')) || 0;
                var highScoreEl = document.getElementById('high-score');
                if (highScoreEl) highScoreEl.textContent = this.highScore;
            } catch(e) {}
            
            // Event listeners
            window.addEventListener('resize', this.resize.bind(this));
            
            // Controls
            var self = this;
            document.addEventListener('keydown', function(e) {
                if ((e.code === 'Space' || e.key === ' ') && self.isRunning && !self.isGameOver) {
                    e.preventDefault();
                    self.jump();
                }
            });
            
            this.canvas.addEventListener('click', function() {
                if (self.isRunning && !self.isGameOver) {
                    self.jump();
                }
            });
            
            this.canvas.addEventListener('touchstart', function(e) {
                if (self.isRunning && !self.isGameOver) {
                    e.preventDefault();
                    self.jump();
                }
            }, { passive: false });
        },
        
        resize: function() {
            if (!this.canvas) return;
            
            var container = document.getElementById('minigame-container');
            if (container) {
                this.canvas.width = Math.min(800, container.offsetWidth - 40);
                this.canvas.height = Math.min(400, window.innerHeight * 0.5);
            } else {
                this.canvas.width = 800;
                this.canvas.height = 400;
            }
            
            this.player.groundY = this.canvas.height - 80;
            this.player.y = this.player.groundY;
            
            // Reinitialize ground tiles
            this.initGround();
        },
        
        initGround: function() {
            this.groundTiles = [];
            var tileWidth = 60;
            var numTiles = Math.ceil(this.canvas.width / tileWidth) + 2;
            
            for (var i = 0; i < numTiles; i++) {
                this.groundTiles.push({
                    x: i * tileWidth,
                    width: tileWidth
                });
            }
        },
        
        start: function() {
            this.reset();
            this.isRunning = true;
            this.isGameOver = false;
            
            var instructions = document.getElementById('game-instructions');
            var gameOver = document.getElementById('game-over-screen');
            if (instructions) instructions.classList.remove('visible');
            if (gameOver) gameOver.classList.remove('visible');
            
            this.lastTime = performance.now();
            this.loop();
        },
        
        reset: function() {
            this.score = 0;
            this.speed = 5;
            this.obstacles = [];
            this.souls = [];
            this.spawnTimer = 0;
            this.soulTimer = 0;
            this.player.y = this.player.groundY;
            this.player.velocityY = 0;
            this.player.isJumping = false;
            
            var scoreEl = document.getElementById('game-score');
            if (scoreEl) scoreEl.textContent = '0';
        },
        
        jump: function() {
            if (!this.player.isJumping) {
                this.player.velocityY = this.player.jumpForce;
                this.player.isJumping = true;
            }
        },
        
        loop: function() {
            if (!this.isRunning) return;
            
            var currentTime = performance.now();
            var deltaTime = (currentTime - this.lastTime) / 16.67; // Normalize to ~60fps
            this.lastTime = currentTime;
            
            this.update(deltaTime);
            this.draw();
            
            var self = this;
            this.animationFrame = requestAnimationFrame(function() {
                self.loop();
            });
        },
        
        update: function(dt) {
            if (this.isGameOver) return;
            
            // Update player physics
            this.player.velocityY += this.player.gravity * dt;
            this.player.y += this.player.velocityY * dt;
            
            if (this.player.y >= this.player.groundY) {
                this.player.y = this.player.groundY;
                this.player.velocityY = 0;
                this.player.isJumping = false;
            }
            
            // Update ground tiles
            for (var i = 0; i < this.groundTiles.length; i++) {
                this.groundTiles[i].x -= this.speed * dt;
                if (this.groundTiles[i].x + this.groundTiles[i].width < 0) {
                    var maxX = 0;
                    for (var j = 0; j < this.groundTiles.length; j++) {
                        maxX = Math.max(maxX, this.groundTiles[j].x);
                    }
                    this.groundTiles[i].x = maxX + this.groundTiles[i].width;
                }
            }
            
            // Spawn obstacles
            this.spawnTimer += dt;
            if (this.spawnTimer > 80 + Math.random() * 60) {
                this.spawnTimer = 0;
                this.spawnObstacle();
            }
            
            // Spawn souls
            this.soulTimer += dt;
            if (this.soulTimer > 40 + Math.random() * 30) {
                this.soulTimer = 0;
                this.spawnSoul();
            }
            
            // Update obstacles
            for (var i = this.obstacles.length - 1; i >= 0; i--) {
                this.obstacles[i].x -= this.speed * dt;
                
                if (this.obstacles[i].x + this.obstacles[i].width < 0) {
                    this.obstacles.splice(i, 1);
                    continue;
                }
                
                // Collision detection
                if (this.checkCollision(this.player, this.obstacles[i])) {
                    this.gameOver();
                    return;
                }
            }
            
            // Update souls
            for (var i = this.souls.length - 1; i >= 0; i--) {
                this.souls[i].x -= this.speed * dt;
                this.souls[i].floatOffset += 0.1 * dt;
                
                if (this.souls[i].x + this.souls[i].width < 0) {
                    this.souls.splice(i, 1);
                    continue;
                }
                
                // Collect soul
                if (this.checkCollision(this.player, this.souls[i])) {
                    this.souls.splice(i, 1);
                    this.score += 10;
                    var scoreEl = document.getElementById('game-score');
                    if (scoreEl) scoreEl.textContent = this.score;
                }
            }
            
            // Increase difficulty
            this.speed = 5 + Math.floor(this.score / 50) * 0.5;
        },
        
        spawnObstacle: function() {
            var types = ['spike', 'shadow', 'pillar'];
            var type = types[Math.floor(Math.random() * types.length)];
            
            var obstacle = {
                x: this.canvas.width,
                y: this.player.groundY,
                width: 30,
                height: 50,
                type: type
            };
            
            if (type === 'spike') {
                obstacle.width = 25;
                obstacle.height = 40;
                obstacle.y = this.player.groundY + 10;
            } else if (type === 'pillar') {
                obstacle.width = 20;
                obstacle.height = 70;
                obstacle.y = this.player.groundY - 20;
            }
            
            this.obstacles.push(obstacle);
        },
        
        spawnSoul: function() {
            this.souls.push({
                x: this.canvas.width,
                y: this.player.groundY - 50 - Math.random() * 80,
                width: 20,
                height: 20,
                floatOffset: 0
            });
        },
        
        checkCollision: function(a, b) {
            var padding = 8; // Forgiving collision
            return a.x + padding < b.x + b.width &&
                   a.x + a.width - padding > b.x &&
                   a.y + padding < b.y + b.height &&
                   a.y + a.height - padding > b.y;
        },
        
        gameOver: function() {
            this.isGameOver = true;
            this.isRunning = false;
            
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            
            // Update high score
            if (this.score > this.highScore) {
                this.highScore = this.score;
                try {
                    localStorage.setItem('oathbreaker_highscore', this.highScore);
                } catch(e) {}
                var highScoreEl = document.getElementById('high-score');
                if (highScoreEl) highScoreEl.textContent = this.highScore;
            }
            
            var finalScore = document.getElementById('final-score');
            var gameOverScreen = document.getElementById('game-over-screen');
            if (finalScore) finalScore.textContent = this.score;
            if (gameOverScreen) gameOverScreen.classList.add('visible');
        },
        
        draw: function() {
            var ctx = this.ctx;
            var width = this.canvas.width;
            var height = this.canvas.height;
            
            // Clear canvas with obsidian gradient
            var gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, '#1A1A1A');
            gradient.addColorStop(1, '#0D0D0D');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
            
            // Draw distant mountains/ruins silhouette
            ctx.fillStyle = '#2a2a2a';
            ctx.beginPath();
            ctx.moveTo(0, height - 120);
            for (var m = 0; m <= width; m += 50) {
                var h = 30 + Math.sin(m * 0.02) * 20 + Math.cos(m * 0.01) * 15;
                ctx.lineTo(m, height - 100 - h);
            }
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.fill();
            
            // Draw stars with bronze/gold colors
            ctx.fillStyle = '#D6B36A';
            for (var i = 0; i < 30; i++) {
                var x = (i * 37 + this.score * 0.1) % width;
                var y = (i * 23) % (height - 150);
                var size = 1 + (i % 3);
                ctx.globalAlpha = 0.2 + (i % 5) * 0.1;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            
            // Draw ground with gradient
            var groundGradient = ctx.createLinearGradient(0, this.player.groundY + this.player.height, 0, height);
            groundGradient.addColorStop(0, '#2a2020');
            groundGradient.addColorStop(1, '#1a1515');
            ctx.fillStyle = groundGradient;
            ctx.fillRect(0, this.player.groundY + this.player.height, width, height);
            
            // Ground line with gold glow
            ctx.shadowColor = '#A86A2A';
            ctx.shadowBlur = 10;
            ctx.strokeStyle = '#A86A2A';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, this.player.groundY + this.player.height);
            ctx.lineTo(width, this.player.groundY + this.player.height);
            ctx.stroke();
            ctx.shadowBlur = 0;
            
            // Draw ground tiles pattern
            ctx.fillStyle = '#A86A2A';
            ctx.globalAlpha = 0.15;
            for (var i = 0; i < this.groundTiles.length; i++) {
                var tile = this.groundTiles[i];
                ctx.fillRect(tile.x, this.player.groundY + this.player.height + 5, tile.width - 5, 10);
            }
            ctx.globalAlpha = 1;
            
            // Draw souls with golden glow
            for (var i = 0; i < this.souls.length; i++) {
                var soul = this.souls[i];
                var floatY = soul.y + Math.sin(soul.floatOffset) * 5;
                
                // Outer glow
                var soulGradient = ctx.createRadialGradient(
                    soul.x + soul.width/2, floatY + soul.height/2, 0,
                    soul.x + soul.width/2, floatY + soul.height/2, soul.width * 1.5
                );
                soulGradient.addColorStop(0, 'rgba(214, 179, 106, 0.8)');
                soulGradient.addColorStop(0.5, 'rgba(168, 106, 42, 0.4)');
                soulGradient.addColorStop(1, 'rgba(168, 106, 42, 0)');
                ctx.fillStyle = soulGradient;
                ctx.beginPath();
                ctx.arc(soul.x + soul.width/2, floatY + soul.height/2, soul.width * 1.5, 0, Math.PI * 2);
                ctx.fill();
                
                // Core with pulsing effect
                var pulse = 0.8 + Math.sin(soul.floatOffset * 2) * 0.2;
                ctx.fillStyle = '#F1D38A';
                ctx.beginPath();
                ctx.arc(soul.x + soul.width/2, floatY + soul.height/2, soul.width/2 * pulse, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Draw obstacles with themed colors
            for (var i = 0; i < this.obstacles.length; i++) {
                var obs = this.obstacles[i];
                
                if (obs.type === 'spike') {
                    // Dark spike with bronze outline
                    ctx.fillStyle = '#3A1F0F';
                    ctx.beginPath();
                    ctx.moveTo(obs.x + obs.width/2, obs.y);
                    ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
                    ctx.lineTo(obs.x, obs.y + obs.height);
                    ctx.closePath();
                    ctx.fill();
                    
                    ctx.strokeStyle = '#9C5A1A';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                } else if (obs.type === 'shadow') {
                    // Shadow creature with red eyes
                    ctx.fillStyle = '#1a1015';
                    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                    
                    // Wispy top
                    ctx.beginPath();
                    ctx.moveTo(obs.x, obs.y);
                    ctx.quadraticCurveTo(obs.x + obs.width/2, obs.y - 10, obs.x + obs.width, obs.y);
                    ctx.fill();
                    
                    // Glowing eyes
                    ctx.shadowColor = '#FF4444';
                    ctx.shadowBlur = 8;
                    ctx.fillStyle = '#FF4444';
                    ctx.beginPath();
                    ctx.arc(obs.x + 10, obs.y + 15, 3, 0, Math.PI * 2);
                    ctx.arc(obs.x + obs.width - 10, obs.y + 15, 3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                } else if (obs.type === 'pillar') {
                    // Stone pillar with runes
                    ctx.fillStyle = '#2a2520';
                    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                    
                    // Pillar top
                    ctx.fillStyle = '#3a3530';
                    ctx.fillRect(obs.x - 3, obs.y, obs.width + 6, 8);
                    
                    // Gold rune
                    ctx.strokeStyle = '#A86A2A';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(obs.x + obs.width/2, obs.y + 15);
                    ctx.lineTo(obs.x + obs.width/2, obs.y + obs.height - 10);
                    ctx.moveTo(obs.x + 5, obs.y + 25);
                    ctx.lineTo(obs.x + obs.width - 5, obs.y + 25);
                    ctx.stroke();
                }
            }
            
            // Draw player (warrior silhouette)
            var p = this.player;
            
            // Shadow beneath player
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.beginPath();
            ctx.ellipse(p.x + p.width/2, p.groundY + p.height, p.width/2 + 5, 6, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Cape flowing
            ctx.fillStyle = '#8b0000';
            ctx.beginPath();
            ctx.moveTo(p.x + 10, p.y + 15);
            var capeWave = Math.sin(Date.now() * 0.008) * 3;
            ctx.quadraticCurveTo(p.x - 10, p.y + 30 + capeWave, p.x - 5, p.y + 48);
            ctx.lineTo(p.x + 15, p.y + 42);
            ctx.closePath();
            ctx.fill();
            
            // Body armor
            ctx.fillStyle = '#A86A2A';
            ctx.fillRect(p.x + 10, p.y + 15, 20, 25);
            
            // Armor detail
            ctx.strokeStyle = '#D6B36A';
            ctx.lineWidth = 1;
            ctx.strokeRect(p.x + 12, p.y + 17, 16, 21);
            
            // Head with helmet
            ctx.fillStyle = '#A86A2A';
            ctx.beginPath();
            ctx.arc(p.x + p.width/2, p.y + 10, 10, 0, Math.PI * 2);
            ctx.fill();
            
            // Helmet visor
            ctx.fillStyle = '#0D0D0D';
            ctx.fillRect(p.x + 15, p.y + 8, 10, 4);
            
            // Sword with glow
            ctx.save();
            ctx.translate(p.x + p.width - 5, p.y + 20);
            ctx.rotate(-0.3);
            
            // Sword glow
            ctx.shadowColor = '#D6B36A';
            ctx.shadowBlur = 5;
            
            // Blade
            ctx.fillStyle = '#e0e0e0';
            ctx.fillRect(0, 0, 4, 25);
            
            // Gold hilt
            ctx.fillStyle = '#D6B36A';
            ctx.fillRect(-4, 0, 12, 5);
            ctx.shadowBlur = 0;
            ctx.restore();
            
            // Legs (animated)
            ctx.fillStyle = '#6a5030';
            var legOffset = p.isJumping ? 0 : Math.sin(Date.now() * 0.02) * 3;
            ctx.fillRect(p.x + 12, p.y + 38, 6, 12 + legOffset);
            ctx.fillRect(p.x + 22, p.y + 38, 6, 12 - legOffset);
        },
        
        close: function() {
            this.isRunning = false;
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            
            var container = document.getElementById('minigame-container');
            if (container) {
                container.classList.remove('active');
            }
        }
    };

    // ========================================
    // INITIALIZATION
    // ========================================
    
    function init() {
        // Load random character
        loadRandomCharacter();
        
        // Create particles
        createParticles();
        
        // Initialize game
        Game.init();
        
        // Click to open game
        var errorContainer = document.getElementById('error-container');
        var gameHint = document.getElementById('game-hint');
        
        if (errorContainer) {
            errorContainer.addEventListener('click', function(e) {
                // Don't trigger on buttons or links
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
                    e.target.closest('a') || e.target.closest('button') ||
                    e.target.closest('#minigame-container')) {
                    return;
                }
                
                var container = document.getElementById('minigame-container');
                if (container && !container.classList.contains('active')) {
                    container.classList.add('active');
                    if (gameHint) gameHint.style.display = 'none';
                    Game.resize();
                }
            });
        }
        
        // Start game button
        var startBtn = document.getElementById('start-game-btn');
        if (startBtn) {
            startBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                Game.start();
            });
        }
        
        // Restart button
        var restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                Game.start();
            });
        }
        
        // Close game button
        var closeBtn = document.getElementById('close-game-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                Game.close();
            });
        }
        
        // Close X button (top right)
        var closeXBtn = document.getElementById('close-game-x');
        if (closeXBtn) {
            closeXBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                Game.close();
            });
        }
        
        // Escape key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                Game.close();
            }
        });
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
