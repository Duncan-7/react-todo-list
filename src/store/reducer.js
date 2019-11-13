import * as actionTypes from './actions.js';

let initialState = {
  projects: [
    {
      id: 1,
      projectName: 'Default',
      taskList: [{
        id: 1,
        taskName: 'Make a to do List',
        dueDate: '11/11/19',
        priority: 'high',
        description: 'Build a to do list using React and Redux.',
        complete: false
      },
      {
        id: 2,
        taskName: 'Refactor Code',
        dueDate: '11/11/19',
        priority: 'low',
        description: 'Tidy this thing up so I can get a job off the back of it',
        complete: false
      }
      ]
    },
    {
      id: 2,
      projectName: 'Default2',
      taskList: [{
        id: 3,
        taskName: 'Make a to do List2',
        dueDate: '11/11/19',
        priority: 'high',
        description: 'Build a to do list using React and Redux.2',
        complete: false
      },
      {
        id: 4,
        taskName: 'Refactor Code2',
        dueDate: '11/11/19',
        priority: 'medium',
        description: 'Tidy this thing up so I can get a job off the back of it2',
        complete: false
      }
      ]
    }
  ]
}

const persistedState = localStorage.getItem('reduxState')

if (persistedState) {
  initialState = JSON.parse(persistedState)
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PROJECT:
      return {
        ...state,
        projects: state.projects.concat(action.project)
      }
    case actionTypes.DELETE_PROJECT:
      const newArray = state.projects.filter(project => project.id !== action.projectId);
      return {
        ...state,
        projects: newArray
      }
    case actionTypes.CREATE_TASK:
      const projectsCopy = [...state.projects]
      const projectCopy = projectsCopy.filter(project => project.id === action.payload.currentProjectId)[0]
      const projectIndex = projectsCopy.findIndex(project => project.id === action.payload.currentProjectId)
      const taskListCopy = [...projectCopy.taskList]
      taskListCopy.push(action.payload.newTask)
      projectCopy.taskList = taskListCopy
      projectsCopy[projectIndex] = projectCopy
      return {
        ...state,
        projects: projectsCopy
      }
    case actionTypes.EDIT_TASK:
      const editProjectsCopy = [...state.projects]
      const editProjectCopy = editProjectsCopy.filter(project => project.id === action.payload.currentProjectId)[0]
      const editProjectIndex = editProjectsCopy.findIndex(project => project.id === action.payload.currentProjectId)
      const editTaskListCopy = [...editProjectCopy.taskList]
      const editTaskListIndex = editTaskListCopy.findIndex(task => task.id === action.payload.editedTask.id)
      editTaskListCopy[editTaskListIndex] = (action.payload.editedTask)
      editProjectCopy.taskList = editTaskListCopy
      editProjectsCopy[editProjectIndex] = editProjectCopy
      return {
        ...state,
        projects: editProjectsCopy
      }
    case actionTypes.DELETE_TASK:
      const deleteTaskProjectsCopy = [...state.projects]
      const deleteTaskprojectIndex = state.projects.findIndex(project => project.id === action.payload.currentProjectId)
      const deleteTaskProjectCopy = deleteTaskProjectsCopy.filter(project => project.id === action.payload.currentProjectId)[0]
      const deleteTaskTaskListCopy = [...deleteTaskProjectCopy.taskList].filter(task => task.id !== action.payload.taskId)
      deleteTaskProjectCopy.taskList = deleteTaskTaskListCopy
      deleteTaskProjectsCopy[deleteTaskprojectIndex] = deleteTaskProjectCopy
      return {
        ...state,
        projects: deleteTaskProjectsCopy
      }
    default:
      state = state
  }
  return state;
}

export default reducer