import { TestAreaService } from "../services/testAreaService.js";

export const TestAreaController = {
  getAll: async (req, res) => {
    try {
      const areas = await TestAreaService.getAll();
      res.json(areas);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al obtener las áreas" });
    }
  },

  getAreasByTestId: async (req, res) => {
    try {
      const areas = await TestAreaService.getAreasByTestId(req.params.testId);
      res.json(areas);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al obtener las áreas del test" });
    }
  },

  getAreasByAreaId: async (req, res) => {
    try {
      const areas = await TestAreaService.getAreasByAreaId(req.params.areaId);
      res.json(areas);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al obtener las áreas" });
    }
  },
  getAreasByTestIdAndAreaId: async (req, res) => {
    try {
      const areas = await TestAreaService.getAreasByTestIdAndAreaId(
        req.params.testId,
        req.params.areaId
      );
      res.json(areas);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al obtener las áreas del test" });
    }
  },

  updateAreasOfTest: async (req, res) => {
    try {
      const areasUpdated = await TestAreaService.updateAreasOfTest(
        req.params.testId,
        req.body
      );
      res.status(200).json({
        message: "Áreas del test actualizadas correctamente",
        data: areasUpdated,
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  },

  addAreaToTest: async (req, res) => {
    try {
      const newRegister = await TestAreaService.addAreaToTest(
        req.params.testId,
        req.body
      );
      res.status(200).json({
        message: "Área agregada al test correctamente",
        data: newRegister,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al agregar el área al test" });
    }
  },

  updateArea: async (req, res) => {
    try {
      const regisgerUpdated = await TestAreaService.updateArea(
        req.params.id,
        req.body
      );
      res.status(200).json({
        message: "Áreas del test actualizadas correctamente",
        data: regisgerUpdated,
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  },

  deleteArea: async (req, res) => {
    try {
      await TestAreaService.removeAreaFromTest(
        req.params.testId,
        req.params.areaId
      );
      res
        .status(200)
        .json({ message: "Área eliminada del test correctamente" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al eliminar el área del test" });
    }
  },
};
