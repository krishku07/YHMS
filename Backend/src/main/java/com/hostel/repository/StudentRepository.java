package com.hostel.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import com.hostel.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {

    Optional<Student> findByName(String name);

    Optional<Student> findByMobile(String mobile);
    Optional<Student> findByEmail(String email);
    
    @Query("SELECT COUNT(s) FROM Student s WHERE s.roomNumber IS NOT NULL")
    long countOccupiedRooms();
    

}
