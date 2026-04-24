package com.petboarding.auth.dto;

import lombok.Data;

@Data
public class VerifyCodeRequest {
    private String phone;
    private String email;
    private String code;
}
