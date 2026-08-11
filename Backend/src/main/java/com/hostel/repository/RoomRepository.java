package com.hostel.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hostel.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {

    List<Room> findByStatus(String status);

    Optional<Room> findByRoomNumber(String roomNumber);

}