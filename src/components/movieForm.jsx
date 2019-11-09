import React, { useState, useEffect } from 'react'
import Joi from 'joi-browser';
import Input from './common/input';
import Select from './common/select'
import { getMovie, saveMovie } from './../services/movieService';
import { getGenres } from "../services/genreService.js"

const NewMovieForm = ({ match, history }) => {
  const [data, setData] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: ""
  })
  const [genres, setGenres] = useState([])
  const [errors, setErrors] = useState({})

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
  }

  const mapToViewModel = (movie) => {

    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

  const populateGenres = async () => {
    const { data: genres } = await getGenres()
    setGenres(genres)
  }

  useEffect(() => {
    populateGenres()

    const populateMovie = async () => {
      try {
        const movieId = match.params.id
        if (movieId === 'new') return
        const { data: movie } = await getMovie(movieId)
        setData(mapToViewModel(movie))
      }
      catch (ex) {
        if (ex.response && ex.response.status === 404)
          return history.replace("/not-found")
      }
    }
    populateMovie()
  }, [history, match])

  const doSubmit = async () => {
    await saveMovie(data)
    history.push('/movies')
  }

  const validate = () => {
    const result = Joi.validate(data, schema, { abortEarly: false })

    if (!result.error) return null

    const err = {}
    for (let item of result.error.details) err[item.path[0]] = item.message
    return err
  }

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value }
    const nSchema = { [name]: schema[name] }
    const { error } = Joi.validate(obj, nSchema)
    return error ? error.details[0].message : null
  }

  const handleSubmit = e => {
    e.preventDefault()

    const err = validate()
    setErrors(err || {})

    if (Object.keys(errors).length > 0) return console.log(Object.keys(errors).length)

    doSubmit()
  }

  const handleChange = ({ currentTarget: input }) => {
    const errs = { ...errors }
    const errMessage = validateProperty(input)
    if (errMessage) errs[input.name] = errMessage
    else delete errs[input.name]
    setErrors(errs)

    const nData = { ...data }
    nData[input.name] = input.value
    setData(nData)
  }


  return (
    <div>
      <h1>Movie Form</h1>
      <form onSubmit={ handleSubmit } >
        <Input name="title" value={ data.title } lebel="Title" onChange={ handleChange } errors={ errors.title } />
        < Select
          name="genreId"
          value={ data.genreId }
          lebel="Genre"
          onChange={ handleChange }
          errors={ errors.genreId }
          options={ genres }
        />
        <Input
          name="numberInStock"
          value={ data.numberInStock }
          lebel="Number in Stock"
          onChange={ handleChange }
          errors={ errors.numberInStock }
        />
        <Input
          name="dailyRentalRate"
          value={ data.dailyRentalRate }
          lebel="Rate"
          onChange={ handleChange }
          errors={ errors.dailyRentalRate } />
        <button
          disabled={ validate() }
          className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default NewMovieForm;