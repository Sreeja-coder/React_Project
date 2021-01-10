import React,{Component} from 'react';
import Table from './common/table';
import Liked from "./common/liked";
import { Link } from 'react-router-dom';

// abstracting the table headers as it will help us implement this component more freely in any future code we want.

class MoviesTable extends Component {
    
     columns= [
        {label:"Title",path:"title",content : (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
        {label:"Genre",path:"genre.name"},
        {label:"Stock",path:"numberInStock"},
        {label:"Rate",path:"dailyRentalRate"},
        {key:"like", content:(movie) => <Liked liked={movie.liked} onClick = {() => this.props.onLiked(movie)}/>},
       {key:"delete",content:(movie)=><button onClick = {() => this.props.onDelete(movie._id)}className="btn btn-danger">Delete</button>}
    
     ];
     col = [...this.columns]
    render() { 
        
        const {moveraPerPage,onDelete,onLiked,onSort,sortColumn,user} = this.props
        if (!user || (user && !user.isAdmin))
        {
            
            this.col = this.col.filter(c => c.path || c.key != "delete")
           
         
                
        }
        console.log(this.col)
        return  (
    //          <table className="table table-hover">
           
    //         <TableHeader columns={this.columns} onSort={onSort} sortColumn={sortColumn} />   
    //         <TableBody moveraPerPage={moveraPerPage} columns={this.columns}  />
        
    // </table> 
          <React.Fragment> 
        
        <Table moveraPerPage={moveraPerPage} columns={this.col} sortColumn={sortColumn} onSort={onSort}/>
        </React.Fragment>
   
    
    );
    }
}
 
export default MoviesTable;



