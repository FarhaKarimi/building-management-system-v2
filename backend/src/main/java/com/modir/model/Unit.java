package com.modir.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "units")
public class Unit {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String unitNumber;
    
    private String floor;
    
    @Column(name = "area_sqm")
    private Double areaSqm;
    
    @Column(name = "monthly_fee")
    private Double monthlyFee;
    
    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<User> residents = new ArrayList<>();
    
    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transaction> transactions = new ArrayList<>();
    
    public Unit() {}
    
    public Unit(String unitNumber, String floor, Double areaSqm, Double monthlyFee) {
        this.unitNumber = unitNumber;
        this.floor = floor;
        this.areaSqm = areaSqm;
        this.monthlyFee = monthlyFee;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUnitNumber() { return unitNumber; }
    public void setUnitNumber(String unitNumber) { this.unitNumber = unitNumber; }
    
    public String getFloor() { return floor; }
    public void setFloor(String floor) { this.floor = floor; }
    
    public Double getAreaSqm() { return areaSqm; }
    public void setAreaSqm(Double areaSqm) { this.areaSqm = areaSqm; }
    
    public Double getMonthlyFee() { return monthlyFee; }
    public void setMonthlyFee(Double monthlyFee) { this.monthlyFee = monthlyFee; }
    
    public List<User> getResidents() { return residents; }
    public void setResidents(List<User> residents) { this.residents = residents; }
    
    public List<Transaction> getTransactions() { return transactions; }
    public void setTransactions(List<Transaction> transactions) { this.transactions = transactions; }
}