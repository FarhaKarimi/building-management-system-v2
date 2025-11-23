package com.modir.service;

import com.modir.dto.UserDto;
import com.modir.model.Unit;
import com.modir.model.User;
import com.modir.model.UserRole;
import com.modir.repository.UnitRepository;
import com.modir.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public UserDto getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDto(user);
    }

    public UserDto createUser(UserDto userDto) {
        if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setName(userDto.getName());
        user.setRole(userDto.getRole());
        user.setPhone(userDto.getPhone());
        user.setPlateNumber(userDto.getPlateNumber());

        if (userDto.getUnit() != null) {
            Unit unit = unitRepository.findByUnitNumber(userDto.getUnit())
                    .orElseThrow(() -> new RuntimeException("Unit not found"));
            user.setUnit(unit);
        }

        User savedUser = userRepository.save(user);
        return convertToDto(savedUser);
    }

    public UserDto updateUser(String id, UserDto userDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(userDto.getName());
        user.setPhone(userDto.getPhone());
        user.setPlateNumber(userDto.getPlateNumber());
        user.setRole(userDto.getRole());

        if (userDto.getUnit() != null) {
            Unit unit = unitRepository.findByUnitNumber(userDto.getUnit())
                    .orElseThrow(() -> new RuntimeException("Unit not found"));
            user.setUnit(unit);
        }

        User updatedUser = userRepository.save(user);
        return convertToDto(updatedUser);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public List<UserDto> getUsersByRole(UserRole role) {
        return userRepository.findByRole(role).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private UserDto convertToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUnit(user.getUnit() != null ? user.getUnit().getUnitNumber() : null);
        dto.setName(user.getName());
        dto.setRole(user.getRole());
        dto.setPhone(user.getPhone());
        dto.setPlateNumber(user.getPlateNumber());
        dto.setMoveInDate(user.getMoveInDate());
        return dto;
    }
}