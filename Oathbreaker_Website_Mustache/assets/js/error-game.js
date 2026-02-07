/**
 * OATHBREAKER Página de Erro - Imagem Dinâmica e Mini-Jogo
 * Uma experiência de erro 404 divertida com tema de fantasia medieval
 * 
 * Este ficheiro contém:
 * - Sistema de carregamento aleatório de personagens
 * - Efeito de partículas flutuantes
 * - Mini-jogo "Soul Runner" (corredor de almas)
 */

(function() {
    'use strict';

    // ========================================
    // CARREGADOR DE IMAGENS ALEATÓRIAS DE PERSONAGENS
    // ========================================
    
    /**
     * Array com os dados de cada personagem disponível
     * Cada objeto contém: imagem, nome, título e mensagem personalizada
     * Estes dados são usados para mostrar um personagem aleatório na página de erro
     */
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

    /**
     * Carrega um personagem aleatório e atualiza a página
     * Esta função:
     * 1. Seleciona um personagem aleatório do array
     * 2. Atualiza a imagem do personagem
     * 3. Atualiza o título e a mensagem de erro
     * 4. Adiciona animação de entrada quando a imagem carrega
     */
    function loadRandomCharacter() {
        // Obter o elemento da imagem do personagem
        var img = document.getElementById('random-character-img');
        if (!img) return;
        
        // Selecionar um personagem aleatório
        var randomIndex = Math.floor(Math.random() * characterData.length);
        var character = characterData[randomIndex];
        
        // Adicionar timestamp para evitar que o browser use cache
        // Isto garante que a imagem seja sempre carregada de novo
        var cacheBuster = '?t=' + Date.now();
        
        // Definir o caminho da imagem e o texto alternativo
        img.src = character.image + cacheBuster;
        img.alt = character.name;
        
        // Atualizar o título e a mensagem na página com base no personagem
        var titleEl = document.getElementById('error-title');
        var messageEl = document.getElementById('error-message');
        
        if (titleEl) titleEl.textContent = character.title;
        if (messageEl) messageEl.textContent = character.message;
        
        // Quando a imagem terminar de carregar, adicionar classe para animação
        img.onload = function() {
            img.classList.add('loaded');
            var charContainer = document.getElementById('error-character');
            if (charContainer) {
                charContainer.classList.add('visible');
            }
        };
    }

    // ========================================
    // PARTÍCULAS FLUTUANTES
    // ========================================
    
    /**
     * Cria partículas flutuantes para efeito visual
     * As partículas têm posição, tamanho e timing de animação aleatórios
     * para criar um efeito orgânico e interessante
     */
    function createParticles() {
        // Obter o contentor das partículas
        var container = document.getElementById('error-particles');
        if (!container) return;
        
        // Número total de partículas a criar
        var particleCount = 20;
        
        // Criar cada partícula com propriedades aleatórias
        for (var i = 0; i < particleCount; i++) {
            var particle = document.createElement('div');
            particle.className = 'particle';
            
            // Posição horizontal aleatória (0% a 100%)
            particle.style.left = Math.random() * 100 + '%';
            
            // Atraso da animação aleatório (0s a 5s)
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            // Duração da animação aleatória (5s a 10s)
            particle.style.animationDuration = (5 + Math.random() * 5) + 's';
            
            // Opacidade aleatória (0.3 a 0.8)
            particle.style.opacity = 0.3 + Math.random() * 0.5;
            
            // Tamanho aleatório (3px a 8px)
            particle.style.width = particle.style.height = (3 + Math.random() * 5) + 'px';
            
            // Adicionar ao contentor
            container.appendChild(particle);
        }
    }

    // ========================================
    // MINI-JOGO "SOUL RUNNER" (CORREDOR DE ALMAS)
    // ========================================
    
    /**
     * Objeto principal do jogo
     * Contém todas as propriedades e métodos necessários para executar o mini-jogo
     */
    var Game = {
        // Elementos do canvas
        canvas: null,     // Elemento canvas HTML
        ctx: null,        // Contexto 2D para desenhar
        
        // Estado do jogo
        isRunning: false,     // Se o jogo está a correr
        isGameOver: false,    // Se o jogador perdeu
        score: 0,             // Pontuação atual
        highScore: 0,         // Melhor pontuação (guardada no localStorage)
        animationFrame: null, // ID do requestAnimationFrame
        lastTime: 0,          // Timestamp do último frame (para calcular deltaTime)
        
        // Objecto do jogador com todas as suas propriedades
        player: {
            x: 80,              // Posição horizontal fixa
            y: 0,               // Posição vertical (atualizada pela física)
            width: 40,          // Largura do jogador
            height: 50,         // Altura do jogador
            velocityY: 0,       // Velocidade vertical (afetada pela gravidade)
            isJumping: false,   // Se está no ar
            jumpForce: -15,     // Força do salto (negativa = para cima)
            gravity: 0.8,       // Força da gravidade
            groundY: 0          // Posição Y do chão
        },
        
        // Arrays para guardar os objectos do jogo
        obstacles: [],    // Obstáculos que o jogador deve evitar
        souls: [],        // Almas que o jogador pode apanhar para pontos
        groundTiles: [],  // Peças do chão (para efeito visual)
        
        // Configurações do jogo
        speed: 5,         // Velocidade de movimento dos objectos
        spawnTimer: 0,    // Temporizador para criar obstáculos
        soulTimer: 0,     // Temporizador para criar almas
        
        /**
         * Inicializa o jogo
         * Configura o canvas, carrega a pontuação máxima e adiciona event listeners
         */
        init: function() {
            // Obter o elemento canvas
            this.canvas = document.getElementById('game-canvas');
            if (!this.canvas) return;
            
            // Obter o contexto 2D para desenhar
            this.ctx = this.canvas.getContext('2d');
            
            // Ajustar tamanho do canvas
            this.resize();
            
            // Carregar a melhor pontuação do localStorage
            try {
                this.highScore = parseInt(localStorage.getItem('oathbreaker_highscore')) || 0;
                var highScoreEl = document.getElementById('high-score');
                if (highScoreEl) highScoreEl.textContent = this.highScore;
            } catch(e) {
                // Se houver erro ao aceder ao localStorage, ignorar
            }
            
            // Adicionar listener para redimensionar quando a janela muda de tamanho
            window.addEventListener('resize', this.resize.bind(this));
            
            // Guardar referência ao objecto Game para usar dentro dos callbacks
            var self = this;
            
            // Controlo por teclado - Tecla Espaço para saltar
            document.addEventListener('keydown', function(e) {
                if ((e.code === 'Space' || e.key === ' ') && self.isRunning && !self.isGameOver) {
                    e.preventDefault(); // Prevenir scroll da página
                    self.jump();
                }
            });
            
            // Controlo por clique no canvas - Clique para saltar
            this.canvas.addEventListener('click', function() {
                if (self.isRunning && !self.isGameOver) {
                    self.jump();
                }
            });
            
            // Controlo por toque (dispositivos móveis) - Toque para saltar
            this.canvas.addEventListener('touchstart', function(e) {
                if (self.isRunning && !self.isGameOver) {
                    e.preventDefault(); // Prevenir comportamentos por defeito do touch
                    self.jump();
                }
            }, { passive: false });
        },
        
        /**
         * Redimensiona o canvas para se adaptar ao ecrã
         * Também recalcula a posição do chão e reinicializa as peças do chão
         */
        resize: function() {
            if (!this.canvas) return;
            
            // Obter o contentor do mini-jogo
            var container = document.getElementById('minigame-container');
            if (container) {
                // Definir tamanho do canvas (máximo 800x400, ou tamanho do contentor)
                this.canvas.width = Math.min(800, container.offsetWidth - 40);
                this.canvas.height = Math.min(400, window.innerHeight * 0.5);
            } else {
                // Tamanho por defeito
                this.canvas.width = 800;
                this.canvas.height = 400;
            }
            
            // Calcular a posição Y do chão (80 pixels acima do fundo)
            this.player.groundY = this.canvas.height - 80;
            this.player.y = this.player.groundY;
            
            // Reinicializar as peças do chão com o novo tamanho
            this.initGround();
        },
        
        /**
         * Inicializa as peças do chão
         * Cria um array de peças que se movem para criar ilusão de movimento
         */
        initGround: function() {
            this.groundTiles = [];
            var tileWidth = 60; // Largura de cada peça
            
            // Calcular quantas peças são necessárias para cobrir o ecrã (mais 2 extra)
            var numTiles = Math.ceil(this.canvas.width / tileWidth) + 2;
            
            // Criar cada peça com a sua posição
            for (var i = 0; i < numTiles; i++) {
                this.groundTiles.push({
                    x: i * tileWidth,
                    width: tileWidth
                });
            }
        },
        
        /**
         * Inicia o jogo
         * Faz reset ao estado, esconde instruções e começa o loop principal
         */
        start: function() {
            // Reiniciar todo o estado do jogo
            this.reset();
            this.isRunning = true;
            this.isGameOver = false;
            
            // Esconder o ecrã de instruções e o ecrã de game over
            var instructions = document.getElementById('game-instructions');
            var gameOver = document.getElementById('game-over-screen');
            if (instructions) instructions.classList.remove('visible');
            if (gameOver) gameOver.classList.remove('visible');
            
            // Guardar o timestamp inicial e começar o loop
            this.lastTime = performance.now();
            this.loop();
        },
        
        /**
         * Reinicia o estado do jogo para os valores iniciais
         * Usado quando se começa um novo jogo
         */
        reset: function() {
            this.score = 0;           // Pontuação a zero
            this.speed = 5;           // Velocidade inicial
            this.obstacles = [];      // Limpar obstáculos
            this.souls = [];          // Limpar almas
            this.spawnTimer = 0;      // Reiniciar temporizador de obstáculos
            this.soulTimer = 0;       // Reiniciar temporizador de almas
            
            // Reiniciar posição e estado do jogador
            this.player.y = this.player.groundY;
            this.player.velocityY = 0;
            this.player.isJumping = false;
            
            // Atualizar a pontuação mostrada no ecrã
            var scoreEl = document.getElementById('game-score');
            if (scoreEl) scoreEl.textContent = '0';
        },
        
        /**
         * Faz o jogador saltar
         * Só funciona se o jogador não estiver já a saltar
         */
        jump: function() {
            if (!this.player.isJumping) {
                // Aplicar força de salto (velocidade negativa = movimento para cima)
                this.player.velocityY = this.player.jumpForce;
                this.player.isJumping = true;
            }
        },
        
        /**
         * Loop principal do jogo
         * Executa continuamente enquanto o jogo está a correr
         * Calcula o deltaTime para movimento consistente independente do FPS
         */
        loop: function() {
            if (!this.isRunning) return;
            
            // Calcular deltaTime (tempo desde o último frame)
            // Normalizado para ~60fps para movimento consistente
            var currentTime = performance.now();
            var deltaTime = (currentTime - this.lastTime) / 16.67;
            this.lastTime = currentTime;
            
            // Atualizar lógica do jogo
            this.update(deltaTime);
            
            // Desenhar o frame atual
            this.draw();
            
            // Agendar o próximo frame
            var self = this;
            this.animationFrame = requestAnimationFrame(function() {
                self.loop();
            });
        },
        
        /**
         * Atualiza toda a lógica do jogo
         * @param {number} dt - DeltaTime (tempo desde o último frame)
         */
        update: function(dt) {
            if (this.isGameOver) return;
            
            // ---- FÍSICA DO JOGADOR ----
            // Aplicar gravidade à velocidade vertical
            this.player.velocityY += this.player.gravity * dt;
            // Aplicar velocidade à posição
            this.player.y += this.player.velocityY * dt;
            
            // Verificar se o jogador aterrou no chão
            if (this.player.y >= this.player.groundY) {
                this.player.y = this.player.groundY;  // Não deixar passar o chão
                this.player.velocityY = 0;            // Parar o movimento vertical
                this.player.isJumping = false;        // Pode saltar de novo
            }
            
            // ---- MOVIMENTO DAS PEÇAS DO CHÃO ----
            // Move as peças para a esquerda para criar ilusão de movimento
            for (var i = 0; i < this.groundTiles.length; i++) {
                this.groundTiles[i].x -= this.speed * dt;
                
                // Se a peça saiu do ecrã pela esquerda, move-a para a direita
                if (this.groundTiles[i].x + this.groundTiles[i].width < 0) {
                    // Encontrar a peça mais à direita
                    var maxX = 0;
                    for (var j = 0; j < this.groundTiles.length; j++) {
                        maxX = Math.max(maxX, this.groundTiles[j].x);
                    }
                    // Posicionar esta peça à direita da última
                    this.groundTiles[i].x = maxX + this.groundTiles[i].width;
                }
            }
            
            // ---- CRIAÇÃO DE OBSTÁCULOS ----
            // Incrementar temporizador e criar obstáculo quando atingir o limite
            this.spawnTimer += dt;
            if (this.spawnTimer > 80 + Math.random() * 60) {
                this.spawnTimer = 0;
                this.spawnObstacle();
            }
            
            // ---- CRIAÇÃO DE ALMAS ----
            // Incrementar temporizador e criar alma quando atingir o limite
            this.soulTimer += dt;
            if (this.soulTimer > 40 + Math.random() * 30) {
                this.soulTimer = 0;
                this.spawnSoul();
            }
            
            // ---- ATUALIZAÇÃO DOS OBSTÁCULOS ----
            // Iterar de trás para a frente para poder remover elementos em segurança
            for (var i = this.obstacles.length - 1; i >= 0; i--) {
                // Mover obstáculo para a esquerda
                this.obstacles[i].x -= this.speed * dt;
                
                // Remover se saiu do ecrã
                if (this.obstacles[i].x + this.obstacles[i].width < 0) {
                    this.obstacles.splice(i, 1);
                    continue;
                }
                
                // Verificar colisão com o jogador
                if (this.checkCollision(this.player, this.obstacles[i])) {
                    this.gameOver();
                    return;
                }
            }
            
            // ---- ATUALIZAÇÃO DAS ALMAS ----
            for (var i = this.souls.length - 1; i >= 0; i--) {
                // Mover alma para a esquerda
                this.souls[i].x -= this.speed * dt;
                // Atualizar offset para efeito de flutuação
                this.souls[i].floatOffset += 0.1 * dt;
                
                // Remover se saiu do ecrã
                if (this.souls[i].x + this.souls[i].width < 0) {
                    this.souls.splice(i, 1);
                    continue;
                }
                
                // Verificar se o jogador apanhou a alma
                if (this.checkCollision(this.player, this.souls[i])) {
                    this.souls.splice(i, 1);  // Remover a alma
                    this.score += 10;         // Adicionar pontos
                    
                    // Atualizar pontuação no ecrã
                    var scoreEl = document.getElementById('game-score');
                    if (scoreEl) scoreEl.textContent = this.score;
                }
            }
            
            // ---- AUMENTO DE DIFICULDADE ----
            // A velocidade aumenta gradualmente com a pontuação
            this.speed = 5 + Math.floor(this.score / 50) * 0.5;
        },
        
        /**
         * Cria um novo obstáculo no lado direito do ecrã
         * O tipo é escolhido aleatoriamente: espigão, sombra ou pilar
         */
        spawnObstacle: function() {
            // Tipos de obstáculos disponíveis
            var types = ['spike', 'shadow', 'pillar'];
            var type = types[Math.floor(Math.random() * types.length)];
            
            // Criar obstáculo com propriedades base
            var obstacle = {
                x: this.canvas.width,       // Começa fora do ecrã à direita
                y: this.player.groundY,     // Posição vertical base
                width: 30,                  // Largura por defeito
                height: 50,                 // Altura por defeito
                type: type                  // Tipo do obstáculo
            };
            
            // Ajustar propriedades com base no tipo
            if (type === 'spike') {
                // Espigão - mais baixo e fino
                obstacle.width = 25;
                obstacle.height = 40;
                obstacle.y = this.player.groundY + 10;
            } else if (type === 'pillar') {
                // Pilar - mais alto e fino
                obstacle.width = 20;
                obstacle.height = 70;
                obstacle.y = this.player.groundY - 20;
            }
            
            // Adicionar ao array de obstáculos
            this.obstacles.push(obstacle);
        },
        
        /**
         * Cria uma nova alma para o jogador apanhar
         * A alma aparece a uma altura aleatória acima do chão
         */
        spawnSoul: function() {
            this.souls.push({
                x: this.canvas.width,                              // Começa fora do ecrã à direita
                y: this.player.groundY - 50 - Math.random() * 80,  // Altura aleatória
                width: 20,                                         // Tamanho da alma
                height: 20,
                floatOffset: 0                                     // Offset para animação de flutuação
            });
        },
        
        /**
         * Verifica se dois objectos estão a colidir
         * Usa uma margem de tolerância para tornar a colisão mais "justa"
         * @param {Object} a - Primeiro objecto (jogador)
         * @param {Object} b - Segundo objecto (obstáculo ou alma)
         * @returns {boolean} - True se houver colisão
         */
        checkCollision: function(a, b) {
            var padding = 8; // Margem de tolerância para colisão mais permissiva
            return a.x + padding < b.x + b.width &&
                   a.x + a.width - padding > b.x &&
                   a.y + padding < b.y + b.height &&
                   a.y + a.height - padding > b.y;
        },
        
        /**
         * Termina o jogo quando o jogador colide com um obstáculo
         * Atualiza a melhor pontuação se necessário e mostra o ecrã de game over
         */
        gameOver: function() {
            this.isGameOver = true;
            this.isRunning = false;
            
            // Parar o loop de animação
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            
            // Verificar se é uma nova melhor pontuação
            if (this.score > this.highScore) {
                this.highScore = this.score;
                
                // Guardar no localStorage para persistir entre sessões
                try {
                    localStorage.setItem('oathbreaker_highscore', this.highScore);
                } catch(e) {
                    // Ignorar erros de localStorage
                }
                
                // Atualizar o display da melhor pontuação
                var highScoreEl = document.getElementById('high-score');
                if (highScoreEl) highScoreEl.textContent = this.highScore;
            }
            
            // Mostrar a pontuação final e o ecrã de game over
            var finalScore = document.getElementById('final-score');
            var gameOverScreen = document.getElementById('game-over-screen');
            if (finalScore) finalScore.textContent = this.score;
            if (gameOverScreen) gameOverScreen.classList.add('visible');
        },
        
        /**
         * Desenha todo o jogo no canvas
         * Esta função é chamada a cada frame para renderizar os gráficos
         */
        draw: function() {
            var ctx = this.ctx;
            var width = this.canvas.width;
            var height = this.canvas.height;
            
            // ---- FUNDO COM GRADIENTE ----
            // Limpar o canvas com um gradiente escuro (obsidiana)
            var gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, '#1A1A1A');  // Topo mais claro
            gradient.addColorStop(1, '#0D0D0D');  // Fundo mais escuro
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
            
            // ---- SILHUETA DE MONTANHAS/RUÍNAS DISTANTES ----
            ctx.fillStyle = '#2a2a2a';
            ctx.beginPath();
            ctx.moveTo(0, height - 120);
            
            // Criar linha ondulada para simular montanhas
            for (var m = 0; m <= width; m += 50) {
                var h = 30 + Math.sin(m * 0.02) * 20 + Math.cos(m * 0.01) * 15;
                ctx.lineTo(m, height - 100 - h);
            }
            
            // Fechar o caminho e preencher
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.fill();
            
            // ---- ESTRELAS COM CORES BRONZE/DOURADO ----
            ctx.fillStyle = '#D6B36A';
            for (var i = 0; i < 30; i++) {
                // Posição calculada para parecer aleatória mas ser consistente
                var x = (i * 37 + this.score * 0.1) % width;
                var y = (i * 23) % (height - 150);
                var size = 1 + (i % 3);
                
                // Opacidade variada para dar profundidade
                ctx.globalAlpha = 0.2 + (i % 5) * 0.1;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;  // Restaurar opacidade
            
            // ---- CHÃO COM GRADIENTE ----
            var groundGradient = ctx.createLinearGradient(0, this.player.groundY + this.player.height, 0, height);
            groundGradient.addColorStop(0, '#2a2020');  // Mais claro no topo
            groundGradient.addColorStop(1, '#1a1515');  // Mais escuro no fundo
            ctx.fillStyle = groundGradient;
            ctx.fillRect(0, this.player.groundY + this.player.height, width, height);
            
            // ---- LINHA DO CHÃO COM BRILHO DOURADO ----
            ctx.shadowColor = '#A86A2A';  // Cor do brilho
            ctx.shadowBlur = 10;           // Intensidade do brilho
            ctx.strokeStyle = '#A86A2A';   // Cor da linha
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, this.player.groundY + this.player.height);
            ctx.lineTo(width, this.player.groundY + this.player.height);
            ctx.stroke();
            ctx.shadowBlur = 0;  // Desativar sombra

            // ---- PADRÃO DAS PEÇAS DO CHÃO ----
            ctx.fillStyle = '#A86A2A';
            ctx.globalAlpha = 0.15;  // Opacidade baixa para efeito subtil
            for (var i = 0; i < this.groundTiles.length; i++) {
                var tile = this.groundTiles[i];
                ctx.fillRect(tile.x, this.player.groundY + this.player.height + 5, tile.width - 5, 10);
            }
            ctx.globalAlpha = 1;
            
            // ---- DESENHAR ALMAS COM BRILHO DOURADO ----
            for (var i = 0; i < this.souls.length; i++) {
                var soul = this.souls[i];
                // Calcular posição Y com efeito de flutuação
                var floatY = soul.y + Math.sin(soul.floatOffset) * 5;
                
                // Brilho exterior (gradiente radial)
                var soulGradient = ctx.createRadialGradient(
                    soul.x + soul.width/2, floatY + soul.height/2, 0,     // Centro do gradiente
                    soul.x + soul.width/2, floatY + soul.height/2, soul.width * 1.5  // Raio exterior
                );
                soulGradient.addColorStop(0, 'rgba(214, 179, 106, 0.8)');   // Centro: dourado brilhante
                soulGradient.addColorStop(0.5, 'rgba(168, 106, 42, 0.4)');  // Meio: bronze
                soulGradient.addColorStop(1, 'rgba(168, 106, 42, 0)');      // Borda: transparente
                ctx.fillStyle = soulGradient;
                ctx.beginPath();
                ctx.arc(soul.x + soul.width/2, floatY + soul.height/2, soul.width * 1.5, 0, Math.PI * 2);
                ctx.fill();
                
                // Núcleo da alma com efeito pulsante
                var pulse = 0.8 + Math.sin(soul.floatOffset * 2) * 0.2;  // Varia entre 0.6 e 1.0
                ctx.fillStyle = '#F1D38A';
                ctx.beginPath();
                ctx.arc(soul.x + soul.width/2, floatY + soul.height/2, soul.width/2 * pulse, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // ---- DESENHAR OBSTÁCULOS ----
            for (var i = 0; i < this.obstacles.length; i++) {
                var obs = this.obstacles[i];
                
                if (obs.type === 'spike') {
                    // ESPIGÃO - Triângulo escuro com contorno bronze
                    ctx.fillStyle = '#3A1F0F';
                    ctx.beginPath();
                    ctx.moveTo(obs.x + obs.width/2, obs.y);           // Ponta do topo
                    ctx.lineTo(obs.x + obs.width, obs.y + obs.height); // Canto inferior direito
                    ctx.lineTo(obs.x, obs.y + obs.height);             // Canto inferior esquerdo
                    ctx.closePath();
                    ctx.fill();
                    
                    // Contorno bronze
                    ctx.strokeStyle = '#9C5A1A';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    
                } else if (obs.type === 'shadow') {
                    // CRIATURA SOMBRIA - Retângulo escuro com olhos vermelhos
                    ctx.fillStyle = '#1a1015';
                    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                    
                    // Parte de cima ondulada (efeito fantasmagórico)
                    ctx.beginPath();
                    ctx.moveTo(obs.x, obs.y);
                    ctx.quadraticCurveTo(obs.x + obs.width/2, obs.y - 10, obs.x + obs.width, obs.y);
                    ctx.fill();
                    
                    // Olhos brilhantes vermelhos
                    ctx.shadowColor = '#FF4444';  // Brilho vermelho
                    ctx.shadowBlur = 8;
                    ctx.fillStyle = '#FF4444';
                    ctx.beginPath();
                    ctx.arc(obs.x + 10, obs.y + 15, 3, 0, Math.PI * 2);              // Olho esquerdo
                    ctx.arc(obs.x + obs.width - 10, obs.y + 15, 3, 0, Math.PI * 2);  // Olho direito
                    ctx.fill();
                    ctx.shadowBlur = 0;
                    
                } else if (obs.type === 'pillar') {
                    // PILAR DE PEDRA - Com runas douradas
                    ctx.fillStyle = '#2a2520';
                    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                    
                    // Topo do pilar (mais largo)
                    ctx.fillStyle = '#3a3530';
                    ctx.fillRect(obs.x - 3, obs.y, obs.width + 6, 8);
                    
                    // Runas douradas
                    ctx.strokeStyle = '#A86A2A';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(obs.x + obs.width/2, obs.y + 15);           // Linha vertical
                    ctx.lineTo(obs.x + obs.width/2, obs.y + obs.height - 10);
                    ctx.moveTo(obs.x + 5, obs.y + 25);                      // Linha horizontal
                    ctx.lineTo(obs.x + obs.width - 5, obs.y + 25);
                    ctx.stroke();
                }
            }
            
            // ---- DESENHAR JOGADOR (SILHUETA DE GUERREIRO) ----
            var p = this.player;
            
            // Sombra debaixo do jogador
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.beginPath();
            ctx.ellipse(p.x + p.width/2, p.groundY + p.height, p.width/2 + 5, 6, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Capa a esvoaçar
            ctx.fillStyle = '#8b0000';  // Vermelho escuro
            ctx.beginPath();
            ctx.moveTo(p.x + 10, p.y + 15);
            // A onda da capa é calculada com base no tempo
            var capeWave = Math.sin(Date.now() * 0.008) * 3;
            ctx.quadraticCurveTo(p.x - 10, p.y + 30 + capeWave, p.x - 5, p.y + 48);
            ctx.lineTo(p.x + 15, p.y + 42);
            ctx.closePath();
            ctx.fill();
            
            // Armadura do corpo
            ctx.fillStyle = '#A86A2A';  // Bronze
            ctx.fillRect(p.x + 10, p.y + 15, 20, 25);
            
            // Detalhe da armadura (contorno)
            ctx.strokeStyle = '#D6B36A';  // Dourado
            ctx.lineWidth = 1;
            ctx.strokeRect(p.x + 12, p.y + 17, 16, 21);
            
            // Cabeça com elmo
            ctx.fillStyle = '#A86A2A';
            ctx.beginPath();
            ctx.arc(p.x + p.width/2, p.y + 10, 10, 0, Math.PI * 2);
            ctx.fill();
            
            // Viseira do elmo
            ctx.fillStyle = '#0D0D0D';
            ctx.fillRect(p.x + 15, p.y + 8, 10, 4);
            
            // Espada com brilho
            ctx.save();  // Guardar estado do canvas
            ctx.translate(p.x + p.width - 5, p.y + 20);  // Mover para posição da espada
            ctx.rotate(-0.3);  // Rodar ligeiramente
            
            // Brilho da espada
            ctx.shadowColor = '#D6B36A';
            ctx.shadowBlur = 5;
            
            // Lâmina
            ctx.fillStyle = '#e0e0e0';  // Prata
            ctx.fillRect(0, 0, 4, 25);
            
            // Punho dourado
            ctx.fillStyle = '#D6B36A';
            ctx.fillRect(-4, 0, 12, 5);
            ctx.shadowBlur = 0;
            ctx.restore();  // Restaurar estado do canvas
            
            // Pernas (animadas quando a andar)
            ctx.fillStyle = '#6a5030';
            // O offset das pernas alterna para simular movimento
            var legOffset = p.isJumping ? 0 : Math.sin(Date.now() * 0.02) * 3;
            ctx.fillRect(p.x + 12, p.y + 38, 6, 12 + legOffset);   // Perna esquerda
            ctx.fillRect(p.x + 22, p.y + 38, 6, 12 - legOffset);   // Perna direita
        },
        
        /**
         * Fecha o mini-jogo e volta à página de erro
         * Restaura o estado para permitir jogar novamente mais tarde
         */
        close: function() {
            this.isRunning = false;
            this.isGameOver = false;
            
            // Parar o loop de animação
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
                this.animationFrame = null;
            }
            
            // Esconder o contentor do mini-jogo
            var container = document.getElementById('minigame-container');
            if (container) {
                container.classList.remove('active');
            }
            
            // Restaurar o texto de dica para permitir reentrar no jogo
            var gameHint = document.getElementById('game-hint');
            if (gameHint) {
                gameHint.style.display = '';
            }
            
            // Esconder ecrãs de game over e mostrar instruções para a próxima vez
            var gameOverScreen = document.getElementById('game-over-screen');
            var instructions = document.getElementById('game-instructions');
            if (gameOverScreen) gameOverScreen.classList.remove('visible');
            if (instructions) instructions.classList.add('visible');
            
            // Fazer reset ao estado do jogo para a próxima sessão
            this.reset();
        }
    };

    // ========================================
    // INICIALIZAÇÃO
    // ========================================
    
    /**
     * Função de inicialização principal
     * Carrega todos os componentes da página de erro:
     * - Personagem aleatório
     * - Partículas flutuantes
     * - Mini-jogo
     * - Event listeners para interação
     */
    function init() {
        // Carregar um personagem aleatório
        loadRandomCharacter();
        
        // Criar as partículas decorativas
        createParticles();
        
        // Inicializar o mini-jogo
        Game.init();
        
        // Obter referências aos elementos necessários
        var errorContainer = document.getElementById('error-container');
        var gameHint = document.getElementById('game-hint');
        
        // Clique em qualquer parte da página abre o jogo
        if (errorContainer) {
            errorContainer.addEventListener('click', function(e) {
                // Não abrir o jogo se o clique foi num botão ou link
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
                    e.target.closest('a') || e.target.closest('button') ||
                    e.target.closest('#minigame-container')) {
                    return;
                }
                
                // Mostrar o contentor do mini-jogo
                var container = document.getElementById('minigame-container');
                if (container && !container.classList.contains('active')) {
                    container.classList.add('active');
                    // Esconder a dica
                    if (gameHint) gameHint.style.display = 'none';
                    // Ajustar o tamanho do canvas
                    Game.resize();
                }
            });
        }
        
        // Botão "Começar Jogo"
        var startBtn = document.getElementById('start-game-btn');
        if (startBtn) {
            startBtn.addEventListener('click', function(e) {
                e.stopPropagation();  // Impedir que o clique se propague
                Game.start();
            });
        }
        
        // Botão "Reiniciar" (após game over)
        var restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                Game.start();
            });
        }
        
        // Botão "Voltar ao Vazio" (fechar jogo após game over)
        var closeBtn = document.getElementById('close-game-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                Game.close();
            });
        }
        
        // Botão X no canto superior direito (fechar jogo a qualquer momento)
        var closeXBtn = document.getElementById('close-game-x');
        if (closeXBtn) {
            // Evento de clique para computadores
            closeXBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                Game.close();
            });
            
            // Evento de toque para dispositivos móveis
            closeXBtn.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation();
                Game.close();
            });
        }
        
        // Tecla Escape fecha o jogo
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                Game.close();
            }
        });
    }
    
    // ---- EXECUTAR QUANDO O DOM ESTIVER PRONTO ----
    // Verifica se o documento ainda está a carregar ou já carregou
    if (document.readyState === 'loading') {
        // Documento ainda a carregar - esperar pelo evento
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // Documento já carregado - executar imediatamente
        init();
    }
    
})();
