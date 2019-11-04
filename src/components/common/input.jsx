import React from 'react';

const Input = ({ name, lebel, value, onChange, errors }) => {
  return (
    <div className="form-group">
      <label htmlFor={ name }>{ lebel }</label>
      <input
        type="text"
        className="form-control "
        id={ name }
        name={ name }
        value={ value }
        onChange={ onChange }
      />
      { errors && <div className="alert alert-danger ">{ errors }</div> }
    </div>
  );
}

export default Input;