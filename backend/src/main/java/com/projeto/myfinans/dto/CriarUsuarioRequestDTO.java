package com.projeto.myfinans.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CriarUsuarioRequestDTO {

    @NotEmpty(message = "Informe o nome")
    private String nome;

    @NotEmpty(message = "Informe o email")
    @Email(message = "Informe um email válido")
    private String email;

    @NotNull(message = "Informe a data de nascimento")
    private LocalDate dataNascimento;

    @NotEmpty(message = "Informe uma senha")
    @Size(min = 6, max = 12, message = "A senha deve ter no mínimo 6 no máximo 12 caracteres")
    private String senha;
}