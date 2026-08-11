package com.hostel.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import com.hostel.entity.Fee;

@Repository
public interface FeeRepository extends JpaRepository<Fee, Integer> {

    List<Fee> findByStudentId(Integer studentId);
    @Query("SELECT COALESCE(SUM(f.amount),0) FROM Fee f")
    Double getTotalFeesCollected();
}