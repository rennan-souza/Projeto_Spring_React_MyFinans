package com.projeto.myfinans.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class LoginRequestDTO {

    @NotEmpty(message = "Informe o email")
    @Email(message = "Email inválido")
    private String Email;

    @NotEmpty(message = "Informe a senha")
    private String Senha;
}