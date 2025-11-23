package com.modir.service;

import com.modir.dto.TransactionDto;
import com.modir.model.Transaction;
import com.modir.model.TransactionType;
import com.modir.model.Unit;
import com.modir.repository.TransactionRepository;
import com.modir.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UnitRepository unitRepository;

    public List<TransactionDto> getAllTransactions() {
        return transactionRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<TransactionDto> getTransactionsByUnit(Long unitId) {
        return transactionRepository.findByUnitIdOrderByDateDesc(unitId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public TransactionDto getTransactionById(String id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        return convertToDto(transaction);
    }

    public TransactionDto createTransaction(TransactionDto transactionDto) {
        Unit unit = unitRepository.findById(Long.valueOf(transactionDto.getUnitId()))
                .orElseThrow(() -> new RuntimeException("Unit not found"));

        Transaction transaction = new Transaction();
        transaction.setTitle(transactionDto.getTitle());
        transaction.setAmount(transactionDto.getAmount());
        transaction.setDate(transactionDto.getDate() != null ? transactionDto.getDate() : LocalDateTime.now());
        transaction.setType(transactionDto.getType());
        transaction.setCategory(transactionDto.getCategory());
        transaction.setStatus(transactionDto.getStatus() != null ? transactionDto.getStatus() : "pending");
        transaction.setUnit(unit);

        Transaction savedTransaction = transactionRepository.save(transaction);
        return convertToDto(savedTransaction);
    }

    public TransactionDto updateTransaction(String id, TransactionDto transactionDto) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transaction.setTitle(transactionDto.getTitle());
        transaction.setAmount(transactionDto.getAmount());
        transaction.setDate(transactionDto.getDate());
        transaction.setType(transactionDto.getType());
        transaction.setCategory(transactionDto.getCategory());
        transaction.setStatus(transactionDto.getStatus());

        if (transactionDto.getUnitId() != null) {
            Unit unit = unitRepository.findById(Long.valueOf(transactionDto.getUnitId()))
                    .orElseThrow(() -> new RuntimeException("Unit not found"));
            transaction.setUnit(unit);
        }

        Transaction updatedTransaction = transactionRepository.save(transaction);
        return convertToDto(updatedTransaction);
    }

    public void deleteTransaction(String id) {
        transactionRepository.deleteById(id);
    }

    public List<TransactionDto> getTransactionsByType(TransactionType type) {
        return transactionRepository.findByType(type).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Double getTotalAmountByTypeAndDateRange(TransactionType type, LocalDateTime startDate, LocalDateTime endDate) {
        return transactionRepository.sumAmountByTypeAndDateRange(type, startDate, endDate);
    }

    private TransactionDto convertToDto(Transaction transaction) {
        TransactionDto dto = new TransactionDto();
        dto.setId(transaction.getId());
        dto.setTitle(transaction.getTitle());
        dto.setAmount(transaction.getAmount());
        dto.setDate(transaction.getDate());
        dto.setType(transaction.getType());
        dto.setCategory(transaction.getCategory());
        dto.setStatus(transaction.getStatus());
        dto.setUnitId(transaction.getUnit() != null ? transaction.getUnit().getId().toString() : null);
        return dto;
    }
}