import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'; // Usando Doughnut para um efeito de rosca
import type { GastoPorCategoriaType } from '../../types/GastoPorCategoriaType';


// Registrar os componentes necessários do Chart.js para gráficos de pizza/rosca
ChartJS.register(ArcElement, Tooltip, Legend, Title);

type PieChartProps = {
    data: GastoPorCategoriaType[];
    anoSelecionado: number;
};

function PieChart({ data, anoSelecionado }: PieChartProps) {
    // Cores para as fatias do gráfico de pizza
    // Você pode expandir esta lista ou gerar dinamicamente
    const backgroundColors = [
        'rgba(255, 99, 132, 0.6)', // Vermelho
        'rgba(54, 162, 235, 0.6)', // Azul
        'rgba(255, 206, 86, 0.6)', // Amarelo
        'rgba(75, 192, 192, 0.6)', // Verde-água
        'rgba(153, 102, 255, 0.6)', // Roxo
        'rgba(255, 159, 64, 0.6)', // Laranja
        'rgba(199, 199, 199, 0.6)', // Cinza
        'rgba(83, 102, 255, 0.6)', // Azul mais escuro
        'rgba(10, 200, 100, 0.6)', // Verde mais escuro
        'rgba(250, 50, 50, 0.6)', // Vermelho mais vibrante
    ];
    const borderColors = backgroundColors.map(color => color.replace('0.6', '1')); // Bordas mais sólidas

    // Prepara os dados para o Chart.js
    const chartData = {
        labels: data.map(item => item.categoriaNome),
        datasets: [
            {
                label: 'Total Gasto',
                data: data.map(item => item.totalGasto),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    // Opções do gráfico
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'left' as const, // Legenda à direita para não atrapalhar o gráfico
                labels: {
                    boxWidth: 20,
                    padding: 10,
                }
            },
            title: {
                display: true,
                text: `Gastos por Categoria - ${anoSelecionado}`,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((acc: number, val: number) => acc + val, 0);
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0; // Calcula a porcentagem
                        return `${label}: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)} (${percentage}%)`;
                    }
                }
            }
        },
    };

    // Mensagem se não houver dados
    if (data.length === 0) {
        return (
            <div className="alert alert-info">
                Nenhum dado de gastos por categoria disponível para o ano de {anoSelecionado}.
            </div>
        );
    }

    return (
        <div className="chart-card">
            <div className="pie-chart">
                <Doughnut data={chartData} options={options} />
            </div>
        </div>
    );
}

export default PieChart;