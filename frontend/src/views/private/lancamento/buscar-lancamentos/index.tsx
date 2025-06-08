// src/main/webapp/src/components/Lancamentos/BuscarLancamentos.tsx

import { useEffect, useState, useCallback } from "react";
import type { TipoLancamentoType } from "../../../../types/TipoLancamentoType";
import type { CategoriaLancamentoType } from "../../../../types/CategoriaLancamentoType";
import type { SubcategoriaLancamentoType } from "../../../../types/SubcategoriaLancamentoType";
import { buscarCategoriasLancamentoPorTipo, buscarLancamentosComFiltros, buscarSubcategoriasLancamentoPorCategoria, buscarTiposLancamento } from "../../../../services/LancamentoService";
import type { LancamentoQueryResultType } from "../../../../types/LancamentoQueryResultType";

function BuscarLancamentos() {

    const [tiposLancamento, setTiposLancamento] = useState<TipoLancamentoType[]>([]);
    const [tipoSelecionado, setTipoSelecionado] = useState<TipoLancamentoType | null>(null);

    const [categoriasLancamento, setCategoriasLancamento] = useState<CategoriaLancamentoType[]>([]);
    const [categoriaLancamento, setCategoriaLancamento] = useState<CategoriaLancamentoType | null>(null);

    const [subcategoriasLancamento, setSubcategoriasLancamento] = useState<SubcategoriaLancamentoType[]>([]);
    const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState<SubcategoriaLancamentoType | null>(null);

    const [titulo, setTitulo] = useState<string>("");
    const [dataInicio, setDataInicio] = useState<string>("");
    const [dataFim, setDataFim] = useState<string>("");

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [sortOrder, setSortOrder] = useState<string>("data,desc");

    const [resultadoBusca, setResultadoBusca] = useState<LancamentoQueryResultType | null>(null);

    const carregarLancamentos = useCallback(async (
        page: number,
        size: number,
        sort: string,
        tituloF: string,
        tipoIdF?: number,
        categoriaIdF?: number,
        subcategoriaIdF?: number,
        dataInicioF?: string,
        dataFimF?: string
    ) => {
        try {
            const dados = await buscarLancamentosComFiltros(
                tituloF,
                tipoIdF,
                categoriaIdF,
                subcategoriaIdF,
                dataInicioF,
                dataFimF,
                page,
                size,
                sort
            );
            setResultadoBusca(dados);
        } catch (err: any) {
            alert("Erro ao buscar lançamentos. " + (err.response?.data?.message || err.message));
            setResultadoBusca(null);
        }
    }, []);

    async function carregarTiposLancamento() {
        try {
            const res = await buscarTiposLancamento();
            setTiposLancamento(res.data);
        } catch (err: any) {
            alert("Erro ao carregar tipos de lançamento. " + (err.response?.data?.message || err.message));
        }
    }

    async function carregarCategoriasPorTipo() {
        try {
            const res = await buscarCategoriasLancamentoPorTipo(tipoSelecionado?.id);
            setCategoriasLancamento(res.data);
        } catch (err: any) {
            alert("Erro ao carregar categorias de lançamento. " + (err.response?.data?.message || err.message));
        }
    }

    async function carregarSubcategoriasPorCategoria() {
        try {
            const res = await buscarSubcategoriasLancamentoPorCategoria(categoriaLancamento?.id);
            setSubcategoriasLancamento(res.data);
        } catch (err: any) {
            alert("Erro ao carregar subcategorias de lançamento. " + (err.response?.data?.message || err.message));
        }
    }

    function handleTipoChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const id = parseInt(e.target.value);
        const tipo = tiposLancamento.find(t => t.id === id) || null;
        setTipoSelecionado(tipo);
    }

    function handleCategoriaChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const id = parseInt(e.target.value);
        const categoria = categoriasLancamento.find(c => c.id === id) || null;
        setCategoriaLancamento(categoria);
    }

    function handleSubcategoriaChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const id = parseInt(e.target.value);
        const sub = subcategoriasLancamento.find(s => s.id === id) || null;
        setSubcategoriaSelecionada(sub);
    }

    function handleTituloChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTitulo(e.target.value);
    }

    function handleDataInicioChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDataInicio(e.target.value);
    }

    function handleDataFimChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDataFim(e.target.value);
    }

    function handlePageChange(newPage: number) {
        setCurrentPage(newPage);
        carregarLancamentos(
            newPage,
            pageSize,
            sortOrder,
            titulo,
            tipoSelecionado?.id,
            categoriaLancamento?.id,
            subcategoriaSelecionada?.id,
            dataInicio,
            dataFim
        );
    }

    function handlePageSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newSize = parseInt(e.target.value);
        setPageSize(newSize);
        setCurrentPage(0);
        carregarLancamentos(
            0,
            newSize,
            sortOrder,
            titulo,
            tipoSelecionado?.id,
            categoriaLancamento?.id,
            subcategoriaSelecionada?.id,
            dataInicio,
            dataFim
        );
    }

    function handleSortOrderChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newSortOrder = e.target.value;
        setSortOrder(newSortOrder);
        setCurrentPage(0);
        carregarLancamentos(
            0,
            pageSize,
            newSortOrder,
            titulo,
            tipoSelecionado?.id,
            categoriaLancamento?.id,
            subcategoriaSelecionada?.id,
            dataInicio,
            dataFim
        );
    }

    async function handleFiltrar(e: React.FormEvent) {
        e.preventDefault();
        setCurrentPage(0);
        carregarLancamentos(
            0,
            pageSize,
            sortOrder,
            titulo,
            tipoSelecionado?.id,
            categoriaLancamento?.id,
            subcategoriaSelecionada?.id,
            dataInicio,
            dataFim
        );
    }

    function handleLimparFiltro() {
        setTitulo("");
        setTipoSelecionado(null);
        setCategoriaLancamento(null);
        setSubcategoriaSelecionada(null);
        setCategoriasLancamento([]);
        setSubcategoriasLancamento([]);
        setDataInicio("");
        setDataFim("");
        setCurrentPage(0);
        setPageSize(10);
        setSortOrder("data,desc");
        setResultadoBusca(null);
    }

    useEffect(() => {
        carregarTiposLancamento();
    }, []);

    useEffect(() => {
        if (tipoSelecionado) {
            carregarCategoriasPorTipo();
        } else {
            setCategoriasLancamento([]);
            setCategoriaLancamento(null);
            setSubcategoriasLancamento([]);
        }
    }, [tipoSelecionado]);

    useEffect(() => {
        if (categoriaLancamento) {
            carregarSubcategoriasPorCategoria();
        } else {
            setSubcategoriasLancamento([]);
        }
    }, [categoriaLancamento]);

    const lancamentosParaExibir = resultadoBusca?.lancamentos?.content || [];

    return (
        <div className="c-card">
            <h1>Buscar lançamentos</h1>
            <form onSubmit={handleFiltrar}>
                <div className="row">
                    <div className="col-lg-5">
                        <div className="mb-3">
                            <label htmlFor="tituloInput">Título</label>
                            <input
                                id="tituloInput"
                                type="text"
                                className="form-control"
                                value={titulo}
                                onChange={handleTituloChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="mb-3">
                            <label htmlFor="dataInicioInput">Data Início</label>
                            <input
                                id="dataInicioInput"
                                type="date"
                                className="form-control"
                                value={dataInicio}
                                onChange={handleDataInicioChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="mb-3">
                            <label htmlFor="dataFimInput">Data Fim</label>
                            <input
                                id="dataFimInput"
                                type="date"
                                className="form-control"
                                value={dataFim}
                                onChange={handleDataFimChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="mb-3">
                            <label htmlFor="tipoLancamentoSelect">Tipo de lançamento</label>
                            <select
                                id="tipoLancamentoSelect"
                                className="form-select"
                                onChange={handleTipoChange}
                                value={tipoSelecionado?.id || ""}
                            >
                                <option value="">Selecione...</option>
                                {tiposLancamento.map(x => (
                                    <option key={x.id} value={x.id}>
                                        {x.descricao}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="mb-3">
                            <label htmlFor="categoriaSelect">Categoria</label>
                            <select
                                id="categoriaSelect"
                                className="form-select"
                                onChange={handleCategoriaChange}
                                value={categoriaLancamento?.id || ""}
                                disabled={categoriasLancamento.length === 0}
                            >
                                <option value="">Selecione...</option>
                                {categoriasLancamento.map(x => (
                                    <option key={x.id} value={x.id}>
                                        {x.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="mb-3">
                            <label htmlFor="subcategoriaSelect">Subcategoria</label>
                            <select
                                id="subcategoriaSelect"
                                className="form-select"
                                onChange={handleSubcategoriaChange}
                                value={subcategoriaSelecionada?.id || ""}
                                disabled={subcategoriasLancamento.length === 0}
                            >
                                <option value="">Selecione...</option>
                                {subcategoriasLancamento.map(x => (
                                    <option key={x.id} value={x.id}>
                                        {x.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column flex-lg-row align-items-lg-center">
                    <button type="submit" className="btn btn-primary">
                        Filtrar
                    </button>
                    <button type="button" className="btn btn-secondary mt-2 mt-lg-0 ms-lg-2" onClick={handleLimparFiltro}>
                        Limpar filtro
                    </button>
                </div>
            </form>

            {resultadoBusca && (
                <div className="row mt-3">
                    <div className="col-lg-4">
                        <div className="alert alert-success text-center">
                            <strong>Total Entradas:</strong> {resultadoBusca.totalEntradas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="alert alert-danger text-center">
                            <strong>Total Saídas:</strong> {resultadoBusca.totalSaidas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className={`alert ${resultadoBusca.saldoTotal >= 0 ? 'alert-info' : 'alert-warning'} text-center`}>
                            <strong>Saldo Total:</strong> {resultadoBusca.saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                    </div>
                </div>
            )}

            <div className="table-responsive my-2">
                <table className="table table-primary">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Titulo</th>
                            <th>Tipo</th>
                            <th>Categoria</th>
                            <th>Subcategoria</th>
                            <th>Valor</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lancamentosParaExibir.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center">Nenhum lançamento encontrado.</td>
                            </tr>
                        ) : (
                            lancamentosParaExibir.map((x) => (
                                <tr key={x.id}>
                                    <td>{x.id}</td>
                                    <td>{x.titulo}</td>
                                    <td>{x.tipoLancamento === 'Entrada' ? <span className="badge bg-success">{x.tipoLancamento}</span> : <span className="badge bg-danger">{x.tipoLancamento}</span>}</td>
                                    <td>{x.categoria}</td>
                                    <td>{x.subcategoria}</td>
                                    <td>{x.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td>{x.data}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Controles de Paginação, Ordenação e Tamanho da Página */}
            {resultadoBusca?.lancamentos && resultadoBusca.lancamentos.totalPages > 0 && (
                <>
                    {/* Versão para Desktop/Tablet (visível a partir de sm, oculto em extra small) */}
                    <div className="d-none d-sm-flex justify-content-between align-items-center mt-3 flex-wrap">
                        {/* Paginação completa */}
                        <nav aria-label="Paginação de Lançamentos" className="mb-2 mb-md-0">
                            <ul className="pagination mb-0">
                                <li className={`page-item ${resultadoBusca.lancamentos.first ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(resultadoBusca.lancamentos.number - 1)}
                                        disabled={resultadoBusca.lancamentos.first}
                                    >
                                        <i className="bi bi-chevron-left"></i>
                                    </button>
                                </li>

                                {(() => {
                                    const totalPages = resultadoBusca.lancamentos.totalPages;
                                    const currentPage = resultadoBusca.lancamentos.number;
                                    const maxPagesToShow = 5;
                                    const pageButtons = [];

                                    let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
                                    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

                                    if (endPage - startPage + 1 < maxPagesToShow) {
                                        startPage = Math.max(0, endPage - maxPagesToShow + 1);
                                    }

                                    if (startPage > 0) {
                                        pageButtons.push(
                                            <li key="first" className="page-item">
                                                <button className="page-link" onClick={() => handlePageChange(0)}>1</button>
                                            </li>
                                        );
                                        if (startPage > 1) {
                                            pageButtons.push(
                                                <li key="ellipsis-start" className="page-item disabled-ellipsis-start">
                                                    <span className="page-link">...</span>
                                                </li>
                                            );
                                        }
                                    }

                                    for (let i = startPage; i <= endPage; i++) {
                                        pageButtons.push(
                                            <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={() => handlePageChange(i)}
                                                >
                                                    {i + 1}
                                                </button>
                                            </li>
                                        );
                                    }

                                    if (endPage < totalPages - 1) {
                                        if (endPage < totalPages - 2) {
                                            pageButtons.push(
                                                <li key="ellipsis-end" className="page-item disabled-ellipsis-start">
                                                    <span className="page-link">...</span>
                                                </li>
                                            );
                                        }
                                        pageButtons.push(
                                            <li key="last" className="page-item">
                                                <button className="page-link" onClick={() => handlePageChange(totalPages - 1)}>{totalPages}</button>
                                            </li>
                                        );
                                    }

                                    return pageButtons;
                                })()}

                                <li className={`page-item ${resultadoBusca.lancamentos.last ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(resultadoBusca.lancamentos.number + 1)}
                                        disabled={resultadoBusca.lancamentos.last}
                                    >
                                        <i className="bi bi-chevron-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>

                        <div className="d-flex align-items-center flex-wrap">
                            {/* Itens por página */}
                            <div className="me-3 mb-2 mb-md-0">
                                <label htmlFor="pageSizeSelect" className="me-2">Itens por página:</label>
                                <select
                                    id="pageSizeSelect"
                                    className="form-select d-inline-block w-auto"
                                    value={pageSize}
                                    onChange={handlePageSizeChange}
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </div>

                            {/* Ordenação */}
                            <div>
                                <label htmlFor="sortOrderSelect" className="me-2">Ordenar por:</label>
                                <select
                                    id="sortOrderSelect"
                                    className="form-select d-inline-block w-auto"
                                    value={sortOrder}
                                    onChange={handleSortOrderChange}
                                >
                                    <option value="data,desc">Data (Decrescente)</option>
                                    <option value="data,asc">Data (Crescente)</option>
                                    <option value="titulo,asc">Título (A-Z)</option>
                                    <option value="titulo,desc">Título (Z-A)</option>
                                    <option value="valor,desc">Valor (Maior)</option>
                                    <option value="valor,asc">Valor (Menor)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Versão para Mobile (oculto a partir de sm, visível em extra small) */}
                    <div className="d-sm-none d-flex flex-column align-items-center mt-3">
                        <div className="mb-2">
                            Página {resultadoBusca.lancamentos.number + 1} de {resultadoBusca.lancamentos.totalPages}
                        </div>
                        <nav aria-label="Paginação de Lançamentos Mobile">
                            <ul className="pagination mb-0">
                                <li className={`page-item ${resultadoBusca.lancamentos.first ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(resultadoBusca.lancamentos.number - 1)}
                                        disabled={resultadoBusca.lancamentos.first}
                                    >
                                        <i className="bi bi-chevron-left"></i>
                                    </button>
                                </li>
                                <li className={`page-item ${resultadoBusca.lancamentos.last ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(resultadoBusca.lancamentos.number + 1)}
                                        disabled={resultadoBusca.lancamentos.last}
                                    >
                                        <i className="bi bi-chevron-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                        <div className="d-flex flex-column align-items-center mt-2">
                            <div className="mb-2">
                                <label htmlFor="pageSizeSelectMobile" className="me-2">Itens:</label>
                                <select
                                    id="pageSizeSelectMobile"
                                    className="form-select d-inline-block w-auto"
                                    value={pageSize}
                                    onChange={handlePageSizeChange}
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="sortOrderSelectMobile" className="me-2">Ordenar:</label>
                                <select
                                    id="sortOrderSelectMobile"
                                    className="form-select d-inline-block w-auto"
                                    value={sortOrder}
                                    onChange={handleSortOrderChange}
                                >
                                    <option value="data,desc">Data (Desc.)</option>
                                    <option value="data,asc">Data (Cresc.)</option>
                                    <option value="titulo,asc">Título (A-Z)</option>
                                    <option value="titulo,desc">Título (Z-A)</option>
                                    <option value="valor,desc">Valor (Maior)</option>
                                    <option value="valor,asc">Valor (Menor)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default BuscarLancamentos;