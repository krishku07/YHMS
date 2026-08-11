package com.hostel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hostel.entity.Outpass;
import com.hostel.service.OutpassService;

@RestController
@RequestMapping("/api/outpasses")
@CrossOrigin(origins = "http://localhost:5173")
public class OutpassController {

    @Autowired
    private OutpassService outpassService;

    // Get all requests
    @GetMapping
    public List<Outpass> getAllOutpasses() {
        return outpassService.getAllOutpasses();
    }

    // Get request by ID
    @GetMapping("/{id}")
    public Outpass getOutpassById(@PathVariable Integer id) {
        return outpassService.getOutpassById(id);
    }

    // Student request history
    @GetMapping("/student/{studentId}")
    public List<Outpass> getOutpassesByStudentId(
            @PathVariable Integer studentId) {

        return outpassService.getOutpassesByStudentId(studentId);

    }

    // Student submits request
    @PostMapping
    public Outpass addOutpass(@RequestBody Outpass outpass) {
        return outpassService.saveOutpass(outpass);
    }

    // Update request
    @PutMapping("/{id}")
    public Outpass updateOutpass(@PathVariable Integer id,
                                 @RequestBody Outpass outpass) {
        return outpassService.updateOutpass(id, outpass);
    }

    // Admin approves request
    @PutMapping("/{id}/approve")
    public Outpass approveOutpass(@PathVariable Integer id) {
        return outpassService.approveOutpass(id);
    }

    // Admin rejects request
    @PutMapping("/{id}/reject")
    public Outpass rejectOutpass(@PathVariable Integer id) {
        return outpassService.rejectOutpass(id);
    }

// Delete request
    @DeleteMapping("/{id}")
    public void deleteOutpass(@PathVariable Integer id) {
        outpassService.deleteOutpass(id);
    }
}
