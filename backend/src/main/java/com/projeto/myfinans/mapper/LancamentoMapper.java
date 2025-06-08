package com.projeto.myfinans.mapper;

import com.projeto.myfinans.dto.LancamentoRequestDTO;
import com.projeto.myfinans.dto.LancamentoResponseDTO;
import com.projeto.myfinans.entity.Lancamento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LancamentoMapper {

    Lancamento toEntity(LancamentoRequestDTO dto);

    @Mapping(source = "subcategoria.id", target = "subcategoriaId")
    @Mapping(source = "subcategoria.nome", target = "subcategoria")
    @Mapping(source = "subcategoria.categoria.id", target = "categoriaId")
    @Mapping(source = "subcategoria.categoria.nome", target = "categoria")
    @Mapping(source = "subcategoria.categoria.tipoLancamento.id", target = "tipoLancamentoId")
    @Mapping(source = "subcategoria.categoria.tipoLancamento.descricao", target = "tipoLancamento")
    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "usuario.nome", target = "usuario")
    LancamentoResponseDTO toDto(Lancamento entity);
}