package com.hostel.security;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {

    // Change this to a long random secret before deployment
    private static final String SECRET =
            "hostelmanagementsystemsecretkey2026hostelmanagementsystem";

    private static final SecretKey KEY = Keys.hmacShaKeyFor(SECRET.getBytes());

    // Token valid for 24 hours
    private static final long EXPIRATION = 1000 * 60 * 60 * 24;

    public static String generateToken(String username, String role) {

        return Jwts.builder()

                .subject(username)

                .claim("role", role)

                .issuedAt(new Date())

                .expiration(new Date(System.currentTimeMillis() + EXPIRATION))

                .signWith(KEY)

                .compact();

    }

    public static String extractUsername(String token) {

        Claims claims = Jwts.parser()
                .verifyWith(KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }
    
    public static String extractRole(String token) {

        Claims claims = Jwts.parser()
                .verifyWith(KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.get("role", String.class);

    }

    public static boolean validateToken(String token) {

        try {

            Jwts.parser()
                    .verifyWith(KEY)
                    .build()
                    .parseSignedClaims(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }
}