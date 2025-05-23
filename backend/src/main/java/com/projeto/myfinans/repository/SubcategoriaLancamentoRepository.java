package com.projeto.myfinans.repository;

import com.projeto.myfinans.entity.SubcategoriaLancamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubcategoriaLancamentoRepository extends JpaRepository<SubcategoriaLancamento, Long> {

    List<SubcategoriaLancamento> findByCategoriaId(Long categoriaId);
}
