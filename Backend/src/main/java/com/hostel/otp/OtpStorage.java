package com.hostel.otp;

import java.util.concurrent.ConcurrentHashMap;

public class OtpStorage {

    public static ConcurrentHashMap<String, OtpData> otpMap =
            new ConcurrentHashMap<>();

}