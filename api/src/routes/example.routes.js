const { Router } = require("express");

const exampleRouter = Router();

/**
 * @route GET /
 * @desc Ruta de ejemplo, devuelve un json fijos
 * @access Public
 */
exampleRouter.get("/", async (req, res, next) => {
  res.json({ message: "El servidor está funcionando :)" });
});

module.exports = exampleRouter;
