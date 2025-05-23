package com.projeto.myfinans.controller;

import com.projeto.myfinans.entity.SubcategoriaLancamento;
import com.projeto.myfinans.service.SubcategoriaLancamentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
    @RequestMapping("/api/subcategorias-lancamento")
public class SubcategoriaLancamentoController {

    private final SubcategoriaLancamentoService subcategoriaLancamentoService;

    public SubcategoriaLancamentoController(SubcategoriaLancamentoService subcategoriaLancamentoService) {
        this.subcategoriaLancamentoService = subcategoriaLancamentoService;
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping
    public ResponseEntity<List<SubcategoriaLancamento>> listarTodasSubcategorias() {
        List<SubcategoriaLancamento> subcategorias = subcategoriaLancamentoService.findAllSubcategoriasLancamento();
        return ResponseEntity.ok(subcategorias);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<List<SubcategoriaLancamento>> listarSubcategoriasPorCategoria(@PathVariable Long categoriaId) {
        List<SubcategoriaLancamento> subcategorias = subcategoriaLancamentoService.findByCategoriaId(categoriaId);
        if (subcategorias.isEmpty()) {
            return ResponseEntity.noContent().build(); // Retorna 204 No Content se não encontrar
        }
        return ResponseEntity.ok(subcategorias);
    }
}