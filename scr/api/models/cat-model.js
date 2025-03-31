const catItems = [
  {
    cat_id: 4,
    cat_name: 'viljo',
  },
  {
    cat_id: 3,
    cat_name: 'matti',
  },
];

const listAllCats = () => {
  return catItems;
};

const findCatById = (id) => {
  return catItems.find((cat) => cat.cat_id == id);
};

const addCat = (cat) => {
  const {cat_name} = cat;
  const newId = catItems[0].cat_id + 1;
  catItems.unshift({cat_id: newId, cat_name});
  return {cat_id: newId};
};

export {listAllCats, findCatById, addCat};
