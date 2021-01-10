import './App.css';
import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import Register from './components/resgister';
import 'react-toastify/dist/ReactToastify.css';
import Logout from './components/logout';
import { getCurrentUser } from './services/authServices';
import ProtectedRoute from './components/common/protectedRoute';


class App extends Component {
  state={};
  componentDidMount() {   
    const user = getCurrentUser();
    this.setState({user})
    
  };
  render(){
    return (
      <React.Fragment>
        <ToastContainer/>
      <NavBar user={this.state.user}></NavBar>
  <main className="container">
    <Switch>
      <Route path='/register' component={Register}></Route>
      <Route path='/login' component={LoginForm}/>
      {/* <Route path='/movies/:id' component={MovieForm}/> */}
      {/* <Route path='/movies/:id' render={props =>{ if(this.state.user) return <MovieForm {...props} /> return <Redirect to="/login"/> }}/> */}
      <ProtectedRoute path='/movies/:id' component={MovieForm}/>
      
      <Route path='/movies' render={props => <Movies {...props} user={this.state.user}/>}/>
      <Route path = '/customers' component={Customers}/>
      <Route path = '/rentals' component={Rentals}/>
      <Route path = '/notFound' component={NotFound}/>
      <Route path ='/logout' component={Logout}></Route>
      {/* <Route path = "/" component={Movies}/> */}
      <Redirect from="/" exact to= "/movies"/>
      <Redirect to="/notFound"/>
      </Switch>
  </main>
  </React.Fragment>
    );
  }

}

export default App;
