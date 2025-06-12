import axios from "axios";
import type { CadastrarLancamentoType } from "../types/CadastrarLancamentoType";
import type { LancamentoQueryResultType } from "../types/LancamentoQueryResultType"; // Adicione esta importação
import type { BalancoMensalType } from "../types/BalancoMensalType";

const baseURL: string = "http://localhost:8080/api";

export async function cadastrarLancamento(obj: CadastrarLancamentoType) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    };

    const response = await axios.post(`${baseURL}/lancamentos`, obj, config);
    return response;
}

export async function buscarTiposLancamento() {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    };

    return axios.get(`${baseURL}/tipos-lancamento`, config);
}

export async function buscarCategoriasLancamentoPorTipo(id?: number) {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    };

    return axios.get(`${baseURL}/categorias-lancamento/tipo/${id}`, config);
}

export async function buscarSubcategoriasLancamentoPorCategoria(id?: number) {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    };

    return axios.get(`${baseURL}/subcategorias-lancamento/categoria/${id}`, config);
}

export async function buscarLancamentosComFiltros(
    titulo?: string,
    tipoId?: number,
    categoriaId?: number,
    subcategoriaId?: number,
    dataInicio?: string,
    dataFim?: string,
    page: number = 0,
    size: number = 10,
    sort: string = "data,desc"
): Promise<LancamentoQueryResultType> {
    const params = new URLSearchParams();

    if (titulo) params.append("titulo", titulo);
    if (tipoId) params.append("tipoId", tipoId.toString());
    if (categoriaId) params.append("categoriaId", categoriaId.toString());
    if (subcategoriaId) params.append("subcategoriaId", subcategoriaId.toString());
    if (dataInicio) params.append("dataInicio", dataInicio);
    if (dataFim) params.append("dataFim", dataFim);

    params.append("page", page.toString());
    params.append("size", size.toString());
    params.append("sort", sort); // Parâmetro de ordenação

    const response = await axios.get(`${baseURL}/lancamentos`, {
        params,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data;
}

export async function buscarBalancoMensal(ano: number): Promise<BalancoMensalType[]> {
    const params = new URLSearchParams();

    params.append("ano", ano.toString());

    const response = await axios.get<BalancoMensalType[]>(`${baseURL}/lancamentos/relatorios/balanco-mensal`, {
        params,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data;
}