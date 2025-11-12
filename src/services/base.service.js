// src/services/base.service.js
export default class BaseService {
  constructor(model) {
    this.model = model;
  }

  async getAll(filters) {
    return await this.model.findAll(filters);
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    return await this.model.update(id, data);
  }

  async delete(id) {
    return await this.model.delete(id);
  }
}
