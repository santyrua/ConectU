const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: {
      type: String,
      enum: ["estudiante", "tutor", "admin"],
      default: "estudiante"
    },
    programa: String,
    semestre: Number,
    intereses: [String],
    fotoPerfil: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
