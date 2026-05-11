const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API conectU funcionando correctamente",
    proyecto: "conectU - Comunidad digital universitaria"
  });
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/professors", require("./routes/professorRoutes"));
app.use("/api/recommendations", require("./routes/recommendationRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/resources", require("./routes/resourceRoutes"));
app.use("/api/stories", require("./routes/storyRoutes"));
app.use("/api/opportunities", require("./routes/opportunityRoutes"));
app.use("/api/groups", require("./routes/groupRoutes"));
app.use("/api/tutorings", require("./routes/tutoringRoutes"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((error) => console.error("Error conectando MongoDB:", error.message));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
