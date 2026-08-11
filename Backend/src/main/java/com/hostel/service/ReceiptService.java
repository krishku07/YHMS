package com.hostel.service;

import java.io.ByteArrayInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostel.entity.Fee;
import com.hostel.entity.Student;
import com.hostel.repository.FeeRepository;
import com.hostel.repository.StudentRepository;
import com.hostel.util.PdfGenerator;

@Service
public class ReceiptService {

    @Autowired
    private FeeRepository feeRepository;

    @Autowired
    private StudentRepository studentRepository;

    public ByteArrayInputStream generateReceipt(Integer feeId) {

        Fee fee = feeRepository.findById(feeId)
                .orElseThrow(() -> new RuntimeException("Fee Record Not Found"));

        Student student = studentRepository.findById(fee.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student Not Found"));

        return PdfGenerator.generateReceipt(student, fee);
    }

}