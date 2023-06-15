const roleService = require("../services/roleServices");

module.exports = {
  createRole: async (req, res, next) => {
    console.log("first");
    console.log(req.query);
    const newRole = await roleService.createRole(req.body);
    // res.status(201).json(newRole);
    return res.json(newRole);
  },

  getRole: async (req, res) => {
    try {
      let role = await roleService.getRole({ name: req.body.name });
      res.status(200).json(`Role ${role}`);
    } catch (error) {
      res.status(400).json(`Error ${error}`);
    }
  },

  getAllRoles: async (req, res) => {
    try {
      const allRoles = await roleService.getAllRoles();
      res.status(200).json(allRoles);
    } catch (error) {
      res.status(400).json(`Error ${error}`);
    }
  },

  updateRole: async (req, res) => {
    try {
      if (req.params.id) {
        const updateRole = await roleService.updateRole(
          req.params.id,
          req.body
        );
        res.status(200).json(` Rol actualizado ${updateRole}`);
      }
    } catch (error) {
      res.status(400).json(`Error ${error}`);
    }
  },

  deleteRole: async (req, res) => {
    try {
      if (req.params.id) {
        let deletedRole = await roleService.deleteRole(req.params.id);
        res.status(200).json(` Role eliminado ${deletedRole}`);
      } else {
        res.status(400).json("No hay id");
      }
    } catch (error) {
      res.status(400).json(`Error ${error}`);
    }
  },
};
