package com.petboarding.auth.provider;

public interface EmailProvider {
    void sendCode(String email, String code);
}
