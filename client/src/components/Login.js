import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';


const Login = props => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/login", {email, password}, {
      withCredentials: true
    })
      .then(res => {
        console.log(res);
        if(res.data.msg === "invalid login attempt") {
          setErrorMessage("Invalid login attempt");
        } else {
          navigate("/");
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={ login }>
      <p className="form-group">
        <label>Email:</label>
        <input 
          className="form-control"
          type="text" 
          name="email" 
          onChange={ e => setEmail(e.target.value) } 
          value={ email }
        />
      </p>
      <p className="form-group">
        <label>Password:</label>
        <input 
          className="form-control"
          type="password" 
          name="email" 
          onChange={ e => setPassword(e.target.value) } 
          value={ password }
        />
      </p>
      <input type="submit" value="Sign In" className="btn btn-primary" />
      <p className="error-message">{errorMessage ? errorMessage : ""}</p>
    </form>
  );
}

export default Login;