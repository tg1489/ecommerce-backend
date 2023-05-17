const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { findAll } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  
  try {
    const allTags = await Tag.findAll({
      include: [
        { model: Product },
        { model: ProductTag}
      ],
      attributes: ['id', 'tag_name', 'product_tag_id']
    })
    res.json(allTags)
  }
  catch (err) {
    res.status(404).json(err)
  }
  
});

router.get('/:id', async (req, res) => {

  try {
    const tagInfo = await Tag.findOne({
      include: [
        { model: Product },
        { model: ProductTag }
      ],
      where: {
        id: req.params.id
      },
      attributes: ['id', 'tag_name']
    })

    if (!tagInfo) {return res.status(404).json({ error: 'Tag not found.' });}
    res.json(tagInfo)
  }
  catch (err) {
    res.status(404).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.json(newTag)
  }
  catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update the tag's name
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Find all associated tags from ProductTag
    const associatedProductTags = await ProductTag.findAll({
      where: {
        product_id: req.params.id,
      },
    });

    // Get list of current tag_ids
    const currentTagIds = associatedProductTags.map(({ tag_id }) => tag_id);

    // Create filtered list of new tag_ids
    const newProductTags = req.body.product_tag_id
      .filter((tag_id) => !currentTagIds.includes(tag_id))
      .map((tag_id) => ({
        product_id: req.params.id,
        tag_id,
      }));

    // Figure out which ones to remove
    const productTagsToRemove = associatedProductTags
      .filter(({ tag_id }) => !req.body.product_tag_id.includes(tag_id))
      .map(({ id }) => id);

    // Run both actions
    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

    res.json(updatedTag);
  } 
  
  catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});





router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (deletedTag === 0) {res.status(404).json({error: 'Tag doesn\'t exist.'})}
  }
  catch (err) {
    res.json(err)
  }
});

module.exports = router;
