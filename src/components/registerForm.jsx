import React, { useState } from 'react';
import Joi from "joi-browser"
import Input from "./common/input"
//? import * as userService from "../services/userService"  => function we have exported from user service will be methods of userServiceObject
import { register } from '../services/userService';
import auth from "../services/authService"

const RegisterForm = ({ history }) => {
  const [data, setData] = useState({ username: '', password: '', name: '' })
  const [errors, setErrors] = useState({})

  const schema = {
    username: Joi.string().required().email().label('Username'),
    password: Joi.string().required().min(5).label('Password'),
    name: Joi.string().required().label('Name')
  }

  const doSubmit = async () => {
    //? await userService.register(data)
    try {
      const response = await register(data)
      // localStorage.setItem('token', response.headers['x-auth-token'])
      auth.loginWithJwt(response.headers['x-auth-token'])
      // history.push('/')
      window.location = "/"
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data)
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
    <div className="boxShadow p-3 col-lg-6 offset-lg-3">
      <h1>Resgishter</h1>
      <form onSubmit={ handleSubmit }>
        <Input autofocus name="username" value={ data.username } lebel="Username" onChange={ handleChange } errors={ errors.username } />
        <Input name="password" value={ data.password } lebel="Password" onChange={ handleChange } errors={ errors.password } />
        <Input name="name" value={ data.name } lebel="Name" onChange={ handleChange } errors={ errors.name } />
        <button
          disabled={ validate() }
          className="btn btn-primary">Login</button>
      </form>
    </div >
  );

}

export default RegisterForm;