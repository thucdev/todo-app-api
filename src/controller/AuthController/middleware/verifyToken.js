import jwt from "jsonwebtoken"
require("dotenv").config()

const verifyToken = async (req, res, next) => {
   try {
      const token = req.headers.authorization

      const authHeader = req.header("Authorization")
      console.log("req.header", authHeader)
      if (token) {
         const accessToken = token.split(" ")[1]
         await jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
               return res.json({ success: false, message: "Token is not valid" })
            }
            req.user = user
         })
         next()
      } else {
         return res.json({ success: false, message: "You are not authenticated" })
      }
   } catch (error) {
      console.log("", error)
   }
}

// const verifyToken = (req, res, next) => {
//    const authHeader = req.header("Authorization")
//    const token1 = req.headers.authorization
//    //       console.log("req.headers", req.headers)
//    console.log("req.header", authHeader)
//    console.log("req.header1", token)
//    //work
//    console.log("req.header1", req.headers)
//    const token = authHeader && authHeader.split(" ")[1]

//    if (!token) return res.status(401).json({ success: false, message: "Access token not found" })

//    try {
//       const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

//       req.userId = decoded.userId
//       next()
//    } catch (error) {
//       console.log(error)
//       return res.status(403).json({ success: false, message: "Invalid token" })
//    }
// }

// module.exports = verifyToken
module.exports = verifyToken
