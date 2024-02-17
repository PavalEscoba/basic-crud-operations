import usersDB from '../data/users.js';

export default function getUsers(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(usersDB));
}
