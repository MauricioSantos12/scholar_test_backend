import BaseService from "./base.service.js";
import groupModel from "../models/groups.model.js";
import knex from "../db/knex.js";

class GroupService extends BaseService {
  constructor() {
    super(groupModel);
  }
  async syncGroupUsers(groupId, userIds) {
    return knex.transaction(async (trx) => {
      try {
        const existingUsers = await trx("group_users")
          .where("group_id", groupId)
          .select("user_id");

        const existingUserIds = existingUsers.map((u) => u.user_id);

        const usersToAdd = userIds.filter(
          (userId) => !existingUserIds.includes(userId)
        );

        const usersToRemove = existingUserIds.filter(
          (userId) => !userIds.includes(userId)
        );

        if (usersToRemove.length > 0) {
          await trx("group_users")
            .where("group_id", groupId)
            .whereIn("user_id", usersToRemove)
            .del();
        }

        if (usersToAdd.length > 0) {
          const rows = usersToAdd.map((userId) => ({
            group_id: groupId,
            user_id: userId,
          }));

          await trx("group_users").insert(rows);
        }
      } catch (error) {
        throw new Error("Error syncing users in group");
      }
    });
  }

  async syncGroupTests(groupId, tests) {
    return knex.transaction(async (trx) => {
      try {
        // 1. Tests actuales
        const existingTests = await trx("group_tests")
          .where("group_id", groupId)
          .select("test_id");

        const existingTestIds = existingTests.map((t) => t.test_id);
        const incomingTestIds = tests.map((t) => t.id);

        // 2. Tests a eliminar
        const testsToRemove = existingTestIds.filter(
          (id) => !incomingTestIds.includes(id)
        );

        if (testsToRemove.length > 0) {
          await trx("group_tests")
            .where("group_id", groupId)
            .whereIn("test_id", testsToRemove)
            .del();
        }

        // 3. UPSERT de TODOS los tests enviados
        if (tests.length > 0) {
          const rows = tests.map((test) => ({
            group_id: groupId,
            test_id: test.id,
            max_attempts: test.max_attempts ?? 1,
            available_from: test.available_from ?? null,
            available_until: test.available_until ?? null,
            is_active: true,
          }));

          await trx("group_tests")
            .insert(rows)
            .onConflict(["group_id", "test_id"])
            .merge();
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
  }

  async getGroupUsers(groupId) {
    const users = await knex("group_users")
      .join("users", "group_users.user_id", "users.id")
      .where("group_users.group_id", groupId)
      .select("*");

    return users;
  }

  async getGroupTests(groupId) {
    const tests = await knex("group_tests")
      .join("tests", "group_tests.test_id", "tests.id")
      .where("group_tests.group_id", groupId)
      .select("*");

    return tests;
  }

  async getGroupTestConfigs(groupId) {
    const tests = await knex("group_tests")
      .where("group_id", groupId)
      .select("*");

    return tests;
  }
}

export default new GroupService();
