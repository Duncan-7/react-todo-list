import React, { Component } from 'react';
// import classes from './Projects.module.css';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import * as actionTypes from '../../../store/actions.js';


class NewTaskForm extends Component {
  state = {
    taskForm: {
      taskName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'New Task Name'
        },
        value: '',
        valid: false,
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
        value: '',
        valid: false,
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
        value: 'low',
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
        value: '',
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
    taskObject['id'] = new Date()
    taskObject['complete'] = false
    this.props.createNewTask(taskObject, this.props.currentProject.id);
    this.cancelForm();
  }

  cancelForm = () => {
    this.props.closeForm();
    this.clearForm();
  }

  clearForm = () => {
    const updatedForm = {
      ...this.state.taskForm
    }
    for (let key in updatedForm) {
      updatedForm[key].value = '';
    }
    updatedForm.value = '';
    this.setState({ ProjectName: updatedForm })
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

        <Button btnType="Success" disabled={!this.state.formIsValid}>Create Task</Button>
        <Button btnType="Danger" type="button" clicked={this.cancelForm}>Cancel</Button>
      </form>

    )
    return (
      <div>
        <h4>Create New Task</h4>
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
    createNewTask: (taskObject, currentProjectId) => dispatch({
      type: actionTypes.CREATE_TASK,
      payload: { newTask: taskObject, currentProjectId: currentProjectId }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskForm);