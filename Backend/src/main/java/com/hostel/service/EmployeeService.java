package com.hostel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostel.entity.Employee;
import com.hostel.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Add employee
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Update employee
    public Employee updateEmployee(Integer id, Employee employee) {

        Employee oldEmployee = employeeRepository.findById(id).orElse(null);

        if (oldEmployee == null) {
            return null;
        }

        oldEmployee.setName(employee.getName());
        oldEmployee.setDesignation(employee.getDesignation());
        oldEmployee.setMobile(employee.getMobile());
        oldEmployee.setEmail(employee.getEmail());
        oldEmployee.setStatus(employee.getStatus());

        return employeeRepository.save(oldEmployee);
    }

    // Delete employee
    public void deleteEmployee(Integer id) {
        employeeRepository.deleteById(id);
    }
}