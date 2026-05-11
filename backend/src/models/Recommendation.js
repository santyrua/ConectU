const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
  {
    profesorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professor",
      required: true
    },
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    claridad: { type: Number, min: 1, max: 5, required: true },
    exigencia: { type: Number, min: 1, max: 5, required: true },
    trato: { type: Number, min: 1, max: 5, required: true },
    metodologia: { type: Number, min: 1, max: 5, required: true },
    comentario: { type: String, required: true },
    estado: {
      type: String,
      enum: ["pendiente", "aprobado", "rechazado"],
      default: "pendiente"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recommendation", recommendationSchema);
