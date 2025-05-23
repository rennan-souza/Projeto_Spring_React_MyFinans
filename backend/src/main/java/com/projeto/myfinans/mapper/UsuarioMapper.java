package com.projeto.myfinans.mapper;

import com.projeto.myfinans.dto.CriarUsuarioRequestDTO;
import com.projeto.myfinans.dto.UsuarioPerfilResponseDTO;
import com.projeto.myfinans.entity.Usuario;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    UsuarioPerfilResponseDTO toResponseDTO(Usuario usuario);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "senha", ignore = true)
    @Mapping(target = "perfis", ignore = true)
    Usuario fromCreateDTO(CriarUsuarioRequestDTO dto);
}