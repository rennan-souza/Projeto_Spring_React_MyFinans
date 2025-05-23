package com.projeto.myfinans.dto;

import com.projeto.myfinans.entity.Perfil;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class UsuarioPerfilResponseDTO {

    private Long id;
    private String nome;
    private String email;
    private LocalDate dataNascimento;
    private List<Perfil> perfis = new ArrayList<>();
}