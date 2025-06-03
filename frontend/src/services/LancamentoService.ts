import axios from "axios";
import type { CadastrarLancamentoType } from "../types/CadastrarLancamentoType";
import type { LancamentoResponseType } from "../types/LancamentoResponseType";

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
    subcategoriaId?: number
): Promise<LancamentoResponseType[]> {
    const params = new URLSearchParams();

    if (titulo) params.append("titulo", titulo);
    if (tipoId) params.append("tipoId", tipoId.toString());
    if (categoriaId) params.append("categoriaId", categoriaId.toString());
    if (subcategoriaId) params.append("subcategoriaId", subcategoriaId.toString());

    const response = await axios.get(`${baseURL}/lancamentos`, {
        params,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data;
}