import React from 'react';

const ListGroup = (props) => {
    const {items,textProperty,valueProperty,onItemSelect,selectedGenres} = props;
    console.log(selectedGenres)
    return ( <ul className="list-group">
        {items.map(item =>
        <li
        key={item[textProperty]}
        style={{cursor:'pointer'}}
        onClick={() => {onItemSelect(item)}}
        className={item===selectedGenres?"list-group-item active":"list-group-item"}>
        {item[valueProperty]}
        </li>)}
       
  </ul>
        );
}
 
export default ListGroup;