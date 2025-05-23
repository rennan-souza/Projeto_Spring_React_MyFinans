package com.projeto.myfinans.service;

import com.projeto.myfinans.dto.LancamentoRequestDTO;
import com.projeto.myfinans.dto.LancamentoResponseDTO;
import com.projeto.myfinans.entity.Lancamento;
import com.projeto.myfinans.entity.SubcategoriaLancamento;
import com.projeto.myfinans.entity.Usuario;
import com.projeto.myfinans.exception.CustomException;
import com.projeto.myfinans.mapper.LancamentoMapper;
import com.projeto.myfinans.repository.LancamentoRepository;
import com.projeto.myfinans.repository.SubcategoriaLancamentoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LancamentoService {

    private final LancamentoRepository lancamentoRepository;

    private final SubcategoriaLancamentoRepository subcategoriaLancamentoRepository;

    private final LancamentoMapper lancamentoMapper;

    private final AuthorizationService authorizationService;

    public LancamentoService(LancamentoRepository lancamentoRepository,
                             SubcategoriaLancamentoRepository subcategoriaLancamentoRepository,
                             LancamentoMapper lancamentoMapper, AuthorizationService authorizationService) {
        this.lancamentoRepository = lancamentoRepository;
        this.subcategoriaLancamentoRepository = subcategoriaLancamentoRepository;
        this.lancamentoMapper = lancamentoMapper;
        this.authorizationService = authorizationService;
    }

    public LancamentoResponseDTO cadastrar(LancamentoRequestDTO dto) {

        // Consultar subcategoria
        SubcategoriaLancamento subcategoriaLancamento =
                subcategoriaLancamentoRepository.findById(dto.getSubcategoriaId())
                        .orElseThrow(() -> new CustomException(HttpStatus.BAD_REQUEST, "A subcategoria informada não existe"));


        Lancamento lancamento = lancamentoMapper.toEntity(dto);
        lancamento.setSubcategoria(subcategoriaLancamento);
        lancamento.setUsuario(authorizationService.usuarioLogado());

        return lancamentoMapper.toDto(lancamentoRepository.save(lancamento));
    }

    @Transactional(readOnly = true)
    public List<LancamentoResponseDTO> listar() {
        return lancamentoMapper.toDtoList(lancamentoRepository.findByUsuarioId(authorizationService.usuarioLogado().getId()));
    }
}
