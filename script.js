let currentAudio = null;

function playSound(file) {
    if (currentAudio) currentAudio.pause();
    currentAudio = new Audio('assets/' + file);
    currentAudio.play().catch(e => console.log("Чекаю на взаємодію..."));
}

function stopSound() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
}

// Функція для створення літаючих сердець
function createHearts() {
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.getElementById('hearts-container').appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }
}

function handleCorrect(current, next) {
    createHearts();
    stopSound();
    document.getElementById('step-' + current).classList.remove('active');
    document.getElementById('step-' + next).classList.add('active');
}

function wrong(btn) {
    const originalText = btn.innerText;
    btn.style.background = '#ff4d4d';
    btn.innerText = "❌ Ніііі";
    setTimeout(() => {
        btn.style.background = '';
        btn.innerText = originalText;
    }, 1000);
}

function wrongCard(card) {
    card.style.borderColor = 'red';
    setTimeout(() => card.style.borderColor = 'transparent', 1000);
}

function moveButton() {
    const btn = document.getElementById('noBtn');
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
}

function finish() {
    stopSound();
    createHearts();
    document.getElementById('step-6').classList.remove('active');
    document.getElementById('step-final').classList.add('active');
    const finalSong = new Audio('assets/final_song.mp3');
    finalSong.play();
}