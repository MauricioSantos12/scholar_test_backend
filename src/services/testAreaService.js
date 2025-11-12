import { TestAreaModel } from "../models/testArea.model.js";

export const TestAreaService = {
  addAreaToTest: (testId, body) => TestAreaModel.addAreaToTest(testId, body),

  getAreasByAreaId: (areaId) => TestAreaModel.getAreasByAreaId(areaId),

  getAreasByTestIdAndAreaId: (testId, areaId) =>
    TestAreaModel.getAreasByTestIdAndAreaId(testId, areaId),

  updateArea: async (id, body) => {
    return TestAreaModel.updateArea(id, body);
  },

  removeAreaFromTest: (testId, areaId) =>
    TestAreaModel.deleteArea(testId, areaId),
};
