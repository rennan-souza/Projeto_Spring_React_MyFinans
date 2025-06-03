import { useEffect, useState } from "react";
import type { TipoLancamentoType } from "../../../../types/TipoLancamentoType";
import type { CategoriaLancamentoType } from "../../../../types/CategoriaLancamentoType";
import type { SubcategoriaLancamentoType } from "../../../../types/SubcategoriaLancamentoType";
import type { CadastrarLancamentoType } from "../../../../types/CadastrarLancamentoType";
import {
    buscarCategoriasLancamentoPorTipo,
    buscarSubcategoriasLancamentoPorCategoria,
    buscarTiposLancamento,
    cadastrarLancamento,
} from "../../../../services/LancamentoService";
import { NumericFormat } from "react-number-format";



function CadastrarLancamento() {
    const [tiposLancamento, setTiposLancamento] = useState<TipoLancamentoType[]>([]);
    const [tipoSelecionado, setTipoSelecionado] = useState<TipoLancamentoType | null>(null);

    const [categoriasLancamento, setCategoriasLancamento] = useState<CategoriaLancamentoType[]>([]);
    const [categoriaLancamento, setCategoriaLancamento] = useState<CategoriaLancamentoType | null>(null);

    const [subcategoriasLancamento, setSubcategoriasLancamento] = useState<SubcategoriaLancamentoType[]>([]);
    const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState<SubcategoriaLancamentoType | null>(null);


    const [listaDeErros, setListaDeErros] = useState<CadastrarLancamentoType>();

    const [formData, setFormData] = useState<CadastrarLancamentoType>({
        titulo: '',
        descricao: '',
        valor: 0,
        data: '',
        subcategoriaId: 0
    });

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
        if (sub) {
            setFormData(prev => ({
                ...prev,
                subcategoriaId: sub.id
            }));
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "valor" ? parseFloat(value) : value
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

       
        if (!formData.titulo || !formData.valor || !formData.data || !formData.subcategoriaId) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            const res = await cadastrarLancamento(formData);
            alert("Lançamento cadastrado com sucesso!");
            console.log(res.data);

            // Resetar formulário
            setFormData({
                titulo: '',
                descricao: '',
                valor: 0,
                data: '',
                subcategoriaId: 0
            });
            setTipoSelecionado(null);
            setCategoriaLancamento(null);
            setSubcategoriaSelecionada(null);
            setCategoriasLancamento([]);
            setSubcategoriasLancamento([]);

        } catch (err: any) {
            if (err.response) {
                setListaDeErros(err.response.data.errors);
                console.log(err.response);
                alert(err.response.data.message);
            } else {
                alert("Ocorreu um erro inesperado. " + err);
            }
        }
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
            <h1>Cadastrar lançamento</h1>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="mb-3">
                            <label>Título <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleInputChange}
                                required
                            />
                            <span className="text-danger fs-10">{listaDeErros?.titulo}</span>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="mb-3">
                            <label>Descrição</label>
                            <input
                                type="text"
                                className="form-control"
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleInputChange}
                                required
                            />
                            <span className="text-danger fs-10">{listaDeErros?.descricao}</span>
                        </div>
                    </div>
                </div>

                <div className="row">

                    {/*}
                    <div className="col-lg-2">
                        <div className="mb-3">
                            <label>Valor</label>
                            <input
                                type="number"
                                className="form-control"
                                name="valor"
                                value={formData.valor}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    {*/}

                    <div className="col-lg-2">
                        <div className="mb-3">
                            <label>Valor <span className="text-danger">*</span></label>
                            <NumericFormat
                                className="form-control"
                                name="valor"
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix="R$ "
                                decimalScale={2}
                                fixedDecimalScale
                                allowNegative={false}
                                value={formData.valor}
                                onValueChange={(values) => {
                                    const { floatValue } = values;
                                    setFormData({ ...formData, valor: floatValue ?? 0 });
                                }}
                                required
                            />
                            <span className="text-danger fs-10">{listaDeErros?.valor}</span>
                        </div>
                    </div>

                    <div className="col-lg-2">
                        <div className="mb-3">
                            <label>Data <span className="text-danger">*</span></label>
                            <input
                                type="date"
                                className="form-control"
                                name="data"
                                value={formData.data}
                                onChange={handleInputChange}
                                required
                            />
                            <span className="text-danger fs-10">{listaDeErros?.data}</span>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="mb-3">
                            <label>Tipo de lançamento <span className="text-danger">*</span></label>
                            <select
                                className="form-select"
                                onChange={handleTipoChange}
                                value={tipoSelecionado?.id || ""}
                                required
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
                            <label>Categoria <span className="text-danger">*</span></label>
                            <select
                                className="form-select"
                                onChange={handleCategoriaChange}
                                value={categoriaLancamento?.id || ""}
                                disabled={categoriasLancamento.length === 0}
                                required
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
                            <label>Subcategoria <span className="text-danger">*</span></label>
                            <select
                                className="form-select"
                                onChange={handleSubcategoriaChange}
                                value={subcategoriaSelecionada?.id || ""}
                                disabled={subcategoriasLancamento.length === 0}
                                required
                            >
                                <option value="">Selecione...</option>
                                {subcategoriasLancamento.map(x => (
                                    <option key={x.id} value={x.id}>
                                        {x.nome}
                                    </option>
                                ))}
                            </select>
                            <span className="text-danger fs-10">{listaDeErros?.subcategoriaId}</span>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">
                    Salvar
                </button>
            </form>
        </div>
    );
}

export default CadastrarLancamento;
