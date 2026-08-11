package com.hostel.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hostel.entity.Room;
import com.hostel.entity.Student;
import com.hostel.entity.User;
import com.hostel.repository.RoomRepository;
import com.hostel.repository.StudentRepository;
import com.hostel.repository.UserRepository;

@Service
public class StudentService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ==========================
    // GET ALL STUDENTS
    // ==========================
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // ==========================
    // GET PROFILE
    // ==========================
    public Student getStudentProfile(String name) {

        Optional<Student> student = studentRepository.findByName(name);

        return student.orElse(null);
    }

    // ==========================
    // ADD STUDENT
    // ==========================
    public Student addStudent(Student student) {

        Room room = roomRepository.findByRoomNumber(student.getRoomNumber())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (room.getOccupied() >= room.getCapacity()) {
            throw new RuntimeException("Room is already full");
        }

        room.setOccupied(room.getOccupied() + 1);

        if (room.getOccupied().equals(room.getCapacity())) {
            room.setStatus("Occupied");
        } else {
            room.setStatus("Available");
        }

        roomRepository.save(room);

        // Save Student
        Student savedStudent = studentRepository.save(student);

        // Create Login
        User user = new User();
        user.setUsername(savedStudent.getMobile());

        String mobile = savedStudent.getMobile();
        String defaultPassword = mobile.substring(mobile.length() - 4);

        user.setPassword(passwordEncoder.encode(defaultPassword));
        user.setRole("student");

        userRepository.save(user);

        return savedStudent;
    }

    // ==========================
    // GET BY ID
    // ==========================
    public Student getStudentById(Integer id) {

        return studentRepository.findById(id).orElse(null);

    }

    // ==========================
    // UPDATE STUDENT
    // ==========================
    public Student updateStudent(Integer id, Student student) {

        Student old = studentRepository.findById(id).orElse(null);

        if (old == null)
            return null;

        // --------------------
        // ROOM CHANGE
        // --------------------

        if (!old.getRoomNumber().equals(student.getRoomNumber())) {

            Room oldRoom = roomRepository.findByRoomNumber(old.getRoomNumber())
                    .orElse(null);

            if (oldRoom != null) {

                oldRoom.setOccupied(oldRoom.getOccupied() - 1);

                if (oldRoom.getOccupied() < oldRoom.getCapacity()) {
                    oldRoom.setStatus("Available");
                }

                roomRepository.save(oldRoom);
            }

            Room newRoom = roomRepository.findByRoomNumber(student.getRoomNumber())
                    .orElseThrow(() -> new RuntimeException("Room not found"));

            if (newRoom.getOccupied() >= newRoom.getCapacity()) {
                throw new RuntimeException("Room is full");
            }

            newRoom.setOccupied(newRoom.getOccupied() + 1);

            if (newRoom.getOccupied().equals(newRoom.getCapacity())) {
                newRoom.setStatus("Occupied");
            }

            roomRepository.save(newRoom);
        }

        // --------------------
        // UPDATE USER LOGIN
        // --------------------

        if (!old.getMobile().equals(student.getMobile())) {

            Optional<User> userOptional =
                    userRepository.findByUsername(old.getMobile());

            if (userOptional.isPresent()) {

                User user = userOptional.get();

                user.setUsername(student.getMobile());

                String mobile = student.getMobile();
                String defaultPassword = mobile.substring(mobile.length() - 4);

                user.setPassword(passwordEncoder.encode(defaultPassword));

                userRepository.save(user);
            }
        }

        // --------------------
        // UPDATE STUDENT
        // --------------------

        old.setName(student.getName());
        old.setMobile(student.getMobile());
        old.setEmail(student.getEmail());
        old.setFatherName(student.getFatherName());
        old.setMotherName(student.getMotherName());
        old.setPermanentAddress(student.getPermanentAddress());
        old.setCollegeName(student.getCollegeName());
        old.setAadhaarNumber(student.getAadhaarNumber());
        old.setRoomNumber(student.getRoomNumber());
        old.setStatus(student.getStatus());

        return studentRepository.save(old);
    }

    public Student getStudentByMobile(String mobile) {

        return studentRepository.findByMobile(mobile).orElse(null);

    }

    // ==========================
    // DELETE STUDENT
    // ==========================
    public void deleteStudent(Integer id) {

        Student student = studentRepository.findById(id).orElse(null);

        if (student == null)
            return;

        Room room = roomRepository.findByRoomNumber(student.getRoomNumber())
                .orElse(null);

        if (room != null) {

            room.setOccupied(room.getOccupied() - 1);

            if (room.getOccupied() < 0) {
                room.setOccupied(0);
            }

            room.setStatus("Available");

            roomRepository.save(room);
        }

        userRepository.findByUsername(student.getMobile())
                .ifPresent(userRepository::delete);

        studentRepository.deleteById(id);
    }
}