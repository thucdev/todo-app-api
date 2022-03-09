import { createConnection } from "typeorm"

const dbConnection = async () => {
   await createConnection({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: null,
      database: "todo_app_api",
      entities: [require("../entity/usersSchema.js"), require("../entity/jobsSchema.js")],
      synchronize: true,
      logging: false,
      timezone: "+07:00",
      migrations: ["src/migration/*{.ts,.js}"],
      cli: {
         migrationsDir: "src/migration",
      },
   })
      .then(function data(connection) {
         console.log("Connect DB successfully!")
      })
      .catch(function (error) {
         console.log("Error: ", error)
      })
}
export default dbConnection
