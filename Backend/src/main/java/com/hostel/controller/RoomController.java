package com.hostel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hostel.entity.Room;
import com.hostel.service.RoomService;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/available")
    public List<Room> getAvailableRooms() {
        return roomService.getAvailableRooms();
    }

    @PostMapping
    public Room addRoom(@RequestBody Room room) {
        return roomService.addRoom(room);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRoom(@PathVariable Integer id,
                                        @RequestBody Room room) {

        Room updated = roomService.updateRoom(id, room);

        if (updated == null) {
            return ResponseEntity.badRequest().body("Room Not Found");
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable Integer id) {

        roomService.deleteRoom(id);

        return ResponseEntity.ok("Room Deleted Successfully");
    }
    
}