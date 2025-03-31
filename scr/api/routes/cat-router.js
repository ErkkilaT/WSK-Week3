import express from 'express';
import {
  getcat,
  getcatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller';

const catRouter = express.Router();

catRouter.route('/').get(getCat).post(postCat);
catRouter.route('/:id').get(getcatById).put(putCat).delete(deleteCat);

export default catRouter;
