package com.hostel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hostel.dto.DashboardResponse;
import com.hostel.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public DashboardResponse getDashboard() {

        return dashboardService.getDashboardData();

    }

}