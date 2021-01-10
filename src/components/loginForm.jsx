import React, { Component } from 'react';
import Joi from 'joi-browser';
import{loginAuth} from '../services/authServices';

import Form from './common/form';
import { Redirect } from 'react-router-dom';
import { getCurrentUser } from './../services/authServices';

//input element has its own state hence we should make it an controlled element 
class LoginForm extends Form {
    schema = {
        username : Joi.string().required().label("Username"),
        password : Joi.string().required().label("Password")
    }
    state ={
        data:{username:'',password:''},
        errors:{}        
    }

    

    doSubmit = async () =>{  
              //call the server to perform logic for after submission of the form
        console.log("Submitted");try {
            //this return a json web token value which is unique to each ser we have to save it 
            await loginAuth(this.state.data)

           // we have to store this in the local storage of the browser
           
            //this.props.history.push("/") we want the application to be re-loaded again as we want the component did mount to run again so that it can update the state with the 
            //correct username
            // window.location='/';
            const{state} = this.props.location
            window.location = state? state.from.pathname:"/";
      
        } catch (error) {
            if(error.response && error.response.status ===400)
            {
                const errors = this.state.errors;
                errors.username=error.response.data;
                this.setState({errors});
            }
        }
        
      
    
    }
        



    render() { 
        if(getCurrentUser()) return <Redirect to="/"/>
        
        return (
            <form onSubmit={this.handleSubmit}>
                {/* extract the div+label+input elements into another component */}
                {this.renderInput('username','Username')}
                {this.renderInput('password','Password','password')}
                {this.renderButton("Login")}
          </form> );
    }
}
 
export default LoginForm;