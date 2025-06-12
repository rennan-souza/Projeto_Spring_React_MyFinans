import { useEffect, useState } from 'react';
import { buscarBalancoMensal } from '../../../services/LancamentoService';
import type { BalancoMensalType } from '../../../types/BalancoMensalType';
import BarChart from '../../../components/bar-chart';

function Dashboard() {
    const [balancoMensal, setBalancoMensal] = useState<BalancoMensalType[]>([]);
    const [gastosPorCategoria, setGastosPorCategoria] = useState<any[]>([]); // Usando 'any' por enquanto, crie GastoPorCategoriaType depois
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [anoSelecionado, setAnoSelecionado] = useState<number>(new Date().getFullYear());

    // Efeito para buscar todos os dados quando o ano selecionado mudar
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Busca para o Balanço Mensal (Gráfico de Barras)
                const balancoDados = await buscarBalancoMensal(anoSelecionado);
                setBalancoMensal(balancoDados);

                // TODO: Descomentar e implementar a busca para Gastos por Categoria (Gráfico de Pizza)
                // const gastosDados = await buscarGastosPorCategoria(anoSelecionado);
                // setGastosPorCategoria(gastosDados);

            } catch (err: any) {
                setError("Erro ao carregar dados dos gráficos: " + (err.response?.data?.message || err.message));
                console.error(err); // Log para debug
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [anoSelecionado]); // Ambos dependem do mesmo ano selecionado

    // Gera uma lista de anos para o dropdown (ex: ano atual - 3 até ano atual + 3)
    const anosDisponiveis = Array.from({ length: 7 }, (_, i) => new Date().getFullYear() - 3 + i);

    return (
        <div className="c-card">
            <h1>Dashboard Financeiro</h1>

            {/* Input de filtro de ano - ÚNICO para todos os gráficos */}
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
                <>
                    {/* Componente Gráfico de Barras */}
                    <div className="mb-4" style={{ height: '400px' }}>
                        <BarChart
                            data={balancoMensal}
                            anoSelecionado={anoSelecionado}
                        />
                    </div>

                    {/* TODO: Descomentar este bloco quando tiver o componente PieChartComponent e os dados */}
                    {/* Componente Gráfico de Pizza/Rosca */}
                    {/*
                    <div style={{ height: '400px' }}>
                        <PieChartComponent
                            data={gastosPorCategoria}
                            anoSelecionado={anoSelecionado}
                        />
                    </div>
                    */}
                </>
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