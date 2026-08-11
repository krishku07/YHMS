package com.hostel.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "outpass")
public class Outpass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "student_id")
    private Integer studentId;

    private String name;

    private String reason;

    @Column(name = "leave_date")
    private LocalDate leaveDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    private String status;

    public Outpass() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDate getLeaveDate() {
        return leaveDate;
    }

    public void setLeaveDate(LocalDate leaveDate) {
        this.leaveDate = leaveDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}