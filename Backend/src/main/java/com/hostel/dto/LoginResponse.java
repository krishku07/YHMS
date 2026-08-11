package com.hostel.dto;

public class LoginResponse {

    private boolean success;
    private String message;
    private String role;
    private String token;

    // Student Information
    private Integer studentId;
    private String studentName;
    private String mobile;
    private String roomNo;

    public LoginResponse() {
    }

    public LoginResponse(boolean success, String message, String role, String token) {
        this.success = success;
        this.message = message;
        this.role = role;
        this.token = token;
    }

    public LoginResponse(boolean success, String message, String role, String token,
                         Integer studentId, String studentName,
                         String mobile, String roomNo) {

        this.success = success;
        this.message = message;
        this.role = role;
        this.token = token;
        this.studentId = studentId;
        this.studentName = studentName;
        this.mobile = mobile;
        this.roomNo = roomNo;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getRoomNo() {
        return roomNo;
    }

    public void setRoomNo(String roomNo) {
        this.roomNo = roomNo;
    }

}