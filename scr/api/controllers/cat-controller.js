import {
  addCat,
  findCatById,
  findCatByOwnerId,
  listAllCats,
  removeCat,
  modifyCat,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};
const getCatByOwnerId = async (req, res) => {
  const cat = await findCatByOwnerId(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  const cat = JSON.parse(JSON.stringify(req.body));
  if (res.locals.user.user_id == cat.owner || res.locals.user.role == 'admin') {
    if (!cat.filename) cat.filename = req.file.filename;
    const result = await addCat(cat);

    if (result.cat_id) {
      res.status(201);
      res.json({message: 'Cat added.', result});
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(401);
  }
};

const putCat = async (req, res) => {
  console.log(res.locals.user.role);
  if (
    res.locals.user.user_id == (await findCatById(req.params.id)).owner ||
    res.locals.user.role == 'admin'
  ) {
    const result = await modifyCat(req.body, req.params.id);
    if (result.message) {
      res.status(200);
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(401);
  }
};

const deleteCat = async (req, res) => {
  if (
    res.locals.user.user_id == (await findCatById(req.params.id)).owner ||
    res.locals.user.role == 'admin'
  ) {
    const result = await removeCat(req.params.id);
    if (result.message) {
      res.status(200);
      res.json({result});
    } else {
      res.status(204);
      res.json({message: `Error no cat found with id`});
    }
  } else {
    res.sendStatus(401);
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat, getCatByOwnerId};
