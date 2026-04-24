package com.petboarding.auth.provider;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsRequest;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AliyunSmsProvider implements SmsProvider {

    @Value("${aliyun.sms.accessKeyId:}")
    private String accessKeyId;

    @Value("${aliyun.sms.accessKeySecret:}")
    private String accessKeySecret;

    @Value("${aliyun.sms.signName:}")
    private String signName;

    @Value("${aliyun.sms.templateCode:}")
    private String templateCode;

    @Override
    public void sendCode(String phone, String code) {
        // Development mode: just log the code
        if (accessKeyId.isEmpty() || accessKeySecret.isEmpty()) {
            log.info("[DEV MODE] SMS would be sent to phone: {}, code: {}", phone, code);
            return;
        }

        try {
            IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, accessKeySecret);
            DefaultProfile.addEndpoint("cn-hangzhou", "cn-hangzhou", "Dysmsapi", "dysmsapi.aliyuncs.com");
            IAcsClient acsClient = new DefaultAcsClient(profile);

            SendSmsRequest request = new SendSmsRequest();
            request.setPhoneNumbers(phone);
            request.setSignName(signName);
            request.setTemplateCode(templateCode);
            request.setTemplateParam("{\"code\":\"" + code + "\"}");

            SendSmsResponse response = acsClient.getAcsResponse(request);
            log.info("SMS sent result: {}, message: {}", response.getCode(), response.getMessage());
        } catch (Exception e) {
            log.error("Failed to send SMS to {}: {}", phone, e.getMessage());
            throw new RuntimeException("SMS send failed", e);
        }
    }
}
