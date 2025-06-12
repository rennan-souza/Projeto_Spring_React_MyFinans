package com.projeto.myfinans.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BalancoMensalDTO {

    private String mesAno; // Ex: "2024-01"
    private BigDecimal totalEntradas;
    private BigDecimal totalSaidas;
    private BigDecimal saldoMensal;

    public BalancoMensalDTO(String mesAno, BigDecimal totalEntradas, BigDecimal totalSaidas) {
        this.mesAno = mesAno;
        this.totalEntradas = totalEntradas != null ? totalEntradas : BigDecimal.ZERO;
        this.totalSaidas = totalSaidas != null ? totalSaidas : BigDecimal.ZERO;
        this.saldoMensal = this.totalEntradas.subtract(this.totalSaidas);
    }
}
