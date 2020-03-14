const Project = require("../models/project.model");


class ProjectController {

  getAll(req, res) {
    Project.find({}).sort("dueDate").exec()
      .then(projects => res.json(projects))
      .catch(err => res.json(err));
  }

  create(req, res) {
    const newProject = new Project(req.body);
    newProject.save()
      .then(() => res.json(newProject))
      .catch(err => res.json(err));
  }

  update(req, res) {
    Project.findByIdAndUpdate({_id: req.params._id}, req.body, {runValidators: true, useFindAndModify: false})
      .then(project => res.json(project))
      .catch(err => res.json(err));
  }

  delete(req, res) {
    Project.findByIdAndDelete({_id: req.params._id}, {useFindAndModify: false})
      .then(() => res.json({msg: "ok"}))
      .catch(err => res.json(err));
  }
  
}

module.exports = new ProjectController();