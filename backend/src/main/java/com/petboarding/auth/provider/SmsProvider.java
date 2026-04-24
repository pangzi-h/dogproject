package com.petboarding.auth.provider;

public interface SmsProvider {
    void sendCode(String phone, String code);
}
