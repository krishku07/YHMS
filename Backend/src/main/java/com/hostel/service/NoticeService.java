package com.hostel.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostel.entity.Notice;
import com.hostel.repository.NoticeRepository;
import java.sql.Timestamp;

@Service
public class NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;

    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    public List<Notice> getStudentNotices(Integer studentId) {
        return noticeRepository.findByStudentIdOrStudentIdIsNullOrderByCreatedAtDesc(studentId);
    }
    

    public Notice addNotice(Notice notice) {

        //notice.setCreatedAt(LocalDateTime.now().toString());
        notice.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        return noticeRepository.save(notice);
    }

    public Notice updateNotice(Integer id, Notice notice) {

        Notice old = noticeRepository.findById(id).orElse(null);

        if (old == null) {
            return null;
        }

        old.setTitle(notice.getTitle());
        old.setMessage(notice.getMessage());
       // old.setNoticeType(notice.getNoticeType());
        old.setTargetType(notice.getTargetType());
        old.setStudentId(notice.getStudentId());

        return noticeRepository.save(old);
    }

    public void deleteNotice(Integer id) {
        noticeRepository.deleteById(id);
    }

}