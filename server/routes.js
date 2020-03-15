const Projects = require("./controllers/project.controller");
const Users = require("./controllers/user.controller");
const { authenticate } = require("./config/jwt");


module.exports = app => {

  // project routes
  app.get("/api/projects", authenticate, Projects.getAll);
  app.post("/api/projects", authenticate, Projects.create);
  app.put("/api/projects/:_id", authenticate, Projects.update);
  app.delete("/api/projects/:_id", authenticate, Projects.delete);

  // user routes
  app.post("/api/register", Users.register);
  app.post("/api/login", Users.login);
  app.get("/api/user/logout", Users.logout);

}