package com.projeto.myfinans.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class    LancamentoRequestDTO {

    @NotEmpty(message = "Informe o título")
    private String titulo;

    private String descricao;

    @NotNull(message = "Informe o valor")
    private BigDecimal valor;

    @NotNull(message = "Informe a data")
    private LocalDate data;

    @NotNull(message = "Informe o id da subcategoria")
    private Long subcategoriaId;
}
