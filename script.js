// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
    inicializarAccordion();
    inicializarAcessibilidade();
    inicializarComentarios();
});

/* Lógica das Caixas Expansíveis (Accordion) */
function inicializarAccordion() {
    const headers = document.querySelectorAll(".accordion-header");
    
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const body = header.nextElementSibling;
            
            // Fecha outros se necessário, ou apenas alterna o atual:
            if (body.style.maxHeight) {
                body.style.maxHeight = null;
                body.style.padding = "0";
            } else {
                body.style.maxHeight = body.scrollHeight + "px";
                body.style.padding = "1rem";
            }
        });
    });
}

/* Lógica de Acessibilidade: Fontes, Tema e SpeechSynthesis */
function inicializarAcessibilidade() {
    let tamanhoAtual = 100;
    const raiz = document.documentElement;
    const btnTema = document.getElementById("btn-tema");
    
    // Controle de tamanho de fontes
    document.getElementById("btn-aumentar").addEventListener("click", () => {
        tamanhoAtual += 10;
        raiz.style.fontSize = `${tamanhoAtual}%`;
    });
    
    document.getElementById("btn-diminuir").addEventListener("click", () => {
        if(tamanhoAtual > 70) {
            tamanhoAtual -= 10;
            raiz.style.fontSize = `${tamanhoAtual}%`;
        }
    });

    // Alternador de Tema Escuro
    btnTema.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // API de Leitura de Voz (SpeechSynthesis)
    const btnFalar = document.getElementById("btn-falar");
    const btnParar = document.getElementById("btn-parar");
    let uttrance = null;

    btnFalar.addEventListener("click", () => {
        // Pega apenas o conteúdo textual do container principal ignorando botões
        const textoParaLer = document.getElementById("conteudo-principal").innerText;
        
        // Cancela leituras anteriores em execução
        window.speechSynthesis.cancel();
        
        uttrance = new SpeechSynthesisUtterance(textoParaLer);
        uttrance.lang = "pt-BR";
        window.speechSynthesis.speak(uttrance);
    });

    btnParar.addEventListener("click", () => {
        window.speechSynthesis.cancel();
    });
}

/* Área de Interação Simples */
function inicializarComentarios() {
    const form = document.getElementById("form-comentario");
    const caixaTexto = document.getElementById("txt-comentario");
    const lista = document.getElementById("lista-comentarios");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const novoComentario = document.createElement("p");
        novoComentario.style.padding = "10px";
        novoComentario.style.background = "#e2e8f0";
        novoComentario.style.marginTop = "5px";
        novoComentario.style.borderRadius = "4px";
        novoComentario.innerText = caixaTexto.value;
        
        lista.appendChild(novoComentario);
        caixaTexto.value = "";
    });
}















