package com.hostel.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "fees")
public class Fee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "student_id")
    private Integer studentId;

    @Column(name = "month")
    private String month;

    @Column(name = "amount")
    private Double amount;

    public Fee() {
    }

    public Fee(Integer id, Integer studentId, String month, Double amount) {
        this.id = id;
        this.studentId = studentId;
        this.month = month;
        this.amount = amount;
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

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
    
    
}