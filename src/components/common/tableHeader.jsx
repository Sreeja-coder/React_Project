import React, { Component } from 'react';

//this componenet should render the columns and its properties of onClick
//so to render it we should get an array of columns  from its parent and map it here.


class TableHeader extends Component {
    raiseSort= (sorton) =>{
        const sortColumn = {...this.props.sortColumn}
        if (sortColumn.sorton === sorton){
            sortColumn.order = sortColumn.order ==="asc"?"desc":"asc";
        }
        else{
            sortColumn.order ='asc';
            sortColumn.sorton =sorton;
        }
        this.props.onSort(sortColumn)
        // this.setState({sortColumn})
        //  console.log(sorton)
     }

     renderSortIcon =(column,sortColumn) =>{
         if (sortColumn.sorton != column.path) return null;
         if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc" aria-hidden="true"/>

         return <i className="fa fa-sort-desc" aria-hidden="true"/>

     }

    render() { 
        const {columns,sortColumn} = this.props
        return ( <thead>
            <tr>
               { columns.map(column => <th key = {column.path || column.key} onClick={() => this.raiseSort(column.path)} scope="col">{column.label}{this.renderSortIcon(column,sortColumn)}</th> )}
            </tr>
        </thead> );
    }
}
 
export default TableHeader;