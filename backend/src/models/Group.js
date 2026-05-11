const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    materia: String,
    descripcion: String,
    creadorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    integrantes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    cupoMaximo: { type: Number, default: 10 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
