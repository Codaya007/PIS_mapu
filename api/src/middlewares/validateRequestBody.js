const validateRequestBody = (validationSchema) => async (req, res, next) => {
  const options = { abortEarly: false };
  const { value, error, warning } = validationSchema.validate(
    req.body,
    options
  );

  if (error) {
    const errorsMessages = error.details.map((detail) => detail.message);

    const message = `Se han encontrado algunos errores: ${errorsMessages.join(
      ". "
    )}`;

    // Si se hallaron errores, lanzo el error al middleware de manejo de errores
    return next({ ...error, valid: false, message, status: 400 });
  }

  return next();
};

module.exports = validateRequestBody;
