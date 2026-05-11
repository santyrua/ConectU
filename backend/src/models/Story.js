const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    categoria: {
      type: String,
      enum: ["consejo", "experiencia", "advertencia", "oportunidad"],
      default: "consejo"
    },
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    estado: {
      type: String,
      enum: ["pendiente", "aprobado", "rechazado"],
      default: "pendiente"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);
