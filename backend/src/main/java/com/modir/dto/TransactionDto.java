package com.modir.dto;

import com.modir.model.TransactionType;

import java.time.LocalDateTime;

public class TransactionDto {
    
    private String id;
    private String title;
    private Double amount;
    private LocalDateTime date;
    private TransactionType type;
    private String category;
    private String status;
    private String unitId;
    
    public TransactionDto() {}
    
    public TransactionDto(String id, String title, Double amount, LocalDateTime date, 
                         TransactionType type, String category, String status, String unitId) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.date = date;
        this.type = type;
        this.category = category;
        this.status = status;
        this.unitId = unitId;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    
    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
    
    public TransactionType getType() { return type; }
    public void setType(TransactionType type) { this.type = type; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getUnitId() { return unitId; }
    public void setUnitId(String unitId) { this.unitId = unitId; }
}