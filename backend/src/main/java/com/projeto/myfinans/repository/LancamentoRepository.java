package com.projeto.myfinans.repository;

import com.projeto.myfinans.entity.Lancamento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;

@Repository
public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {

    // Metodo para buscar lançamentos com todos os filtros e paginação
    @Query("""
    SELECT l FROM Lancamento l
        WHERE l.usuario.id = :usuarioId
        AND (:titulo IS NULL OR LOWER(l.titulo) LIKE LOWER(CONCAT('%', :titulo, '%')))
        AND (:tipoId IS NULL OR l.subcategoria.categoria.tipoLancamento.id = :tipoId)
        AND (:categoriaId IS NULL OR l.subcategoria.categoria.id = :categoriaId)
        AND (:subcategoriaId IS NULL OR l.subcategoria.id = :subcategoriaId)
        AND (:dataInicio IS NULL OR l.data >= :dataInicio)
        AND (:dataFim IS NULL OR l.data <= :dataFim)
    """)
    Page<Lancamento> buscarComFiltros(
            @Param("usuarioId") Long usuarioId,
            @Param("titulo") String titulo,
            @Param("tipoId") Long tipoId,
            @Param("categoriaId") Long categoriaId,
            @Param("subcategoriaId") Long subcategoriaId,
            @Param("dataInicio") LocalDate dataInicio,
            @Param("dataFim") LocalDate dataFim,
            Pageable pageable
    );

    // Metodo para calcular o total de entradas com os mesmos filtros
    @Query("""
    SELECT COALESCE(SUM(l.valor), 0.0) FROM Lancamento l
        WHERE l.usuario.id = :usuarioId
        AND l.subcategoria.categoria.tipoLancamento.descricao = 'Entrada'
        AND (:titulo IS NULL OR LOWER(l.titulo) LIKE LOWER(CONCAT('%', :titulo, '%')))
        AND (:tipoId IS NULL OR l.subcategoria.categoria.tipoLancamento.id = :tipoId)
        AND (:categoriaId IS NULL OR l.subcategoria.categoria.id = :categoriaId)
        AND (:subcategoriaId IS NULL OR l.subcategoria.id = :subcategoriaId)
        AND (:dataInicio IS NULL OR l.data >= :dataInicio)
        AND (:dataFim IS NULL OR l.data <= :dataFim)
    """)
    BigDecimal calcularTotalEntradas(
            @Param("usuarioId") Long usuarioId,
            @Param("titulo") String titulo,
            @Param("tipoId") Long tipoId,
            @Param("categoriaId") Long categoriaId,
            @Param("subcategoriaId") Long subcategoriaId,
            @Param("dataInicio") LocalDate dataInicio,
            @Param("dataFim") LocalDate dataFim
    );

    // Metodo para calcular o total de saídas com os mesmos filtros
    @Query("""
    SELECT COALESCE(SUM(l.valor), 0.0) FROM Lancamento l
        WHERE l.usuario.id = :usuarioId
        AND l.subcategoria.categoria.tipoLancamento.descricao = 'Saída'
        AND (:titulo IS NULL OR LOWER(l.titulo) LIKE LOWER(CONCAT('%', :titulo, '%')))
        AND (:tipoId IS NULL OR l.subcategoria.categoria.tipoLancamento.id = :tipoId)
        AND (:categoriaId IS NULL OR l.subcategoria.categoria.id = :categoriaId)
        AND (:subcategoriaId IS NULL OR l.subcategoria.id = :subcategoriaId)
        AND (:dataInicio IS NULL OR l.data >= :dataInicio)
        AND (:dataFim IS NULL OR l.data <= :dataFim)
    """)
    BigDecimal calcularTotalSaidas(
            @Param("usuarioId") Long usuarioId,
            @Param("titulo") String titulo,
            @Param("tipoId") Long tipoId,
            @Param("categoriaId") Long categoriaId,
            @Param("subcategoriaId") Long subcategoriaId,
            @Param("dataInicio") LocalDate dataInicio,
            @Param("dataFim") LocalDate dataFim
    );
}