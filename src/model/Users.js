/*export */ class Users {
   constructor(id, fullName, username, password) {
      this.id = id
      this.fullName = fullName
      this.username = username
      this.password = password
   }
}

module.exports = {
   Users: Users,
}
