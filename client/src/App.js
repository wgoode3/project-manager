import React from 'react';
import { Router, Link, navigate } from '@reach/router';
import Dashboard from './components/Dashboard';
import ProjectForm from './components/ProjectForm';
import SignIn from './components/SignIn';
import axios from 'axios';


const App = props => {

  const logout = e => {
    e.preventDefault();
    axios.get("http://localhost:8000/api/user/logout", {
      withCredentials: true
    })
      .then(res => {
        console.log(res);
        navigate("/sign_in");
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="container">
      
      <div className="jumbotron">

        <h1>Project Manager</h1>
        <nav>
          <Link to="/">Home</Link>{" | "}
          <Link to="/projects/new">New Project</Link>{" | "}
          <a href="#!" onClick={ logout }>Sign Out</a>
        </nav>

      </div>

      <Router>
        <Dashboard path="/" />
        <ProjectForm path="/projects/new" />
        <SignIn path="/sign_in" />
      </Router>

    </div>
  );

}

export default App;