import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Contact from "@/models/Contact";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(6, "Número de teléfono inválido"),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validar datos
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.formErrors.fieldErrors },
        { status: 400 }
      );
    }

    await connectDB();

    const newContact = await Contact.create(validation.data);

    return NextResponse.json(
      { message: "Mensaje enviado con éxito", contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
