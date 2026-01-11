import BaseController from "./base.controller.js";
import groupService from "../services/groups.service.js";

class GroupController extends BaseController {
  constructor() {
    super(groupService);
  }
  async syncGroupUsers(req, res, next) {
    const groupId = req.params.id;
    const { userIds } = req.body;
    if (!Array.isArray(userIds)) {
      throw new Error("userIds must be an array");
    }
    const response = await groupService.syncGroupUsers(groupId, userIds);
    if (response instanceof Error) {
      return next(response);
    } else {
      return res.status(200).json({
        message: "Users updated in group successfully",
        data: response,
      });
    }
  }

  async syncGroupTests(req, res, next) {
    const groupId = req.params.id;
    const { tests } = req.body;
    const response = await groupService.syncGroupTests(groupId, tests);
    if (response instanceof Error) {
      return next(response);
    } else {
      return res.status(200).json({
        message: "Tests updated in group successfully",
        data: response,
      });
    }
  }

  async getGroupUsers(req, res, next) {
    const groupId = req.params.id;
    const response = await groupService.getGroupUsers(groupId);
    if (response) {
      return res.status(200).json({
        message: "Users in group",
        data: response,
      });
    } else {
      return next(response);
    }
  }

  async getGroupTests(req, res, next) {
    const groupId = req.params.id;
    const response = await groupService.getGroupTests(groupId);
    if (response) {
      return res.status(200).json({
        message: "Tests in group",
        data: response,
      });
    } else {
      return next(response);
    }
  }

  async getGroupTestConfigs(req, res, next) {
    const groupId = req.params.id;
    const response = await groupService.getGroupTestConfigs(groupId);
    if (response) {
      return res.status(200).json({
        message: "Config Test in group",
        data: response,
      });
    } else {
      return next(response);
    }
  }
}

export default new GroupController();
