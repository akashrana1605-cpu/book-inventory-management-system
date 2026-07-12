import ProductModel from "../models/products.model.js";
import  session  from 'express-session';

export default class ProductController {
  getProducts(req, res) {
    const products = ProductModel.get();
    res.render("products", { products });
  }

  getAddProduct(req, res) {
    res.render("new-product", {
      errorMessage: null,
      formData: {},
      userEmail: req.session.userEmail,
    });
  }

  postAddProduct(req, res) {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    if (!req.file) {
      return res.status(400).send("No image uploaded.");
    }

    req.body.imageUrl = "/images/" + req.file.filename;

    ProductModel.add(req.body);

    res.redirect("/");
  }

  getUpdateProductView(req, res) {
    const id = req.params.id;

    const product = ProductModel.getById(id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("update-product", {
      product,
      errorMessage: null,
    });
  }

  postUpdateProduct(req, res) {
    ProductModel.update(req.body);

    res.redirect("/");
  }

  deleteProduct(req, res) {
    const id = req.params.id;
    const product = ProductModel.getById(id);

    if (!product) {
      return res.status(404).send("Product not found");
    }
    ProductModel.delete(id);
    res.redirect("/");
  }
}
