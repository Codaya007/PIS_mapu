const { OBJECT_ID_REGEX } = require("../constants");
const readExcelFile = require("./readExcelFile");
const generateExcel = require("./generateExcelFile");
const { campusIsValid } = require("../validationSchemas/RouteNode");
const Campus = require("../models/Campus");

// Función para validar un archivo Excel y generar el archivo con errores
async function validateAccessNodesExcelFile(file) {
  try {
    const jsonData = readExcelFile(file);

    const headers = [
      "CAMPUS",
      "LATITUD",
      "LONGITUD",
      "TITULO",
      "DESCRIPCION",
      "IMAGEN",
    ];
    const errors = [];
    let isValid = true;

    for (const row of jsonData) {
      const errorRow = { ...row, ERRORES: [] };

      // Validar headers
      const headerKeys = Object.keys(row);
      const missingHeaders = headers.filter(
        (header) => !headerKeys.includes(header)
      );
      if (missingHeaders.length > 0) {
        errorRow.ERRORES.push(
          `Faltan los siguientes encabezados: ${missingHeaders.join(", ")}`
        );
      }

      if (!row.CAMPUS || !OBJECT_ID_REGEX.test(row.CAMPUS)) {
        console.log(row.CAMPUS);
        errorRow.ERRORES.push(
          "El campo CAMPUS debe ser un ObjectId válido y requerido."
        );
      } else {
        const campusValid = await campusIsValid(row.CAMPUS);

        if (!campusValid) errorRow.ERRORES.push("El CAMPUS indicado no existe");
      }

      // Validar LATITUD y LONGITUD como números dentro del rango permitido
      if (
        typeof row.LATITUD !== "number" ||
        row.LATITUD < -90 ||
        row.LATITUD > 90
      ) {
        errorRow.ERRORES.push(
          "El campo LATITUD debe ser un número entre -90 y 90."
        );
      }

      if (
        typeof row.LONGITUD !== "number" ||
        row.LONGITUD < -180 ||
        row.LONGITUD > 180
      ) {
        errorRow.ERRORES.push(
          "El campo LONGITUD debe ser un número entre -180 y 180."
        );
      }

      // Validar DESCRIPCION con máximo 200 caracteres (opcional)
      if (row.DESCRIPCION && row.DESCRIPCION.length > 200) {
        errorRow.ERRORES.push(
          "El campo DESCRIPCION no debe tener más de 200 caracteres."
        );
      }

      // Validar IMAGEN como URL (opcional)
      if (row.IMAGEN && !/^https?:\/\/\S+$/.test(row.IMAGEN)) {
        errorRow.ERRORES.push("El campo IMAGEN debe ser una URL válida.");
      }

      // Validar títuLO
      if (!row.TITULO) {
        errorRow.ERRORES.push("El campo TITULO es requerido.");
      }

      if (errorRow.ERRORES.length > 0) {
        isValid = false;
        errorRow.ERRORES = `Se han encontrado algunos errores: ${errorRow.ERRORES.join(
          ". "
        )}`;
      } else {
        errorRow.ERRORES = null;
      }

      // console.log(errorRow.ERRORES);

      errors.push(errorRow);
    }

    if (!isValid) {
      const excelBuffer = generateExcel(
        [...headers, "ERRORES"],
        errors,
        "ERRORES encontrados"
      );

      return { valid: false, errorsFile: excelBuffer };
    } else {
      return { valid: true, rows: jsonData };
    }
  } catch (err) {
    console.error("Error al validar el archivo Excel:", err);

    throw new Error("Error al validar el archivo Excel");
  }
}

module.exports = validateAccessNodesExcelFile;
