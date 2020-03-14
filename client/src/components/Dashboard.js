import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';


const Dashboard = props => {

  const [allProject, setAllProjects] = useState([]);

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
          allProject
            .filter(p => p.status === "new")
            .map( p =>
              <div className="card" key={p._id}>
                <div className="card-body">
                  <h4 className="card-title">{p.project}</h4>
                  <p>
                    Due: {
                      new Date(p.dueDate) > new Date() ? 
                      <span>{moment(p.dueDate).format('MM/DD/YYYY')}</span> :
                      <span style={{color: "red"}}>{moment(p.dueDate).format('MM/DD/YYYY')}</span>
                    }
                  </p>
                  <button 
                    className="btn btn-warning" 
                    onClick={e => changeStatus(p)}
                  >
                    Start Project
                  </button>
                </div>
              </div>  
            )
        }
      </div>
      <div className="col">
        <h3>In Progress</h3>
        {
          allProject
            .filter(p => p.status === "started")
            .map( p =>
              <div className="card" key={p._id}>
                <div className="card-body">
                  <h4 className="card-title">{p.project}</h4>
                  <p>
                    Due: {
                      new Date(p.dueDate) > new Date() ? 
                      <span>{moment(p.dueDate).format('MM/DD/YYYY')}</span> :
                      <span style={{color: "red"}}>{moment(p.dueDate).format('MM/DD/YYYY')}</span>
                    }
                  </p>
                  <button 
                    className="btn btn-success" 
                    onClick={e => changeStatus(p)}
                  >
                    Complete Project
                  </button>
                </div>
              </div>  
            )
        }
      </div>
      <div className="col">
        <h3>Completed</h3>
        {
          allProject
            .filter(p => p.status === "completed")
            .map( p =>
              <div className="card" key={p._id}>
                <div className="card-body">
                  <h4 className="card-title">{p.project}</h4>
                  <p>Due: {moment(p.dueDate).format('MM/DD/YYYY')}</p>
                  <button 
                    className="btn btn-danger" 
                    onClick={e => remove(p)}
                  >
                    Remove Project
                  </button>
                </div>
              </div>  
            )
        }
      </div>
    </div>
  )
}

export default Dashboard;