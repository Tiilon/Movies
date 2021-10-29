import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovieService'
import {getGenres} from '../services/fakeGenreService'
import MoviesTable from './moviesTable'
import Pagination from './pagination'
import {Link} from 'react-router-dom'
import {paginate} from '../utils/paginate'
import _ from 'lodash'


class Movies extends Component {
    state = { 
        movies: getMovies(),
        pageSize: 4,
        currentPage:1,
        genres: getGenres(),
        currentGenre: '',
        sortColumn: {path:'title', order: 'asc'}
     }

     handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies})
     }

     handleLike = (movie) => {
        const movies = [...this.state.movies]
        const index = movies.indexOf(movie)
        movies[index] = {...movies[index]}
        movies[index].liked = !movies[index].liked
        this.setState({ movies })
     }

     handlePageChange = (page)=>{
         this.setState({currentPage: page})
     }

     handleSelectGenre = (genre)=>{
         this.setState({currentGenre: genre})
     }

     handleSort = sortColumn =>{
         this.setState({sortColumn})
     }
    
     render() { 
         const {length:count} = this.state.movies
         const {movies:allMovies, currentPage, pageSize, genres, sortColumn} = this.state
         if (count === 0) return <p>There are no movies at this moment.</p>

        const filtered = this.state.currentGenre && this.state.currentGenre._id ? allMovies.filter(m => m.genre._id === this.state.currentGenre._id): allMovies
        const sorted = _.orderBy(filtered, [sortColumn.path], sortColumn.order)
        const movies = paginate(sorted, currentPage, pageSize)
        

        return ( 
            <div className="table table-responsive">
                <p>Showing {count} movies</p>
                <div className="row">
                    <div className="col-2">
                        {genres.map((genre) =>(
                        <ul key={genre._id} className="list-group">
                            <li  onClick={() => this.handleSelectGenre(genre)} className="list-group-item">{genre.name}</li>
                        </ul>
                        ))}
                    </div>
                    <div className="col m-2">
                        <Link to='/movies/new'><button className="btn btn-primary mb-3">New Movies</button></Link>
                       <MoviesTable movies={movies} onDelete={this.handleDelete} onLike={this.handleLike} onSort={this.handleSort} sortColumn={this.state.sortColumn}/>
                    </div>
                </div>
                
                <Pagination pageSize={this.state.pageSize} currentPage={this.state.currentPage} itemsCount={this.state.movies.length} onPageChange={this.handlePageChange}/>
            </div>
         );
    }
}
 
export default Movies;