package com.petboarding.auth.dto;

import lombok.Data;

@Data
public class PasswordLoginRequest {
    private String phone;
    private String email;
    private String password;
}
