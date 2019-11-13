import React from 'react';
import classes from './TaskDetails.module.css'

const TaskDetails = (props) => {
  let details = null;
  if (props.task) {
     details = (
       <div>
      <p>Title: {props.task.taskName}</p>
        <p>Due Date: {props.task.dueDate}</p>
        <p>Priority: {props.task.priority}</p>
        <p>Description:</p>
        <p>{props.task.description}</p>
        </div>
    )
  }
    return (
      <div className={classes.TaskDetails}>
        {details}
      </div>
    )
}
  


export default TaskDetails;