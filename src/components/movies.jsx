import React, { Component } from 'react';
// import {getMovies} from '../services/fakeMovieService';
// import {getGenres} from '../services/fakeGenreService';
import {getGenres} from '../services/genreServices';
import {getMovies,deleteMovie} from '../services/movieServices';
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import LoginForm from './loginForm';
import SearchBox from './common/searchBox';
import {toast} from 'react-toastify';

class Movies extends Component {
    state = { 
        movies: [],
        pageSize:4,
        currentPage:1,
        genres : [],
        selectedGenres:null,
        searchQuery:"",
        sortColumn:{sorton:'title', order:'asc'}
        //like:"fa fa-heart-o"
     }

     async componentDidMount(){
         //since we are getting our genres from database it is returning a promise not an array which we can spread
         //hence we use await to get the values
         const{data} = await getGenres();
         const genres = [{_id:"", name:"All Genres"},...data]
         const {data:movies} = await getMovies();
        this.setState({movies,genres})

     }
     handleDelete=async (id)=>{
         //sometimes an update to the server can fail we need to catch that exception.
         const originalMovies = this.state.movies;
         this.setState({movies:originalMovies.filter(movie => movie._id !== id )});
         try{
             await deleteMovie(id);
            }
         catch(ex){
             console.log("exception",ex)
             if(ex.response && ex.response.status === 404)
                toast.error("The movie has already been deleted");
                this.setState({movies:originalMovies})
         }
         
     }
     
     handleLike=(m)=>{
         console.log(m);
        const movies= [...this.state.movies];
        const index = movies.indexOf(m);
        movies[index] = {...m};
        console.log(movies[index].liked)
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
        console.log(movies[index].liked)

     }

     handlePageChange =(page) =>{
         console.log(page)
         this.setState({currentPage:page})

     }

     handleGenreSelect =(genre) => {
         this.setState({selectedGenres:genre,currentPage:1,searchQuery:""})
     }

     handleSort= (sortColumn) =>{   
        this.setState({sortColumn})


     }

     handleSearch = (query) =>{
         
         this.setState({searchQuery:query,currentPage:1,selectedGenres:null})
         //console.log("searchQuery",this.state.searchQuery);
     }

     getFilteredSortedPagedData = () =>{
        const {currentPage,pageSize,movies,genres,selectedGenres,sortColumn,searchQuery} = this.state;
        //if we have a query in the search box then perform the following
        // we have to filter the movies based on the genre and apply sorting before we paginate
        let filtered = movies;
        if(searchQuery)
        filtered=movies.filter(m=> m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
        else if (selectedGenres && selectedGenres._id)
        filtered = selectedGenres && selectedGenres._id ? movies.filter(m => m.genre._id === selectedGenres._id) :movies;
        const sorted = _.orderBy(filtered,[sortColumn.sorton],[sortColumn.order]);
        const moveraPerPage = paginate(sorted,currentPage,pageSize);  //dividing how many movies will appear per page

        return {moveraPerPage:moveraPerPage,numOfMovies:filtered.length};
     }

  
    render() { 
        
        const count = this.state.movies.length;
        const {currentPage,pageSize,movies,genres,selectedGenres,sortColumn,searchQuery} = this.state;
        const {moveraPerPage,numOfMovies}  = this.getFilteredSortedPagedData();
        const{user} = this.props;
        // if (count === 0)
        // return <p>There are no movies in the database</p>
        return ( 

            <div className="row">
                <div className="col-2">
                    <ListGroup 
                    items={genres}
                    textProperty="_id"
                    valueProperty="name"
                    selectedGenres={selectedGenres}
                    onItemSelect={this.handleGenreSelect}/>
                </div>
                
                <div className="col">
                {user && <Link to='/movies/new' className="btn btn-primary">New Movie</Link>}
                    <p>Showing {numOfMovies} in the database </p>
                <SearchBox value={searchQuery} onChange={this.handleSearch}/>
                <MoviesTable moveraPerPage={moveraPerPage} onDelete={this.handleDelete} onLiked ={this.handleLike} sortColumn={sortColumn} onSort={this.handleSort} user={user}/>
                
            <span><Pagination totalItems={numOfMovies} currentPage={currentPage} pageSize={pageSize} onPageChange={this.handlePageChange}/></span></div>

                
            </div>
            );
    }
}
 
export default Movies;