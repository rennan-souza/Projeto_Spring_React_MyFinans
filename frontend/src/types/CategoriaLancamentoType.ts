import type { TipoLancamentoType } from "./TipoLancamentoType";

export type CategoriaLancamentoType = {
    id: number;
    nome: string;
    tipoLancamento: TipoLancamentoType;
};