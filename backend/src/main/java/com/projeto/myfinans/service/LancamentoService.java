package com.projeto.myfinans.service;

import com.projeto.myfinans.dto.*;
import com.projeto.myfinans.entity.Lancamento;
import com.projeto.myfinans.entity.SubcategoriaLancamento;
import com.projeto.myfinans.entity.Usuario;
import com.projeto.myfinans.exception.CustomException;
import com.projeto.myfinans.mapper.LancamentoMapper;
import com.projeto.myfinans.repository.LancamentoRepository;
import com.projeto.myfinans.repository.SubcategoriaLancamentoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

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
    public LancamentoQueryResultDTO buscarComFiltros(
            Long usuarioId, String titulo, Long tipoId, Long categoriaId, Long subcategoriaId, LocalDate dataInicio,
            LocalDate dataFim, Pageable pageable) {

        // Busca os lançamentos paginados
        Page<Lancamento> listaLancamentos = lancamentoRepository.buscarComFiltros(usuarioId, titulo,
                tipoId, categoriaId, subcategoriaId, dataInicio, dataFim, pageable);

        // Mapeia os lançamentos para DTOs
        Page<LancamentoResponseDTO> lancamentosMapeados = listaLancamentos.map(lancamentoMapper::toDto);

        // Calcula os totais de entradas e saídas (sem paginação, com os mesmos filtros)
        BigDecimal totalEntradas = lancamentoRepository.calcularTotalEntradas(
                usuarioId, titulo, tipoId, categoriaId, subcategoriaId, dataInicio, dataFim);
        BigDecimal totalSaidas = lancamentoRepository.calcularTotalSaidas(
                usuarioId, titulo, tipoId, categoriaId, subcategoriaId, dataInicio, dataFim);

        // Calcula o saldo total
        BigDecimal saldoTotal = totalEntradas.subtract(totalSaidas);

        // Retorna o DTO de resultado completo
        return new LancamentoQueryResultDTO(lancamentosMapeados, totalEntradas, totalSaidas, saldoTotal);
    }

    @Transactional(readOnly = true)
    public List<BalancoMensalDTO> buscarBalancoMensal(int ano) {
        Long usuarioId = authorizationService.usuarioLogado().getId();

        List<Object[]> resultadosRaw = lancamentoRepository.buscarBalancoMensal(usuarioId, ano);

        return resultadosRaw.stream()
                .map(row -> new BalancoMensalDTO(
                        (String) row[0],         // mesAno
                        (BigDecimal) row[1],     // totalEntradas
                        (BigDecimal) row[2]      // totalSaidas
                ))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<GastoPorCategoriaDTO> buscarGastosPorCategoria(int ano) {
        Long usuarioId = authorizationService.usuarioLogado().getId();

        List<Object[]> resultadosRaw = lancamentoRepository.buscarGastosPorCategoria(usuarioId, ano);

        return resultadosRaw.stream()
                .map(row -> new GastoPorCategoriaDTO(
                        (String) row[0],         // categoriaNome
                        (BigDecimal) row[1]      // totalGasto
                ))
                .collect(Collectors.toList());
    }
}
