package com.projeto.myfinans.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class LancamentoResponseDTO {

    private Long id;
    private String titulo;
    private String descricao;
    private BigDecimal valor;
    private LocalDate data;
    private Long tipoLancamentoId;
    private String tipoLancamento;
    private Long categoriaId;
    private String categoria;
    private Long subcategoriaId;
    private String subcategoria;
    private Long usuarioId;
    private String usuario;
}