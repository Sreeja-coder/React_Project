import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = (props) => {
    const {moveraPerPage,columns,onSort,sortColumn} = props;
    return ( <table className="table table-hover">
           
    <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />   
    <TableBody moveraPerPage={moveraPerPage} columns={columns}  />

</table>  );
}
 
export default Table;