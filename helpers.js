import { v4 as uuidv4 } from 'uuid';
import usersDB from './data/users.js';

export function validateUser(rawUser) {
  const user = JSON.parse(rawUser);
  const name = user.name;
  const age = user.age;
  const hobbies = user.hobbies;

  const conditions = {
    isUserTypeValid:
      typeof name !== 'string' ||
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
    name: user.name,
    age: user.age,
    hobbies: user.hobbies,
  };

  usersDB.push(userToAdd);
  return userToAdd;
}
