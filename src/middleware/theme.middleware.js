export const setTheme = (req, res, next) => {
  res.locals.theme = req.cookies.theme || "light";

  next();
};
