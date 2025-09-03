function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    const clockElement = document.querySelector('.tray-clock');
    if(clockElement) {
        clockElement.textContent = `${hours}:${minutes}`;
    }
}

setInterval(updateClock, 60000);

document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    const botoes = document.querySelectorAll('.windows-button');
    botoes.forEach(botao => {
        botao.addEventListener('click', function() {
            botoes.forEach(b => b.classList.remove('active'));
            this.classList.add('transparent');
        });
    });
});