import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';


const Register = props => {

  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});

  const register = e => {
    e.preventDefault();
    const newUser = {username, email, password, confirm};
    axios.post("http://localhost:8000/api/register", newUser, {
      withCredentials: true
    })
      .then(res => {
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/");
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={ register }>
      <p className="form-group">
        <label>Username:</label>
        <input 
          className="form-control"
          type="text" 
          name="username" 
          onChange={ e => setUsername(e.target.value) } 
          value={ username }
        />
        {errors.username ? <span>{errors.username.message}</span> : ""}
      </p>
      <p className="form-group">
        <label>Email:</label>
        <input 
          className="form-control"
          type="text" 
          name="email" 
          onChange={ e => setEmail(e.target.value) } 
          value={ email }
        />
        {errors.email ? <span>{errors.email.message}</span> : ""}
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
        {errors.password ? <span>{errors.password.message}</span> : ""}
      </p>
      <p className="form-group">
        <label>Confirm:</label>
        <input 
          className="form-control"
          type="password" 
          name="confirm" 
          onChange={ e => setConfirm(e.target.value) } 
          value={ confirm }
        />
        {errors.confirm ? <span>{errors.confirm.message}</span> : ""}
      </p>
      <input type="submit" value="Sign Up" className="btn btn-primary" />
    </form>
  );
}

export default Register;