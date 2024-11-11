const url = 'https://raw.githubusercontent.com/CamillyPR/API_1/refs/heads/main/preferencias.json';

const ctx = document.getElementById('grafico').getContext('2d');

let rotulosX = ["feijoada", "churrasco", "arroz e feijão", "moqueca", "feijão tropeiro", "baião de dois", "acarajé"];
let valores = [0, 0, 0, 0, 0, 0, 0];

// Criação do gráfico usando Chart.js
let grafico = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: rotulosX,
        datasets: [{
            label: '#Disciplina Preferida',
            data: valores,
            backgroundColor: [ // Cores para cada barra
                            '#FF0000',  
                            '#FF7F00', 
                            '#FFFF00', 
                            '#01FE01', 
                            '#0000FF', 
                            '#4B0082', 
                            '#8F00FF'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' // Posiciona a legenda no lado direito
            },
            tooltip: {
                enabled: true // Habilita a exibição de tooltips
            },
            datalabels: {
                anchor: 'end', // Posiciona o valor no topo da barra
                align: 'top',
                color: '#fff', // Define a cor do valor exibido
                font: {
                    weight: 'bold' // Define a fonte como negrito
                },
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percent = ((value / total) * 100).toFixed(2); // Calcula a porcentagem
                    return `${value}\n(${percent}%)`; // Exibe o valor e a porcentagem em linhas separadas
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true, // Exibe o título do eixo X
                    text: 'Disciplinas', // Texto do título do eixo X
                    color: '#FFE31A', // Cor do título
                    font: {
                        size: 14, // Tamanho da fonte
                        weight: 'bold'
                    }
                },
                ticks: {
                    color:'#fff',
                }
            },
            y: {
                beginAtZero: true, // Começa o eixo Y no zero
                max: 18,
                title: {
                    display: true, // Exibe o título do eixo Y
                    text: 'Quantidade de Votos', // Texto do título do eixo Y
                    color: '#FFE31A', // Cor do título
                    font: {
                        size: 14, // Tamanho da fonte
                        weight: 'bold'
                    }
                },
                ticks: {
                    stepSize: 1 // Incremento de 1 no eixo Y
                }
            }
        }
    },
    plugins: [ChartDataLabels] // Plugin para exibir valores acima das colunas
});

// Função para buscar dados e atualizar o gráfico
function atualizarGrafico() {
    fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            valores[0] = resp.feijoada;
            valores[1] = resp.churrasco;
            valores[2] = resp.arroz_com_feijão;
            valores[3] = resp.moqueca;
            valores[4] = resp.feijão_tropeiro;
            valores[5] = resp.baião_de_dois;
            valores[6] = resp.acarajé;

            // Atualiza o gráfico com os novos valores
            grafico.update();
            exibirFraseInformativa(valores);
        })
        .catch(erro => {
            alert("ERRO: " + erro); // Exibe um alerta em caso de erro
        });
}

// Chama a função de atualização a cada 5 segundos
setInterval(atualizarGrafico, 3000);

// Função para exibir frase informativa
function exibirFraseInformativa(url) {
    const informacaoDiv = document.getElementById('informacao');
    informacaoDiv.innerHTML = `
    <p> Comidas preferidas dos brasileiros <br>
    Em primeiro lugar, um clássico brasileiro feito com feijão preto e uma variedade de carnes, temperado com especiarias.<strong>${valores[0]}</strong>, com um total de <span>${valores[0]}</span> pontos de interesse.</p>
    <p>Em segundo lugar, o famoso churrasco brasileiro, com carnes grelhadas na brasa, é uma tradição de encontros familiares e celebrações.: <strong>${valores[1]}</strong>, que acumula <span>${valores[1]}</span> pontos, e o Arroz com feijão: A combinação essencial da culinária brasileira, servida diariamente nas mesas de todo o país.<strong>${valores[2]}</strong> com <span>${valores[2]}</span> pontos.</p>
    Moqueca: Um ensopado de peixe ou frutos do mar com leite de coco e dendê, típico das regiões nordeste e sudeste do Brasil. <strong>${valores[3]}</strong> <span>${valores[3]}</span> pontos.</p>
    <p>As menos votadas foram: <br>
    Feijão tropeiro: Um prato mineiro feito com feijão misturado com farinha de mandioca, linguiça, ovos e temperos.<strong>${valores[4]}</strong> com <span>${valores[4]}</span> pontos, <br>
    Baião de dois: Uma mistura saborosa de arroz e feijão, tradicional no nordeste do Brasil, muitas vezes com carne-seca.<strong>${valores[5]}</strong> com <span>${valores[5]}</span> pontos, e <br>
    Acarajé: Um bolinho frito de feijão-fradinho, recheado com camarão e vatapá, típico da culinária baiana e com origem africana.<strong>${valores[6]}</strong> com <span>${valores[6]}</span> pontos, respectivamente.</p>
    `;
}