package com.projeto.myfinans.repository;

import com.projeto.myfinans.entity.CategoriaLancamento;
import com.projeto.myfinans.entity.TipoLancamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaLancamentoRepository extends JpaRepository<CategoriaLancamento, Long> {

    // Busca categorias pelo TipoLancamento
    List<CategoriaLancamento> findByTipoLancamento(TipoLancamento tipoLancamento);

    // Buscar TipoLancamento pelo id
    List<CategoriaLancamento> findByTipoLancamentoId(Long tipoId);
}
