module.exports = class ProductItem {
  constructor(
    id,
    title,
    price,
    picture,
    condition,
    freeShipping,
    soldQuantity,
    description,
    categories
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.picture = picture;
    this.condition = condition;
    this.free_shipping = freeShipping;
    this.sold_quantity = soldQuantity;
    this.description = description;
    this.categories = categories;
  }
};
