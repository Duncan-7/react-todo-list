import React, { Component } from 'react';
import './App.css';
import Projects from './containers/Projects/Projects';
import { connect } from 'react-redux';
import TaskList from './containers/TaskList/TaskList';
import TaskDetails from './components/TaskDetails/TaskDetails';
import Modal from './components/UI/Modal/Modal';
import NewProjectForm from './containers/Projects/NewProjectForm/NewProjectForm';
import NewTaskForm from './containers/TaskList/NewTaskForm/NewTaskForm';
import EditTaskForm from './containers/TaskList/EditTaskForm/EditTaskForm';
import * as actionTypes from './store/actions.js';

class App extends Component {
  state = {
    currentProject: this.props.projects[0],
    selectedTask: null,
    showForm: false,
    formToShow: null,
    taskToEdit: null
  }



  componentDidUpdate(prevProps) {
    if (prevProps.projects.length > this.props.projects.length) {
      const currentProject = this.props.projects.length > 0 ? this.props.projects[0] : null
      this.setState({ currentProject: currentProject })
    }
  }

  projectClickHandler = (chosenProject) => {
    this.setState({ currentProject: chosenProject, selectedTask: null })
  }

  taskClickHandler = (task) => {
    this.setState({ selectedTask: task })
  }

  openForm = (formType) => {
    this.setState({ showForm: true, formToShow: formType })
  }

  prepareEditForm = (task, event) => {
    event.stopPropagation();
    this.setState({ taskToEdit: task });
    this.openForm('edit task');
  }

  closeForm = () => {
    this.setState({ showForm: false, formToShow: null })
  }

  onDeleteProject = () => {
    this.props.deleteProject(this.state.currentProject.id)
    this.setState({selectedTask: null})
  }

  onDeleteTask = (event, id) => {
    event.stopPropagation();
    this.props.deleteTask(id, this.state.currentProject.id);
    this.setState({ selectedTask: null });
  }

  completeTask = (task, currentProjectId, event) => {
    event.stopPropagation();
    task.complete = true
    console.log(task)
    this.props.editTask(task, currentProjectId)
  }

  render() {
    let formContent = '';
    switch (this.state.formToShow) {
      case 'new project':
        formContent = <NewProjectForm selectProject={this.projectClickHandler} closeForm={this.closeForm} />
        break;
      case 'new task':
        formContent = <NewTaskForm closeForm={this.closeForm} currentProject={this.state.currentProject} />
        break;
      case 'edit task':
        formContent = <EditTaskForm closeForm={this.closeForm} currentProject={this.state.currentProject} taskToEdit={this.state.taskToEdit} />
        break;
    }

    return (
      <div className="container">
        <Projects
          newProjectForm={() => this.openForm('new project')}
          click={this.projectClickHandler}
          currentProject={this.state.currentProject} />
        <TaskList
          completeTask={this.completeTask}
          newTaskForm={() => this.openForm('new task')}
          editTaskForm={this.prepareEditForm}
          selectTask={this.taskClickHandler}
          currentProject={this.state.currentProject}
          selectedTask={this.state.selectedTask}
          deleteProject={this.onDeleteProject}
          deleteTask={this.onDeleteTask} />
        <TaskDetails task={this.state.selectedTask} />
        <Modal
          show={this.state.showForm}
          closeForm={this.closeForm}>
          {formContent}
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteProject: (id) => dispatch({ type: actionTypes.DELETE_PROJECT, projectId: id }),
    deleteTask: (id, currentProjectId) => dispatch({
      type: actionTypes.DELETE_TASK,
      payload: { taskId: id, currentProjectId: currentProjectId }
    }),
    editTask: (taskObject, currentProjectId) => dispatch({
      type: actionTypes.EDIT_TASK,
      payload: { editedTask: taskObject, currentProjectId: currentProjectId }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
