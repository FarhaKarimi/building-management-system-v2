package com.modir.controller;

import com.modir.dto.MaintenanceTicketDto;
import com.modir.model.TicketStatus;
import com.modir.service.MaintenanceTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/maintenance")
public class MaintenanceTicketController {

    @Autowired
    private MaintenanceTicketService maintenanceTicketService;

    @GetMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<List<MaintenanceTicketDto>> getAllTickets() {
        return ResponseEntity.ok(maintenanceTicketService.getAllTickets());
    }

    @GetMapping("/unit/{unitId}")
    @PreAuthorize("hasRole('MANAGER') or #unitId.toString() == authentication.name")
    public ResponseEntity<List<MaintenanceTicketDto>> getTicketsByUnit(@PathVariable Long unitId) {
        return ResponseEntity.ok(maintenanceTicketService.getTicketsByUnit(unitId));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER') or @maintenanceTicketService.getTicketById(#id).reporterId == authentication.name")
    public ResponseEntity<MaintenanceTicketDto> getTicketById(@PathVariable String id) {
        return ResponseEntity.ok(maintenanceTicketService.getTicketById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('MANAGER') or hasRole('OWNER') or hasRole('TENANT')")
    public ResponseEntity<MaintenanceTicketDto> createTicket(@RequestBody MaintenanceTicketDto ticketDto) {
        try {
            MaintenanceTicketDto created = maintenanceTicketService.createTicket(ticketDto);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER') or @maintenanceTicketService.getTicketById(#id).reporterId == authentication.name")
    public ResponseEntity<MaintenanceTicketDto> updateTicket(@PathVariable String id, @RequestBody MaintenanceTicketDto ticketDto) {
        try {
            MaintenanceTicketDto updated = maintenanceTicketService.updateTicket(id, ticketDto);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER') or @maintenanceTicketService.getTicketById(#id).reporterId == authentication.name")
    public ResponseEntity<Void> deleteTicket(@PathVariable String id) {
        try {
            maintenanceTicketService.deleteTicket(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<List<MaintenanceTicketDto>> getTicketsByStatus(@PathVariable TicketStatus status) {
        return ResponseEntity.ok(maintenanceTicketService.getTicketsByStatus(status));
    }

    @GetMapping("/stats/status-counts")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<?> getStatusStats() {
        return ResponseEntity.ok(new Object() {
            public long open = maintenanceTicketService.getTicketCountByStatus(TicketStatus.OPEN);
            public long inProgress = maintenanceTicketService.getTicketCountByStatus(TicketStatus.IN_PROGRESS);
            public long done = maintenanceTicketService.getTicketCountByStatus(TicketStatus.DONE);
        });
    }
}