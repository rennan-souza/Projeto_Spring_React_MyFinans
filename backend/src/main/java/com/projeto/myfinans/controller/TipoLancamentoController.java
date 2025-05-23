package com.projeto.myfinans.controller;

import com.projeto.myfinans.entity.TipoLancamento;
import com.projeto.myfinans.service.TipoLancamentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-lancamento")
public class TipoLancamentoController {

    private final TipoLancamentoService tipoLancamentoService;

    public TipoLancamentoController(TipoLancamentoService tipoLancamentoService) {
        this.tipoLancamentoService = tipoLancamentoService;
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping
    public ResponseEntity<List<TipoLancamento>> listarTiposLancamento() {
        List<TipoLancamento> tipos = tipoLancamentoService.findAllTiposLancamento();
        return ResponseEntity.ok(tipos);
    }
}
