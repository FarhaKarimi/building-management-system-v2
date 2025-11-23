package com.modir.model;

public enum TicketStatus {
    OPEN("باز"),
    IN_PROGRESS("در حال انجام"),
    DONE("انجام شده");

    private final String displayName;

    TicketStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}