const mongoose = require("mongoose");

const professorSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    facultad: String,
    materias: [String],
    claridad: { type: Number, default: 0 },
    exigencia: { type: Number, default: 0 },
    trato: { type: Number, default: 0 },
    metodologia: { type: Number, default: 0 },
    promedioCalificacion: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Professor", professorSchema);
