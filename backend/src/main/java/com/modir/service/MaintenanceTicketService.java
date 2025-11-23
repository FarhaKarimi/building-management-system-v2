package com.modir.service;

import com.modir.dto.MaintenanceTicketDto;
import com.modir.model.MaintenanceTicket;
import com.modir.model.TicketStatus;
import com.modir.model.Unit;
import com.modir.repository.MaintenanceTicketRepository;
import com.modir.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MaintenanceTicketService {

    @Autowired
    private MaintenanceTicketRepository maintenanceTicketRepository;

    @Autowired
    private UnitRepository unitRepository;

    public List<MaintenanceTicketDto> getAllTickets() {
        return maintenanceTicketRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<MaintenanceTicketDto> getTicketsByUnit(Long unitId) {
        return maintenanceTicketRepository.findByUnitIdOrderByDateDesc(unitId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public MaintenanceTicketDto getTicketById(String id) {
        MaintenanceTicket ticket = maintenanceTicketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        return convertToDto(ticket);
    }

    public MaintenanceTicketDto createTicket(MaintenanceTicketDto ticketDto) {
        Unit unit = unitRepository.findById(Long.valueOf(ticketDto.getUnitId()))
                .orElseThrow(() -> new RuntimeException("Unit not found"));

        MaintenanceTicket ticket = new MaintenanceTicket();
        ticket.setTitle(ticketDto.getTitle());
        ticket.setDescription(ticketDto.getDescription());
        ticket.setReporter(ticketDto.getReporter());
        ticket.setReporterId(ticketDto.getReporterId());
        ticket.setStatus(ticketDto.getStatus() != null ? ticketDto.getStatus() : TicketStatus.OPEN);
        ticket.setPriority(ticketDto.getPriority());
        ticket.setUnit(unit);

        MaintenanceTicket savedTicket = maintenanceTicketRepository.save(ticket);
        return convertToDto(savedTicket);
    }

    public MaintenanceTicketDto updateTicket(String id, MaintenanceTicketDto ticketDto) {
        MaintenanceTicket ticket = maintenanceTicketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setTitle(ticketDto.getTitle());
        ticket.setDescription(ticketDto.getDescription());
        ticket.setReporter(ticketDto.getReporter());
        ticket.setReporterId(ticketDto.getReporterId());
        ticket.setStatus(ticketDto.getStatus());
        ticket.setPriority(ticketDto.getPriority());

        if (ticketDto.getUnitId() != null) {
            Unit unit = unitRepository.findById(Long.valueOf(ticketDto.getUnitId()))
                    .orElseThrow(() -> new RuntimeException("Unit not found"));
            ticket.setUnit(unit);
        }

        MaintenanceTicket updatedTicket = maintenanceTicketRepository.save(ticket);
        return convertToDto(updatedTicket);
    }

    public void deleteTicket(String id) {
        maintenanceTicketRepository.deleteById(id);
    }

    public List<MaintenanceTicketDto> getTicketsByStatus(TicketStatus status) {
        return maintenanceTicketRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Long getTicketCountByStatus(TicketStatus status) {
        return maintenanceTicketRepository.countByStatus(status);
    }

    private MaintenanceTicketDto convertToDto(MaintenanceTicket ticket) {
        MaintenanceTicketDto dto = new MaintenanceTicketDto();
        dto.setId(ticket.getId());
        dto.setTitle(ticket.getTitle());
        dto.setDescription(ticket.getDescription());
        dto.setReporter(ticket.getReporter());
        dto.setReporterId(ticket.getReporterId());
        dto.setDate(ticket.getDate());
        dto.setStatus(ticket.getStatus());
        dto.setPriority(ticket.getPriority());
        dto.setUnitId(ticket.getUnit() != null ? ticket.getUnit().getId().toString() : null);
        return dto;
    }
}