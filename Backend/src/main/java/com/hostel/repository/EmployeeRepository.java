package com.hostel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hostel.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

}