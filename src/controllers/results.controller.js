import BaseController from "./base.controller.js";
import resultsService from "../services/results.service.js";

class ResultsController extends BaseController {
  constructor() {
    super(resultsService);
  }

  createFullResult = async (req, res, next) => {
    try {
      const data = await resultsService.createFullResult(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };

  getByFullResultId = async (req, res, next) => {
    try {
      const data = await resultsService.getByFullResultId(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  getAllResults = async (req, res, next) => {
    try {
      const filters = req.query;
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 10;
      if (filters.page) delete filters.page;
      if (filters.pageSize) delete filters.pageSize;

      const data = await resultsService.getAllResults(page, pageSize, filters);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default new ResultsController();
