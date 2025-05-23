    package com.projeto.myfinans.entity;

    import jakarta.persistence.*;
    import lombok.*;

    @Data
    @Entity
    @Table(name = "tb_tipo_lancamento")
    public class TipoLancamento {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false)
        private String descricao;
    }