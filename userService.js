// userService.js

const users = [];
let nextId = 1;

/**
 * Validate user input
 */
function validateUserInput({ name, age }) {
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    throw new Error("Name must be a non-empty string.");
  }

  if (typeof age !== "number" || age <= 0) {
    throw new Error("Age must be a positive number.");
  }
}

/**
 * Add a new user
 */
function addUser(name, age) {
  validateUserInput({ name, age });

  const user = {
    id: nextId++,
    name: name.trim(),
    age,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  };

  users.push(user);
  return user;
}

/**
 * Get user by ID
 */
function getUser(id) {
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    throw new Error("Invalid user ID.");
  }

  const user = users.find((u) => u.id === numericId);

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
}

/**
 * Delete (soft delete) user
 */
function deleteUser(id) {
  const user = getUser(id);

  user.isActive = false;
  user.updatedAt = new Date();

  return { message: "User deactivated successfully." };
}

/**
 * Update user (partial update supported)
 */
function updateUser(id, data) {
  const user = getUser(id);

  if (data.name !== undefined) {
    if (typeof data.name !== "string" || data.name.trim().length === 0) {
      throw new Error("Invalid name.");
    }
    user.name = data.name.trim();
  }

  if (data.age !== undefined) {
    if (typeof data.age !== "number" || data.age <= 0) {
      throw new Error("Invalid age.");
    }
    user.age = data.age;
  }

  user.updatedAt = new Date();

  return user;
}

/**
 * Get all active users
 */
function getAllUsers() {
  return users.filter((u) => u.isActive);
}

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers
};