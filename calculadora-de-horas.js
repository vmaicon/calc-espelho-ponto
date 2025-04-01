let total_horas = new Array();
let dias_trabalhado = 0;
let dias_folgas =[
    { data: "06/03/2025", descricao: "50 - FOLGA RECESSO FORENSE (GOZO)", tipo: "pesssoal" },
    { data: "07/03/2025", descricao: "50 - FOLGA RECESSO FORENSE (GOZO)", tipo: "pesssoal" },
];
let feriados = [
    { data: "01/01/2025", descricao: "Confraternização Universal", tipo: "nacional" },
    { data: "20/01/2025", descricao: "Dia do Católico", tipo: "estadual" },
    { data: "24/01/2025", descricao: "Dia do Evangélico", tipo: "estadual" },
    { data: "03/03/2025", descricao: "Carnaval", tipo: "estadual" },
    { data: "04/03/2025", descricao: "Carnaval", tipo: "estadual" },
    { data: "05/03/2025", descricao: "Quarta-feira de Cinzas", tipo: "estadual" },
    { data: "08/03/2025", descricao: "Dia Internacional da Mulher", tipo: "estadual" },
    { data: "17/04/2025", descricao: "Quinta-feira Santa", tipo: "estadual" },
    { data: "18/04/2025", descricao: "Sexta-feira da Paixão", tipo: "nacional" },
    { data: "21/04/2025", descricao: "Tiradentes", tipo: "nacional" },
    { data: "01/05/2025", descricao: "Dia do Trabalho", tipo: "nacional" },
    { data: "15/06/2025", descricao: "Aniversário do Estado do Acre", tipo: "estadual" },
    { data: "19/06/2025", descricao: "Corpus Christi", tipo: "facultativo" },
    { data: "06/08/2025", descricao: "Início da Revolução Acreana", tipo: "facultativo" },
    { data: "11/08/2025", descricao: "Dia do Advogado", tipo: "regimental" },
    { data: "05/09/2025", descricao: "Dia da Amazônia", tipo: "estadual" },
    { data: "07/09/2025", descricao: "Independência do Brasil", tipo: "nacional" },
    { data: "12/10/2025", descricao: "Nossa Senhora de Aparecida", tipo: "nacional" },
    { data: "28/10/2025", descricao: "Dia do Servidor Público", tipo: "estadual" },
    { data: "02/11/2025", descricao: "Finados", tipo: "nacional" },
    { data: "15/11/2025", descricao: "Proclamação da República", tipo: "nacional" },
    { data: "17/11/2025", descricao: "Tratado de Petrópolis", tipo: "estadual" },
    { data: "20/11/2025", descricao: "Dia da Consciência Negra", tipo: "nacional" },
    { data: "08/12/2025", descricao: "Dia da Justiça", tipo: "regimental" },
    { data: "24/12/2025", descricao: "Véspera de Natal", tipo: "facultativo" },
    { data: "25/12/2025", descricao: "Natal", tipo: "nacional" },
    { data: "31/12/2025", descricao: "Véspera de Ano Novo", tipo: "facultativo" }
];


// Função para verificar se uma data é feriado
function isFeriado(date) {
    // Formata a data recebida para DD/MM/YYYY
    const dataFormatada = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    // Verifica se existe algum feriado com a data formatada
    return feriados.some(feriado => feriado.data === dataFormatada);
}
// Função para verificar se uma data é folga
function isFolga(date) {
    // Formata a data recebida para DD/MM/YYYY
    const dataFormatada = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    // Verifica se existe algum feriado com a data formatada
    return dias_folgas.some(folga => folga.data === dataFormatada);
}

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

function aplicaFormatacaoFimDeSemana() {
    const trs = document.getElementById('form:tableHorastrab').querySelector('tbody').children;
    for (const tr of trs) {
        const dataCell = tr.querySelector('td[data-title="Data"]');
        if (dataCell) {
            const dataText = dataCell.innerText.trim();
            const parts = dataText.split('/');
            if (parts.length === 3) {
                const day = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10);
                const year = parseInt(parts[2], 10);
                const dateObj = new Date(year, month - 1, day);
                const dayOfWeek = dateObj.getDay();
                const ehFeriado = isFeriado(dateObj);
                const ehFolga = isFolga(dateObj);

                // Aplica formatação para fins de semana e feriados
                if (dayOfWeek === 0 || dayOfWeek === 6 || ehFeriado || ehFolga) {
                    // Altera a cor da linha (amarelo para fins de semana, vermelho claro para feriados)
                    if (ehFolga) {
                        tr.style.backgroundColor = "#c2f0c2"; // Verde claro para folgas
                    } else if (ehFeriado) {
                        tr.style.backgroundColor = "#ffcccc"; // Vermelho claro para feriados
                    } else {
                        tr.style.backgroundColor = "#fad889"; // Amarelo para fins de semana
                    }
                    
                    // Adiciona '--' em cada célula, exceto na célula "Total"
                    const tds = tr.querySelectorAll('td:not([data-title="Total"])');
                    tds.forEach(td => {
                        if (!td.hasAttribute('data-title') || (td.getAttribute('data-title') !== 'Dia' && td.getAttribute('data-title') !== 'Data')) {
                            if (ehFolga) {
                                const folga = dias_folgas.find(f => f.data === `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`);
                                td.innerHTML = folga ? folga.descricao : '--';
                            } else if (ehFeriado) {
                                const feriado = feriados.find(f => f.data === `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`);
                                td.innerHTML = feriado ? feriado.descricao : '--';
                            } else {
                                td.innerHTML = '--';
                            }
                        }
                    });
                }
            }
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

 
    // Adiciona o botão ao corpo do documento
    document.body.appendChild(botao);
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
        atualizarTotais();
    });

    // Adiciona o botão ao corpo do documento
    document.body.appendChild(botao);
}

function atualizarTotais() {
    console.log("Atualizando totais...");
    let divSectionInfo = document.querySelector('.section-info');

    if (!divSectionInfo) {
        // Criar a div se não existir e adicioná-la ao body
        divSectionInfo = document.createElement('div');
        divSectionInfo.className = "section-info";
        document.body.appendChild(divSectionInfo);
    }

    aplicaFormatacaoFimDeSemana();
    setaHoras();

    let saldoHoras = calcularSaldoHoras(total_horas) ?? 0; // Evita erro se a função retornar null/undefined
    let diasTrabalhados = dias_trabalhado ?? 0; // Evita erro caso a variável não esteja definida

    // Remover div antiga para evitar duplicações
    const divExistente = divSectionInfo.querySelector('.totais-info');
    if (divExistente) {
        divExistente.remove();
    }

    const newDiv = document.createElement('div');
    newDiv.className = "totais-info col-lg-offset-5 col-lg-5 col-sm-offset-1 col-sm-8";
    newDiv.innerHTML = `
        <h1>Totais</h1>
        <p>Saldo de horas: ${saldoHoras}</p>
        <p>Dias trabalhados: ${diasTrabalhados}</p>
    `;

    divSectionInfo.appendChild(newDiv);
}

atualizarTotais();

criarBotaoNoTopo();