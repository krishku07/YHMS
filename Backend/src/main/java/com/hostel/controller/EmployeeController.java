package com.hostel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hostel.entity.Employee;
import com.hostel.service.EmployeeService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PostMapping("/employees")
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeService.addEmployee(employee);
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Integer id,
                                            @RequestBody Employee employee) {

        Employee updated = employeeService.updateEmployee(id, employee);

        if (updated == null) {
            return ResponseEntity.badRequest().body("Employee Not Found");
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Integer id) {

        employeeService.deleteEmployee(id);

        return ResponseEntity.ok("Employee Deleted Successfully");
    }
}