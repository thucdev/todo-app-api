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
})
