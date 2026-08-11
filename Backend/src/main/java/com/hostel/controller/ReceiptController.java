package com.hostel.controller;

import java.io.ByteArrayInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hostel.service.ReceiptService;

@RestController
@RequestMapping("/api/receipt")
@CrossOrigin(origins = "*")
public class ReceiptController {

    @Autowired
    private ReceiptService receiptService;

    @GetMapping("/{feeId}")
    public ResponseEntity<InputStreamResource> downloadReceipt(
            @PathVariable Integer feeId) {

        ByteArrayInputStream pdf = receiptService.generateReceipt(feeId);

        HttpHeaders headers = new HttpHeaders();

        headers.add(
                "Content-Disposition",
                "attachment; filename=Fee_Receipt_" + feeId + ".pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(pdf));
    }

}