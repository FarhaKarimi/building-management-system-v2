package com.modir.controller;

import com.modir.dto.PollDto;
import com.modir.service.PollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/polls")
public class PollController {

    @Autowired
    private PollService pollService;

    @GetMapping
    public ResponseEntity<PollDto[]> getAllPolls() {
        return ResponseEntity.ok(pollService.getAllPolls().toArray(new PollDto[0]));
    }

    @GetMapping("/active")
    public ResponseEntity<PollDto[]> getActivePolls() {
        return ResponseEntity.ok(pollService.getActivePolls().toArray(new PollDto[0]));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PollDto> getPollById(@PathVariable String id) {
        return ResponseEntity.ok(pollService.getPollById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<PollDto> createPoll(@RequestBody PollDto pollDto) {
        try {
            PollDto created = pollService.createPoll(pollDto);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/{pollId}/vote/{optionId}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('OWNER') or hasRole('TENANT')")
    public ResponseEntity<String> vote(@PathVariable String pollId, @PathVariable Long optionId) {
        try {
            pollService.vote(pollId, optionId);
            return ResponseEntity.ok("Vote recorded successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<Void> deletePoll(@PathVariable String id) {
        try {
            pollService.deletePoll(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}