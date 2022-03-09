import userService from "../../service/userService"

let addTodo = async (req, res) => {
   try {
      let data = await userService.addTodo(req.body)
      return res.status(200).json(data)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to create new todo",
      })
   }
}

let updateTodo = async (req, res) => {
   try {
      let id = req.params
      let data = await userService.updateTodo(req.body, id)
      return res.status(200).json(data)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to  update todo",
      })
   }
}

let deleteTodo = async (req, res) => {
   try {
      let id = req.params
      let data = await userService.deleteTodo(req.body, id)
      return res.status(200).json(data)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to delete todo",
      })
   }
}

let getAllTodo = async (req, res) => {
   try {
      let data = await userService.getAllTodo()
      return res.status(200).json(data)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to get all todos",
      })
   }
}

let getTodoById = async (req, res) => {
   try {
      let id = req.params
      let data = await userService.getTodoById(id)
      return res.status(200).json(data)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to get todo",
      })
   }
}

let getAllUser = async (req, res) => {
   try {
      let data = await userService.getAllUser()
      return res.status(200).json(data)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to get all users",
      })
   }
}

let assignTodo = async (req, res) => {
   try {
      let data = await userService.assignTodo(req.body)
      return res.status(200).json(data)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to assign todo",
      })
   }
}

let getAllTaskByUser = async (req, res) => {
   try {
      let id = req.params
      let data = await userService.getAllTaskByUser(id)
      return res.status(200).json(data)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to get all task for user ",
      })
   }
}
module.exports = {
   addTodo,
   updateTodo,
   deleteTodo,
   getAllTodo,
   getTodoById,
   getAllUser,
   assignTodo,
   getAllTaskByUser,
}
