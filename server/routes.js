const Projects = require("./controllers/project.controller");


module.exports = app => {
  app.get("/api/projects", Projects.getAll);
  app.post("/api/projects", Projects.create);
  app.put("/api/projects/:_id", Projects.update);
  app.delete("/api/projects/:_id", Projects.delete);
}