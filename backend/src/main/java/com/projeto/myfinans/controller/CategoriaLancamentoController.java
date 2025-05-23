package com.projeto.myfinans.controller;

import com.projeto.myfinans.entity.CategoriaLancamento;
import com.projeto.myfinans.service.CategoriaLancamentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categorias-lancamento")
public class CategoriaLancamentoController {

    private final CategoriaLancamentoService categoriaLancamentoService;

    public CategoriaLancamentoController(CategoriaLancamentoService categoriaLancamentoService) {
        this.categoriaLancamentoService = categoriaLancamentoService;
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping
    public ResponseEntity<List<CategoriaLancamento>> listarTodasCategorias() {
        List<CategoriaLancamento> categorias = categoriaLancamentoService.findAllCategoriasLancamento();
        return ResponseEntity.ok(categorias);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/tipo/{tipoId}")
    public ResponseEntity<List<CategoriaLancamento>> listarCategoriasPorTipo(@PathVariable Long tipoId) {
        List<CategoriaLancamento> categorias = categoriaLancamentoService.findByTipoLancamentoId(tipoId);
        if (categorias.isEmpty()) {
            return ResponseEntity.noContent().build(); // Retorna 204 No Content se não encontrar
        }
        return ResponseEntity.ok(categorias);
    }
}