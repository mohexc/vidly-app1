import React, { useState } from 'react'
import Like from './common/like';
import Pagination from './common/paginnation';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate'

function Movies() {

  const [movies, setMovies] = useState(getMovies())
  const [pageSize] = useState(4)
  const [currentPage, setCurrentPage] = useState(1)

  const handleDelete = movie => setMovies(movies.filter(m => m._id !== movie._id))

  const handleLike = movie => {
    const newMovies = [...movies]
    const index = movies.indexOf(movie)
    newMovies[index] = { ...movies[index] }
    newMovies[index].liked = !newMovies[index].liked
    setMovies(newMovies)

  }

  const handlePageChange = page => setCurrentPage(page)

  if (movies.length === 0) return <p>There are no movies in the database</p>

  const nMovies = paginate(movies, currentPage, pageSize)

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
          { nMovies.map(movie => (
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
      <Pagination
        itemsCount={ movies.length }
        pageSize={ pageSize }
        onPageChange={ handlePageChange }
        currentPage={ currentPage }
      />

    </div>
  )
}

export default Movies
