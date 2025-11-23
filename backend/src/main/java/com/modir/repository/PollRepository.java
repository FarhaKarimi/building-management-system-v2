package com.modir.repository;

import com.modir.model.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PollRepository extends JpaRepository<Poll, String> {
    
    List<Poll> findByIsActive(Boolean isActive);
    
    @Query("SELECT p FROM Poll p WHERE p.isActive = true ORDER BY p.createdAt DESC")
    List<Poll> findActivePollsOrderByCreatedAt();
    
    @Query("SELECT COUNT(p) FROM Poll p WHERE p.isActive = true")
    Long countActivePolls();
}