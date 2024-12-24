const db = require("../config/database");

const User = {
  findUser: (email, callback) => {
    db.execute("SELECT * FROM users WHERE email = ?", [email], callback);
  },
  createUser: (email, password, phone_number, name, callback) => {
    db.execute(
      "INSERT INTO users (email, password, phone_number, name) VALUES (?, ?, ?, ?)",
      [email, password, phone_number, name],
      callback
    );
  },
};

module.exports = User;
