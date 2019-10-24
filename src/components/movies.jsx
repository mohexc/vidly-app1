import React, { useState } from 'react'
import Like from './common/like';
import { getMovies } from '../services/fakeMovieService';

function Movies() {

  const [movies, setMovies] = useState(getMovies())

  const handleDelete = movie => setMovies(movies.filter(m => m._id !== movie._id))

  const handleLike = movie => {
    const newMovies = [...movies]
    const index = movies.indexOf(movie)
    newMovies[index] = { ...movies[index] }
    newMovies[index].liked = !newMovies[index].liked
    setMovies(newMovies)

  }

  if (movies.length === 0) return <p>There are no movies in the database</p>

  return (
    <div>
      <p>Showing { movies.length } movies in the database.</p>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Reate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { movies.map(movie => (
            <tr key={ movie._id }>
              <td>{ movie.title }</td>
              <td>{ movie.genre.name }</td>
              <td>{ movie.numberInStock }</td>
              <td>{ movie.dailyRentalRate }</td>
              <td><Like liked={ movie.liked } onClick={ () => handleLike(movie) } /></td>
              <td><button
                className="btn btn-danger btn-sm"
                onClick={ () => handleDelete(movie) }
              > Delete</button></td>
            </tr>
          )) }
        </tbody>
      </table>

    </div>
  )
}

export default Movies
