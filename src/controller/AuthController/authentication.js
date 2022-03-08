import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { getRepository } from "typeorm"
import usersSchema from "../../entity/usersSchema.js"
// import db from "../../models/index"
require("dotenv").config()

let refreshTokens = [] // binh thuong se luu vao redis cho khoi bi trung lap

// const checkUserIsLogin = async (req, res, next) => {
//    try {
//       const user = await db.User.findOne({ where: { id: req.user.id } })
//       if (!user) {
//          return res.status(200).json({ success: false, message: "User not found" })
//       }

//       return res.json({ success: true, user })
//    } catch (error) {
//       console.log("e", error)
//       return res.status(500).json({ success: false, message: "Internal error server" })
//    }
// }

const register = async (req, res) => {
   const { username, password, fullName } = req.body
   if (!username || !password || !fullName) {
      return res.status(400).send({ success: false, message: "Missing username or password" })
   }

   try {
      const dbUser = getRepository(usersSchema)
      //check existing user
      let user = await dbUser.findOne({
         where: { username },
      })
      if (user) {
         return res.status(400).send({ success: false, message: "User is already exist." })
      }

      const salt = bcrypt.genSaltSync(10)
      const hashPW = bcrypt.hashSync(req.body.password, salt)

      await dbUser.insert({
         fullName: req.body.fullName,
         username: req.body.username,
         password: hashPW,
      })
      return res.status(200).json({
         success: true,
         message: "Create user successfully",
      })
   } catch (error) {
      console.log(error)
      return res.status(500).json({
         success: false,
         message: "Error from server create new user",
      })
   }
}

// create access token
const generateAccessToken = (data) => {
   const accessToken = jwt.sign(
      {
         id: data.id,
         roleId: data.roleId,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "10m" }
   )
   return accessToken
}

const generateRefreshToken = (data) => {
   const refreshToken = jwt.sign(
      {
         id: data.id,
         roleId: data.roleId,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "30d" }
   )
   return refreshToken
}

const login = async (req, res) => {
   const { username, password } = req.body
   if (!username || !password)
      return res.status(400).json({ success: false, message: "Missing username or password" })
   try {
      const dbUser = getRepository(usersSchema)
      let user = await dbUser.findOne({
         where: { username },
      })
      if (!user)
         return res.status(200).json({ success: false, message: "Wrong username or password!" })

      const validPassword = await bcrypt.compare(req.body.password, user.password)
      if (!validPassword)
         return res.status(200).json({ success: false, message: "Wrong username or password!" })

      if (user && validPassword) {
         const accessToken = generateAccessToken(user)
         const refreshToken = generateRefreshToken(user)
         refreshTokens.push(refreshToken)
         delete user.password
         return res.status(200).json({
            accessToken,
            refreshToken,
            success: true,
            userId: user.id,
            roleId: user.roleId,
         })
      }
   } catch (error) {
      console.log("err", error)
   }
}

const requestRefreshToken = (req, res) => {
   const refreshToken = req.body.refreshToken
   if (!refreshToken) {
      return res.status(401).json({ success: false, message: "You are not authenticated!" })
   }
   if (!refreshToken.includes(refreshTokens)) {
      return res.status(200).json({ success: false, message: "Token is not invalid" })
   }

   jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
         console.log("err", err)
         return res.status(200).json({ success: false, message: "Token is not invalid" })
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken)

      const newAccessToken = generateAccessToken(user)
      const newRefreshToken = generateRefreshToken(user)
      refreshTokens.push(newRefreshToken)

      return res.status(200).json({ success: true, newAccessToken, newRefreshToken })
   })
}

const logout = (req, res) => {
   // res.clearCookie("refreshToken")
   refreshTokens = refreshTokens.filter((token) => token !== req.body.refreshToken)
   return res.status(200).json({ success: true, message: "Logout successfully" })
}

module.exports = {
   register,
   login,
   logout,
   requestRefreshToken,
}
