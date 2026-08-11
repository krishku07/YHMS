package com.hostel.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hostel.dto.LoginResponse;
import com.hostel.entity.Student;
import com.hostel.entity.User;
import com.hostel.repository.StudentRepository;
import com.hostel.repository.UserRepository;
import com.hostel.security.JwtUtil;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponse login(String username, String password) {

        // =========================
        // ADMIN LOGIN
        // =========================

        Optional<User> admin = userRepository.findByUsername(username);

        if (admin.isPresent() && admin.get().getRole().equalsIgnoreCase("admin")) {

            User user = admin.get();

            if (!passwordEncoder.matches(password, user.getPassword())) {
                return new LoginResponse(
                        false,
                        "Invalid Password",
                        null,
                        null
                );
            }

            String token = JwtUtil.generateToken(
                    user.getUsername(),
                    user.getRole()
            );

            return new LoginResponse(
                    true,
                    "Login Successful",
                    user.getRole(),
                    token
            );
        }

        // =========================
        // STUDENT LOGIN
        // =========================

        Optional<Student> student = studentRepository.findByMobile(username);

        if (student.isEmpty()) {
            return new LoginResponse(
                    false,
                    "Student not found",
                    null,
                    null
            );
        }

        Student s = student.get();

        Optional<User> studentUser = userRepository.findByUsername(s.getMobile());

        if (studentUser.isEmpty()) {
            return new LoginResponse(
                    false,
                    "Student account not found",
                    null,
                    null
            );
        }

        User user = studentUser.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return new LoginResponse(
                    false,
                    "Invalid Password",
                    null,
                    null
            );
        }

        String token = JwtUtil.generateToken(
                s.getMobile(),
                "student"
        );

        return new LoginResponse(
                true,
                "Login Successful",
                "student",
                token,
                s.getId(),
                s.getName(),
                s.getMobile(),
                s.getRoomNumber()
        );
    }
}