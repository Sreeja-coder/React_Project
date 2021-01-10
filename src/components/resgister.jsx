import React, { Component } from 'react';
import {toast} from 'react-toastify';
import Joi from 'joi-browser';
import Form from './common/form';
import{loginWithJwt} from './../services/authServices';
import { register } from './../services/userServices';


class Register extends Form {
    state ={
        data:{username:'',password:'',name:''},
        errors:{}        
    }
    schema = {
        username : Joi.string().email().required().label("Username"),
        password : Joi.string().required().min(5).max(20).label("Password"),
        name : Joi.string().required().label("Name")
    }

    doSubmit = async () =>{  
        //call the server to perform logic for after submission of the form
        
        try{

            const response = await register(this.state.data)
            loginWithJwt(response.headers["x-auth-token"]);
            //this.props.history.push("/")
            window.location = "/";
        }
        catch(ex){
            console.log(ex.response.data)
            if(ex.resposne && ex.resposne.status===400){
                let errors =  {...this.state.errors}
                errors.username=ex.response.data;
                console.log(errors["username"]);
                this.setState({errors})
            }
            // toast.error("The user already exist");
        }
    }
    render() { 
        return (<form onSubmit={this.handleSubmit}>
            {/* extract the div+label+input elements into another component */}
            {this.renderInput('username','Username')}
            {this.renderInput('password','Password','password')}
            {this.renderInput('name','Name','name')}
            {this.renderButton("Register")}
      </form>  );
    }
}
 
export default Register;
