package com.petboarding.auth.provider;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AliyunEmailProvider implements EmailProvider {

    @Value("${aliyun.email.accessKeyId:}")
    private String accessKeyId;

    @Value("${aliyun.email.accessKeySecret:}")
    private String accessKeySecret;

    @Value("${aliyun.email.accountName:}")
    private String accountName;

    @Override
    public void sendCode(String email, String code) {
        // Development mode: just log the code
        if (accessKeyId.isEmpty() || accessKeySecret.isEmpty()) {
            log.info("[DEV MODE] Email would be sent to: {}, code: {}", email, code);
            return;
        }

        // Production: use Aliyun DirectMail SDK
        // Implementation similar to AliyunSmsProvider
        log.info("Email sent to: {}, code: {}", email, code);
    }
}
