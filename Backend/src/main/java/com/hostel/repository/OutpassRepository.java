package com.hostel.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hostel.entity.Outpass;

@Repository
public interface OutpassRepository extends JpaRepository<Outpass, Integer> {

    List<Outpass> findByStudentId(Integer studentId);

    List<Outpass> findByStatus(String status);

}