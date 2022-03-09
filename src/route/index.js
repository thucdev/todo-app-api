import express from "express"
import Authentication from "../controller/AuthController/authentication"
import verifyToken from "../controller/AuthController/middleware/verifyToken"
import UserController from "../controller/UserController/UserController"
let router = express.Router()

const webRoute = (app) => {
   router.post("/sign-up", Authentication.register)
   router.post("/sign-in", Authentication.login)
   router.post("/refresh", Authentication.requestRefreshToken)

   router.post("/add-todo", verifyToken, UserController.addTodo)
   router.put("/update-todo/:id", verifyToken, UserController.updateTodo)
   router.delete("/delete-todo/:id", verifyToken, UserController.deleteTodo)
   router.get("/get-all-todo", verifyToken, UserController.getAllTodo)
   router.get("/get-todo-by-id/:id", verifyToken, UserController.getTodoById)
   router.get("/get-all-user", verifyToken, UserController.getAllUser)
   router.post("/assign-todo", verifyToken, UserController.assignTodo)
   router.get("/get-all-task-by-user/:id", verifyToken, UserController.getAllTaskByUser)

   return app.use("/", router)
}

module.exports = webRoute
