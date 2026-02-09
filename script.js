let currentAudio = null;

// Функція для звуку
function playSound(file) {
    if (currentAudio) currentAudio.pause();
    currentAudio = new Audio('assets/' + file);
    currentAudio.play().catch((e) => console.log("Взаємодійте з екраном спочатку"));
}

function stopSound() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
}

// Живий фон
function startBackgroundHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('bg-heart');
        const shapes = ['❤️', '💖', '🌸', '✨'];
        heart.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.setProperty('--size', (Math.random() * 20 + 10) + 'px');
        heart.style.setProperty('--opacity', Math.random() * 0.4 + 0.3);
        heart.style.setProperty('--duration', (Math.random() * 10 + 15) + 's');
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 25000);
    }, 800);
}

startBackgroundHearts();

// Ефект успіху
function createHearts() {
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.getElementById('hearts-container').appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }
}

function handleCorrect(current, next) {
    createHearts();
    stopSound();
    document.getElementById('step-' + current).classList.remove('active');
    document.getElementById('step-' + next).classList.add('active');
    window.scrollTo(0, 0); // Прокрутка вгору при зміні питання
}

function wrong(btn) {
    const txt = btn.innerText;
    btn.innerText = "❌";
    btn.style.background = '#f6d0d0';
    setTimeout(() => {
        btn.innerText = txt;
        btn.style.background = '';
    }, 1000);
}

function wrongCard(card) {
    card.style.background = '#ffebeb';
    card.style.borderColor = '#ff4d4d';
    setTimeout(() => {
        card.style.background = '';
        card.style.borderColor = 'transparent';
    }, 500);
}

// Втеча кнопки з урахуванням мобільних
function moveButton() {
    const btn = document.getElementById('noBtn');
    // Обмежуємо радіус втечі, щоб кнопка не вилітала за межі екрана
    const x = Math.random() * 160 - 80;
    const y = Math.random() * 160 - 80;
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

function finish() {
    stopSound();
    createHearts();
    document.getElementById('step-6').classList.remove('active');
    document.getElementById('step-final').classList.add('active');
    const final = new Audio('assets/final_song.mp3');
    final.play();
}