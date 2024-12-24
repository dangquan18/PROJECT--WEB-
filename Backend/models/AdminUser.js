const db = require("../config/database");
const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users", (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
};

const createUser = (name, email, password, role, phone_number) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (name, email, password, role, phone_number) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, role, phone_number],
      (err) => {
        if (err) {
          console.error("Error during query:", err);
          return reject(err);
        }
        resolve(); // Thành công, không cần trả về gì thêm
      }
    );
  });
};

const updateUser = (id, name, email, password, role, phone_number) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET name = ?, email = ?, password = ?, role = ?, phone_number = ? WHERE id = ?",
      [name, email, password, role, phone_number, id],
      (err, results) => {
        if (err) reject(err);
        resolve(results.affectedRows);
      }
    );
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
      if (err) reject(err);
      resolve(results.affectedRows);
    });
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
