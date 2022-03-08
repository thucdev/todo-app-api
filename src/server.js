import express from "express"
import "reflect-metadata"
import dbConnection from "./configs/connectDB"
import webRoute from "./route"

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

webRoute(app)

//unhandle route
app.all("*", (req, res, next) => {
   return res.status(401).send("The route can not be found")
})

app.listen(process.env.PORT || 8080, async () => {
   console.log(`App listening at http://localhost:8080`)
   await dbConnection()
})
