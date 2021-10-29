import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Like from './like'
import Table from './common/table'

class MoviesTable extends Component {

    columns = [
        {path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Number in stock'},
        {path: 'dailyRentalRate', label: 'Daily Rental Rate'},
        {key: 'like', content: movie => (<Like onClick={() => this.props.onLike(movie)} isLiked={movie.liked}/>)},
        {key: 'delete', content: movie => (<button onClick={() => this.props.onDelete(movie)} className="btn-sm btn btn-danger">Remove</button>)}
    ]
    render() { 

        const{movies, sortColumn, onSort} = this.props
        
        return ( 
            <Table data={movies} columns={this.columns} onSort={onSort} sortColumn={sortColumn}/>
         );
    }
}
 
export default MoviesTable;