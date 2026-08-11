package com.hostel.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostel.entity.Outpass;
import com.hostel.repository.OutpassRepository;

@Service
public class OutpassService {

    @Autowired
    private OutpassRepository outpassRepository;

    // Get all outpass requests
    public List<Outpass> getAllOutpasses() {
        return outpassRepository.findAll();
    }

    // Get outpass by ID
    public Outpass getOutpassById(Integer id) {
        Optional<Outpass> outpass = outpassRepository.findById(id);
        return outpass.orElse(null);
    }

    // Get all requests of a student
    public List<Outpass> getOutpassesByStudentId(Integer studentId) {

        return outpassRepository.findByStudentId(studentId);

    }

// Submit new request
    public Outpass saveOutpass(Outpass outpass) {

        if (outpass.getStatus() == null || outpass.getStatus().isEmpty()) {
            outpass.setStatus("Pending");
        }

        return outpassRepository.save(outpass);
    }

    // Approve request
    public Outpass approveOutpass(Integer id) {

        Outpass outpass = outpassRepository.findById(id).orElse(null);

        if (outpass != null) {
            outpass.setStatus("Approved");
            return outpassRepository.save(outpass);
        }

        return null;
    }

    // Reject request
    public Outpass rejectOutpass(Integer id) {

        Outpass outpass = outpassRepository.findById(id).orElse(null);

        if (outpass != null) {
            outpass.setStatus("Rejected");
            return outpassRepository.save(outpass);
        }

        return null;
    }

    // Update request
    public Outpass updateOutpass(Integer id, Outpass updatedOutpass) {

        Outpass outpass = outpassRepository.findById(id).orElse(null);

        if (outpass != null) {

            outpass.setName(updatedOutpass.getName());
            outpass.setReason(updatedOutpass.getReason());
            outpass.setLeaveDate(updatedOutpass.getLeaveDate());
            outpass.setReturnDate(updatedOutpass.getReturnDate());
            outpass.setStatus(updatedOutpass.getStatus());

            return outpassRepository.save(outpass);
        }

        return null;
    }

    // Delete request
    public void deleteOutpass(Integer id) {
        outpassRepository.deleteById(id);
    }

}