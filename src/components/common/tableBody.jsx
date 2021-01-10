import React, { Component } from 'react';
import _ from 'lodash';


class TableBody extends Component {
    renderCell = (movie,col) =>{
        if (col.content) return col.content(movie)
        return _.get(movie,col.path)

    }
    render() { 
        return ( <tbody>
            {this.props.moveraPerPage.map(movie => <tr key={movie._id}>
                {this.props.columns.map(col => 
                <td key={movie._id + (col.path || col.key)}>{this.renderCell(movie,col)}</td>
                )}
                
            </tr>)}
        </tbody> );
    }
}
 
export default TableBody;