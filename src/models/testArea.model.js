import knex from "../db/knex.js";

export const TestAreaModel = {
  getAll: async () => {
    const areas = await knex("test_areas").select("*");
    return areas;
  },
  getAreasByTestId: async (testId) => {
    const areas = await knex("test_areas as ta")
      .join("areas as a", "ta.area_id", "=", "a.id")
      .where({ test_id: testId })
      .select("*");
    return areas;
  },

  getAreasByAreaId: async (areaId) => {
    const areas = await knex("test_areas")
      .join("tests", "test_areas.test_id", "=", "tests.id")
      .where({ "test_areas.area_id": areaId })
      .select("*");
    return areas;
  },
  getAreasByTestIdAndAreaId: async (testId, areaId) => {
    return await knex("test_areas")
      .where({ test_id: testId, area_id: areaId })
      .select("*");
  },

  updateArea: async (test_id, body) => {
    const updatedArea = await knex("test_areas")
      .where({ test_id })
      .update(body)
      .returning("*");

    if (!updatedArea) {
      throw new Error("No se encontró el área con el id " + id);
    }

    return updatedArea[0];
  },

  addAreaToTest: async (testId, data) => {
    await knex("test_areas").insert({ test_id: testId, ...data });
    return { test_id: testId, ...data };
  },

  deleteArea: async (testId, areaId) => {
    return knex("test_areas").where({ test_id: testId, area_id: areaId }).del();
  },
};
