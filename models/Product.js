module.exports = class Product {
  constructor(
    author,
    item,
    title,
    price,
    picture,
    condition,
    freeShipping,
    soldQuantity,
    description
  ) {
    this.author = author;
    this.item = item;
    this.title = title;
    this.price = price;
    this.picture = picture;
    this.condition = condition;
    this.free_shipping = freeShipping;
    this.sold_quantity = soldQuantity;
    this.description = description;
  }
};
