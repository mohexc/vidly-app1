import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/paginnation';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService'
import { paginate } from '../utils/paginate'
import SearchBox from './searchBox';
import _ from "lodash"

function Movies(props) {

  //? state
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [pageSize] = useState(4)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' })
  const [searchQuery, setSearchQuery] = useState('')

  // useEffect(() => {
  //   setGenres([{ _id: "", name: "All Genres" }, ...getGenres()])
  //   setMovies(getMovies())
  // }, [])
  useEffect(() => {

    const fetchGenres = async () => {
      const { data } = await getGenres()
      setGenres([{ _id: "", name: "All genres" }, ...data])
    }
    fetchGenres()

    const fetchMovies = async () => {
      const { data } = await getMovies()
      setMovies(data)
    }
    fetchMovies()

  }, [])

  //? event handling...

  const handleDelete = async movie => {
    const originalMoves = movies
    console.log(movie)
    setMovies(movies.filter(m => m._id !== movie._id))

    console.log(movie._id)

    try { await deleteMovie(movie._id) }
    catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has already been delete')
      setMovies(originalMoves)
    }


  }

  const handleLike = movie => {
    const newMovies = [...movies]
    const index = movies.indexOf(movie)
    newMovies[index] = { ...movies[index] }
    newMovies[index].liked = !newMovies[index].liked
    setMovies(newMovies)

  }

  const handlePageChange = page => setCurrentPage(page)

  const handleGenreSelect = genre => {
    setSelectedGenre(genre)
    setSearchQuery("")
    setCurrentPage(1)
  }

  const handleSerch = query => {
    setSearchQuery(query)
    setSelectedGenre(null)
    setCurrentPage(1)
  }

  const handleSort = sortCol => setSortColumn(sortCol)

  let filtered = movies
  if (searchQuery)
    filtered = movies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
  else if (selectedGenre && selectedGenre._id)
    filtered = movies.filter(m => m.genre._id === selectedGenre._id)

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
  const nMovies = paginate(sorted, currentPage, pageSize)

  if (movies.length === 0) return <p>There are no movies in the database</p>

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
        { props.user && <Link to="/movies/new" className="btn btn-primary mb-2" >New Movie</Link> }
        <p>Showing { filtered.length } movies in the database.</p>
        <SearchBox value={ searchQuery } onChange={ handleSerch } />
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
