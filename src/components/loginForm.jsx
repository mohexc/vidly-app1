import React, { useState } from 'react'
import Input from "./common/input"

const LoginForm = () => {

  const [account, setAccount] = useState({ username: "", password: "" })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const err = {}
    if (account.username.trim() === '') err.username = 'Username is required'
    if (account.password.trim() === '') err.password = 'Username is required'
    return Object.keys(err).length === 0 ? null : err
  }

  const handleSubmit = e => {
    e.preventDefault()

    const err = validate()
    setErrors(err || {})

    if (Object.keys(errors).length !== 0) return console.log(errors)

    console.log('submitted')
  }

  const validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === '') return 'Username is required'
    }
    if (name === "password") {
      if (value.trim() === '') return 'Password is required'
    }
  }

  const handleChange = ({ currentTarget: input }) => {
    const errs = { ...errors }
    const errMessage = validateProperty(input)
    if (errMessage) errs[input.name] = errMessage
    else delete errs[input.name]
    setErrors(errs)

    const acc = { ...account }
    acc[input.name] = input.value
    setAccount(acc)
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <Input name="username" value={ account.username } lebel="Username" onChange={ handleChange } errors={ errors.username } />
        <Input name="password" value={ account.password } lebel="Password" onChange={ handleChange } errors={ errors.password } />
        <button className="btn btn-outline-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;