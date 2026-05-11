const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    materia: String,
    tipo: {
      type: String,
      enum: ["apunte", "enlace", "video", "guia", "resumen"],
      default: "enlace"
    },
    url: String,
    descripcion: String,
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
