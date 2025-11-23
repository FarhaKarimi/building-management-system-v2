package com.modir.repository;

import com.modir.model.Transaction;
import com.modir.model.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {
    
    List<Transaction> findByUnitId(Long unitId);
    
    List<Transaction> findByType(TransactionType type);
    
    @Query("SELECT t FROM Transaction t WHERE t.unit.id = :unitId ORDER BY t.date DESC")
    List<Transaction> findByUnitIdOrderByDateDesc(@Param("unitId") Long unitId);
    
    @Query("SELECT t FROM Transaction t WHERE t.type = :type AND t.date BETWEEN :startDate AND :endDate")
    List<Transaction> findByTypeAndDateRange(@Param("type") TransactionType type, 
                                           @Param("startDate") LocalDateTime startDate, 
                                           @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.type = :type AND t.date BETWEEN :startDate AND :endDate")
    Double sumAmountByTypeAndDateRange(@Param("type") TransactionType type, 
                                     @Param("startDate") LocalDateTime startDate, 
                                     @Param("endDate") LocalDateTime endDate);
}