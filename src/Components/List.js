import React, { Component } from 'react'
import {movies} from './getMovies'
import axios from 'axios'


export default class List extends Component {
  constructor(){
    super();
    console.log("constructor is called")
    this.state={
      hover:"",
      parr:[1],
      currPage:1,
      movies:[],
      favMov:[] //this will store the id of the movies added to favourites
    };
  }

  handleEnter=(id)=>{
    this.setState({
      hover:id,
    });
  };

  handleLeave=()=>{
    this.setState({
      hover:"",
    });
  };

  changeMovies = async()=>{
    // console.log(this.state.currPage);
    // console.log("changeMovies called");
    let ans = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=df993b768d2ad429b2c8a94fad44816a&language=en-US&page=${this.state.currPage}`);
    // console.log(ans.data);
    this.setState({
      movies:[...ans.data.results],
    });
  };

  handleNext=()=>{
    let tempArr=[];
    for(let i =1;i<=this.state.parr.length + 1;i++){
      tempArr.push(i);//[1,2]
    }
    this.setState({
      parr:[...tempArr],
      currPage:this.state.currPage + 1,
    },this.changeMovies);
  };

  handlePrev=()=>{
    if(this.state.currPage !=1){
      this.setState({
        currPage:this.state.currPage - 1
      },this.changeMovies);
    }
  }

  handlePageNum = (pageNum)=>{
    this.setState(
      {
        currPage:pageNum,
      },
      this.changeMovies
    );
  }
  handleFavourites=(movieObj)=>{
    let localStorageMovies =JSON.parse(localStorage.getItem("movies"))  || [];
    if(this.state.favMov.includes(movieObj.id)){
      localStorageMovies = localStorageMovies.filter(
        (movie)=>movie.id != movieObj.id
      );
    }
    else localStorageMovies.push(movieObj);
    console.log(localStorageMovies);
    localStorage.setItem("movies",JSON.stringify(localStorageMovies));
    let tempData =localStorageMovies.map(movieObj => movieObj.id);
    this.setState({
      favMov:[...tempData]
    });
  }

async componentDidMount(){
  // console.log("componentDidMount is called");
  let ans = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=df993b768d2ad429b2c8a94fad44816a&language=en-US&page=${this.state.currPage}`);
  // console.log(res.data);
  this.setState({
    movies:[...ans.data.results],
  });
 }

  render() {
    // console.log("render is called")
    // let movie =movies.results;
    return (
       <>
          {
             this.state.movies.length == 0 ?
             <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
           </div>
             :
           (
            <div>
              <h3 className='text-center'>
                <strong>Trending</strong>
              </h3>
              <div className='movies-list'>
               {this.state.movies.map((movieObj)=>(
                 
                 <div className="card movie-card" onMouseEnter={()=>this.handleEnter(movieObj.id)} onMouseLeave={this.handleLeave} >
                 <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}className="card-img-top movie-img" alt="..."
                 style={{height:"40vh"}}/>
                 {/* <div className="card-body"> */}
                   <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                   {/* <p className="card-text banner-text">{movieObj.overview}</p> */}
                    <div className='button-wrapper '>
                      {
                        this.state.hover==movieObj.id && 
                        <a  className="btn btn-danger movie-button" onClick={()=> this.handleFavourites(movieObj)}>  
                        {this.state.favMov.includes(movieObj.id) ? "Remove from favourites":"Add to Favourites"}
                        </a>
                      }
                    
                    </div>
                 </div>  
                 ))}
               </div>
              <div className='pagination'>
              <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item"><a className="page-link" onClick={this.handlePrev}
                >
                  Previous
                  </a>
                </li>
                {this.state.parr.map((pageNum)=>(
                  <li className="page-item"><a className="page-link" onClick={()=>{
                    this.handlePageNum(pageNum)
                  }}
                  >
                    {pageNum}
                    </a>
                  </li>
                ))}
                <li className="page-item"><a className="page-link" onClick={this.handleNext}
                >
                  Next
                  </a>
                  </li>
              </ul>
              </nav>
              </div>
            </div>
           )
          }
       </>
    );
  }
}
