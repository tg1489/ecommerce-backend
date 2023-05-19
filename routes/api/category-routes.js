const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Category, Product } = require('../../models');
const { findOne } = require('../../models/Product');

// The `/api/categories` endpoint



router.get('/', async (req, res) => {

  try {
    
    const allCategories = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name'],
        },
      ],
      attributes: ['id', 'category_name'],
    });
  
    res.json(allCategories);
  } 
  
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});

router.get('/:id', async (req, res) => {
  
  try {
    const categoryByID = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product,
          attributes: ['product_name']
        }
      ],
      attributes: ['id', 'category_name']
    })
    res.json(categoryByID)
  }
  
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' })
  }
  
  
});

router.post('/', async (req, res) => {
  
  
  try {

    const newCategory = await Category.create(
      {category_name: req.body.category_name}
     
    )
  
    res.json(newCategory)
    
  }

  catch (err) {
    console.error(err)
    res.status(400).json(err.errors)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [numRowsUpdated] = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: id } }
    );
    
    if (numRowsUpdated === 0) {return res.status(404).json({ error: 'Category not found' });}

    res.json({ message: 'Category updated successfully' });
  } 
  
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (deletedCategory === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(deletedCategory);
  } 
  
  catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});




module.exports = router;
