import {
  addCat,
  findCatById,
  listAllCats,
  removeCat,
} from '../models/cat-model.js';

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  const cat = JSON.parse(JSON.stringify(req.body));
  if (!cat.filename) cat.filename = req.file.filename;
  const result = addCat(cat);

  if (result.cat_id) {
    console.log(cat);
    console.log(req.file);
    res.status(201);
    res.json({message: 'Cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  const cat = findCatById(req.params.id);
  Object.assign(cat, req.body);
  res.status(200);
  res.json({message: 'Cat updated.', cat});
};

const deleteCat = (req, res) => {
  if (removeCat(req.params.id)) {
    res.status(200);
    res.json({message: 'Cat deleted.'});
  } else {
    res.status(204);
    res.json({message: `Error no cat found with id`});
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat};
