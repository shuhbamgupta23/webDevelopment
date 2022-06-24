import { Component } from "react";
// import { movies } from "../movieData"
import axios from 'axios'

class MovieList extends Component {
    constructor(){
        super();
        this.state={
         
            pArr :[1],
            movies:[],
            currPage:1
        };
    }

    async componentDidMount(){
      
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e2391a84d2ccebf4c064f6c24e616037&language=en-US&page=${this.state.currPage}`)
        const data = await res.json()
        console.log(data)
        this.setState({
            movies:[...data.results]
        })
    }

    changeMovies = async()=>{
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e2391a84d2ccebf4c064f6c24e616037&language=en-US&page=${this.state.currPage}`)
        const data = await res.json()
       
        this.setState({
            movies:[...data.results]
        })
    }

    handleNext=()=>{
        this.setState({
            pArr:[...this.state.pArr,this.state.pArr.length+1],
            currPage:this.state.currPage+1
        },this.changeMovies)
    }

    render() {
      
        return (
            <>
                <div>
                    <h3 className="text-center"><strong>Trending</strong></h3>
                </div>
                <div className="movies-list">
                    {this.state.movies.map((movieEle) => (
                        <div className="card movie-card">
                            <img src={`https://image.tmdb.org/t/p/original${movieEle.backdrop_path}`} style={{ height: '40vh', width: '20vw' }} className="card-img-top movie-img" alt="..." />
                            <h5 className="card-title movie-title">{movieEle.title}</h5>
                            <div style={{ display: 'flex', justifyContent: "center" }}>
                               <a href="#" type="button" className="btn btn-primary movies-button">Add to Favourites</a>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{display:"flex",justifyContent:"center"}}>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                        {this.state.pArr.map((ele)=>(
                            <li className="page-item"><a className="page-link" href="#">{ele}</a></li>
                        ))}
                        
                        <li className="page-item"><a className="page-link" onClick={this.handleNext} >Next</a></li>
                    </ul>
                </nav>
                </div>
            </>
        )
    }
}

export default MovieList