import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import Joi from "joi-browser"
import Input from "./common/input"
import auth from '../services/authService'

const LoginForm = (props) => {

  const [data, setData] = useState({ username: "", password: "" })
  const [errors, setErrors] = useState({})

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password")
  }

  const doSubmit = async () => {
    // Call the server
    try {
      await auth.login(data.username, data.password)

      const { state } = props.location
      window.location = state ? state.from.pathname : '/'
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const err = { ...errors }
        err.username = ex.response.data
        setErrors(err)
      }
    }
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
    // if (error) return null
    // return error.details[0].message
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

  if (auth.getCurrentUser()) return <Redirect to="/" />

  return (
    <div className="boxShadow p-3 col-lg-6 offset-lg-3"  >
      <div className="">
        <h1 >Login</h1>
        <form onSubmit={ handleSubmit } >
          <Input name="username" value={ data.username } lebel="Username" onChange={ handleChange } errors={ errors.username } />
          <Input name="password" value={ data.password } lebel="Password" onChange={ handleChange } errors={ errors.password } />
          <button
            disabled={ validate() }
            className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;