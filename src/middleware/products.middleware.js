import { body, validationResult } from "express-validator";

const validationMiddleware = async (req, res, next) => {
  const rules = [
    body("id")
      .notEmpty()
      .withMessage("Book ID is required.")
      .isInt({ min: 1 })
      .withMessage("Book ID must be positive."),

    body("name").notEmpty().withMessage("Book Name is required."),

    body("desc").notEmpty().withMessage("Author is required."),

    body("price").notEmpty().withMessage("Category is required."),

    body("stock").isInt({ min: 0 }).withMessage("Stock cannot be negative."),

    // body("imageUrl").isURL().withMessage("Please enter a valid Image URL."),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    if (req.originalUrl === "add-product") {
      return res.render("new-product", {
        errorMessage: errors.array()[0].msg,
        formData: req.body,
      });
    }

    if (!req.file) {
      return res.render("new-product", {
        errorMessage: "Please upload a book image.",
        formData: req.body,
      });
    }

    return res.render("update-product", {
      errorMessage: errors.array()[0].msg,
      product: req.body,
    });
  }

  next();
};

export default validationMiddleware;
