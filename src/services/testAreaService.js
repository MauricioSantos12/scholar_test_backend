import { TestAreaModel } from "../models/testArea.model.js";

export const TestAreaService = {
  getAll: () => TestAreaModel.getAll(),

  addAreaToTest: (testId, body) => TestAreaModel.addAreaToTest(testId, body),

  getAreasByTestId: (testId) => TestAreaModel.getAreasByTestId(testId),

  getAreasByAreaId: (areaId) => TestAreaModel.getAreasByAreaId(areaId),

  getAreasByTestIdAndAreaId: (testId, areaId) =>
    TestAreaModel.getAreasByTestIdAndAreaId(testId, areaId),

  updateArea: async (id, body) => {
    return TestAreaModel.updateArea(id, body);
  },

  updateAreasOfTest: async (testId, body) => {
    const areasBody = body.areas;
    const existingAreas = await TestAreaModel.getAreasByTestId(testId);
    const existingAreasIds = existingAreas.map((area) => area.area_id);
    const bodyAreasIds = areasBody.map((area) => area.area_id);
    const areasToDelete = existingAreasIds.filter(
      (areaId) => !bodyAreasIds.includes(areaId)
    );
    const areasToAdd = bodyAreasIds.filter(
      (areaId) => !existingAreasIds.includes(areaId)
    );

    if (areasToDelete.length > 0) {
      for (const areaId of areasToDelete) {
        await TestAreaModel.deleteArea(testId, areaId);
      }
    }
    if (areasToAdd.length > 0) {
      for (const areaId of areasToAdd) {
        await TestAreaModel.addAreaToTest(testId, {
          area_id: areaId,
          weight: 1,
          position: 1,
        });
      }
    }
    return TestAreaModel.getAreasByTestId(testId);
  },

  removeAreaFromTest: (testId, areaId) =>
    TestAreaModel.deleteArea(testId, areaId),
};
