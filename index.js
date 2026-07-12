// ==========================
// Import Required Packages
// ==========================

// Import Express framework
import express from "express";

// Import path module to work with file paths
import path from "path";

// Import EJS Layouts package
// It allows us to use a common layout (header, footer, navbar)
// for all EJS pages.
import ejsLayouts from "express-ejs-layouts";

// Import Product Controller
// Controller handles all incoming requests.
import ProductController from "./src/controllers/product.controller.js";

// Import Validation Middleware
// It validates form data before sending it to the controller.
import validationMiddleware from "./src/middleware/products.middleware.js";
import { uploadFile } from "./src/middleware/file-upload.middleware.js";
import UserController from './src/controllers/user.controller.js';
import session from "express-session";
import { auth } from "./src/middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middleware/lastVisit.middleware.js";
import { setTheme } from "./src/middleware/theme.middleware.js";
// ==========================
// Create Express Application
// ==========================

const server = express();

//main.js connected

server.use(express.static("public"));

// ==========================
// Middleware
// ==========================

// Converts form data into JavaScript object.
//
// Example:
//
// Form Data
// name=Book&price=500
//
// becomes
//
// req.body = {
//     name: "Book",
//     price: "500"
// }
server.use(express.urlencoded({ extended: true }));

// ==========================
// View Engine Setup
// ==========================

server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

server.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

server.use(cookieParser());
server.use(setLastVisit);
server.use(setTheme)

// Set EJS as the template engine.
server.set("view engine", "ejs");

// Tell Express where all EJS files are located.
server.set("views", path.join(path.resolve(), "src", "views"));

// ==========================
// Enable Layouts
// ==========================

// All pages will use layout.ejs
server.use(ejsLayouts);

// ==========================
// Create Controller Object
// ==========================

// Create only one object of ProductController
const productController = new ProductController();
const userController = new UserController();
// ==========================
// Routes
// ==========================

/*
-----------------------------------------
GET /
-----------------------------------------

Purpose:
Display all products.

Example:

localhost:3300/

Controller Method:

getProducts()
*/

server.get("/", productController.getProducts);

/*
-----------------------------------------
GET /new
-----------------------------------------

Purpose:
Open Add Product Form.

Example:

localhost:3300/new
*/

server.get("/new", auth,
  productController.getAddProduct);

/*
-----------------------------------------
POST /add-product
-----------------------------------------

Purpose:
Save new product.

Flow

User fills form
↓

Validation Middleware

↓

Controller

↓

Model

↓

Products Page
*/

server.post(
  "/add-product",
  auth,
  uploadFile.single("imageUrl"),
  validationMiddleware,
  productController.postAddProduct,
);
/*
-----------------------------------------
GET /update-product/:id
-----------------------------------------

Purpose:
Open Update Form

Example

/update-product/1

:id means dynamic value.

Example

id = 1
id = 5
id = 100
*/

server.get("/update-product/:id",auth, productController.getUpdateProductView);

/*
-----------------------------------------
POST /update-product
-----------------------------------------

Purpose:
Update Product Information

Flow

User edits product

↓

Validation Middleware

↓

Controller

↓

Model.update()

↓

Products Page
*/

server.post(
  "/update-product", auth,
  validationMiddleware,
  productController.postUpdateProduct,
);

//Deleting Product

server.post("/delete-product/:id",auth, productController.deleteProduct);
// ==========================
// Static Files
// ==========================

// Makes CSS, Images and JS files public.

// server.use(express.static("src/views"));

// ==========================
// Start Server
// ==========================

// Application starts on Port 3300

server.get('/register', userController.getRegister);
server.post("/register", userController.postRegister);
server.get('/login', userController.getLogin)
server.post("/login", userController.postLogin);

server.get('/logout', userController.logout);
//use method is used in session and used for application level middleware

server.get('/',
  setLastVisit,
  auth,
  productController.getProducts
);

server.get("/toggleTheme", userController.toggleTheme);


server.listen(3300, () => {
  console.log("Server is running on Port 3300");
});
