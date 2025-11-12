import BaseModel from "./base.model.js";

class ComponentResultModel extends BaseModel {
    constructor() {
        super("component_results");
    }
}

export default new ComponentResultModel();