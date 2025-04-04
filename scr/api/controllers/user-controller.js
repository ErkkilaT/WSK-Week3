import {
  addUser,
  findUserById,
  listAllUsers,
  removeUser,
  modifyUser,
} from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const item = await findUserById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  if (
    res.locals.user.user_id == req.params.id ||
    res.locals.user.role == 'admin'
  ) {
    const result = await modifyUser(req.body, req.params.id);
    if (result.message) {
      res.status(200);
      res.json(result);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(401);
  }
};

const deleteUser = async (req, res) => {
  console.log(res.locals.user.user_id, ' ', req.params.id);
  if (
    res.locals.user.user_id == req.params.id ||
    res.locals.user.role == 'admin'
  ) {
    if (await removeUser(req.params.id)) {
      res.status(200);
      res.json({message: 'User deleted.'});
    } else {
      res.status(204);
      res.json({message: `Error no user found with id`});
    }
  } else {
    res.sendStatus(401);
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
