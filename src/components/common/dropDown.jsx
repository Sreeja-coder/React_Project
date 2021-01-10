import React from 'react';

const DropDown = ({name,placeholder,options,error,onChange,value}) => {
    return ( 
        <div className="form-group">
             <label htmlFor={name}>{placeholder}</label>
             <select onChange={onChange} name={name} value= {value}  className="form-control" id={name} placeholder={"Select " + name}>
                 <option value=" "></option>
                 {options.map((o) => <option key={o._id} value={o._id}>{o.name}</option>)}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}

        </div>
     );
}
 
export default DropDown;