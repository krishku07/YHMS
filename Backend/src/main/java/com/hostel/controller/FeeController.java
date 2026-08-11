package com.hostel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hostel.entity.Fee;
import com.hostel.service.FeeService;

@RestController
@RequestMapping("/api/fees")
@CrossOrigin(origins = "http://localhost:5173")
public class FeeController {

    @Autowired
    private FeeService feeService;

    // Get all fees
    @GetMapping
    public List<Fee> getAllFees() {
        return feeService.getAllFees();
    }

    // Get fee by ID
    @GetMapping("/{id}")
    public Fee getFeeById(@PathVariable Integer id) {
        return feeService.getFeeById(id);
    }

    // Get fees by student ID
    @GetMapping("/student/{studentId}")
    public List<Fee> getFeesByStudentId(@PathVariable Integer studentId) {
        return feeService.getFeesByStudentId(studentId);
    }

    // Add fee
    @PostMapping
    public Fee addFee(@RequestBody Fee fee) {
        return feeService.saveFee(fee);
    }

    // Update fee
    @PutMapping("/{id}")
    public Fee updateFee(@PathVariable Integer id, @RequestBody Fee fee) {
        return feeService.updateFee(id, fee);
    }

    // Delete fee
    @DeleteMapping("/{id}")
    public void deleteFee(@PathVariable Integer id) {
        feeService.deleteFee(id);
    }
    
    
}