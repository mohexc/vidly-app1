import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/paginnation';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService'
import { paginate } from '../utils/paginate'
import _ from "lodash"

function Movies() {

  //? state
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [pageSize] = useState(4)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState([])
  const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' })

  useEffect(() => {
    setGenres([{ _id: "", name: "All Genres" }, ...getGenres()])
    setMovies(getMovies())
  }, [])

  //? event handling...

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

  const handleSort = sortCol => setSortColumn(sortCol)

  //? rendering...
  if (movies.length === 0) return <p>There are no movies in the database</p>

  const filtered = selectedGenre && selectedGenre._id ? movies.filter(m => m.genre._id === selectedGenre._id) : movies
  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
  const nMovies = paginate(sorted, currentPage, pageSize)

  return (
    <div className="row">
      <div className="col col-lg-3 text-center">
        <ListGroup
          items={ genres }
          onItemSelect={ handleGenreSelect }
          selectedItem={ selectedGenre }
        />
      </div>
      <div className="col">
        <Link to="/movies/new" className="btn btn-primary mb-2" >New Movie</Link>
        <p>Showing { filtered.length } movies in the database.</p>
        <MoviesTable
          nMovies={ nMovies }
          onLike={ handleLike }
          onDelete={ handleDelete }
          onSort={ handleSort }
          sortColumn={ sortColumn }
        />
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
