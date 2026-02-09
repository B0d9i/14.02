let currentAudio = null;

function playSound(file) {
    if (currentAudio) currentAudio.pause();
    currentAudio = new Audio('assets/' + file);
    currentAudio.play();
}

function stopSound() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
}

function nextStep(current, next) {
    stopSound();
    document.getElementById('step-' + current).classList.remove('active');
    document.getElementById('step-' + next).classList.add('active');
}

function wrong(btn) {
    btn.style.background = '#ff4d4d';
    btn.innerText = "❌ Спробуй ще";
    setTimeout(() => {
        btn.style.background = '#ff69b4';
        btn.innerText = btn.getAttribute('data-original-text') || btn.innerText;
    }, 1000);
}

function wrongCard(card) {
    card.style.borderColor = 'red';
    setTimeout(() => card.style.borderColor = 'transparent', 1000);
}

function moveButton() {
    const btn = document.getElementById('noBtn');
    const x = Math.random() * (window.innerWidth - btn.offsetWidth);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight);
    
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
}

function finish() {
    stopSound();
    document.getElementById('step-6').classList.remove('active');
    document.getElementById('step-final').classList.add('active');
    
    // Фінальна пісня
    const finalSong = new Audio('assets/final_song.mp3');
    finalSong.play();
}