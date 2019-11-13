import React, { Component } from 'react';
// import classes from './Projects.module.css';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import * as actionTypes from '../../../store/actions.js';


class NewProjectForm extends Component {
  state = {
    ProjectName: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'New Project Name'
      },
      value: '',
      valid: false,
      touched: false,
      validation: {
        required: true
      }
    },
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    return isValid;
  }

  onChangeHandler = (event) => {
    const updatedForm = {
      ...this.state.ProjectName
    }

    updatedForm.value = event.target.value;
    updatedForm.touched = true;
    updatedForm.valid = this.checkValidity(updatedForm.value, updatedForm.validation);


    this.setState({ ProjectName: updatedForm })
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    const newProject = { id: new Date(), projectName: this.state.ProjectName.value, taskList: [] }
    this.props.createNewProject(newProject);
    this.cancelForm();
    this.props.selectProject(newProject);
  }

  cancelForm = () => {
    this.props.closeForm();
    this.clearForm();
  }

  clearForm = () => {
    const updatedForm = {
      ...this.state.ProjectName
    }
    updatedForm.value = '';
    this.setState({ ProjectName: updatedForm })
  }

  render() {
    let form = (
      <form onSubmit={this.onFormSubmit}>
        <Input
          elementType={this.state.ProjectName.elementType}
          elementConfig={this.state.ProjectName.elementConfig}
          value={this.state.ProjectName.value}
          invalid={!this.state.ProjectName.valid}
          touched={this.state.ProjectName.touched}
          shouldValidate={true}
          changed={(event) => this.onChangeHandler(event)}
        />
        <Button btnType="Success" disabled={!this.state.ProjectName.valid}>Create Project</Button>
        <Button btnType="Danger" type="button" clicked={this.cancelForm}>Cancel</Button>
      </form>

    )
    return (
      <div>
        <h4>Create New Project</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNewProject: (project) => dispatch({ type: actionTypes.CREATE_PROJECT, project: project })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectForm);