import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Project from './Project';


const Dashboard = props => {

  const [allProjects, setAllProjects] = useState([]);

  const fetchProjects = () => {
    axios.get("http://localhost:8000/api/projects")
      .then(res => setAllProjects(res.data))
      .catch(err => console.log(err));
  }

  useEffect( () => {
    fetchProjects();
  }, []);

  const changeStatus = proj => {
    if(proj.status === "new") {
      proj.status = "started";
    } else if(proj.status === "started") {
      proj.status = "completed";
    }
    axios.put(`http://localhost:8000/api/projects/${proj._id}`, proj)
      .then(res => {
        fetchProjects();
      }).catch(err => console.log(err));
  }

  const remove = proj => {
    axios.delete(`http://localhost:8000/api/projects/${proj._id}`)
      .then(res => {
        fetchProjects();
      }).catch(err => console.log(err));
  }

  return (
    <div className="row">
      <div className="col">
        <h3>Backlog</h3>
        {
          allProjects
            .filter(p => p.status === "new")
            .map( p =>
              <Project project={ p } >
                <button className="btn btn-warning" onClick={ e => changeStatus(p) }>
                  Start Project
                </button>
              </Project> 
            )
        }
      </div>
      <div className="col">
        <h3>In Progress</h3>
        {
          allProjects
            .filter(p => p.status === "started")
            .map( p =>
              <Project project={p} >
                <button className="btn btn-success" onClick={ e => changeStatus(p) }>
                  Complete Project
                </button>
              </Project> 
            )
        }
      </div>
      <div className="col">
        <h3>Completed</h3>
        {
          allProjects
            .filter(p => p.status === "completed")
            .map( p =>
              <Project project={ p } >
                <button className="btn btn-danger" onClick={ e => remove(p) }>
                  Remove Project
                </button>
              </Project>  
            )
        }
      </div>
    </div>
  )
}

export default Dashboard;