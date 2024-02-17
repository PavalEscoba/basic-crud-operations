import { validate } from 'uuid';
import usersDB from '../data/users.js';

export default function getUser(req, res) {
  const parts = req.url.split('/');
  const uid = parts[parts.length - 1];
  const isValidUUID = validate(uid);
  const user = usersDB.find((user) => user.id === uid);
  if (!isValidUUID) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    return res.end("User's id isn't valid. Try to use valid one");
  }

  if (!user) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    return res.end("User doesn't exist. Try to use another ID");
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(user));
}
