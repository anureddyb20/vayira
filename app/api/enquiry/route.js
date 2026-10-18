import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const enquirySchema = z.object({
  customer_name: z.string().min(2, "Name is required"),
  customer_email: z.string().email("Valid email required"),
  customer_phone: z.string().min(7, "Valid phone number required"),
  enquiry_type: z.enum(["bespoke_atelier", "product_consultation", "bridal_trousseau"]).optional(),
  estimated_amount: z.number().optional(),
  customer_notes: z.string().optional(),
  preferred_contact_mode: z.string().optional()
});

export async function POST(request) {
  try {
    const json = await request.json();
    const parsed = enquirySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const refCode = `VYR-${Math.floor(100000 + Math.random() * 900000)}`;

    return NextResponse.json({
      success: true,
      referenceCode: refCode,
      message: "Loom reservation enquiry registered successfully.",
      data: {
        ...parsed.data,
        reference_code: refCode,
        status: "received",
        received_at: new Date().toISOString()
      }
    });

  } catch (err) {
    console.error("Enquiry submission error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
