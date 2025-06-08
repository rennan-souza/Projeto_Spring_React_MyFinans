package com.projeto.myfinans.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LancamentoQueryResultDTO {
    private Page<LancamentoResponseDTO> lancamentos;
    private BigDecimal totalEntradas;
    private BigDecimal totalSaidas;
    private BigDecimal saldoTotal;
}
