import { Model } from "objection";
import Task from "./Task";
const knex = require("../database/db");
Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "todoappusers";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "password"],

      properties: {
        id: { type: "integer" },
        uuid: { type: "string" },
        username: { type: "string" },
        password: { type: "string" },
      },
    };
  }

  $formatJson(json) {
    // remove o campo "password" do objeto JSON
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }

  static get relationMappings() {
    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: "todoappusers.id",
          to: "todolist.todoappusers_id",
        },
      },
    };
  }
}

export default User;
