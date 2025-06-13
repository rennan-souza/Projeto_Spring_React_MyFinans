import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { BalancoMensalType } from '../../types/BalancoMensalType';

// Registrar os componentes necessários do Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Definir as props esperadas para este componente
type BarChartProps = {
    data: BalancoMensalType[]; // Os dados já processados do balanço mensal
    anoSelecionado: number;     // O ano que está sendo exibido
};

function BarChart({ data, anoSelecionado }: BarChartProps) {
    
    // Opções do gráfico (configuração visual)
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `Balanço Mensal - ${anoSelecionado}`,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value: string | number) {
                        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value));
                    }
                }
            }
        }
    };

    const chartData = {
        labels: data.map(item => {
            const [ano, mes] = item.mesAno.split('-');
            return `${mes}/${ano}`; // Formato "MM/AAAA" para os labels do eixo X
        }),
        datasets: [
            {
                label: 'Entradas',
                data: data.map(item => item.totalEntradas),
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Cor verde-água para entradas
            },
            {
                label: 'Saídas',
                data: data.map(item => item.totalSaidas),
                backgroundColor: 'rgba(255, 99, 132, 0.6)', // Cor vermelha para saídas
            },
        ],
    };

    // Mensagem se não houver dados
    if (data.length === 0) {
        return (
            <div className="alert alert-info">
                Nenhum dado de balanço mensal disponível para o ano de {anoSelecionado}.
            </div>
        );
    }

    return (
        <div className="chart-card">
            <div className="bar-chart">
                <Bar options={options} data={chartData} />
            </div>
        </div>
    );
}

export default BarChart;