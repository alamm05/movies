import React, { Component } from 'react'
import axios from 'axios';
import { movies } from './getMovies';
export default class favourite extends Component {
    constructor(){
      super();
      this.state = {
        movies:[],
        genre:[],
        currGenre:"All Genre",
      }
    }
 async componentDidMount(){
    //  console.log("componentDidMount is called");
     let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=df993b768d2ad429b2c8a94fad44816a&language=en-US&page=1`);
     // console.log(res.data);
     let genreId = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let genreArr = [];
    res.data.results.map((movieObj)=>{
       if(!genreArr.includes(genreId[movieObj.genre_ids[0]])){
        genreArr.push(genreId[movieObj.genre_ids[0]]);
       }
    });
    genreArr.unshift("All genre");
    console.log(genreArr);

       this.setState({
      movies:[...res.data.results],
      genre:[...genreArr]
    });
   }; 


   

  render() {
    let genreId = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    return (
      <div class="row">
        <div class="col-3 favourite-list">
        <ul class="list-group">
          {
            this.state.genre.map((genre)=>
            this.state.currGenre ==genre ? (
              <li class="list-group-item active" aria-current="true">
             {genre}
            </li>
            ) : (
              
          <li class="list-group-item" aria-current="true">
            {genre}
        </li>
            )
            )}
        
          
         
       </ul>
        </div>
        <div class="col favourite-table">
          <div class="row">
            <input type="text" className='col-8' placeholder="search"></input>
            <input type="number" className='col-4' placeholder='5'></input>
          </div>
          <div class="row">
        <table class="table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
      <th scope="col">Popularity</th>
      <th scope="col">Rating</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {this.state.movies.map((movieObj)=>(
      <tr>
        <td scope="row"><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{width:'8rem'}}/>{movieObj.original_title}</td>
        <td>{genreId[movieObj.genre_ids[0]]}</td>
        <td>{movieObj.popularity}</td>
        <td>{movieObj.vote_average}</td>
        <td><button class="btn btn-outline-danger">Delete</button></td>
      </tr>
    ))}
  </tbody>
</table>
</div>
        </div>
      </div>
    )
  }
}
