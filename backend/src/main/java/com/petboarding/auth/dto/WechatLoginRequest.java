package com.petboarding.auth.dto;

import lombok.Data;

@Data
public class WechatLoginRequest {
    private String code;
}
