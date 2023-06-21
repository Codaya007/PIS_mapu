const { uploadImageToS3 } = require("../helpers/s3Helpers");

async function uploadImage(req, res, next) {
  try {
    const file = req.file;

    if (!file) {
      return next({
        status: 400,
        message: "No se ha proporcionado ningún archivo",
      });
    }

    const result = await uploadImageToS3(file);

    return res.json({ imageUrl: result.Location });
  } catch (error) {
    // console.error("Error al subir la imagen:", error);
    next(error);
  }
}

module.exports = {
  uploadImage,
};
