/* ==========================================================
   PANIFICADORA BELLA VISTA — JavaScript
   1. "Aberto agora / Fechado" na seção Onde estamos
   2. Encomenda pelo WhatsApp (formulário)
   3. Efeito parallax na foto do topo
   ========================================================== */


/* ----------------------------------------------------------
   1. ABERTO AGORA / FECHADO
   Lê o dia e a hora de Belém e mostra se a panificadora
   está aberta. Responde ao horário real de funcionamento.
   ---------------------------------------------------------- */

// Horários de cada dia da semana, em horas (0 = domingo, 6 = sábado).
// Cada dia tem uma lista de turnos: [abre, fecha].
const horarios = {
    0: [],                    // domingo: fechado
    1: [[6, 11], [15, 19]],   // segunda
    2: [[6, 11], [15, 19]],   // terça
    3: [[6, 11], [15, 19]],   // quarta
    4: [[6, 11], [15, 19]],   // quinta
    5: [[6, 11], [15, 19]],   // sexta
    6: [[7, 11]]              // sábado
};

// Pega a data e a hora atuais no fuso de Belém,
// assim o resultado fica certo mesmo para quem acessa de outro estado.
function agoraEmBelem() {
    const texto = new Date().toLocaleString("en-US", { timeZone: "America/Belem" });
    return new Date(texto);
}

function atualizarStatus() {
    const status = document.getElementById("status-funcionamento");
    if (!status) return;

    const agora = agoraEmBelem();
    const dia = agora.getDay();
    const hora = agora.getHours() + agora.getMinutes() / 60; // ex.: 15h30 vira 15.5

    const turnosDeHoje = horarios[dia];
    let aberto = false;
    let proximaAbertura = null;

    for (const [abre, fecha] of turnosDeHoje) {
        if (hora >= abre && hora < fecha) {
            aberto = true;
        }
        if (hora < abre && proximaAbertura === null) {
            proximaAbertura = abre;
        }
    }

    // Troca a classe (que muda a cor no CSS) e o texto do selo
    status.classList.remove("aberto", "fechado");

    if (aberto) {
        status.classList.add("aberto");
        status.textContent = "Aberto agora";
    } else if (proximaAbertura !== null) {
        status.classList.add("fechado");
        status.textContent = "Fechado agora · abre hoje às " + proximaAbertura + "h";
    } else {
        status.classList.add("fechado");
        status.textContent = "Fechado agora";
    }
}

atualizarStatus();
// Confere de novo a cada minuto, caso a página fique aberta
setInterval(atualizarStatus, 60000);


/* ----------------------------------------------------------
   2. ENCOMENDA PELO WHATSAPP
   Quando a pessoa envia o formulário, o JavaScript monta
   a mensagem e abre o WhatsApp da panificadora com ela pronta.
   ---------------------------------------------------------- */

const formulario = document.getElementById("form-encomenda");
const numeroWhatsApp = "5591980193058";

if (formulario) {
    formulario.addEventListener("submit", function (evento) {
        // Impede o comportamento padrão do formulário (recarregar a página)
        evento.preventDefault();

        // Lê o que a pessoa preencheu
        const nome = document.getElementById("nome").value.trim();
        const produto = document.getElementById("produto").value;
        const quantidade = document.getElementById("quantidade").value;
        const observacao = document.getElementById("observacao").value.trim();

        // Monta a mensagem
        let mensagem = "Olá, Bella Vista! Meu nome é " + nome +
            " e gostaria de encomendar " + quantidade + " × " + produto + ".";

        if (observacao !== "") {
            mensagem += "\nObservação: " + observacao;
        }

        // encodeURIComponent transforma espaços e acentos em um formato
        // que pode ir dentro de um link
        const link = "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(mensagem);

        window.open(link, "_blank");
    });
}


/* ----------------------------------------------------------
   3. PARALLAX NA FOTO DO TOPO
   Ao rolar a página, a foto de fundo do topo se move mais
   devagar que o resto, dando sensação de profundidade.
   Só roda quando o navegador não faz o efeito sozinho pelo CSS
   e quando a pessoa não pediu "reduzir movimento".
   ---------------------------------------------------------- */

const hero = document.querySelector(".hero");
const cssJaFazParallax = window.CSS && CSS.supports("animation-timeline: view()");
const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (hero && !cssJaFazParallax && !reduzirMovimento) {
    window.addEventListener("scroll", function () {
        const altura = hero.offsetHeight;
        // quanto do topo já foi rolado, de 0 a 1
        const progresso = Math.min(window.scrollY / altura, 1);
        const posicao = 58 + progresso * 27; // vai de 58% até 85%
        hero.style.backgroundPosition = "center 58%, center " + posicao + "%";
    }, { passive: true });
}
