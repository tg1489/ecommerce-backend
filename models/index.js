// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE' // Logic - if Category is deleted, there is no need to keep the products associated with it
  });

Category.hasMany(Product, {foreignKey: 'category_id',});

Product.belongsToMany(Tag, {through: ProductTag, onDelete: 'CASCADE'})// Logic - If product is deleted, it deletes tag associated with it

Tag.belongsToMany(Product, {through: ProductTag, onDelete: 'SET NULL'})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
