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
// ABRIR A JANELA
function abrirJanela(idJanela) {
    const janela = document.getElementById(idJanela);
    janela.style.display = 'flex';
    
    const windowWidth = 500;
    const windowHeight = 400;
    const left = (window.innerWidth - windowWidth) / 2;
    const top = (window.innerHeight - windowHeight) / 2;
    
    janela.style.left = left + 'px';
    janela.style.top = top + 'px';
    janela.style.transform = 'none';
    
    document.getElementById('docs-button').classList.add('active');
}

// FECHAR A JANELA
function fecharJanela(idJanela) {
    document.getElementById(idJanela).style.display = 'none';
    document.getElementById('docs-button').classList.remove('active');
}

// FUNÇÃO PARA ARRASTAR JANELA
function makeDraggable(windowElement, titleBarElement) {
    let isDragging = false;
    let offset = [0, 0];

    titleBarElement.addEventListener("mousedown", function(e) {
        isDragging = true;
        
        offset = [
            windowElement.offsetLeft - e.clientX,
            windowElement.offsetTop - e.clientY
        ];
        
        windowElement.classList.add("dragging");
    });

    document.addEventListener("mouseup", function() {
        if (!isDragging) return;
        
        isDragging = false;
        windowElement.classList.remove("dragging");
    });

    document.addEventListener("mousemove", function(e) {
        e.preventDefault();
        if (!isDragging) return;
        
        const newLeft = e.clientX + offset[0];
        const newTop = e.clientY + offset[1];
        
        const maxLeft = window.innerWidth - windowElement.offsetWidth;
        const maxTop = window.innerHeight - windowElement.offsetHeight;
        
        windowElement.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + 'px';
        windowElement.style.top = Math.max(0, Math.min(newTop, maxTop)) + 'px';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateClock();

    const sobreMimButton = document.getElementById('docs-button');
    const sobreMimIcon = document.getElementById('meus-documentos');
    const startButton = document.querySelector('.start-button');
    
    const sobreMimWindow = document.getElementById('sobre-mim-window');
    const sobreMimTitlebar = document.getElementById('sobre-mim-titlebar');
    
    if (sobreMimWindow && sobreMimTitlebar) {
        makeDraggable(sobreMimWindow, sobreMimTitlebar);
    }

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