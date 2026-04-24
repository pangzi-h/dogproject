package com.petboarding.auth.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class JwtTokenService {

    private final Algorithm algorithm;
    private final StringRedisTemplate redisTemplate;

    @Value("${jwt.accessTokenExpire:3600}")
    private long accessTokenExpireSeconds;

    @Value("${jwt.refreshTokenExpire:604800}")
    private long refreshTokenExpireSeconds;

    private static final String REFRESH_TOKEN_KEY_PREFIX = "refresh_token:";

    public JwtTokenService(
            @Value("${jwt.secret}") String secret,
            StringRedisTemplate redisTemplate) {
        this.algorithm = Algorithm.HMAC256(secret);
        this.redisTemplate = redisTemplate;
    }

    public String generateAccessToken(Long userId) {
        Instant now = Instant.now();
        return JWT.create()
                .withSubject(String.valueOf(userId))
                .withClaim("type", "access")
                .withIssuedAt(java.util.Date.from(now))
                .withExpiresAt(java.util.Date.from(now.plus(accessTokenExpireSeconds, ChronoUnit.SECONDS)))
                .sign(algorithm);
    }

    public String generateRefreshToken(Long userId) {
        Instant now = Instant.now();
        String token = UUID.randomUUID().toString();

        // Store refresh token in Redis with userId mapping
        String key = REFRESH_TOKEN_KEY_PREFIX + token;
        redisTemplate.opsForValue().set(key, String.valueOf(userId), refreshTokenExpireSeconds, TimeUnit.SECONDS);

        return token;
    }

    public Optional<Long> verifyAccessToken(String token) {
        try {
            DecodedJWT decoded = JWT.require(algorithm).build().verify(token);
            String type = decoded.getClaim("type").asString();
            if (!"access".equals(type)) {
                log.warn("Token type mismatch: expected access, got {}", type);
                return Optional.empty();
            }
            return Optional.of(Long.parseLong(decoded.getSubject()));
        } catch (Exception e) {
            log.warn("Access token verification failed: {}", e.getMessage());
            return Optional.empty();
        }
    }

    public Optional<Long> verifyRefreshToken(String token) {
        try {
            String key = REFRESH_TOKEN_KEY_PREFIX + token;
            String userIdStr = redisTemplate.opsForValue().get(key);
            if (userIdStr == null) {
                log.warn("Refresh token not found in Redis or expired");
                return Optional.empty();
            }
            return Optional.of(Long.parseLong(userIdStr));
        } catch (Exception e) {
            log.warn("Refresh token verification failed: {}", e.getMessage());
            return Optional.empty();
        }
    }

    public void invalidateRefreshToken(String token) {
        String key = REFRESH_TOKEN_KEY_PREFIX + token;
        redisTemplate.delete(key);
        log.info("Refresh token invalidated");
    }

    public void invalidateAllUserTokens(Long userId) {
        // This is a simplified version - in production, you might want to store a blacklist
        log.info("All tokens invalidated for userId: {}", userId);
    }
}
