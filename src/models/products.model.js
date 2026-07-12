export default class ProductModel {
  constructor(id, name, desc, price, imageUrl, stock, status) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.stock = stock;
    this.status = status;
  }

  static get() {
    return products;
  }

  static add(productObj) {
    const newProduct = new ProductModel(
      productObj.id,
      productObj.name,
      productObj.desc,
      productObj.price,
      productObj.imageUrl,
      productObj.stock,
      productObj.status,
    );

    products.push(newProduct);
  }

  static getById(id) {
    return products.find((product) => product.id == id);
  }

  static update(productObj) {
    const index = products.findIndex((product) => product.id == productObj.id);

    if (index != -1) {
      products[index] = new ProductModel(
        productObj.id,
        productObj.name,
        productObj.desc,
        productObj.price,
        productObj.imageUrl,
        productObj.stock,
        productObj.status,
      );
    }
  }

  static delete(id) {
    const index = products.findIndex(p => p.id == id);
    products.splice(index, 1);
    
  }
}

const products = [
  new ProductModel(
    1,
    "Atomic Habits",
    "James Clear",
    "Self Improvement",
    "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg",
    12,
    "Available",
  ),

  new ProductModel(
    2,
    "The Psychology of Money",
    "Morgan Housel",
    "Finance",
    "https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg",
    8,
    "Available",
  ),

  new ProductModel(
    3,
    "Clean Code",
    "Robert C. Martin",
    "Programming",
    "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL.jpg",
    5,
    "Low Stock",
  ),
];
