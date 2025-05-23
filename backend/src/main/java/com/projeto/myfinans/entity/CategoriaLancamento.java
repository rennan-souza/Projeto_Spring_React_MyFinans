package com.projeto.myfinans.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "tb_categoria_lancamento")
public class CategoriaLancamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @ManyToOne
    @JoinColumn(name = "tipo_id", nullable = false)
    private TipoLancamento tipoLancamento;
}
