import mongoose, { Schema, model, models } from "mongoose";

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
    },
    phone: {
      type: String,
      required: [true, "El teléfono es obligatorio"],
    },
    message: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = models.Contact || model("Contact", ContactSchema);

export default Contact;
