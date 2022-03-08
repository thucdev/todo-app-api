/*export */ class Jobs {
   constructor(id, userId, name, description, dateOfCompletion, status, createdAt, updatedAt) {
      this.id = id
      this.userId = userId
      this.name = name
      this.description = description
      this.dateOfCompletion = dateOfCompletion
      this.status = status
      this.createdAt = createdAt
      this.updatedAt = updatedAt
   }
}

module.exports = {
   Jobs: Jobs,
}
