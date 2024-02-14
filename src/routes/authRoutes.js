const { login } = require("../controllers/authControlers");

module.exports = (app) => {
  app.post("/api/login", login);
};
