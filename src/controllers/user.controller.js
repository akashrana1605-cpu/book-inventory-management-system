import UserModel from "../models/user.model.js";
import ProductModel from "../models/products.model.js";


export default class UserController {
  getRegister(req, res) {
    res.render("register");
  }

  getLogin(req, res) {
    res.render("login", {
      errorMessage: null,
    });
  }

  postRegister(req, res) {
    const { name, email, password } = req.body;

    UserModel.add(name, email, password);

    res.redirect("/login");
  }

  postLogin(req, res) {
    const { email, password } = req.body;

    const user = UserModel.isValidUser(email, password);

    if (!user) {
      return res.render("login", {
        errorMessage: "Invalid Credentials",
      });
    }

    req.session.userEmail = email;

    const products = ProductModel.get();

    res.render("products", {
      products,
      userEmail: req.session.userEmail,
    });
  }

  logout(req, res) {
    // on logout, destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/login");
        res.clearCookie("lastVist"); // deleting a cookie
      }
    });
  }

  toggleTheme(req, res) {
    const currentTheme = req.cookies.theme || "light";

    const newTheme = currentTheme === "light" ? "dark" : "light";

    res.cookie("theme", newTheme, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect("/");
  }
}
