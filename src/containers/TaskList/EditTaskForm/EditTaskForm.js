import React, { Component } from 'react';
// import classes from './Projects.module.css';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import * as actionTypes from '../../../store/actions.js';


class EditTaskForm extends Component {
  state = {
    taskForm: {
      taskName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'New Task Name'
        },
        value: this.props.taskToEdit.taskName,
        valid: true,
        touched: false,
        validation: {
          required: true
        }
      },
      dueDate: {
        elementType: 'input',
        elementConfig: {
          type: 'date',
          placeholder: ''
        },
        value: this.props.taskToEdit.dueDate,
        valid: true,
        touched: false,
        validation: {
          required: true
        }
      },
      priority: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'low', displayValue: 'Low' },
            { value: 'medium', displayValue: 'Medium' },
            { value: 'high', displayValue: 'High' },
          ]
        },
        value: this.props.taskToEdit.priority,
        validation: {},
        valid: true
      },
      description: {
        elementType: 'textarea',
        elementConfig: {
          height: 6,
          width: 14,
          placeholder: 'Task Description'
        },
        value: this.props.taskToEdit.description,
        valid: true,
        touched: false,
        validation: {}
      },
    },
    formIsValid: false
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    return isValid;
  }

  onChangeHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.taskForm
    }
    const updatedFormElement = {
      ...updatedForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

    updatedForm[inputIdentifier] = updatedFormElement
    let formIsValid = true;
    for (let input in updatedForm) {
      formIsValid = updatedForm[input].valid && formIsValid
    }

    this.setState({ taskForm: updatedForm, formIsValid: formIsValid })

  }

  onFormSubmit = (event) => {
    event.preventDefault();
    const taskObject = {}
    for (let formElementIndentifier in this.state.taskForm) {
      taskObject[formElementIndentifier] = this.state.taskForm[formElementIndentifier].value
    }
    taskObject['id'] = this.props.taskToEdit.id
    taskObject['complete'] = false
    this.props.editTask(taskObject, this.props.currentProject.id);
    this.props.closeForm();
  }

  render() {
    const formElementsArray = []
    for (let key in this.state.taskForm) {
      formElementsArray.push({
        id: key,
        config: this.state.taskForm[key]
      })
    }

    let form = (
      <form onSubmit={this.onFormSubmit}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            changed={(event) => this.onChangeHandler(event, formElement.id)}
          />
        ))}

        <Button btnType="Success" disabled={!this.state.formIsValid}>Edit Task</Button>
        <Button btnType="Danger" type="button" clicked={this.props.closeForm}>Cancel</Button>
      </form>

    )
    return (
      <div>
        <h4>Edit Task</h4>
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
    editTask: (taskObject, currentProjectId) => dispatch({
      type: actionTypes.EDIT_TASK,
      payload: { editedTask: taskObject, currentProjectId: currentProjectId }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskForm);