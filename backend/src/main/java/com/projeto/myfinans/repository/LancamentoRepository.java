package com.projeto.myfinans.repository;

import com.projeto.myfinans.entity.Lancamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {

    List<Lancamento> findByUsuarioId(Long id);

    @Query("""
    SELECT l FROM Lancamento l
    WHERE l.usuario.id = :usuarioId
      AND (:titulo IS NULL OR LOWER(l.titulo) LIKE LOWER(CONCAT('%', :titulo, '%')))
      AND (:tipoId IS NULL OR l.subcategoria.categoria.tipoLancamento.id = :tipoId)
      AND (:categoriaId IS NULL OR l.subcategoria.categoria.id = :categoriaId)
      AND (:subcategoriaId IS NULL OR l.subcategoria.id = :subcategoriaId)
    """)
    List<Lancamento> buscarComFiltros(
            @Param("usuarioId") Long usuarioId,
            @Param("titulo") String titulo,
            @Param("tipoId") Long tipoId,
            @Param("categoriaId") Long categoriaId,
            @Param("subcategoriaId") Long subcategoriaId
    );
}
