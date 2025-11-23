package com.modir.repository;

import com.modir.model.MaintenanceTicket;
import com.modir.model.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaintenanceTicketRepository extends JpaRepository<MaintenanceTicket, String> {
    
    List<MaintenanceTicket> findByUnitId(Long unitId);
    
    List<MaintenanceTicket> findByStatus(TicketStatus status);
    
    List<MaintenanceTicket> findByReporterId(String reporterId);
    
    @Query("SELECT t FROM MaintenanceTicket t WHERE t.unit.id = :unitId ORDER BY t.date DESC")
    List<MaintenanceTicket> findByUnitIdOrderByDateDesc(@Param("unitId") Long unitId);
    
    @Query("SELECT COUNT(t) FROM MaintenanceTicket t WHERE t.status = :status")
    Long countByStatus(@Param("status") TicketStatus status);
}