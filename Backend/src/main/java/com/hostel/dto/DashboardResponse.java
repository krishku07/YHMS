package com.hostel.dto;

public class DashboardResponse {

    private long totalStudents;
    private long totalEmployees;
    private long occupiedRooms;
    private Double totalFeesCollected;

    public DashboardResponse() {
    }

    public DashboardResponse(long totalStudents,
                             long totalEmployees,
                             long occupiedRooms,
                             Double totalFeesCollected) {

        this.totalStudents = totalStudents;
        this.totalEmployees = totalEmployees;
        this.occupiedRooms = occupiedRooms;
        this.totalFeesCollected = totalFeesCollected;
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public long getOccupiedRooms() {
        return occupiedRooms;
    }

    public void setOccupiedRooms(long occupiedRooms) {
        this.occupiedRooms = occupiedRooms;
    }

    public Double getTotalFeesCollected() {
        return totalFeesCollected;
    }

    public void setTotalFeesCollected(Double totalFeesCollected) {
        this.totalFeesCollected = totalFeesCollected;
    }
}