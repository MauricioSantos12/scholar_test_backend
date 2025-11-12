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
}

export default new ResultsController();
