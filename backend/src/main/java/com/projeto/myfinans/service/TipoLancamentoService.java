package com.projeto.myfinans.service;

import com.projeto.myfinans.entity.TipoLancamento;
import com.projeto.myfinans.repository.TipoLancamentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoLancamentoService {

    private final TipoLancamentoRepository tipoLancamentoRepository;

    public TipoLancamentoService(TipoLancamentoRepository tipoLancamentoRepository) {
        this.tipoLancamentoRepository = tipoLancamentoRepository;
    }

    public List<TipoLancamento> findAllTiposLancamento() {
        return tipoLancamentoRepository.findAll();
    }
}