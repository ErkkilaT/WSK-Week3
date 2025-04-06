import express from 'express';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';
import {authenticateToken, validationErrors} from '../../middlewares.js';
import {body} from 'express-validator';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getUser)
  .post(
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 5}),
    body('name').trim().isLength({min: 3, max: 100}).isAlpha(),
    validationErrors,
    postUser
  );
userRouter
  .route('/:id')
  .get(getUserById)
  .put(
    body('email').optional().trim().isEmail(),
    body('username')
      .optional()
      .trim()
      .isLength({min: 3, max: 20})
      .isAlphanumeric(),
    body('password').optional().trim().isLength({min: 5}),
    body('name').optional().trim().isLength({min: 3, max: 100}).isAlpha(),
    validationErrors,
    authenticateToken,
    putUser
  )
  .delete(authenticateToken, deleteUser);

export default userRouter;
