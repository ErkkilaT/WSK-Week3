import express from 'express';

import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatByOwnerId,
} from '../controllers/cat-controller.js';
import {createThumbnail} from '../../middlewares.js';
import {
  authenticateToken,
  validationErrors,
  upload,
} from '../../middlewares.js';
import {body} from 'express-validator';

const catRouter = express.Router();

//const upload = multer({dest: 'uploads/'});

catRouter
  .route('/')
  .get(getCat)
  .post(
    authenticateToken,
    upload.single('file'),
    body('cat_name').trim().isLength({min: 3, max: 50}),
    body('weight').trim().isNumeric(),
    body('owner').trim().isInt(),
    body('birthdate').trim().isDate(),
    validationErrors,
    createThumbnail,
    postCat
  );

catRouter
  .route('/:id')
  .get(getCatById)
  .put(authenticateToken, putCat)
  .delete(authenticateToken, deleteCat);
catRouter.route('/owner/:id').get(getCatByOwnerId);

export default catRouter;
