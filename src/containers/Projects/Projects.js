import React, { Component } from 'react';
import classes from './Projects.module.css';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button'


class Projects extends Component {
  render() {
    let projectList = null
    if (this.props.projects) {
      projectList = this.props.projects.map(project => {
        let style = classes.Project + (this.props.currentProject === project ? ` ${classes.active}` : '')
        return (
          <div
            className={style}
            key={project.projectName}
            onClick={() => this.props.click(project)}>{project.projectName}</div>
        )
      })
    }
    return (
      <div className={classes.Projects}>
        <h2>Projects</h2>
        {projectList}
        <Button clicked={this.props.newProjectForm} btnType="Success">Add Project</Button>
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);