package com.modir.dto;

import com.modir.model.UserRole;

import java.time.LocalDateTime;

public class UserDto {
    
    private String id;
    private String unit;
    private String name;
    private UserRole role;
    private String phone;
    private String plateNumber;
    private LocalDateTime moveInDate;
    private String password;
    
    public UserDto() {}
    
    public UserDto(String id, String unit, String name, UserRole role, String phone) {
        this.id = id;
        this.unit = unit;
        this.name = name;
        this.role = role;
        this.phone = phone;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    
    public String getPlateNumber() { return plateNumber; }
    public void setPlateNumber(String plateNumber) { this.plateNumber = plateNumber; }
    
    public LocalDateTime getMoveInDate() { return moveInDate; }
    public void setMoveInDate(LocalDateTime moveInDate) { this.moveInDate = moveInDate; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getUsername() {
        return this.id;
    }

}