// src/controllers/base.controller.js
export default class BaseController {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const filters = req.query;
      const data = await this.service.getAll(filters);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const data = await this.service.getById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.service.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const registerSaved = await this.service.getById(req.params.id);
      if (!registerSaved) {
        return res.status(404).json({ message: "Registro no encontrado" });
      }
      const data = await this.service.update(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const registerSaved = await this.service.getById(req.params.id);
      if (!registerSaved) {
        return res.status(404).json({ message: "Registro no encontrado" });
      }
      await this.service.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
}
