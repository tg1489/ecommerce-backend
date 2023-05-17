const router = require('express').Router();
const { json } = require('sequelize');
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {

  try {
    const allProducts = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag}
      ],
      attributes: ['product_name']
    })
    res.json(allProducts)
  }

  catch (err) {
    res.status(404).json(err)
  }
});

// get one product
router.get('/:id', async (req, res) => {

  try {
    const productName = await Product.findOne({
      include: [
        { model: Category },
        { model: Tag }
      ],
      where: {
        id: req.params.id
      }
  
    })
    res.json(productName)
  }
  catch (err) {
    res.status(404).json(err)
  }
});


// Create new product
router.post('/', async (req, res) => {
  try {
    // Create the product
    const newProduct = await Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      product_tag_id: req.body.product_tag_id 
    });

    // Check if there are any product tags to associate
    if (req.body.product_tag_id.length) {
      // Create an array of productTag objects for bulk creation
      const productTagArr = req.body.product_tag_id.map((tagId) => {
        return {
          product_id: newProduct.id,
          tag_id: tagId,
        };
      });

      // Bulk create the product tags
      await ProductTag.bulkCreate(productTagArr);
    }

    res.status(200).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});


// update product
router.put('/:id', async (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.product_tag_id
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.product_tag_id.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id
      }
    })

    if (deletedProduct === 0) {return res.status(404).json({error: 'Product not found.'})}
  }
  catch (err) {
    res.status(404).json(err)
  }
});

module.exports = router;
