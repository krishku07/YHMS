package com.hostel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromEmail;

    public void sendOtp(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        // Sender Email (Must be verified in Brevo)
        message.setFrom(fromEmail);

        // Receiver Email
        message.setTo(toEmail);

        // Subject
        message.setSubject("Hostel Management System - Password Reset OTP");

        // Email Body
        String body = """
                Dear Student,

                We received a request to reset your Hostel Management System password.

                Your One-Time Password (OTP) is:

                %s

                This OTP is valid for 5 minutes.

                Please do not share this OTP with anyone.

                If you did not request this password reset, you can safely ignore this email.

                Regards,
                Hostel Management System
                """.formatted(otp);

        message.setText(body);

        mailSender.send(message);
    }
}