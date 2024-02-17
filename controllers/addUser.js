import { validateUser } from '../helpers.js';
import usersDB from '../data/users.js';
export default function addUser(req, res) {
  let userObject = '';

  req.on('data', (chunk) => (userObject += chunk));
  req.on('end', () => {
    // if (validateUser(userObject)) {
    res.statusCode = 200;
    res.end('userTemplate', userObject);
    // }
  });
}
