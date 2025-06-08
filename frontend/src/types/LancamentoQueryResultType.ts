import type { LancamentoResponseType } from "./LancamentoResponseType";
import type { SpringPageType } from "./SpringPageType";

export interface LancamentoQueryResultType {
    lancamentos: SpringPageType<LancamentoResponseType>;
    totalEntradas: number;
    totalSaidas: number;
    saldoTotal: number;
}