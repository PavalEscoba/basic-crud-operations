import http from 'http';
import 'dotenv/config';
import { validate, v4 as uuidv4 } from 'uuid';
import usersDB from './data/users.js';

import { validateUser, addUserToDB } from './helpers.js';

import getUsers from './controllers/getUsers.js';
import getUser from './controllers/getUser.js';
// import addUser from './controllers/addUser.js';
import notFound from './controllers/notFound.js';

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  req.on('error', (error) => {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('Something went wrong. Server-side error');
  });

  if (req.url === '/api/users' && req.method === 'GET') {
    return getUsers(req, res);
  }

  if (req.url.startsWith('/api/users') && req.method === 'GET') {
    return getUser(req, res);
  }

  if (req.url === '/api/users' && req.method === 'POST') {
    let userObject = '';
    res.setHeader('Content-Type', 'application/json');

    req.on('data', (chunk) => (userObject += chunk));
    req.on('end', () => {
      if (!validateUser(userObject)) {
        res.statusCode = 400;
        return res.end(
          JSON.stringify({ message: 'Invalid fields for user description' })
        );
      } else {
        addUserToDB(userObject);
        res.statusCode = 200;
        res.end(userObject);
      }
    });
  }

  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    return res.end(`<h1>Server is up and running on: ${PORT} with ${id}</h1>`);
  }

  if (req.url.startsWith('/api/users') && req.method === 'DELETE') {
    const parts = req.url.split('/');
    const uid = parts[parts.length - 1];
    const isValidUUID = validate(uid);
    const user = usersDB.find((user) => user.id === uid);

    console.log('user', user);
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
    const indexToDelete = usersDB.findIndex((user) => user.id === uid);
    if (indexToDelete !== -1) {
      usersDB.splice(indexToDelete, 1);
    }
  }

  if (req.url.startsWith('/api/users') && req.method === 'PUT') {
    const parts = req.url.split('/');
    const uid = parts[parts.length - 1];
    const isValidUUID = validate(uid);
    const user = usersDB.find((user) => user.id === uid);

    console.log('user', user);
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
    const indexToDelete = usersDB.findIndex((user) => user.id === uid);
    if (indexToDelete !== -1) {
      usersDB.splice(indexToDelete, 1);
    }
  }

  notFound(req, res);
});

server.listen(PORT, () => {
  console.log('Server is up and running on: ', PORT);
});
