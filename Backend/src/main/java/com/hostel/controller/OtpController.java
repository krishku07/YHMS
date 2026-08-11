package com.hostel.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.hostel.dto.ForgotPasswordRequest;
import com.hostel.dto.ForgotPasswordResponse;
import com.hostel.dto.ResetPasswordRequest;
import com.hostel.dto.VerifyOtpRequest;
import com.hostel.entity.Student;
import com.hostel.entity.User;
import com.hostel.otp.OtpData;
import com.hostel.otp.OtpGenerator;
import com.hostel.otp.OtpStorage;
import com.hostel.repository.StudentRepository;
import com.hostel.repository.UserRepository;
import com.hostel.service.EmailService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class OtpController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ===========================
    // SEND OTP
    // ===========================

    @PostMapping("/forgot-password")
    public ForgotPasswordResponse forgotPassword(@RequestBody ForgotPasswordRequest request) {

        String mobile = request.getMobile();

        Optional<Student> student = studentRepository.findByMobile(mobile);

        if (student.isEmpty()) {
            return new ForgotPasswordResponse(
                    "Mobile number not registered",
                    null
            );
        }

        String email = student.get().getEmail();

        String otp = OtpGenerator.generateOtp();

        long expiry = System.currentTimeMillis() + (5 * 60 * 1000);

        OtpStorage.otpMap.put(mobile, new OtpData(otp, expiry));

        emailService.sendOtp(email, otp);

        return new ForgotPasswordResponse(
                "OTP sent successfully",
                maskEmail(email)
        );
    }

    // ===========================
    // VERIFY OTP
    // ===========================

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody VerifyOtpRequest request) {

        String mobile = request.getMobile();
        String otp = request.getOtp();

        OtpData data = OtpStorage.otpMap.get(mobile);

        if (data == null) {
            return "OTP not found";
        }

        if (System.currentTimeMillis() > data.getExpiryTime()) {

            OtpStorage.otpMap.remove(mobile);

            return "OTP Expired";
        }

        if (!data.getOtp().equals(otp)) {
            return "Invalid OTP";
        }

        return "OTP Verified Successfully";
    }

    // ===========================
    // RESET PASSWORD
    // ===========================

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody ResetPasswordRequest request) {

        Optional<Student> student =
                studentRepository.findByMobile(request.getMobile());

        if (student.isEmpty()) {
            return "Student not found";
        }

        Optional<User> user =
                userRepository.findByUsername(request.getMobile());

        if (user.isEmpty()) {
            return "User not found";
        }

        User u = user.get();

        u.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(u);

        OtpStorage.otpMap.remove(request.getMobile());

        return "Password Changed Successfully";
    }

    // ===========================
    // MASK EMAIL
    // ===========================

    private String maskEmail(String email) {

        int atIndex = email.indexOf("@");

        String name = email.substring(0, atIndex);

        String domain = email.substring(atIndex);

        if (name.length() <= 3) {
            return name.charAt(0) + "***" + domain;
        }

        return name.substring(0, 3) + "****" + domain;
    }
}