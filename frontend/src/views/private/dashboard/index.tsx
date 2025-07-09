import { useEffect, useState } from 'react';
import { buscarBalancoMensal, buscarGastosPorCategoria } from '../../../services/LancamentoService';
import type { BalancoMensalType } from '../../../types/BalancoMensalType';
import type { GastoPorCategoriaType } from '../../../types/GastoPorCategoriaType';
import BarChart from '../../../components/bar-chart';
import PieChart from '../../../components/pie-chart';
import LineChart from '../../../components/line-chart';

function Dashboard() {
    const [balancoMensal, setBalancoMensal] = useState<BalancoMensalType[]>([]);
    const [gastosPorCategoria, setGastosPorCategoria] = useState<GastoPorCategoriaType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [anoSelecionado, setAnoSelecionado] = useState<number>(new Date().getFullYear());

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const balancoDados = await buscarBalancoMensal(anoSelecionado);
                setBalancoMensal(balancoDados);

                const gastosDados = await buscarGastosPorCategoria(anoSelecionado);
                setGastosPorCategoria(gastosDados);

            } catch (err: any) {
                setError("Erro ao carregar dados dos gráficos: " + (err.response?.data?.message || err.message));
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [anoSelecionado]);

    const anosDisponiveis = Array.from({ length: 7 }, (_, i) => new Date().getFullYear() - 3 + i);

    return (
        <div className="c-card">
            <h1>Dashboard Financeiro</h1>

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

            {loading && <p>Carregando dados dos gráficos...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error && (
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card mb-2">
                            <div className="card-body">
                                <BarChart
                                    data={balancoMensal}
                                    anoSelecionado={anoSelecionado}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card mb-2">
                            <div className="card-body">
                                <PieChart
                                    data={gastosPorCategoria}
                                    anoSelecionado={anoSelecionado}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="card mb-2">
                            <div className="card-body">
                                <LineChart
                                    data={balancoMensal} // Usa os mesmos dados do balanço mensal
                                    anoSelecionado={anoSelecionado}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!loading && !error && balancoMensal.length === 0 && gastosPorCategoria.length === 0 && (
                <div className="alert alert-info mt-4">
                    Nenhum dado financeiro encontrado para o ano de {anoSelecionado}.
                </div>
            )}
        </div>
    );
}

export default Dashboard;