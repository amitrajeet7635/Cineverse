package com.cineverse.controller;

import com.cineverse.dto.AuthRequest;
import com.cineverse.dto.RegisterRequest;
import com.cineverse.entity.User;
import com.cineverse.security.JwtUtils;
import com.cineverse.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private JwtUtils jwtUtils;
    
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        // Simple auth check - in production validate password
        return ResponseEntity.ok(jwtUtils.generateJwtToken(request.getEmail()));
    }
}
