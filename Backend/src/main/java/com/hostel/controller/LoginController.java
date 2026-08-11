package com.hostel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hostel.dto.LoginRequest;
import com.hostel.dto.LoginResponse;
import com.hostel.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        return userService.login(
                request.getUsername(),
                request.getPassword());

    }

}