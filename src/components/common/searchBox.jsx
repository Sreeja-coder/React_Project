import React from 'react';

const SearchBox = ({value,onChange}) => {
    
    return ( 
        
        <input type="text" className="form-control my-3" value ={value} onChange ={e => onChange(e.currentTarget.value)} name="query" placeholder="Search ..."></input>
     );
}
 
export default SearchBox;