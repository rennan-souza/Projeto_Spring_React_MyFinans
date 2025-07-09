import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { BalancoMensalType } from '../../types/BalancoMensalType';

// Registrar os componentes necessários do Chart.js para gráficos de linha
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type SaldoTrendChartProps = {
    data: BalancoMensalType[];
    anoSelecionado: number;
};

function LineChart({ data, anoSelecionado }: SaldoTrendChartProps) {

    // Prepara os dados para o Chart.js
    const chartData = {
        labels: data.map(item => {
            const [ano, mes] = item.mesAno.split('-');
            const date = new Date(parseInt(ano), parseInt(mes) - 1); // Mês é 0-indexed no JS
            return new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(date);
        }),
        datasets: [
            {
                label: 'Saldo Mensal',
                data: data.map(item => item.saldoMensal),
                borderColor: 'rgba(75, 192, 192, 1)', // Cor da linha
                backgroundColor: 'rgba(75, 192, 192, 0.4)', // Cor da área abaixo da linha (opcional)
                tension: 0.3, // Curvatura da linha
                fill: true, // Preenche a área abaixo da linha
            },
        ],
    };

    // Opções do gráfico
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `Tendência do Saldo Mensal - ${anoSelecionado}`,
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
                beginAtZero: false, // O saldo pode ser negativo
                ticks: {
                    callback: function (value: string | number) {
                        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value));
                    }
                }
            }
        }
    };

    // Mensagem se não houver dados
    if (data.length === 0) {
        return (
            <div className="alert alert-info">
                Nenhum dado de saldo mensal disponível para o ano de {anoSelecionado}.
            </div>
        );
    }

    return (
        <div className="chart-container">
            <Line options={options} data={chartData} />
        </div>
    );
}

export default LineChart;