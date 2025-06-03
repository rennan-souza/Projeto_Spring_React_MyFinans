export interface LancamentoResponseType {
    id: number;
    titulo: string;
    descricao: string | null;
    valor: number;
    data: string;
    tipoLancamentoId: number;
    tipoLancamento: string;
    categoriaId: number;
    categoria: string;
    subcategoriaId: number;
    subcategoria: string;
    usuarioId: number;
    usuario: string;
}