import React from 'react';

const Input = ({name,value,onChange,placeholder,type,error}) => {
    return ( <div className="form-group">
    <label htmlFor={name}>{placeholder}</label>
    <input onChange={onChange} name={name} value= {value} type={type} className="form-control" id={name} placeholder={"Enter " + name}/>
    {error && <div className="alert alert-danger">{error}</div>}
    </div> );
}
 
export default Input;