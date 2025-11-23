package com.modir.dto;

import com.modir.model.TicketStatus;

import java.time.LocalDateTime;

public class MaintenanceTicketDto {
    
    private String id;
    private String title;
    private String description;
    private String reporter;
    private String reporterId;
    private LocalDateTime date;
    private TicketStatus status;
    private String priority;
    private String unitId;
    
    public MaintenanceTicketDto() {}
    
    public MaintenanceTicketDto(String id, String title, String description, String reporter, 
                              String reporterId, LocalDateTime date, TicketStatus status, 
                              String priority, String unitId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.reporter = reporter;
        this.reporterId = reporterId;
        this.date = date;
        this.status = status;
        this.priority = priority;
        this.unitId = unitId;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getReporter() { return reporter; }
    public void setReporter(String reporter) { this.reporter = reporter; }
    
    public String getReporterId() { return reporterId; }
    public void setReporterId(String reporterId) { this.reporterId = reporterId; }
    
    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
    
    public TicketStatus getStatus() { return status; }
    public void setStatus(TicketStatus status) { this.status = status; }
    
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    
    public String getUnitId() { return unitId; }
    public void setUnitId(String unitId) { this.unitId = unitId; }
}