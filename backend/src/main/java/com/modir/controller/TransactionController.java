package com.modir.controller;

import com.modir.dto.TransactionDto;
import com.modir.model.TransactionType;
import com.modir.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<List<TransactionDto>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    @GetMapping("/unit/{unitId}")
    @PreAuthorize("hasRole('MANAGER') or #unitId.toString() == authentication.name")
    public ResponseEntity<List<TransactionDto>> getTransactionsByUnit(@PathVariable Long unitId) {
        return ResponseEntity.ok(transactionService.getTransactionsByUnit(unitId));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<TransactionDto> getTransactionById(@PathVariable String id) {
        return ResponseEntity.ok(transactionService.getTransactionById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<TransactionDto> createTransaction(@RequestBody TransactionDto transactionDto) {
        try {
            TransactionDto created = transactionService.createTransaction(transactionDto);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<TransactionDto> updateTransaction(@PathVariable String id, @RequestBody TransactionDto transactionDto) {
        try {
            TransactionDto updated = transactionService.updateTransaction(id, transactionDto);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<Void> deleteTransaction(@PathVariable String id) {
        try {
            transactionService.deleteTransaction(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/type/{type}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<List<TransactionDto>> getTransactionsByType(@PathVariable TransactionType type) {
        return ResponseEntity.ok(transactionService.getTransactionsByType(type));
    }

    @GetMapping("/summary")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<?> getFinancialSummary(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {

        Double totalIncome = transactionService.getTotalAmountByTypeAndDateRange(TransactionType.INCOME, startDate, endDate);
        Double totalExpense = transactionService.getTotalAmountByTypeAndDateRange(TransactionType.EXPENSE, startDate, endDate);

        // استفاده از کلاس wrapper Double به جای double
        return ResponseEntity.ok(new Object() {
            public final Double totalIncomeSafe = totalIncome != null ? totalIncome : 0.0;
            public final Double totalExpenseSafe = totalExpense != null ? totalExpense : 0.0;
            public final Double netIncome = totalIncomeSafe - totalExpenseSafe;
        });
    }
}
