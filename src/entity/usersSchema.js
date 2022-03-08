import { EntitySchema } from "typeorm"
import { Users } from "../model/Users.js"

module.exports = new EntitySchema({
   name: "Users",
   target: Users,
   columns: {
      id: {
         primary: true,
         type: "int",
         generated: true,
      },
      fullName: {
         type: "varchar",
      },
      username: {
         type: "varchar",
      },
      password: {
         type: "varchar",
      },
   },
   // relations: {
   //    categories: {
   //       target: "Jobs",
   //       type: "one-to-many",
   //       joinTable: true,
   //       cascade: true,
   //    },
   // },
})
