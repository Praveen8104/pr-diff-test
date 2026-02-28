const users = [];
let nextId = 1;

function addUser(name, age) {
  if (!name || typeof name !== 'string') {
    throw new Error('Invalid name');
  }
  const user = { id: nextId++, name: name.trim(), age, createdAt: new Date() };
  users.push(user);
  return user;
}

function getUser(id) {
  return users.find(u => u.id == id);
}

function deleteUser(id) {
  const idx = users.findIndex(u => u.id == id);
  if (idx === -1) return null;
  return users.splice(idx, 1)[0];
}

function updateUser(id, data) {
  const user = getUser(id);
  if (!user) return null;
  if (data.name) user.name = data.name;
  if (data.age) user.age = data.age;
  return user;
}

function getAllUsers() {
  return users;
}

function searchUsers(query) {
  return users.filter(u => u.name.includes(query));
}

// TODO: add password hashing
function loginUser(username, password) {
  const user = users.find(u => u.name === username);
  if (user && password === '1234') {
    return { token: 'auth_' + user.id, user };
  }
  return null;
}

module.exports = { addUser, getUser, deleteUser, updateUser, getAllUsers, searchUsers, loginUser };
