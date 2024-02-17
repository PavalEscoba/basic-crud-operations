# basic-crud-operations

- Please go to [github repo](https://github.com/PavalEscoba/basic-crud-operations) and clone it.
```bash
git clone https://github.com/PavalEscoba/basic-crud-operations.git
```
- After you clone it please:
  - go to a cloned repo
  - switch to *develompent* branch
  - install all dependencies 

```
cd basic-crud-operations 
```
``` 
git checkout development
```
```
npm i
```
- After all dependencies are intalled you can start project with following command:
```
start:dev
``` 
#### PLEASE update  index.js in the following way: 

- On the line 116 in `index.js` remove this code - `with ${id}` - Otherwise application will crush on start.  

- On the line 119 uncomment `notFound()` function.
#### I hope for your kind understanding. (Досадная опечатка :tired_face:)

- Then you can check the functionality using **Postman** or any other Rest API Client (for example **Thunder Client** extension for VS Code)

- I provided test data in `data/users.js`. You can check the task using it. 

For example:  
- `GET` http://localhost:4000/api/users  
Will return the list of existing users   

- `GET` http://localhost:4000/api/users/{id}
Will return a user if it exist in a DB.
For example:
 
```
GET http://localhost:4000/api/users/40bdb15b-79e4-4e04-8356-d485bfc549bf 
```
Must return:
```
{
  "id": "40bdb15b-79e4-4e04-8356-d485bfc549bf",
  "username": "Bob",
  "age": 47,
  "hobbies": [
    "football",
    "calligraphy"
  ]
}
```

- `POST` http://localhost:4000/api/users  
With a JSON provided in a body of request will add a user to a DB and return new user object.
For example:
```
POST http://localhost:4000/api/users  
``` 
With this user object:
```
{
  "username": "Pam Beesly",
  "age": 26,
  "hobbies": [
    "Painting",
    "TV Shows",
    "The Office"
  ]
}
```
Must update db (make sure with `GET` query) and must return the same object.

- `DELETE` http://localhost:4000/api/users/{id}
Will delete a user if the `id` if valid;
For example:
```
`DELETE` http://localhost:4000/api/users/1395e6cd-463a-4415-a315-b56ec1d74117
``` 
Must delete a user. You can check it with `GET` query.

Other functionality is not implemented.
