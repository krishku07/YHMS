package com.hostel.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostel.entity.Notice;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
public interface NoticeRepository extends JpaRepository<Notice, Integer> {
	
	
	@Query("""
			SELECT n
			FROM Notice n
			WHERE n.targetType='ALL'
			OR (n.targetType='INDIVIDUAL' AND n.studentId=:studentId)
			ORDER BY n.createdAt DESC
			""")
			List<Notice> getStudentNotices(@Param("studentId") Integer studentId);

    List<Notice> findByStudentIdOrStudentIdIsNullOrderByCreatedAtDesc(Integer studentId);

}