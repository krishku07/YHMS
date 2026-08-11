package com.hostel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostel.dto.DashboardResponse;
import com.hostel.repository.EmployeeRepository;
import com.hostel.repository.FeeRepository;
import com.hostel.repository.StudentRepository;

@Service
public class DashboardService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private FeeRepository feeRepository;

    public DashboardResponse getDashboardData() {

        long students = studentRepository.count();

        long employees = employeeRepository.count();

        long rooms = studentRepository.countOccupiedRooms();

        Double fees = feeRepository.getTotalFeesCollected();

        return new DashboardResponse(
                students,
                employees,
                rooms,
                fees
        );
    }
}