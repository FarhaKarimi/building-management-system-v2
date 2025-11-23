package com.modir.model;

public enum UserRole {
    MANAGER("مدیر"),
    OWNER("مالک"),
    TENANT("مستأجر"),
    STAFF("نگهبان/خدمات");

    private final String displayName;

    UserRole(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}