package com.modir.repository;

import com.modir.model.PollOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PollOptionRepository extends JpaRepository<PollOption, Long> {
    
    List<PollOption> findByPollId(String pollId);
    
    @Modifying
    @Transactional
    @Query("UPDATE PollOption p SET p.votes = p.votes + 1 WHERE p.id = :optionId")
    void incrementVotes(@Param("optionId") Long optionId);
}