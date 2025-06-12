import { useEffect, useState } from 'react';
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
import type { BalancoMensalType } from '../../../types/BalancoMensalType';
import { buscarBalancoMensal } from '../../../services/LancamentoService';


// Registrar os componentes necessários do Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    const [balancoMensal, setBalancoMensal] = useState<BalancoMensalType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [anoSelecionado, setAnoSelecionado] = useState<number>(new Date().getFullYear()); // Ano atual por padrão

    // Opções do gráfico (configuração visual)
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Permite controlar a altura/largura via CSS
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

    // Dados do gráfico (preparados para o Chart.js)
    const data = {
        labels: balancoMensal.map(item => {
            const [ano, mes] = item.mesAno.split('-');
            return `${mes}/${ano}`; // Formato "MM/AAAA" para os labels do eixo X
        }),
        datasets: [
            {
                label: 'Entradas',
                data: balancoMensal.map(item => item.totalEntradas),
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Cor verde-água para entradas
            },
            {
                label: 'Saídas',
                data: balancoMensal.map(item => item.totalSaidas),
                backgroundColor: 'rgba(255, 99, 132, 0.6)', // Cor vermelha para saídas
            },
        ],
    };

    useEffect(() => {
        const fetchBalancoMensal = async () => {
            setLoading(true);
            setError(null);
            try {
                const dados = await buscarBalancoMensal(anoSelecionado);
                setBalancoMensal(dados);
            } catch (err: any) {
                setError("Erro ao carregar dados do balanço mensal: " + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        };

        fetchBalancoMensal();
    }, [anoSelecionado]); // Recarrega sempre que o anoSelecionado mudar

    // Gera uma lista de anos para o dropdown (ex: ano atual - 5 até ano atual + 1)
    const anosDisponiveis = Array.from({ length: 7 }, (_, i) => new Date().getFullYear() - 3 + i);

    return (
        <div className="c-card">
            <h1>Dashboard</h1>

            <div className="mb-3">
                <label htmlFor="anoSelect" className="form-label me-2">Ano:</label>
                <select
                    id="anoSelect"
                    className="form-select d-inline-block w-auto"
                    value={anoSelecionado}
                    onChange={(e) => setAnoSelecionado(parseInt(e.target.value))}
                >
                    {anosDisponiveis.map(ano => (
                        <option key={ano} value={ano}>{ano}</option>
                    ))}
                </select>
            </div>

            {loading && <p>Carregando dados do gráfico...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error && balancoMensal.length > 0 && (
                <div className="grafico-card">
                    <div className="grafico-barra">
                        <Bar options={options} data={data} />
                    </div>
                </div>
            )}
            {!loading && !error && balancoMensal.length === 0 && (
                <div className="alert alert-info">
                    Nenhum dado de balanço mensal encontrado para o ano de {anoSelecionado}.
                </div>
            )}
        </div>
    );
}

export default Dashboard;