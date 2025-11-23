package com.modir.service;

import com.modir.dto.PollDto;
import com.modir.model.Poll;
import com.modir.model.PollOption;
import com.modir.repository.PollOptionRepository;
import com.modir.repository.PollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PollService {

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private PollOptionRepository pollOptionRepository;

    public List<PollDto> getAllPolls() {
        return pollRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<PollDto> getActivePolls() {
        return pollRepository.findActivePollsOrderByCreatedAt().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PollDto getPollById(String id) {
        Poll poll = pollRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Poll not found"));
        return convertToDto(poll);
    }

    public PollDto createPoll(PollDto pollDto) {
        Poll poll = new Poll();
        poll.setQuestion(pollDto.getQuestion());
        poll.setIsActive(pollDto.getIsActive() != null ? pollDto.getIsActive() : true);

        Poll savedPoll = pollRepository.save(poll);

        if (pollDto.getOptions() != null) {
            for (PollDto.PollOptionDto optionDto : pollDto.getOptions()) {
                PollOption option = new PollOption(optionDto.getText(), savedPoll);
                option.setVotes(optionDto.getVotes() != null ? optionDto.getVotes() : 0);
                pollOptionRepository.save(option);
            }
        }

        return convertToDto(savedPoll);
    }

    public void vote(String pollId, Long optionId) {
        PollOption option = pollOptionRepository.findById(optionId)
                .orElseThrow(() -> new RuntimeException("Poll option not found"));

        if (!option.getPoll().getId().equals(pollId)) {
            throw new RuntimeException("Poll option does not belong to this poll");
        }

        pollOptionRepository.incrementVotes(optionId);
    }

    public void deletePoll(String id) {
        pollRepository.deleteById(id);
    }

    private PollDto convertToDto(Poll poll) {
        PollDto dto = new PollDto();
        dto.setId(poll.getId());
        dto.setQuestion(poll.getQuestion());
        dto.setTotalVotes(poll.getTotalVotes());
        dto.setIsActive(poll.getIsActive());

        List<PollDto.PollOptionDto> options = poll.getOptions().stream()
                .map(option -> new PollDto.PollOptionDto(option.getId(), option.getText(), option.getVotes()))
                .collect(Collectors.toList());

        dto.setOptions(options);
        return dto;
    }
}