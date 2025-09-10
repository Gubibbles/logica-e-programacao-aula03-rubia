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
    const janela = document.getElementById(idJanela);
    if (!janela) {
        console.error('Janela não encontrada:', idJanela);
        return;
    }
    janela.style.display = 'flex';
    
    const windowWidth = 500;
    const windowHeight = 400;
    const left = (window.innerWidth - windowWidth) / 2;
    const top = (window.innerHeight - windowHeight) / 2;
    
    janela.style.left = left + 'px';
    janela.style.top = top + 'px';

    if (idJanela === 'sobre-mim-window') {
        document.getElementById('sobre-mim-button').classList.add('active');
    } else if (idJanela === 'trabalhos-window') {
        document.getElementById('trabalhos-button').classList.add('active');
    } else if (idJanela === 'links-window') {
        document.getElementById('links-button').classList.add('active');
    }
}

// FECHAR A JANELA
function fecharJanela(idJanela) {
    const janela = document.getElementById(idJanela);
    if (!janela) {
        console.error('Janela não encontrada:', idJanela);
        return;
    }
    janela.style.display = 'none';
    
    if (idJanela === 'sobre-mim-window') {
        document.getElementById('sobre-mim-button').classList.remove('active');
    } else if (idJanela === 'trabalhos-window') {
        document.getElementById('trabalhos-button').classList.remove('active');
    } else if (idJanela === 'links-window') {
        document.getElementById('links-button').classList.remove('active');
    }
}

// FUNÇÃO PARA ARRASTAR JANELA
function makeDraggable(windowElement, titleBarElement) {
    if (!windowElement || !titleBarElement) {
        console.error('Elemento não encontrado para arrasto');
        return;
    }
    
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

// FUNÇÃO PARA ABRIR IMAGEM EM TAMANHO MAIOR
function abrirModal(imgSrc) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');

    if (!modal || !modalImg) {
        console.error('Modal não encontrado');
        return;
    }

    modal.style.display = 'flex';
    modalImg.src = imgSrc;
}

// FUNÇÃO PARA FECHAR MODAL
function fecharModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateClock();

    const sobreMimButton = document.getElementById('sobre-mim-button');
    const sobreMimIcon = document.getElementById('meus-documentos');
    const startButton = document.querySelector('.start-button');

    const trabalhosButton = document.getElementById('trabalhos-button');
    const trabalhosIcon = document.getElementById('trabalhos-icon');

    const linksButton = document.getElementById('links-button');
    const linksIcon = document.getElementById('links-icon');
    
    // Janelas
    const sobreMimWindow = document.getElementById('sobre-mim-window');
    const sobreMimTitlebar = document.getElementById('sobre-mim-titlebar');

    const trabalhosWindow = document.getElementById('trabalhos-window');
    const trabalhosTitlebar = document.getElementById('trabalhos-titlebar');
    
    const linksWindow = document.getElementById('links-window');
    const linksTitlebar = document.getElementById('links-titlebar');
    
    // CONFIGURAR ARRASTO PARA TODAS AS JANELAS
    if (sobreMimWindow && sobreMimTitlebar) {
        makeDraggable(sobreMimWindow, sobreMimTitlebar);
    }

    if (trabalhosWindow && trabalhosTitlebar) {
        makeDraggable(trabalhosWindow, trabalhosTitlebar);
    }

    if (linksWindow && linksTitlebar) {
        makeDraggable(linksWindow, linksTitlebar);
    }

    // CONFIGURAR BOTÃO "Sobre Mim" NA TASKBAR
    if (sobreMimButton) {
        sobreMimButton.addEventListener('click', function() {
            abrirJanela('sobre-mim-window');
            if (trabalhosButton) trabalhosButton.classList.remove('active');
            if (linksButton) linksButton.classList.remove('active');
        });
    }

    // CONFIGURAR BOTÃO "Trabalhos" NA TASKBAR
    if (trabalhosButton) {
        trabalhosButton.addEventListener('click', function() {
            abrirJanela('trabalhos-window');
            if (sobreMimButton) sobreMimButton.classList.remove('active');
            if (linksButton) linksButton.classList.remove('active');
        });
    }

    // CONFIGURAR BOTÃO "Links" NA TASKBAR
    if (linksButton) {
        linksButton.addEventListener('click', function() {
            abrirJanela('links-window');
            if (sobreMimButton) sobreMimButton.classList.remove('active');
            if (trabalhosButton) trabalhosButton.classList.remove('active');
        });
    }

    // CONFIGURAR BOTÃO "Iniciar"
    if (startButton) {
        startButton.addEventListener('click', function() {
            alert('Menu Iniciar clicado!');
        });
    }

    // CONFIGURAR ICONE "Sobre Mim" NA ÁREA DE TRABALHO
    if (sobreMimIcon) {
        sobreMimIcon.addEventListener('dblclick', function() {
            abrirJanela('sobre-mim-window');
            if (trabalhosButton) trabalhosButton.classList.remove('active');
            if (linksButton) linksButton.classList.remove('active');
        });
    }

    // CONFIGURAR ICONE "Trabalhos" NA ÁREA DE TRABALHO
    if (trabalhosIcon) {
        trabalhosIcon.addEventListener('dblclick', function() {
            abrirJanela('trabalhos-window');
            if (sobreMimButton) sobreMimButton.classList.remove('active');
            if (linksButton) linksButton.classList.remove('active');
        });
    }

    // CONFIGURAR ICONE "Links" NA ÁREA DE TRABALHO
    if (linksIcon) {
        linksIcon.addEventListener('dblclick', function() {
            abrirJanela('links-window');
            if (sobreMimButton) sobreMimButton.classList.remove('active');
            if (trabalhosButton) trabalhosButton.classList.remove('active');
        });
    }

    // CLIQUE NAS IMAGENS DA GALERIA
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', function() {
            abrirModal(this.src);
        });
    });
    
    // FECHAR MODAL
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', fecharModal);
    }
    
    const imageModal = document.getElementById('image-modal');
    if (imageModal) {
        imageModal.addEventListener('click', function(e) {
            if (e.target === this) fecharModal();
        });
    }
    
    console.log('Script carregado com sucesso!');
});