import { useEffect, useState } from "react";
import type { TipoLancamentoType } from "../../../../types/TipoLancamentoType";
import type { CategoriaLancamentoType } from "../../../../types/CategoriaLancamentoType";
import type { SubcategoriaLancamentoType } from "../../../../types/SubcategoriaLancamentoType";
import { buscarCategoriasLancamentoPorTipo, buscarLancamentosComFiltros, buscarSubcategoriasLancamentoPorCategoria, buscarTiposLancamento } from "../../../../services/LancamentoService";
import type { LancamentoResponseType } from "../../../../types/LancamentoResponseType";

function BuscarLancamentos() {

    const [tiposLancamento, setTiposLancamento] = useState<TipoLancamentoType[]>([]);
    const [tipoSelecionado, setTipoSelecionado] = useState<TipoLancamentoType | null>(null);

    const [categoriasLancamento, setCategoriasLancamento] = useState<CategoriaLancamentoType[]>([]);
    const [categoriaLancamento, setCategoriaLancamento] = useState<CategoriaLancamentoType | null>(null);

    const [subcategoriasLancamento, setSubcategoriasLancamento] = useState<SubcategoriaLancamentoType[]>([]);
    const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState<SubcategoriaLancamentoType | null>(null);

    const [titulo, setTitulo] = useState<string>("");
    const [lancamentos, setLancamentos] = useState<LancamentoResponseType[]>([]);

    // Carregar tipos de lançamento
    async function carregarTiposLancamento() {
        try {
            const res = await buscarTiposLancamento();
            setTiposLancamento(res.data);
        } catch (err) {
            alert("Erro ao carregar tipos de lançamento. " + err);
        }
    }

    // Carregar categorias
    async function carregarCategoriasPorTipo() {
        try {
            const res = await buscarCategoriasLancamentoPorTipo(tipoSelecionado?.id);
            setCategoriasLancamento(res.data);
        } catch (err) {
            alert("Erro ao carregar categorias de lançamento. " + err);
        }
    }

    // Carregar subcategorias
    async function carregarSubcategoriasPorCategoria() {
        try {
            const res = await buscarSubcategoriasLancamentoPorCategoria(categoriaLancamento?.id);
            setSubcategoriasLancamento(res.data);
        } catch (err) {
            alert("Erro ao carregar subcategorias de lançamento. " + err);
        }
    }

    // Manipuladores
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

    async function handleFiltrar(e: React.FormEvent) {
        e.preventDefault();
        try {
            const dados = await buscarLancamentosComFiltros(
                titulo,
                tipoSelecionado?.id,
                categoriaLancamento?.id,
                subcategoriaSelecionada?.id
            );
            setLancamentos(dados);
        } catch (err) {
            alert("Erro ao buscar lançamentos. " + err);
        }
    }

    function handleLimparFiltro() {
        setTitulo("");
        setTipoSelecionado(null);
        setCategoriaLancamento(null);
        setSubcategoriaSelecionada(null);
        setCategoriasLancamento([]);
        setSubcategoriasLancamento([]);
        setLancamentos([]);
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

    return (
        <div className="c-card">
            <h1>Buscar lançamentos</h1>
            <form onSubmit={handleFiltrar}>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="mb-3">
                            <label>Título</label>
                            <input
                                type="text"
                                className="form-control"
                                value={titulo}
                                onChange={handleTituloChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="mb-3">
                            <label>Tipo de lançamento</label>
                            <select
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
                            <label>Categoria</label>
                            <select
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
                            <label>Subcategoria</label>
                            <select
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

            <div className="table-responsive mt-2">
                <table className="table table-primary">
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Tipo</th>
                            <th>Categoria</th>
                            <th>Subcategoria</th>
                            <th>Valor</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lancamentos.map((x) => (
                            <tr key={x.id}>
                                <td>{x.titulo}</td>
                                <td>{x.tipoLancamento}</td>
                                <td>{x.categoria}</td>
                                <td>{x.subcategoria}</td>
                                <td>{x.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{x.data}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BuscarLancamentos;