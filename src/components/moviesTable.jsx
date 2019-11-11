import React from 'react';
import auth from '../services/authService'
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';

const MoviesTable = ({ nMovies, onDelete, onLike, onSort, sortColumn }) => {
  const columns = [
    { path: "title", label: "Title", content: movie => <Link to={ `/movies/${movie._id}` }>{ movie.title }</Link> },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like", content: movie => (<Like liked={ movie.liked } onClick={ () => onLike(movie) } />) },
  ]

  const user = auth.getCurrentUser()
  if (user && user.isAdmin)
    columns.push({ key: "delete", content: movie => (<button className="btn btn-danger btn-sm" onClick={ () => onDelete(movie) } > Delete</button>) })

  return <Table
    columns={ columns }
    data={ nMovies }
    onSort={ onSort }
    sortColumn={ sortColumn } />
}

export default MoviesTable;