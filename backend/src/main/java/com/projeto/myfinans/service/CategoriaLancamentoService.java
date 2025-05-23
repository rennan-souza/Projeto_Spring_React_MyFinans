package com.projeto.myfinans.service;

import com.projeto.myfinans.entity.CategoriaLancamento;
import com.projeto.myfinans.repository.CategoriaLancamentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaLancamentoService {

    private final CategoriaLancamentoRepository categoriaLancamentoRepository;

    public CategoriaLancamentoService(CategoriaLancamentoRepository categoriaLancamentoRepository) {
        this.categoriaLancamentoRepository = categoriaLancamentoRepository;
    }

    public List<CategoriaLancamento> findAllCategoriasLancamento() {
        return categoriaLancamentoRepository.findAll();
    }

    public List<CategoriaLancamento> findByTipoLancamentoId(Long tipoId) {
        return categoriaLancamentoRepository.findByTipoLancamentoId(tipoId);
    }
}