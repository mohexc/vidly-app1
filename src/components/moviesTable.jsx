import React from 'react';
import Like from './common/like';
import Table from './common/table';

const MoviesTable = ({ nMovies, onDelete, onLike, onSort, sortColumn }) => {
  const columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like", content: movie => (<Like liked={ movie.liked } onClick={ () => onLike(movie) } />) },
    { key: "delete", content: movie => (<button className="btn btn-danger btn-sm" onClick={ () => onDelete(movie) } > Delete</button>) },
  ]

  return <Table
    columns={ columns }
    data={ nMovies }
    onSort={ onSort }
    sortColumn={ sortColumn } />
}

export default MoviesTable;