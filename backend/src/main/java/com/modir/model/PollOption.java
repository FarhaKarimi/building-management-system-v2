package com.modir.model;

import jakarta.persistence.*;

@Entity
@Table(name = "poll_options")
public class PollOption {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String text;
    
    @Column(nullable = false)
    private Integer votes = 0;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "poll_id")
    private Poll poll;
    
    public PollOption() {}
    
    public PollOption(String text, Poll poll) {
        this.text = text;
        this.poll = poll;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    
    public Integer getVotes() { return votes; }
    public void setVotes(Integer votes) { this.votes = votes; }
    
    public Poll getPoll() { return poll; }
    public void setPoll(Poll poll) { this.poll = poll; }
}