import { getRepository } from "typeorm"
import jobsSchema from "../entity/jobsSchema.js"
import usersSchema from "../entity/usersSchema.js"

let addTodo = async (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (
            !data.name ||
            !data.description ||
            !data.userId ||
            !data.dateOfCompletion ||
            !data.status
         ) {
            resolve({
               success: false,
               message: "Missing input parameter!",
            })
         } else {
            const dbJob = getRepository(jobsSchema)
            await dbJob.insert({
               userId: data.userId,
               name: data.name,
               description: data.description,
               dateOfCompletion: data.dateOfCompletion,
               status: data.status,
            })
            resolve({
               success: true,
               message: "Add todo successfully",
            })
         }
      } catch (error) {
         console.log("er", error)
         reject(error)
      }
   })
}

let updateTodo = async (data, jobId) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (
            !data.name ||
            !data.description ||
            !data.userId ||
            !data.dateOfCompletion ||
            !data.status ||
            !jobId ||
            data.status !== "NEW"
         ) {
            resolve({
               success: false,
               message: "Missing input parameter or todo can't edit!",
            })
         } else {
            const dbJob = getRepository(jobsSchema)

            //check is todo exist
            let isTodoExist = await dbJob.findOne(jobId)
            if (isTodoExist) {
               await dbJob.update(jobId, {
                  name: data.name,
                  description: data.description,
                  userId: data.userId,
                  dateOfCompletion: data.dateOfCompletion,
                  status: data.status,
               })
               resolve({
                  success: true,
                  message: "Update todo successfully",
               })
            } else {
               reject({
                  success: false,
                  message: "Update todo fail!",
               })
            }
         }
      } catch (error) {
         console.log("er", error)
         reject(error)
      }
   })
}

let deleteTodo = async (data, jobId) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!jobId || data.status !== "COMPLETE") {
            resolve({
               success: false,
               message: "Missing input parameter or todo can't delete!",
            })
         } else {
            const dbJob = getRepository(jobsSchema)
            //check is todo exist
            let isTodoExist = await dbJob.findOne(jobId)
            if (isTodoExist) {
               await dbJob.delete(jobId)
               resolve({
                  success: true,
                  message: "Delete todo successfully",
               })
            } else {
               reject({
                  success: false,
                  message: "Delete todo fail!",
               })
            }
         }
      } catch (error) {
         console.log("error", error)
         reject(error)
      }
   })
}

let getAllTodo = async () => {
   return new Promise(async (resolve, reject) => {
      try {
         const dbJob = getRepository(jobsSchema)
         let data = await dbJob.find()
         if (data) {
            resolve({
               success: true,
               message: "Get all todo successfully",
               data,
            })
         } else {
            reject({
               success: false,
               message: "Get all todo fail!",
            })
         }
      } catch (error) {
         console.log("error", error)
         reject(error)
      }
   })
}

let getTodoById = async (jobId) => {
   return new Promise(async (resolve, reject) => {
      try {
         const dbJob = getRepository(jobsSchema)
         let data = await dbJob.find(jobId)
         if (data) {
            resolve({
               success: true,
               message: "Get todo successfully",
               data,
            })
         } else {
            reject({
               success: false,
               message: "Get all todo fail!",
            })
         }
      } catch (error) {
         console.log("error", error)
         reject(error)
      }
   })
}

let getAllUser = async () => {
   return new Promise(async (resolve, reject) => {
      try {
         const dbUser = getRepository(usersSchema)
         let data = await dbUser.find()
         if (data) {
            resolve({
               success: true,
               message: "Get all user successfully",
               data,
            })
         } else {
            reject({
               success: false,
               message: "Get all user fail!",
            })
         }
      } catch (error) {
         console.log("error", error)
         reject(error)
      }
   })
}

let assignTodo = async (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data.userId || !data.jobId || !data.userAssignedId) {
            resolve({
               success: false,
               message: "Missing input parameter",
            })
         } else {
            const dbJob = getRepository(jobsSchema)

            //check is todo exist
            let todo = await dbJob.findOne(data.jobId)

            if (!todo || todo.userId === data.userId) {
               reject({
                  success: false,
                  message: "Can't assign todo to same user",
               })
            } else {
               await dbJob.update(data.jobId, {
                  name: data.name,
                  description: data.description,
                  userId: data.userId,
                  dateOfCompletion: data.dateOfCompletion,
                  status: data.status,
               })
               resolve({
                  success: true,
                  message: "Assign todo to another user successfully",
               })
            }
         }
      } catch (error) {
         console.log("er", error)
         reject(error)
      }
   })
}

let getAllTaskByUser = async (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data) {
            resolve({
               success: false,
               message: "Missing input parameter",
            })
         } else {
            const dbUser = getRepository(jobsSchema)
            let res = await dbUser.find({
               where: {
                  userId: data.id,
               },
            })
            if (res) {
               resolve({
                  success: true,
                  message: "Get todo by user successfully",
                  data,
               })
            } else {
               reject({
                  success: false,
                  message: "Get all todo by user fail!",
               })
            }
         }
      } catch (error) {
         console.log("error", error)
         reject(error)
      }
   })
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
