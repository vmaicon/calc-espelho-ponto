let total_horas = new Array();
let dias_trabalhado = 0;

function setaHoras() {
    const trs = document.getElementById('form:tableHorastrab').querySelector('tbody').children;
    total_horas = new Array();
    dias_trabalhado = 0;

    for (tr of trs){
        let total = tr.querySelector('td[data-title="Total"]').innerHTML.split('\n')[0];
        let [horas, min] = total.split(":").map(Number);
        if (horas != '0') {
            const data = new Date();
            data.setHours(horas, min, 0, 0);
            total_horas.push(data);  
            dias_trabalhado += 1;
        }
    }
}

function somarTempos(dates) {
    // Soma todos os tempos (em milissegundos)
    const totalMilissegundos = dates.reduce((acumulador, date) => {
        const horasEmMs = date.getHours() * 60 * 60 * 1000;
        const minutosEmMs = date.getMinutes() * 60 * 1000;
        return acumulador + horasEmMs + minutosEmMs;
    }, 0);

    // Converte milissegundos totais para horas e minutos
    const totalMinutos = Math.floor(totalMilissegundos / (60 * 1000));
    const horas = Math.floor(totalMinutos / 60);
    const minutos = totalMinutos % 60;

    return `${horas}:${minutos.toString().padStart(2, '0')}`;
}

function calcularSaldoHoras(dates, horasDeTrabalho = 7) {
    const minutosDeTrabalho = horasDeTrabalho * 60;

    let saldoTotal = 0; // Acumulador para minutos (saldo)

    for (const date of dates) {
        // Converte a hora atual em minutos totais
        const minutosTotais = date.getHours() * 60 + date.getMinutes();
        // Calcula o saldo em relação às horas de trabalho
        const saldoAtual = minutosTotais - minutosDeTrabalho;
        // Acumula o saldo (positivo ou negativo)
        saldoTotal += saldoAtual;
    }

    // Retorna o saldo total em horas e minutos
    const horas = Math.floor(Math.abs(saldoTotal) / 60); // Horas inteiras
    const minutos = Math.abs(saldoTotal) % 60; // Minutos restantes
    const sinal = saldoTotal < 0 ? "-" : "+"; // Determina se é sobra ou falta

    return `${sinal}${horas}:${minutos.toString().padStart(2, '0')}`;
}

// Função para criar e posicionar o botão
function criarBotaoNoTopo() {
    // Cria o botão
    const botao = document.createElement("button");

    // Define o texto do botão
    botao.innerText = "Calcula Horas";
    botao.classList.add("ui-button", "ui-widget", "ui-state-default", "ui-corner-all", "ui-button-text-icon-left", "btn-main-action");

    // Estiliza o botão para ficar fixo no topo e à frente
    Object.assign(botao.style, {
        position: "fixed",  // Fixa o botão em relação à janela
        top: "70px",        // Distância do topo
        right: "10px",      // Distância da direita
        zIndex: "10000",    // Certifica-se de que está acima de outros elementos
        padding: "10px 20px", // Estilização do botão
        fontSize: "16px",     // Tamanho da fonte
        backgroundColor: "#007BFF", // Cor de fundo
        color: "#FFF",          // Cor do texto
        border: "none",         // Sem borda
        borderRadius: "5px",    // Bordas arredondadas
        cursor: "pointer",      // Cursor como mãozinha
    });

    // Adiciona um evento ao botão
    botao.addEventListener("click", () => {
        setaHoras();

        let mensagem = "Saldo horas: " + calcularSaldoHoras(total_horas)+ "\nDias trabalhados: " + dias_trabalhado;

        alert(mensagem);
    });

    // Adiciona o botão ao corpo do documento
    document.body.appendChild(botao);
}

// Chama a função para criar o botão
criarBotaoNoTopo();