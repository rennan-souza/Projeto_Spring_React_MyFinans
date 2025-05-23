package com.projeto.myfinans.controller;

import com.projeto.myfinans.dto.CriarUsuarioRequestDTO;
import com.projeto.myfinans.dto.LoginRequestDTO;
import com.projeto.myfinans.dto.LoginResponseDTO;
import com.projeto.myfinans.dto.UsuarioPerfilResponseDTO;
import com.projeto.myfinans.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> autenticar(@RequestBody @Valid LoginRequestDTO dto) {
        LoginResponseDTO loginResponseDTO = authService.autenticar(dto);
        return ResponseEntity.ok(loginResponseDTO);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<UsuarioPerfilResponseDTO> cadastrar(@RequestBody @Valid CriarUsuarioRequestDTO dto) {
        return ResponseEntity.ok().body(authService.criar(dto));
    }
}
