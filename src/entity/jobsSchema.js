import { EntitySchema } from "typeorm"
import { Jobs } from "../model/Jobs.js"

module.exports = new EntitySchema({
   name: "Jobs",
   target: Jobs,
   columns: {
      id: {
         primary: true,
         type: "int",
         generated: true,
      },
      userId: {
         type: "int",
      },
      name: {
         type: "varchar",
      },
      description: {
         type: "text",
      },
      dateOfCompletion: {
         type: "varchar",
      },
      status: {
         type: "varchar",
      },
      createdAt: {
         type: "timestamp",
         default: () => "CURRENT_TIMESTAMP",
      },
      updatedAt: {
         type: "timestamp",
         default: () => "CURRENT_TIMESTAMP",
      },
   },
   relations: {
      // jobs: {
      //    target: "Users",
      //    type: "many-to-one",
      //    joinTable: true,
      //    cascade: true,
      // },
      // status: {
      //    target: "Status",
      //    type: "one-to-many",
      //    joinTable: true,
      //    cascade: true,
      // },
   },
})
