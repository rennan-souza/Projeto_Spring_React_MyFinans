package com.projeto.myfinans.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {

    String token;
    UsuarioPerfilResponseDTO usuario;
}