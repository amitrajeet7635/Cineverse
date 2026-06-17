package com.cineverse.dto;

import lombok.Data;
import com.cineverse.entity.User.Role;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
}
