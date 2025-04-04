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
  if (!cat.filename) cat.filename = req.file.filename;
  const result = await addCat(cat);

  if (result.cat_id) {
    res.status(201);
    res.json({message: 'Cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const result = await modifyCat(req.body, req.params.id);
  if (result.message) {
    res.status(200);
    res.json(result);
  } else {
    res.sendStatus(404);
  }
};

const deleteCat = async (req, res) => {
  const result = await removeCat(req.params.id);
  if (result.message) {
    res.status(200);
    res.json({result});
  } else {
    res.status(204);
    res.json({message: `Error no cat found with id`});
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat, getCatByOwnerId};
