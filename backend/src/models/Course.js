const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    programa: String,
    semestre: Number,
    descripcion: String,
    consejos: String,
    nivelDificultad: {
      type: String,
      enum: ["bajo", "medio", "alto"],
      default: "medio"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
