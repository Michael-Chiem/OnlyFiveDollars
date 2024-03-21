const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll().then(dbCategoryData => res.json(dbCategoryData));
});

router.get('/:id', async (req, res) => {
  const pk = req.params.id;
  const data = await Category.findByPk(pk, 
    {
      include:[{model: Product}]
    }
  );


  res.json(data);
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  const data = await Category.create(req.body);
  res.json(data);
  // create a new category
});

router.put('/:id', async (req, res) => {
  const data = await Category.update(req.body, {where: {id: req.params.id}});
  res.json(data);
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
 await Category.destroy({
    where: {
      id: req.params.id,}
  // delete a category by its `id` value
});

res.json('successfully deleted')
})

module.exports = router;
