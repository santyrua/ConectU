const express = require("express");

function createCrudRoutes(Model) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener datos", error: error.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: "No encontrado" });
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener dato", error: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: "Error al crear", error: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!item) return res.status(404).json({ message: "No encontrado" });
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: "Error al actualizar", error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: "No encontrado" });
      res.json({ message: "Eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar", error: error.message });
    }
  });

  return router;
}

module.exports = createCrudRoutes;
