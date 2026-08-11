package com.hostel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hostel.entity.Notice;
import com.hostel.service.NoticeService;

@RestController
@RequestMapping("/api/notices")
@CrossOrigin(origins = "*")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeService.getAllNotices();
    }

    @GetMapping("/student/{studentId}")
    public List<Notice> getStudentNotices(@PathVariable Integer studentId) {
        return noticeService.getStudentNotices(studentId);
    }

    @PostMapping
    public Notice addNotice(@RequestBody Notice notice) {
        return noticeService.addNotice(notice);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNotice(
            @PathVariable Integer id,
            @RequestBody Notice notice) {

        Notice updated = noticeService.updateNotice(id, notice);

        if (updated == null) {
            return ResponseEntity.badRequest().body("Notice Not Found");
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Integer id) {

        noticeService.deleteNotice(id);

        return ResponseEntity.ok("Notice Deleted Successfully");
    }
}