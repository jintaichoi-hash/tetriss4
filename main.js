
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const playerScoreEl = document.getElementById('player-score');
const goalNotification = document.getElementById('goal-notification');
const countdownOverlay = document.getElementById('countdown-overlay');
const timerDisplay = document.getElementById('timer-display');
const startOverlay = document.getElementById('start-overlay');
const startButton = document.getElementById('start-button');
const gameOverOverlay = document.getElementById('game-over-overlay');
const gameOverMessage = document.getElementById('game-over-message');
const restartButton = document.getElementById('restart-button');
const themeToggle = document.getElementById('theme-toggle');
const soundToggle = document.getElementById('sound-toggle');
const languageToggle = document.getElementById('language-toggle');

const translations = {
    en: {
        pageTitle: 'Ice Hockey Game',
        navPlay: 'Play', navHowToPlay: 'How to Play', navAbout: 'About',
        gameTitle: 'ICE HOCKEY', startGame: 'START GAME', restart: 'RESTART', goal: 'GOAL!',
        howToPlay: 'How to Play', controls: 'Controls',
        controlsDescription: 'Move with <strong>WASD</strong> or the <strong>arrow keys</strong>. Aim with the <strong>mouse</strong> and left-click to fire the shown tetromino.',
        objective: 'Objective',
        objectiveDescription: 'Clear <strong>5 matching tetrominoes</strong> before time runs out. Shoot the same shape as a falling piece to score.',
        rules: 'Rules', rulesDescription: 'Pieces fall from the top. Match the shot shape to a falling shape to clear it and score. Hitting a different shape or letting a piece reach the bottom ends the game.',
        matchCleared: 'SHAPE MATCH!', wrongShape: 'WRONG SHAPE! GAME OVER',
        aboutTitle: 'About Harky Hockey',
        aboutDescription1: 'Harky Hockey is a fast-paced, arcade-style ice hockey game built with modern web technologies. Our goal is to provide a smooth, responsive, and fun gaming experience directly in your browser without any downloads required.',
        aboutDescription2: 'Harky Hockey offers a quick, engaging way to test your reflexes and strategy in a colorful solo match.',
        policies: 'Policies', privacyPolicy: 'Privacy Policy', termsOfService: 'Terms of Service',
        privacyIntro: 'At Harky Hockey, we value your privacy. This policy explains how we handle your data:',
        privacyCollection: '<strong>Information Collection:</strong> We do not collect any personal identification information (PII) from our users.',
        privacyCookies: '<strong>Cookies:</strong> We use local storage to remember your theme preference (Dark/Light mode). We do not use tracking cookies for personal profiling.',
        privacyThirdParty: '<strong>Third-party Services:</strong> We use Google AdSense to serve ads. Google may use cookies to serve ads based on your prior visits to this or other websites.',
        termsIntro: 'By using Harky Hockey, you agree to the following terms:',
        termsUsage: '<strong>Usage:</strong> This game is for personal, non-commercial use only.',
        termsDisclaimer: '<strong>Disclaimer:</strong> The game is provided "as is" without any warranties. We are not responsible for any data loss or issues arising from use.',
        termsChanges: '<strong>Modifications:</strong> We reserve the right to update the game or these terms at any time.',
        copyright: '\u00a9 2026 Harky Hockey. All rights reserved.', privacyLink: 'Privacy', termsLink: 'Terms',
        themeDark: 'DARK MODE', themeLight: 'LIGHT MODE', soundOn: 'SOUND: ON', soundOff: 'SOUND: OFF',
        playerWins: 'YOU WIN!', timeUp: 'TIME\'S UP!', scoreLabel: 'MATCHES'
    },
    ko: {
        pageTitle: '아이스하키 게임',
        navPlay: '게임하기', navHowToPlay: '게임 방법', navAbout: '소개',
        gameTitle: '아이스하키', startGame: '게임 시작', restart: '다시 시작', goal: '골!',
        howToPlay: '게임 방법', controls: '조작 방법',
        controlsDescription: '<strong>WASD</strong> 또는 <strong>방향키</strong>로 플레이어를 움직이세요. <strong>마우스</strong>로 조준하고 왼쪽 클릭으로 표시된 테트로미노를 발사하세요.',
        objective: '목표',
        objectiveDescription: '제한 시간 안에 <strong>같은 테트로미노 5개</strong>를 맞혀 점수를 얻으세요.',
        rules: '규칙', rulesDescription: '위에서 퍼즐 조각이 내려옵니다. 같은 모양의 테트로미노를 발사해 맞히면 조각이 사라지고 점수를 얻습니다. 다른 모양의 조각과 충돌하거나 조각이 바닥에 닿으면 게임이 끝납니다.',
        matchCleared: '모양 일치!', wrongShape: '모양이 다른 퍼즐과 충돌했습니다. 게임 오버!',
        aboutTitle: '하키 소개',
        aboutDescription1: '하키는 최신 웹 기술로 만든 빠른 속도의 아케이드 스타일 아이스하키 게임입니다. 별도 다운로드 없이 브라우저에서 부드럽고 쾌적한 게임을 즐길 수 있습니다.',
        aboutDescription2: '하키에서 화려한 1인용 매치를 즐기며 반사 신경과 전략을 시험해 보세요.',
        policies: '정책', privacyPolicy: '개인정보 처리방침', termsOfService: '서비스 이용약관',
        privacyIntro: '하키는 이용자의 개인정보를 소중히 여깁니다. 이 방침은 데이터 처리 방법을 설명합니다.',
        privacyCollection: '<strong>정보 수집:</strong> 이용자의 개인 식별 정보(PII)를 수집하지 않습니다.',
        privacyCookies: '<strong>쿠키:</strong> 테마 설정(다크/라이트)을 기억하기 위해 로컬 저장소를 사용합니다. 개인 프로파일링을 위한 추적 쿠키는 사용하지 않습니다.',
        privacyThirdParty: '<strong>제3자 서비스:</strong> 광고 제공을 위해 Google AdSense를 사용합니다. Google은 이 사이트나 다른 웹사이트의 방문 기록을 바탕으로 광고 쿠키를 사용할 수 있습니다.',
        termsIntro: '하키를 이용하면 다음 약관에 동의하는 것으로 간주됩니다.',
        termsUsage: '<strong>이용:</strong> 이 게임은 개인적·비상업적 용도로만 이용할 수 있습니다.',
        termsDisclaimer: '<strong>면책 조항:</strong> 게임은 어떠한 보증 없이 "있는 그대로" 제공됩니다. 이용 중 발생한 데이터 손실이나 문제에 대해 책임지지 않습니다.',
        termsChanges: '<strong>변경:</strong> 게임 또는 본 약관은 언제든지 업데이트될 수 있습니다.',
        copyright: '\u00a9 2026 Harky Hockey. All rights reserved.', privacyLink: '개인정보', termsLink: '이용약관',
        themeDark: '다크 모드', themeLight: '라이트 모드', soundOn: '사운드: 켜짐', soundOff: '사운드: 꺼짐',
        playerWins: '승리했습니다!', timeUp: '시간 종료!', scoreLabel: '매치'
    }
};
let currentLanguage = localStorage.getItem('language') === 'ko' ? 'ko' : 'en';

function t(key) {
    return translations[currentLanguage][key];
}

function updateSoundLabel() {
    soundToggle.textContent = audioManager.isMuted ? t('soundOff') : t('soundOn');
}

function applyLanguage() {
    document.documentElement.lang = currentLanguage;
    document.title = t('pageTitle');
    document.querySelectorAll('[data-i18n]').forEach(element => {
        element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
        element.innerHTML = t(element.dataset.i18nHtml);
    });
    languageToggle.textContent = currentLanguage === 'en' ? '한국어' : 'English';
    languageToggle.setAttribute('aria-label', currentLanguage === 'en' ? '한국어로 변경' : 'Switch to English');
    updateThemeColors();
    updateSoundLabel();
}

languageToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'ko' : 'en';
    localStorage.setItem('language', currentLanguage);
    applyLanguage();
});

let rinkLineColor = 'rgba(255, 255, 255, 0.3)';
let trailColor = 'rgba(0, 255, 255, 0.2)';

// --- AUDIO MANAGER (Improved Synthesized Space Music) ---
class AudioManager {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.masterGain = null;
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) {
            if (this.ctx.state === 'suspended') await this.ctx.resume();
            return;
        }
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.ctx.createGain();
            this.masterGain.connect(this.ctx.destination);
            this.masterGain.gain.value = 0.4;
            this.isInitialized = true;
            
            this.playAmbient();
            this.startTwinkling();
            
            // Play initial "system active" sound
            this.playTone(880, 0.1, 0.5, 'square', 0.1);
            setTimeout(() => this.playTone(1760, 0.1, 0.8, 'square', 0.05), 150);
            
            console.log("Audio System Initialized");
        } catch (e) {
            console.error("Audio Context initialization failed", e);
        }
    }

    playAmbient() {
        // Mysterious deep space drone
        [55, 82.4, 110].forEach(f => {
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = f;
            g.gain.value = 0.08;
            
            const lfo = this.ctx.createOscillator();
            const lfoGain = this.ctx.createGain();
            lfo.frequency.value = 0.05 + Math.random() * 0.1;
            lfoGain.gain.value = 0.03;
            lfo.connect(lfoGain);
            lfoGain.connect(g.gain);
            lfo.start();

            osc.connect(g);
            g.connect(this.masterGain);
            osc.start();
        });
    }

    startTwinkling() {
        const twinkle = () => {
            if (!this.isMuted && this.isInitialized && Math.random() > 0.3) {
                const f = 800 + Math.random() * 2000;
                this.playTone(f, 0.1, 2.0, 'sine', 0.03);
            }
            setTimeout(twinkle, 3000 + Math.random() * 7000);
        };
        twinkle();
    }

    playTone(freq, duration, decay, type = 'sine', volume = 0.1) {
        if (this.isMuted || !this.isInitialized) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            g.gain.setValueAtTime(volume, now);
            g.gain.exponentialRampToValueAtTime(0.0001, now + decay);
            osc.connect(g);
            g.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + decay);
        } catch(e) {}
    }

    playCollision(intensity = 1, type = 'wall') {
        if (type === 'wall') {
            this.playTone(200 + intensity * 100, 0.1, 0.2, 'triangle', 0.1);
        } else if (type === 'paddle') {
            this.playTone(400 + intensity * 300, 0.1, 0.3, 'sine', 0.15);
        } else { // puck
            this.playTone(600 + intensity * 400, 0.1, 0.15, 'square', 0.05);
        }
    }

    playGoal() {
        if (!this.isInitialized) return;
        const now = this.ctx.currentTime;
        [0, 0.1, 0.2].forEach(delay => {
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.frequency.setValueAtTime(440 + delay * 100, now + delay);
            osc.frequency.exponentialRampToValueAtTime(1760, now + delay + 1.2);
            g.gain.setValueAtTime(0.15, now + delay);
            g.gain.linearRampToValueAtTime(0, now + delay + 1.2);
            osc.connect(g);
            g.connect(this.masterGain);
            osc.start(now + delay);
            osc.stop(now + delay + 1.2);
        });
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.masterGain) {
            this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.4, this.ctx.currentTime, 0.1);
        }
        return this.isMuted;
    }
}

const audioManager = new AudioManager();

soundToggle.addEventListener('click', async () => {
    if (!audioManager.isInitialized) {
        await audioManager.init();
        updateSoundLabel();
    } else {
        audioManager.toggleMute();
        updateSoundLabel();
    }
});

// Space theme stars
const stars = [];
for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 2,
        opacity: Math.random(),
        twinkle: Math.random() * 0.02
    });
}

function updateThemeColors() {
    const isLight = document.body.classList.contains('light-mode');
    rinkLineColor = isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 242, 255, 0.5)';
    trailColor = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 255, 255, 0.1)';
    themeToggle.textContent = isLight ? t('themeDark') : t('themeLight');
}

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    updateThemeColors();
} else {
    updateThemeColors();
}
applyLanguage();

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeColors();
});

let playerScore = 0;
let isGameStarted = false;
let timeLeft = 180;
let timerInterval;
const WINNING_SCORE = 5;

const dpr = window.devicePixelRatio || 1;
function resizeCanvas() {
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Paddle {
  constructor(x, y, radius, color) {
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.lastX = x;
    this.lastY = y;
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;
    ctx.fill();
    
    // Core glow
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    grad.addColorStop(0, '#fff');
    grad.addColorStop(0.4, this.color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.8, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  }

  update() {
    this.vx = this.x - this.lastX;
    this.vy = this.y - this.lastY;
    this.lastX = this.x;
    this.lastY = this.y;
  }

  reset() {
    this.x = this.initialX;
    this.y = this.initialY;
    this.lastX = this.initialX;
    this.lastY = this.initialY;
    this.vx = 0;
    this.vy = 0;
  }
}

const PUCK_RADIUS = 20;
const PUCK_SIZE = PUCK_RADIUS * 2;
const TETROMINOES = {
        I: [[0, 0], [1, 0], [2, 0], [3, 0]],
        O: [[0, 0], [1, 0], [0, 1], [1, 1]],
        T: [[0, 0], [1, 0], [2, 0], [1, 1]],
        L: [[0, 0], [0, 1], [0, 2], [1, 2]],
        J: [[1, 0], [1, 1], [1, 2], [0, 2]],
        S: [[1, 0], [2, 0], [0, 1], [1, 1]],
        Z: [[0, 0], [1, 0], [1, 1], [2, 1]]
};
const TETROMINO_COLORS = {
        I: '#00c7be', O: '#ffd60a', T: '#af52de', L: '#ff9500',
        J: '#007aff', S: '#34c759', Z: '#ff3b30'
};

function getPuckDimensions(puck) {
        const columns = Math.max(...puck.cells.map(([x]) => x)) + 1;
        const rows = Math.max(...puck.cells.map(([, y]) => y)) + 1;
        return { width: columns * PUCK_SIZE, height: rows * PUCK_SIZE };
}

class Puck {
    constructor(x, y, shapeType) {
        this.x = x;
        this.y = y;
        this.radius = PUCK_RADIUS;
        this.shapeType = shapeType;
        this.cells = TETROMINOES[shapeType];
        this.color = TETROMINO_COLORS[shapeType];
        this.isReady = false;
        this.isPlayerShot = false;
        this.isFalling = false;
        this.vx = 0;
        this.vy = 0;
    }

    draw() {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 2;
        this.cells.forEach(([column, row]) => {
                const x = this.x + column * PUCK_SIZE;
                const y = this.y + row * PUCK_SIZE;
                ctx.fillRect(x, y, PUCK_SIZE, PUCK_SIZE);
                ctx.strokeRect(x + 1, y + 1, PUCK_SIZE - 2, PUCK_SIZE - 2);
        });
        ctx.restore();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (!this.isFalling) {
                this.vx *= 0.99;
                this.vy *= 0.99;
                if (Math.abs(this.vx) < 0.05) this.vx = 0;
                if (Math.abs(this.vy) < 0.05) this.vy = 0;
        }
    }
}

const rinkWidth = canvas.width / dpr;
const rinkHeight = canvas.height / dpr;
const cornerRadius = 50;

const player = new Paddle(rinkWidth / 2, rinkHeight - 25, 25, '#ff00ff');
let aimAngle = -Math.PI / 2;
const movementKeys = new Set();

let readyPuck = null;
let nextPuzzleSpawn = 0;
const PUZZLE_SPAWN_INTERVAL = 2200;
const PUZZLE_FALL_SPEED = 1.15;
let pucks = [];

function createReadyPuck() {
    const shapeTypes = Object.keys(TETROMINOES);
    const puck = new Puck(0, 0, shapeTypes[Math.floor(Math.random() * shapeTypes.length)]);
    puck.isReady = true;
    return puck;
}

function createFallingPuzzle() {
    const shapeTypes = Object.keys(TETROMINOES);
    const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const puck = new Puck(0, 0, shapeType);
    const { width } = getPuckDimensions(puck);
    puck.x = Math.random() * Math.max(0, rinkWidth - width);
    puck.y = -getPuckDimensions(puck).height;
    puck.isFalling = true;
    puck.vy = PUZZLE_FALL_SPEED;
    pucks.push(puck);
}

function puzzlesOverlap(first, second) {
    return first.cells.some(([firstColumn, firstRow]) => second.cells.some(([secondColumn, secondRow]) => {
        const firstX = first.x + firstColumn * PUCK_SIZE;
        const firstY = first.y + firstRow * PUCK_SIZE;
        const secondX = second.x + secondColumn * PUCK_SIZE;
        const secondY = second.y + secondRow * PUCK_SIZE;
        return firstX < secondX + PUCK_SIZE && firstX + PUCK_SIZE > secondX &&
            firstY < secondY + PUCK_SIZE && firstY + PUCK_SIZE > secondY;
    }));
}

function awardPuzzleMatch() {
    playerScore++;
    playerScoreEl.textContent = playerScore;
    goalNotification.textContent = t('matchCleared');
    goalNotification.classList.remove('hidden');
    audioManager.playGoal();
    setTimeout(() => {
        goalNotification.classList.add('hidden');
        goalNotification.textContent = t('goal');
    }, 1500);

    if (playerScore >= WINNING_SCORE) {
        isGameStarted = false;
        setTimeout(() => endGame(t('playerWins')), 1000);
    }
}

function handleCollisions() {
    pucks = pucks.filter(puck => {
        if (!puck.isFalling) return true;
        return puck.y + getPuckDimensions(puck).height < rinkHeight;
    });

    for (const shot of pucks.filter(puck => puck.isPlayerShot)) {
        const shotDimensions = getPuckDimensions(shot);
        if (shot.x + shotDimensions.width < 0 || shot.x > rinkWidth || shot.y + shotDimensions.height < 0 || shot.y > rinkHeight) {
            pucks = pucks.filter(puck => puck !== shot);
            continue;
        }

        const target = pucks.find(puck => puck.isFalling && puzzlesOverlap(shot, puck));
        if (!target) continue;

        pucks = pucks.filter(puck => puck !== shot);
        if (shot.shapeType === target.shapeType) {
            pucks = pucks.filter(puck => puck !== target);
            awardPuzzleMatch();
            if (!isGameStarted) return;
        } else {
            endGame(t('wrongShape'));
            return;
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, rinkWidth, rinkHeight);
    drawRink();
    if (isGameStarted) {
        updatePlayerMovement();
        player.update();
        if (performance.now() >= nextPuzzleSpawn) {
            createFallingPuzzle();
            nextPuzzleSpawn = performance.now() + PUZZLE_SPAWN_INTERVAL;
        }
        pucks.forEach(p => {
            if (p !== readyPuck) p.update();
        });
        syncReadyPuck();
        handleCollisions();
    }
    pucks.forEach(p => {
        if (p !== readyPuck) p.draw();
    });
    if (isGameStarted) drawAimGuide();
    player.draw();
    drawPuckPreview();
    requestAnimationFrame(gameLoop);
}

function updatePlayerMovement() {
    const horizontal = Number(movementKeys.has('arrowright') || movementKeys.has('d')) - Number(movementKeys.has('arrowleft') || movementKeys.has('a'));
    const vertical = Number(movementKeys.has('arrowdown') || movementKeys.has('s')) - Number(movementKeys.has('arrowup') || movementKeys.has('w'));
    const magnitude = Math.hypot(horizontal, vertical);
    if (magnitude === 0) return;

    const speed = 6;
    player.x = Math.max(player.radius, Math.min(rinkWidth - player.radius, player.x + horizontal / magnitude * speed));
    player.y = Math.max(rinkHeight / 2 + player.radius, Math.min(rinkHeight - player.radius, player.y + vertical / magnitude * speed));
}

function drawPuckPreview() {
    const puck = readyPuck;
    if (!puck) return;
    puck.draw();
}

function drawAimGuide() {
    const directionX = Math.cos(aimAngle);
    const directionY = Math.sin(aimAngle);
    const puckRadius = readyPuck?.radius || PUCK_RADIUS;
    const shotOffset = player.radius + puckRadius + 3;
    const startX = player.x + directionX * shotOffset;
    const startY = player.y + directionY * shotOffset;
    let guideLength = Infinity;

    if (directionX > 0) guideLength = Math.min(guideLength, (rinkWidth - puckRadius - startX) / directionX);
    if (directionX < 0) guideLength = Math.min(guideLength, (puckRadius - startX) / directionX);
    if (directionY > 0) guideLength = Math.min(guideLength, (rinkHeight - puckRadius - startY) / directionY);
    if (directionY < 0) guideLength = Math.min(guideLength, (puckRadius - startY) / directionY);

    const endX = startX + directionX * guideLength;
    const endY = startY + directionY * guideLength;
    const arrowAngle = Math.atan2(endY - player.y, endX - player.x);

    ctx.save();
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#000000';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
    ctx.shadowBlur = 6;
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - 12 * Math.cos(arrowAngle - Math.PI / 6), endY - 12 * Math.sin(arrowAngle - Math.PI / 6));
    ctx.lineTo(endX - 12 * Math.cos(arrowAngle + Math.PI / 6), endY - 12 * Math.sin(arrowAngle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function drawRink() {
    // 1. Draw Cosmic Background
    const isLight = document.body.classList.contains('light-mode');
    if (!isLight) {
        const bgGrad = ctx.createRadialGradient(rinkWidth/2, rinkHeight/2, 0, rinkWidth/2, rinkHeight/2, rinkWidth);
        bgGrad.addColorStop(0, '#0a0b1e');
        bgGrad.addColorStop(0.5, '#050508');
        bgGrad.addColorStop(1, '#000000');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, rinkWidth, rinkHeight);

        // Draw Stars
        stars.forEach(star => {
            star.opacity += star.twinkle;
            if (star.opacity > 1 || star.opacity < 0.2) star.twinkle *= -1;
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.beginPath();
            ctx.arc(star.x * rinkWidth, star.y * rinkHeight, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // 2. Draw Glowing Lines
    ctx.save();
    if (!isLight) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00f2ff';
    }
    ctx.strokeStyle = rinkLineColor;
    ctx.lineWidth = 2;
    
    // Half line
    ctx.beginPath();
    ctx.moveTo(rinkWidth / 2, 0);
    ctx.lineTo(rinkWidth / 2, rinkHeight);
    ctx.stroke();

    // Center Galaxy (Circle)
    ctx.beginPath();
    ctx.arc(rinkWidth / 2, rinkHeight / 2, 60, 0, Math.PI * 2);
    ctx.stroke();
    
    if (!isLight) {
        const centerGrad = ctx.createRadialGradient(rinkWidth/2, rinkHeight/2, 0, rinkWidth/2, rinkHeight/2, 60);
        centerGrad.addColorStop(0, 'rgba(0, 242, 255, 0.2)');
        centerGrad.addColorStop(1, 'rgba(255, 0, 255, 0.1)');
        ctx.fillStyle = centerGrad;
        ctx.fill();
    }

    // Circles
    [
        [rinkWidth * 0.2, rinkHeight * 0.2],
        [rinkWidth * 0.2, rinkHeight * 0.8],
        [rinkWidth * 0.8, rinkHeight * 0.2],
        [rinkWidth * 0.8, rinkHeight * 0.8]
    ].forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.stroke();
    });

    // 3. Glowing Corner Bumpers (Solar Flares)
    [
        [0, 0],
        [rinkWidth, 0],
        [0, rinkHeight],
        [rinkWidth, rinkHeight]
    ].forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, cornerRadius, 0, Math.PI * 2);
        ctx.save();
        if (!isLight) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#00f2ff';
            ctx.strokeStyle = '#00f2ff';
        } else {
            ctx.strokeStyle = '#000';
        }
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.restore();
    });

    ctx.restore();
}

function resetPositions() {
    pucks = [];
    player.reset();
    movementKeys.clear();
    readyPuck = createReadyPuck();
    pucks.push(readyPuck);
    createFallingPuzzle();
    nextPuzzleSpawn = performance.now() + PUZZLE_SPAWN_INTERVAL;
    syncReadyPuck();
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 180;
    timerDisplay.classList.remove('low-time');
    countdownOverlay.classList.add('hidden');
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        if (isGameStarted) {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 10) {
                timerDisplay.classList.add('low-time');
                if (timeLeft > 0) {
                    countdownOverlay.textContent = timeLeft;
                    countdownOverlay.classList.remove('hidden');
                } else {
                    countdownOverlay.classList.add('hidden');
                }
            } else {
                countdownOverlay.classList.add('hidden');
            }
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endGame(t('timeUp'));
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function endGame(message) {
    isGameStarted = false;
    clearInterval(timerInterval);
    countdownOverlay.classList.add('hidden');
    gameOverMessage.textContent = message;
    gameOverOverlay.classList.remove('hidden');
}

function restartGame() {
    playerScore = 0;
    playerScoreEl.textContent = playerScore;
    gameOverOverlay.classList.add('hidden');
    countdownOverlay.classList.add('hidden');
    resetPositions();
    isGameStarted = true;
    startTimer();
}

function getCanvasCoordinates(x, y) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (x - rect.left) * rinkWidth / rect.width,
        y: (y - rect.top) * rinkHeight / rect.height
    };
}

function syncReadyPuck() {
    if (!readyPuck) return;
    const { width, height } = getPuckDimensions(readyPuck);
    readyPuck.x = player.x - width / 2;
    readyPuck.y = player.y - player.radius - height - 8;
    readyPuck.vx = 0;
    readyPuck.vy = 0;
}

function firePuck() {
    if (!isGameStarted) return;
    const puck = readyPuck;
    if (!puck) return;

    readyPuck = null;
    puck.isReady = false;
    puck.isPlayerShot = true;
    const { width, height } = getPuckDimensions(puck);
    const shotOffset = player.radius + Math.max(width, height) / 2 + 4;
    puck.x = player.x + Math.cos(aimAngle) * shotOffset - width / 2;
    puck.y = player.y + Math.sin(aimAngle) * shotOffset - height / 2;
    puck.vx = Math.cos(aimAngle) * 12;
    puck.vy = Math.sin(aimAngle) * 12;

    readyPuck = createReadyPuck();
    pucks.push(readyPuck);
    syncReadyPuck();
}

function handleInput(x, y) {
    if (!isGameStarted) return;
    const point = getCanvasCoordinates(x, y);
    const deltaX = point.x - player.x;
    const deltaY = point.y - player.y;
    if (Math.hypot(deltaX, deltaY) > 1) aimAngle = Math.atan2(deltaY, deltaX);
    syncReadyPuck();
}

canvas.addEventListener('click', (e) => {
    if (e.button === 0) firePuck();
});
canvas.addEventListener('mousemove', (e) => handleInput(e.clientX, e.clientY));
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleInput(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: false });
window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (!isGameStarted || !['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) return;
    e.preventDefault();
    movementKeys.add(key);
});
window.addEventListener('keyup', (e) => movementKeys.delete(e.key.toLowerCase()));
window.addEventListener('blur', () => movementKeys.clear());

startButton.addEventListener('click', async () => {
    isGameStarted = true;
    startOverlay.classList.add('hidden');
    await audioManager.init();
    resetPositions();
    startTimer();
});

restartButton.addEventListener('click', restartGame);
gameLoop();
