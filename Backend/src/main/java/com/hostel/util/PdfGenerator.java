package com.hostel.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

import com.hostel.entity.Fee;
import com.hostel.entity.Student;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;

public class PdfGenerator {

    public static ByteArrayInputStream generateReceipt(Student student, Fee fee) {

        Document document = new Document(PageSize.A4);

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {

            PdfWriter.getInstance(document, out);

            document.open();

            Font title =
                    FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);

            Font heading =
                    FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);

            Font normal =
                    FontFactory.getFont(FontFactory.HELVETICA, 12);

            Paragraph p1 =
                    new Paragraph("HOSTEL MANAGEMENT SYSTEM", title);

            p1.setAlignment(Element.ALIGN_CENTER);

            document.add(p1);

            Paragraph p2 =
                    new Paragraph("FEE RECEIPT", heading);

            p2.setAlignment(Element.ALIGN_CENTER);

            document.add(p2);

            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(2);

            table.setWidthPercentage(100);

            table.addCell("Receipt ID");
            table.addCell(String.valueOf(fee.getId()));

            table.addCell("Student ID");
            table.addCell(String.valueOf(student.getId()));

            table.addCell("Student Name");
            table.addCell(student.getName());

            table.addCell("Mobile");
            table.addCell(student.getMobile());

            table.addCell("College");
            table.addCell(student.getCollegeName());

            table.addCell("Room");
            table.addCell(student.getRoomNumber());

            table.addCell("Month");
            table.addCell(fee.getMonth());

            table.addCell("Amount");
            table.addCell("₹ " + fee.getAmount());

            document.add(table);

            document.add(new Paragraph(" "));

            Paragraph thanks =
                    new Paragraph("Thank you for your payment.", normal);

            document.add(thanks);

            Paragraph sign =
                    new Paragraph("\n\nAuthorized Signature", heading);

            sign.setAlignment(Element.ALIGN_RIGHT);

            document.add(sign);

            document.close();

        } catch (Exception e) {

            e.printStackTrace();

        }

        return new ByteArrayInputStream(out.toByteArray());

    }

}