package com.petboarding.common.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.util.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

public class JwtTokenProvider {

    private final Algorithm algorithm;

    public JwtTokenProvider(String secret) {
        this.algorithm = Algorithm.HMAC256(secret);
    }

    public String generate(String subject) {
        Instant now = Instant.now();
        return JWT.create()
                .withSubject(subject)
                .withIssuedAt(Date.from(now))
                .withExpiresAt(Date.from(now.plus(7, ChronoUnit.DAYS)))
                .sign(algorithm);
    }

    public DecodedJWT verify(String token) {
        return JWT.require(algorithm).build().verify(token);
    }
}
