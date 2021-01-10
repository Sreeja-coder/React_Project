import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import {getGenres} from '../services/genreServices';
import {getMovie,saveMovie} from '../services/movieServices';


class MovieForm extends Form {
    state = { 
        data:{title:'',genreId:"",numberInStock:'',dailyRentalRate:''},
        errors:{},
        genres:[]
     }
     schema={
         _id:Joi.string(),
         title:Joi.string().required().label("Title"),
         genreId:Joi.string().required().label("Genre"),
         numberInStock:Joi.number().min(0).required().label("Stock"),
         dailyRentalRate:Joi.number().min(0).max(5).required().label("Rate")
     }

     async componentDidMount(){
         //this part will be executed when the react compoenents/page is loaded so 
         //populate the drop down box with the genres
         const {data:genres} = await getGenres();
         this.setState({genres});
         //now check if you can find that movie if yes then we should be able to edit it or else we should add it 
         // now if we click the existing movie name or the new movie button it takes us to the movie form
         const movieId =  this.props.match.params.id;
         if (movieId === 'new') return;

         try{ 
             const {data:movie} = await getMovie(movieId);  // if its an existing movie get all the details 
               //if the movie exist in the database then update the state with the values.
            this.setState({data: this.changeToViewModel(movie)});
         }
         catch(ex){
             //check if the movie returned is valid or null ; if null display not-found page
    
             if (ex.response && ex.response.status === 404) 
              this.props.history.replace('/notFound');

         }

       

         
     }

     changeToViewModel (movie)  {
         return{
            _id : movie._id,
            title:movie.title,
            genreId:movie.genre._id,
            numberInStock:movie.numberInStock,
            dailyRentalRate:movie.dailyRentalRate
            };        

     }

     doSubmit = async () =>{
         await saveMovie(this.state.data);
         this.props.history.push('/movies');
     }
    render() { 
        return (<form onSubmit={this.handleSubmit}>
            {/* extract the div+label+input elements into another component */}
            {this.renderInput('title','Title')}
            {this.renderDropDown('genreId','Genre',this.state.genres)}
            {this.renderInput('numberInStock','Number in Stock')}
            {this.renderInput('dailyRentalRate','Rate')}
            {this.renderButton("Save")}
      </form> );
    }
}
 
// export default MovieForm;

// const MovieForm = ({match,history}) => {
//     console.log("hi");
//     return ( <div>
//         <h1>Movie Form {match.params.id}</h1> 
//         <button className="btn btn-primary sm" onClick={() => history.push('/movies')}>Save</button>
//     </div>);
// }
 
export default MovieForm;