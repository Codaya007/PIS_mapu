const { Router } = require("express");
const {
  COLORS_DICTIONARY,
  SPANISH_COLORS_DICTIONARY,
} = require("../constants");
// const middlewares = require("../middlewares");
// const isLoggedIn = require("../policies/isLoggedIn");

const indexRouter = Router();

/**
 * @route GET /
 * @desc Ruta de ejemplo, devuelve un json fijos
 * @access Public
 */
indexRouter.get("/", async (req, res, next) => {
  res.json({ message: "El servidor está funcionando :)" });
});

/**
 * @route GET /
 * @desc Obtener todos las usuarios
 * @access Public
 */

indexRouter.get("/node-type-colors", (req, res) => {
  const results = { ...COLORS_DICTIONARY };

  for (const key in COLORS_DICTIONARY) {
    results[key] =
      SPANISH_COLORS_DICTIONARY[COLORS_DICTIONARY[key]] || "Sin color";
  }

  res.json(results);
});

module.exports = indexRouter;
