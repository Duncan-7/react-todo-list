import React, { Component } from 'react';
import Task from '../../components/Task/Task';
import classes from './TaskList.module.css';
import Button from '../../components/UI/Button/Button'

class TaskList extends Component {
  state = {
    showCompletedTasks: false
  }

  toggleShowCompletedTasks = () => {
    this.setState({ showCompletedTasks: !this.state.showCompletedTasks })
  }

  render() {
    let tasks = null;
    if (this.props.currentProject) {
      tasks = this.props.currentProject.taskList.map(task => {
        if (!task.complete || this.state.showCompletedTasks) {
          return <Task
            completeTask={(event) => this.props.completeTask(task, this.props.currentProject.id, event)}
            completed={task.complete}
            task={task}
            selectTask={() => this.props.selectTask(task)}
            key={task.id}
            taskName={task.taskName}
            dueDate={task.dueDate}
            priority={task.priority}
            active={task === this.props.selectedTask}
            editTask={(event) => this.props.editTaskForm(task, event)}
            deleteTask={(event) => this.props.deleteTask(event, task.id)} />
        } else {
          return null;
        }

      })
    }


    return (
      <div className={classes.TaskContainer}>
        <div className={classes.TaskList}>
          {tasks}
        </div>
        <Button btnType={"Success"} clicked={this.props.newTaskForm}>Create Task</Button>
        <Button btnType={"Danger"} clicked={this.props.deleteProject}>Delete Project</Button>
        <Button btnType={"Success"} clicked={this.toggleShowCompletedTasks}>
          {this.state.showCompletedTasks ? "Hide Completed Tasks" : "Show Completed Tasks"}
        </Button>

      </div>
    )
  }
}

export default TaskList;