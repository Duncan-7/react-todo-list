import React from 'react';
import classes from './Task.module.css';
import Button from '../UI/Button/Button'

const Task = (props) => {
  let styles = [classes.Task]
  if (props.active) {
    styles.push(classes.active)
  }
  if (!props.completed) {
    switch (props.priority) {
      case ('low'):
        styles.push(classes.low)
        break;
      case ('medium'):
        styles.push(classes.medium)
        break;
      case ('high'):
        styles.push(classes.high)
        break;
      default:
        break;
    }
  }



  return (
    <div onClick={props.selectTask} className={styles.join(" ")}>
      <p>Title: {props.taskName}</p>
      <p>Due Date: {props.dueDate}</p>
      {props.completed ? <p style={{ fontWeight: 'bold' }}>TASK COMPLETE</p> : null}
      <Button btnType="Success" clicked={props.editTask} >Edit Task</Button>
      <Button btnType="Danger" clicked={props.deleteTask} >Delete Task</Button>
      {props.completed ? null : <Button btnType="Success" clicked={props.completeTask} >Complete</Button>}
    </div>
  )
}

export default Task;