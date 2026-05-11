const mongoose = require("mongoose");

const tutoringSchema = new mongoose.Schema(
  {
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    materia: { type: String, required: true },
    descripcion: String,
    modalidad: {
      type: String,
      enum: ["virtual", "presencial"],
      default: "virtual"
    },
    disponibilidad: String,
    estado: {
      type: String,
      enum: ["activa", "inactiva"],
      default: "activa"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tutoring", tutoringSchema);
