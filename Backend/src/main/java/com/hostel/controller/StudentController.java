package com.hostel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.hostel.entity.Student;
import com.hostel.service.StudentService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // ==========================
    // ADMIN APIs
    // ==========================

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/students")
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/students/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Integer id,
                                           @RequestBody Student student) {

        Student updated = studentService.updateStudent(id, student);

        if (updated == null) {
            return ResponseEntity.badRequest().body("Student Not Found");
        }

        return ResponseEntity.ok(updated);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/students/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Integer id) {

        studentService.deleteStudent(id);

        return ResponseEntity.ok("Student Deleted Successfully");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/students/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable Integer id) {

        Student student = studentService.getStudentById(id);

        if (student == null) {
            return ResponseEntity.badRequest().body("Student Not Found");
        }

        return ResponseEntity.ok(student);
    }

    // ==========================
    // STUDENT API
    // ==========================

    @GetMapping("/student/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {

        String mobile = authentication.getName();

        Student student = studentService.getStudentByMobile(mobile);

        if (student == null) {
            return ResponseEntity.badRequest().body("Student Not Found");
        }

        return ResponseEntity.ok(student);
    }
}