import type { CategoriaLancamentoType } from "./CategoriaLancamentoType";

export type SubcategoriaLancamentoType = {
    id: number;
    nome: string;
    categoria: CategoriaLancamentoType;
}