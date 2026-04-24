package com.petboarding.auth.service;

import java.util.Random;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class VerificationService {

    private final StringRedisTemplate redisTemplate;

    private static final String VERIFY_KEY_PREFIX = "verify:";
    private static final String FREQUENCY_KEY_PREFIX = "freq:";
    private static final int CODE_LENGTH = 6;
    private static final int CODE_TTL_SECONDS = 300; // 5 minutes
    private static final int FREQUENCY_LIMIT_SECONDS = 60; // 60 seconds

    public String generateCode(String type, String identifier) {
        String code = generateRandomCode();

        String verifyKey = VERIFY_KEY_PREFIX + type + ":" + identifier;
        String frequencyKey = FREQUENCY_KEY_PREFIX + type + ":" + identifier;

        // Check frequency limit
        Boolean isLimited = redisTemplate.hasKey(frequencyKey);
        if (Boolean.TRUE.equals(isLimited)) {
            return null; // Frequency limit reached
        }

        // Store verification code with TTL
        redisTemplate.opsForValue().set(verifyKey, code, CODE_TTL_SECONDS, TimeUnit.SECONDS);

        // Set frequency limit
        redisTemplate.opsForValue().set(frequencyKey, "1", FREQUENCY_LIMIT_SECONDS, TimeUnit.SECONDS);

        log.info("Generated verification code for {}:{}, code: {}", type, identifier, code);

        return code;
    }

    public boolean verifyCode(String type, String identifier, String code) {
        String verifyKey = VERIFY_KEY_PREFIX + type + ":" + identifier;
        String storedCode = redisTemplate.opsForValue().get(verifyKey);

        if (storedCode == null) {
            log.warn("Verification code expired or not found for {}:{}", type, identifier);
            return false;
        }

        if (!storedCode.equals(code)) {
            log.warn("Verification code mismatch for {}:{}, expected: {}, got: {}", type, identifier, storedCode, code);
            return false;
        }

        // Delete the code after successful verification (one-time use)
        redisTemplate.delete(verifyKey);

        log.info("Verification code validated successfully for {}:{}", type, identifier);
        return true;
    }

    public String getCodeForDebug(String type, String identifier) {
        String verifyKey = VERIFY_KEY_PREFIX + type + ":" + identifier;
        return redisTemplate.opsForValue().get(verifyKey);
    }

    private String generateRandomCode() {
        Random random = new Random();
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < CODE_LENGTH; i++) {
            code.append(random.nextInt(10));
        }
        return code.toString();
    }
}
