import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';


const ProjectForm = props => {

  const [project, setProject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});

  const addProject = e => {
    e.preventDefault();
    const newProject = {project, dueDate, status: "new"};
    axios.post("http://localhost:8000/api/projects", newProject)
      .then(res => {
        console.log(res);
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/");
        }
      }).catch(err => console.log(err));
  }

  return (
    <form onSubmit={ addProject }>
      <h3>Plan Project</h3>
      <div className="form-group">
        <label>Project</label>
        <input 
          type="text" 
          className="form-control"
          value={project}
          onChange={e => setProject(e.target.value)}
        />
        {
          errors.project ?
          <p style={{color: "red"}}>{errors.project.message}</p> :
          ""
        }
      </div>
      <div className="form-group">
        <label>Due Date</label>
        <input 
          type="date" 
          className="form-control"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        {
          errors.dueDate ?
          <p style={{color: "red"}}>{errors.dueDate.message}</p> :
          ""
        }
      </div>
      <input 
        type="submit" 
        value="Plan Project" 
        className="btn btn-primary" 
      />
    </form>
  );

}

export default ProjectForm;