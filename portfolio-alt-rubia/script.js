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

// ABRIR A JANELA
function abrirJanela(idJanela) {
    document.getElementById(idJanela).style.display = 'block';
    document.getElementById('docs-button').classList.add('active');
}

// FECHAR A JANELA
function fecharJanela(idJanela) {
    document.getElementById(idJanela).style.display = 'none';
    document.getElementById('docs-button').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function() {
    updateClock();

    const sobreMimButton = document.getElementById('docs-button');
    const sobreMimIcon = document.getElementById('meus-documentos');
    const startButton = document.querySelector('.start-button');

    // CONFIGURAR BOTÃO "Sobre Mim" NA TASKBAR
    sobreMimButton.addEventListener('click', function() {
        abrirJanela('sobre-mim-window');
    });

    // CONFIGURAR BOTÃO "Iniciar"
    startButton.addEventListener('click', function() {
        alert('Menu Iniciar clicado!');
    });

    // CONFIGURAR ICONE "Sobre Mim" NA ÁREA DE TRABALHO
    sobreMimIcon.addEventListener('dblclick', function() {
        abrirJanela('sobre-mim-window');
    });
});