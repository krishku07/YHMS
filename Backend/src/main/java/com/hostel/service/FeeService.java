package com.hostel.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostel.entity.Fee;
import com.hostel.repository.FeeRepository;

@Service
public class FeeService {

    @Autowired
    private FeeRepository feeRepository;

    // Get all fees
    public List<Fee> getAllFees() {
        return feeRepository.findAll();
    }

    // Get fee by ID
    public Fee getFeeById(Integer id) {
        Optional<Fee> fee = feeRepository.findById(id);
        return fee.orElse(null);
    }

    // Get fees of a particular student
    public List<Fee> getFeesByStudentId(Integer studentId) {
        return feeRepository.findByStudentId(studentId);
    }

    // Add fee
    public Fee saveFee(Fee fee) {
        return feeRepository.save(fee);
    }

    // Update fee
    public Fee updateFee(Integer id, Fee fee) {

        Fee existingFee = feeRepository.findById(id).orElse(null);

        if (existingFee != null) {
            existingFee.setStudentId(fee.getStudentId());
            existingFee.setMonth(fee.getMonth());
            existingFee.setAmount(fee.getAmount());

            return feeRepository.save(existingFee);
        }

        return null;
    }

    // Delete fee
    public void deleteFee(Integer id) {
        feeRepository.deleteById(id);
    }

}