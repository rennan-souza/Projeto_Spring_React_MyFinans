package com.projeto.myfinans.controller;

import com.projeto.myfinans.dto.LancamentoQueryResultDTO;
import com.projeto.myfinans.dto.LancamentoRequestDTO;
import com.projeto.myfinans.dto.LancamentoResponseDTO;
import com.projeto.myfinans.service.AuthorizationService;
import com.projeto.myfinans.service.LancamentoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/api/lancamentos")
public class LancamentoController {

    private final LancamentoService lancamentoService;

    private final AuthorizationService authorizationService;

    public LancamentoController(LancamentoService lancamentoService,
                                AuthorizationService authorizationService) {
        this.lancamentoService = lancamentoService;
        this.authorizationService = authorizationService;
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @PostMapping
    public ResponseEntity<LancamentoResponseDTO> cadastrar(@RequestBody @Valid LancamentoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(lancamentoService.cadastrar(dto));
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping
    public ResponseEntity<LancamentoQueryResultDTO> buscarComFiltros(
            @RequestParam(required = false) String titulo, @RequestParam(required = false) Long tipoId,
            @RequestParam(required = false) Long categoriaId, @RequestParam(required = false) Long subcategoriaId,
            @RequestParam(required = false) LocalDate dataInicio, @RequestParam(required = false) LocalDate dataFim,
            @PageableDefault(size = 10, page = 0, sort = "data") Pageable pageable) {
        Long usuarioId = authorizationService.usuarioLogado().getId();
        LancamentoQueryResultDTO resultado = lancamentoService.buscarComFiltros(
                usuarioId, titulo, tipoId, categoriaId, subcategoriaId, dataInicio, dataFim, pageable);
        return ResponseEntity.ok(resultado);
    }
}
