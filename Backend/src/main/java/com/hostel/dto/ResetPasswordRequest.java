package com.hostel.dto;

public class ResetPasswordRequest {

    private String mobile;
    private String newPassword;

    public ResetPasswordRequest() {
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}