package com.hostel.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "room_number")
    private String roomNumber;

    @Column(name = "room_type")
    private String roomType;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "occupied")
    private Integer occupied;

    @Column(name = "status")
    private String status;

    public Room() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getOccupied() {
        return occupied;
    }

    public void setOccupied(Integer occupied) {
        this.occupied = occupied;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}