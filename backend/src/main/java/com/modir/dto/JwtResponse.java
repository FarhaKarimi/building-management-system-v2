package com.modir.dto;

import com.modir.model.UserRole;

public class JwtResponse {
    
    private String token;
    private String username;
    private String name;
    private UserRole role;
    private String unit;
    
    public JwtResponse() {}
    
    public JwtResponse(String token, String username, String name, UserRole role, String unit) {
        this.token = token;
        this.username = username;
        this.name = name;
        this.role = role;
        this.unit = unit;
    }
    
    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }
    
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
}