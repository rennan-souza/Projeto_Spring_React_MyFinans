package com.projeto.myfinans.controller;

import com.projeto.myfinans.dto.LancamentoRequestDTO;
import com.projeto.myfinans.dto.LancamentoResponseDTO;
import com.projeto.myfinans.entity.Lancamento;
import com.projeto.myfinans.service.AuthorizationService;
import com.projeto.myfinans.service.LancamentoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<List<LancamentoResponseDTO>> buscarComFiltros(
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) Long tipoId,
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) Long subcategoriaId
    ) {
        Long usuarioId = authorizationService.usuarioLogado().getId();
        List<LancamentoResponseDTO> resultado = lancamentoService.buscarComFiltros(usuarioId, titulo, tipoId, categoriaId, subcategoriaId);
        return ResponseEntity.ok(resultado);
    }
}
