import http from './httpServices';
// import {url} from '../config.json';


// const apiurl =url+"movies";
const apiurl ="movies";


export function getMovies(){
return http.get(apiurl)
}

export function deleteMovie(movieId){
return http.delete(apiurl +"/" +movieId);

}

export async function  saveMovie(movie){
if(movie._id){
    //but the restful api at the backend doesnt like the _id property hence we have to remove it 
    let movie_body = {...movie}
    delete movie_body._id
    return http.put(apiurl +"/" +movie._id,movie_body)
}
//if its a new movie we need to call post
return http.post(apiurl,movie)
}

export function getMovie(id) {
    return http.get(apiurl + "/" + id);
  }