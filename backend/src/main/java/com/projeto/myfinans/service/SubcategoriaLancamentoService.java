package com.projeto.myfinans.service;

import com.projeto.myfinans.entity.SubcategoriaLancamento;
import com.projeto.myfinans.repository.SubcategoriaLancamentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubcategoriaLancamentoService {

    private final SubcategoriaLancamentoRepository subcategoriaLancamentoRepository;

    public SubcategoriaLancamentoService(SubcategoriaLancamentoRepository subcategoriaLancamentoRepository) {
        this.subcategoriaLancamentoRepository = subcategoriaLancamentoRepository;
    }

    public List<SubcategoriaLancamento> findAllSubcategoriasLancamento() {
        return subcategoriaLancamentoRepository.findAll();
    }

    public List<SubcategoriaLancamento> findByCategoriaId(Long categoriaId) {
        return subcategoriaLancamentoRepository.findByCategoriaId(categoriaId);
    }
}