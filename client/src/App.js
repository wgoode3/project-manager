import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Link } from '@reach/router';
import Dashboard from './components/Dashboard';
import ProjectForm from './components/ProjectForm';


function App() {
  return (
    <div className="container">
      <div className="jumbotron">
        <h1>Project Manager</h1>
        <nav>
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/projects/new">New Project</Link>
        </nav>
      </div>
      <Router>
        <Dashboard path="/" />
        <ProjectForm path="/projects/new" />
      </Router>
    </div>
  );
}

export default App;
