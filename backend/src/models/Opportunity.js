const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    tipo: {
      type: String,
      enum: ["pasantia", "intercambio", "convocatoria", "evento"],
      default: "convocatoria"
    },
    descripcion: String,
    enlace: String,
    fechaLimite: Date,
    publicadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Opportunity", opportunitySchema);
