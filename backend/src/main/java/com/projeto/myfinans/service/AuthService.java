package com.projeto.myfinans.service;

import com.projeto.myfinans.dto.CriarUsuarioRequestDTO;
import com.projeto.myfinans.dto.LoginRequestDTO;
import com.projeto.myfinans.dto.LoginResponseDTO;
import com.projeto.myfinans.dto.UsuarioPerfilResponseDTO;
import com.projeto.myfinans.entity.Perfil;
import com.projeto.myfinans.entity.Usuario;
import com.projeto.myfinans.exception.CustomException;
import com.projeto.myfinans.mapper.UsuarioMapper;
import com.projeto.myfinans.repository.PerfilRepository;
import com.projeto.myfinans.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UsuarioRepository usuarioRepository;
    private final PerfilRepository perfilRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsuarioMapper usuarioMapper;

        public AuthService(AuthenticationManager authenticationManager,
                           TokenService tokenService,
                           UsuarioRepository usuarioRepository,
                           PerfilRepository perfilRepository,
                           PasswordEncoder passwordEncoder,
                           UsuarioMapper usuarioMapper) {
            this.authenticationManager = authenticationManager;
            this.tokenService = tokenService;
            this.usuarioRepository = usuarioRepository;
            this.perfilRepository = perfilRepository;
            this.passwordEncoder = passwordEncoder;
            this.usuarioMapper = usuarioMapper;
        }

    public LoginResponseDTO autenticar(LoginRequestDTO dto) {
        var authenticationToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getSenha());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        Usuario usuario = (Usuario) authentication.getPrincipal();
        String token = tokenService.generateToken(usuario);

        return new LoginResponseDTO(token, usuarioMapper.toResponseDTO(usuario));
    }

    @Transactional
    public UsuarioPerfilResponseDTO criar(CriarUsuarioRequestDTO dto) {
        if (usuarioRepository.findByEmail(dto.getEmail()) != null) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "O email informado já está em uso");
        }

        Perfil perfil = buscarPerfilTipoUser();

        Usuario usuario = usuarioMapper.fromCreateDTO(dto);
        usuario.setSenha(passwordEncoder.encode(dto.getSenha()));
        usuario.setPerfis(Set.of(perfil));

        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        return usuarioMapper.toResponseDTO(usuarioSalvo);
    }

    @Transactional(readOnly = true)
    private Perfil buscarPerfilTipoUser() {
        return perfilRepository.findByTipo("ROLE_USER")
                .orElseThrow(() -> new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "Perfil USER não encontrado"));
    }
}
