const {
    getDocumentation
    
  } = require("../controllers/docControlers");
  
  module.exports = (app) => {
    app.get("/api/documentation", getDocumentation)
  }