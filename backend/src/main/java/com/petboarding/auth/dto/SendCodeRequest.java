package com.petboarding.auth.dto;

import lombok.Data;

@Data
public class SendCodeRequest {
    private String phone;
    private String email;
}
