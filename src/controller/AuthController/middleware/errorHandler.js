const errorHandler = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500

   //Duplication
   if (err.code === 11000) {
      err.statusCode = 400
      for (const p in err.keyValue) {
         err.message = `${p} have to be unique`
      }
   }

   //ObjectId not found
   if (err.kind === "ObjectId") {
      err.statusCode = 400
      err.message = `The ${req.originalUrl} is not found because wrong id`
   }

   //validation
   if (err.errors) {
      err.statusCode = 400
      err.message = []
      for (const p in err.errors) {
         err.message.push(err.errors[p].properties.message)
      }
   }

   res.status(err.statusCode).json({
      success: false,
      message: err.message,
   })
}

module.exports = { errorHandler }
