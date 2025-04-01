import {
  addUser,
  findUserById,
  listAllUsers,
  removeUser,
} from '../models/user-model.js';

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const item = findUserById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = (req, res) => {
  const item = findUserById(req.params.id);
  Object.assign(item, req.body);
  res.status(200);
  res.json({message: 'User updated.', item});
};

const deleteUser = (req, res) => {
  if (removeUser(req.params.id)) {
    res.status(200);
    res.json({message: 'User deleted.'});
  } else {
    res.status(204);
    res.json({message: `Error no user found with id`});
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
