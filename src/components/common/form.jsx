import React, { Component } from 'react';
import Input from './input';
import Joi from 'joi-browser';
import DropDown from './dropDown';


class Form extends Component {
    state = { 
        data:{},
        errors:{}
     }
     validate = () =>{
      
        const errors = {}

        const {data} = this.state;
        const {error} = Joi.validate(data,this.schema,{abortEarly:false});
    // console.log(error);
        if(error){ 
        for (let e of error.details){
            // console.log(e["path"])
            errors[e["path"]] = e["message"]
            
        }
        return errors;
        
    }
    else return null;
        // if (data.username.trim() === '')
        // errors.username = "Username is required";

        // if(data.password.trim() === '')
        // errors.password = "Password is required";

        // return Object.keys(errors).length === 0 ? null : errors;
    }

    validateProperty = ({name,value}) => {
        //we cant passs this.state.data as it validate the whole form not just the field so we extract the filed out 

        const field= {[name]:value}
         // we cant pass the whole schema as it will validtae the whole  form hence extract that part of the schema
        const schema = {[name]:this.schema[name]}
       const {error}  = Joi.validate(field,schema)

       return error?error.details[0].message : null;
        // if(name === 'username'){
        //     if (value.trim() === '')
        //     {
                
        //     return "Username is required";}
        // }

        // if(name === 'password'){
        //     if (value.trim() === '')
        //     return "Password is required"
        // }

    }
    //validating each textbox of the form not the entire form
    handleChange = ({currentTarget:input}) => {
        
        
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete  errors[input.name];
        const data  ={...this.state.data};
        data[input.name] = input.value;
        this.setState({data,errors});
    }

    handleSubmit = eventObject =>{
        eventObject.preventDefault();
        const errors = this.validate();
        // console.log(errors)
        this.setState({errors:errors || {}});
        if(errors) return ;

        this.doSubmit();
    }
    renderButton = (label) =>{
        return (<button disabled = {this.validate()} className="btn btn-primary ">{label}</button>);
    }
    renderInput = (name,label,type='text') => {
        const {data,errors} = this.state;
        return (
            <Input onChange={this.handleChange} name={name} value= {data[name]} type={type} placeholder={label} error={errors[name]} />
        );
    }
    renderDropDown = (name,label,options) => {
        const {data,errors} = this.state;
      return (
          <DropDown onChange={this.handleChange} name={name} placeholder={label} value={data[name]} errors={errors[name]} options={options} />
      );  
    }
}
 
export default Form;
