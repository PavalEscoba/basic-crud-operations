import { v4 as uuidv4 } from 'uuid';
import usersDB from './data/users.js';

export function validateUser(rawUser) {
  const user = JSON.parse(rawUser);
  const username = user.username;
  const age = user.age;
  const hobbies = user.hobbies;

  const conditions = {
    isUserTypeValid:
      typeof username !== 'string' ||
      typeof age !== 'number' ||
      !Array.isArray(hobbies),
    isHobbiesValid: Array.isArray(hobbies) && hobbies.length,
  };

  if (conditions.isUserTypeValid) {
    return false;
  }
  if (conditions.isHobbiesValid) {
    return hobbies.every((hobby) => typeof hobby === 'string');
  }

  return true;
}

export function addUserToDB(rawUser) {
  const user = JSON.parse(rawUser);
  const userId = uuidv4();
  const userToAdd = {
    id: userId,
    username: user.name,
    age: user.age,
    hobbies: user.hobbies,
  };

  usersDB.push(userToAdd);
  return userToAdd;
}

export function updateUserToDB(rawUser, idx) {
  const user = JSON.parse(rawUser);
  const userToUpdate = usersDB[idx];
  const updatedUser = {
    id: user.id,
    username: user.username ?? userToUpdate.username,
    age: user.age ?? userToUpdate.age,
    hobbies: user.hobbies ?? userToUpdate.hobbies,
  };

  usersDB[userToUpdate] = updatedUser;
  return updatedUser;
}
