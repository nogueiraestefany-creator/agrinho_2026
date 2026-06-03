// ==========================================================================
// ARQUIVAMENTO E INICIALIZAÇÃO DO ECOSSISTEMA JS JS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    inicializarAcordeon();
    inicializarAcessibilidade();
    inicializarFormularios();
});

/* ==========================================================================
   LÓGICA DO ACORDEON COMPATÍVEL COM ARIA (ACESSIBILIDADE)
   ========================================================================== */
function inicializarAcordeon() {
    const cabecalhos = document.querySelectorAll('.acordeon-cabecalho');

    cabecalhos.forEach(cabecalho => {
        cabecalho.addEventListener('click', () => {
            const item = cabecalho.parentElement;
            const conteudo = cabecalho.nextElementSibling;
            const estaAtivo = item.classList.contains('ativo');

            // Fecha todos os outros itens para comportamento limpo
            document.querySelectorAll('.acordeon-item').forEach(outroItem => {
                outroItem.classList.remove('ativo');
                outroItem.querySelector('.acordeon-cabecalho').setAttribute('aria-expanded', 'false');
                outroItem.querySelector('.acordeon-conteudo').setAttribute('aria-hidden', 'true');
            });

            // Alterna o estado do elemento clicado
            if (!estaAtivo) {
                item.classList.add('ativo');
                cabecalho.setAttribute('aria-expanded', 'true');
                conteudo.setAttribute('aria-hidden', 'false');
            }
        });
    });
}

/* ==========================================================================
   MÓDULO DE ACESSIBILIDADE NATIVA (SPEECH E FONTES)
   ========================================================================== */
function inicializarAcessibilidade() {
    let tamanhoBase = 100; // Representa 100% ou 1rem
    const htmlElement = document.documentElement;

    // Controles de Redimensionamento Textual
    document.getElementById('btn-aumentar').addEventListener('click', () => {
        if (tamanhoBase < 130) {
            tamanhoBase += 5;
            htmlElement.style.setProperty('--fator-fonte', `${tamanhoBase}%`);
        }
    });

    document.getElementById('btn-diminuir').addEventListener('click', () => {
        if (tamanhoBase > 85) {
            tamanhoBase -= 5;
            htmlElement.style.setProperty('--fator-fonte', `${tamanhoBase}%`);
        }
    });

    // Alternador de Modo Escuro/Claro
    document.getElementById('btn-tema').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Configuração da API de Síntese de Voz (SpeechSynthesis)
    const btnFalar = document.getElementById('btn-falar');
    const btnParar = document.getElementById('btn-parar');
    let utopiaFala = null;

    btnFalar.addEventListener('click', () => {
        // Captura apenas elementos de texto textual principal descartando botões/navs
        const artigoTexto = document.getElementById('artigo').innerText;
        const secaoAcordeonTexto = document.getElementById('beneficios').querySelector('p').innerText;
        
        const textoCompletoLeitura = `${artigoTexto}. ${secaoAcordeonTexto}`;

        // Cancela leituras residuais ativas
        window.speechSynthesis.cancel();

        utopiaFala = new SpeechSynthesisUtterance(textoCompletoLeitura);
        utopiaFala.lang = 'pt-BR';
        utopiaFala.rate = 1.0;

        utopiaFala.onstart = () => {
            btnFalar.disabled = true;
            btnParar.disabled = false;
        };

        utopiaFala.onend = () => {
            btnFalar.disabled = false;
            btnParar.disabled = true;
        };

        window.speechSynthesis.speak(utopiaFala);
    });

    btnParar.addEventListener('click', () => {
        window.speechSynthesis.cancel();
        btnFalar.disabled = false;
        btnParar.disabled = true;
    });
}

/* ==========================================================================
   MÓDULO DE SUBMISSÃO DE FORMULÁRIOS E COMENTÁRIOS (INTERATIVIDADE)
   ========================================================================== */
function inicializarFormularios() {
    const formInscricao = document.getElementById('form-inscricao');
    const formComentario = document.getElementById('form-comentario');
    const listaComentarios = document.getElementById('lista-comentarios');

    // Validação e Feedback do Formulário do Seminário
    formInscricao.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        
        alert(`Parabéns, ${nome}! Sua inscrição para o seminário on-line AgroFuturo 2026 foi realizada com sucesso.`);
        formInscricao.reset();
    });

    // Injeção Dinâmica de Comentários
    formComentario.addEventListener('submit', (e) => {
        e.preventDefault();
        const campoTexto = document.getElementById('txt-comentario');
        const texto = campoTexto.value.trim();

        if (texto) {
            const novoComentario = document.createElement('div');
            novoComentario.classList.add('comentario-postado');
            
            // Proteção básica contra inserção de tags maliciosas (XSS)
            novoComentario.textContent = texto;

            listaComentarios.prepend(novoComentario);
            campoTexto.value = '';
        }
    });
}














