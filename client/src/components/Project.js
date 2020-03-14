import React from 'react';
import moment from 'moment';


const Project = props => {

  const { project, status, dueDate } = props.project;
  const due = moment(dueDate).format('MM/DD/YYYY');

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{ project }</h4>
        <p>
          Due: {
            new Date(dueDate) > new Date() || status === "completed" ? 
            <span>{ due }</span> :
            <span style={{ color: "red" }}>{ due }</span>
          }
        </p>
        { props.children }
      </div>
    </div>
  );
  
}

export default Project;