import React, { useState, useEffect } from 'react'
import Like from './common/like';
import ListGroup from './common/listGroup';
import Pagination from './common/paginnation';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService'
import { paginate } from '../utils/paginate'

function Movies() {

  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [pageSize] = useState(4)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState()

  useEffect(() => {
    setGenres([{ name: "All Genres" }, ...getGenres()])
    setMovies(getMovies())
  }, [])

  const handleDelete = movie => setMovies(movies.filter(m => m._id !== movie._id))

  const handleLike = movie => {
    const newMovies = [...movies]
    const index = movies.indexOf(movie)
    newMovies[index] = { ...movies[index] }
    newMovies[index].liked = !newMovies[index].liked
    setMovies(newMovies)

  }

  const handlePageChange = page => setCurrentPage(page)

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre)
    setCurrentPage(1)
  }

  if (movies.length === 0) return <p>There are no movies in the database</p>

  const filtered = selectedGenre && selectedGenre._id ? movies.filter(m => m.genre._id === selectedGenre._id) : movies

  const nMovies = paginate(filtered, currentPage, pageSize)


  return (
    <div className="row">
      <div className="col-2">
        <ListGroup
          items={ genres }
          onItemSelect={ handleGenreSelect }
          selectedItem={ selectedGenre }

        />
      </div>
      <div className="col">
        <p>Showing { filtered.length } movies in the database.</p>
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
          itemsCount={ filtered.length }
          pageSize={ pageSize }
          onPageChange={ handlePageChange }
          currentPage={ currentPage }
        />
      </div>


    </div>
  )
}

export default Movies
