package com.hostel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostel.entity.Room;
import com.hostel.repository.RoomRepository;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> getAvailableRooms() {
        return roomRepository.findByStatus("Available");
    }

    public Room addRoom(Room room) {
        room.setOccupied(0);
        room.setStatus("Available");
        return roomRepository.save(room);
    }

    public Room updateRoom(Integer id, Room room) {

        Room oldRoom = roomRepository.findById(id).orElse(null);

        if (oldRoom == null) {
            return null;
        }

        oldRoom.setRoomNumber(room.getRoomNumber());
        oldRoom.setRoomType(room.getRoomType());
        oldRoom.setCapacity(room.getCapacity());

        return roomRepository.save(oldRoom);
    }

    public void deleteRoom(Integer id) {
        roomRepository.deleteById(id);
    }

    public Room getRoomByNumber(String roomNumber) {
        return roomRepository.findByRoomNumber(roomNumber).orElse(null);
    }

}