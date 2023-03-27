import { Model } from "objection";
import User from "./User";
const knex = require("../database/db");
Model.knex(knex);

class Task extends Model {
  static get tableName() {
    return "todolist";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "todolist.id",
          to: "todoappusers.id",
        },
      },
    };
  }
}

export default Task;
