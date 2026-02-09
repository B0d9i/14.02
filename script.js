let currentAudio = null;

function playSound(file) {
    if (currentAudio) currentAudio.pause();
    currentAudio = new Audio('assets/' + file);
    currentAudio.play().catch(() => {});
}

function stopSound() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
}

// --- НОВА ФУНКЦІЯ ДЛЯ ЖИВОГО ФОНУ ---
function startBackgroundHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('bg-heart');
        // Можна використовувати різні емодзі
        const shapes = ['❤️', '💖', '🌸', '✨'];
        heart.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
        
        // Рандомні параметри для природності
        heart.style.left = Math.random() * 100 + 'vw';
        // Розмір від 10px до 30px
        heart.style.setProperty('--size', (Math.random() * 20 + 10) + 'px');
        // Прозорість від 0.3 до 0.7
        heart.style.setProperty('--opacity', Math.random() * 0.4 + 0.3);
        // Тривалість польоту від 15 до 25 секунд (дуже повільно)
        heart.style.setProperty('--duration', (Math.random() * 10 + 15) + 's');

        document.body.appendChild(heart);

        // Видаляємо елемент після завершення анімації
        setTimeout(() => {
            heart.remove();
        }, 25000);
    }, 600); // Створюємо нове серце кожні 0.6 секунди
}

// Запускаємо живий фон одразу при завантаженні
startBackgroundHearts();


// --- Функція для сердець при правильній відповіді (швидкі) ---
function createHearts() {
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        // Швидка анімація (2-4 секунди)
        heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.getElementById('hearts-container').appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }
}

function handleCorrect(current, next) {
    createHearts(); // Вибух сердець при успіху
    stopSound();
    document.getElementById('step-' + current).classList.remove('active');
    document.getElementById('step-' + next).classList.add('active');
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

function moveButton() {
    const btn = document.getElementById('noBtn');
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

function finish() {
    stopSound();
    createHearts();
    document.getElementById('step-6').classList.remove('active');
    document.getElementById('step-final').classList.add('active');
    new Audio('assets/final_song.mp3').play();
}