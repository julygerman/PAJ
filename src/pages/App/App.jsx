import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import authService from "../../services/authService";
import UsersList from "../UsersList/UsersList";
import LandingPage from '../../pages/LandingPage/LandingPage'
import ProjectBoard from '../../pages/ProjectBoard/ProjectBoard'
import ProjectDetails from '../../pages/ProjectDetails/ProjectDetails'
import ProjectCreation from '../ProjectCreation/ProjectCreation'
import * as projectApi from '../../services/projectService'
import "./App.css";

class App extends Component {
  state = {
    user: authService.getUser(),
    projects: []
  };

  handleLogout = () => {
    authService.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: authService.getUser() });
  };

  async componentDidMount(){
    const projects = await projectApi.getAllProjects()
    this.setState({projects})
}

  handleAddProject = async projectData =>{
    const newProject = await projectApi.createProject(projectData)
    this.setState({projects: [...this.state.projects, newProject]})
}

  render() {
    const {user} = this.state
    return (
      <>
        <NavBar user={user} handleLogout={this.handleLogout} />
        <Route
          exact
          path="/"
          render={() => (
            <main>
              {/* <h1>Welcome. This is an authorization template.</h1> */}
              <LandingPage /> 
            </main>
          )}
        />
        <Route
          exact
          path="/signup"
          render={({ history }) => (
            <Signup
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={({ history }) => (
            <Login
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/users"
          render={() => (user ? <UsersList /> : <Redirect to="/login" />)}
        />
        {/* Route to Project Details Page */}
        <Route 
          exact path='/projectdetails/'
          render={( {location} ) => 
          <ProjectDetails
          location={location}
        />
        }/>
        {/* Route to Project Board Page */}
        <Route 
          exact path='/projectboard/'
          render={( {location} ) => 
          <ProjectBoard
          location={location}
        />
        }/>
        <Route 
        exact path='/createproject'
        render={() =>
        <ProjectCreation />
        }
        
        />
      </>
    );
  }
}

export default App;
