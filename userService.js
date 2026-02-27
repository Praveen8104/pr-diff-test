// userService.js

const users = [];

function addUser(name, age) {
  if (!name) {
    console.log("Name missing");
  }

  const user = {
    id: users.length + 1,
    name: name,
    age: age
  };

  users.push(user);
  return user;
}

function getUser(id) {
  return users.find(u => u.id == id);
}

function deleteUser(id) {
  const index = users.findIndex(u => u.id == id);
  users.splice(index, 1);
}

function updateUser(id, data) {
  const user = users.find(u => u.id == id);
  user.name = data.name;
  user.age = data.age;
  return user;
}

module.exports = {
  addUser,
  getUser,
  deleteUser,
  updateUser
};