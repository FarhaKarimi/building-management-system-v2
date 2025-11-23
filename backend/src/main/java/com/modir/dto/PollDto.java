package com.modir.dto;

import java.util.List;

public class PollDto {
    
    private String id;
    private String question;
    private List<PollOptionDto> options;
    private Integer totalVotes;
    private Boolean isActive;
    
    public PollDto() {}
    
    public PollDto(String id, String question, List<PollOptionDto> options, 
                  Integer totalVotes, Boolean isActive) {
        this.id = id;
        this.question = question;
        this.options = options;
        this.totalVotes = totalVotes;
        this.isActive = isActive;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }
    
    public List<PollOptionDto> getOptions() { return options; }
    public void setOptions(List<PollOptionDto> options) { this.options = options; }
    
    public Integer getTotalVotes() { return totalVotes; }
    public void setTotalVotes(Integer totalVotes) { this.totalVotes = totalVotes; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public static class PollOptionDto {
        private Long id;
        private String text;
        private Integer votes;
        
        public PollOptionDto() {}
        
        public PollOptionDto(Long id, String text, Integer votes) {
            this.id = id;
            this.text = text;
            this.votes = votes;
        }
        
        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
        
        public Integer getVotes() { return votes; }
        public void setVotes(Integer votes) { this.votes = votes; }
    }
}