package com.projeto.myfinans.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class GastoPorCategoriaDTO {

    private String categoriaNome;
    private BigDecimal totalGasto;

    public GastoPorCategoriaDTO(String categoriaNome, BigDecimal totalGasto) {
        this.categoriaNome = categoriaNome;
        this.totalGasto = totalGasto;
    }
}

