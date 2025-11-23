package com.modir.service;

import com.modir.dto.JwtRequest;
import com.modir.dto.JwtResponse;
import com.modir.model.User;
import com.modir.repository.UserRepository;
import com.modir.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    public JwtResponse authenticateUser(JwtRequest jwtRequest) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword())
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);

        User user = userRepository.findByUsername(jwtRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new JwtResponse(
            token,
            user.getUsername(),
            user.getName(),
            user.getRole(),
            user.getUnit() != null ? user.getUnit().getUnitNumber() : null
        );
    }
}