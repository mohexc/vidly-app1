import React from 'react';

const Select = ({ name, lebel, value, onChange, errors, options }) => {
  return (
    <div className="form-group">
      <label htmlFor={ name }>{ lebel }</label>
      <select className="form-control" value={ value } onChange={ onChange } name={name} id={name}>
        <option value=""></option>
        { options.map(option => <option key={ option._id } value={ option._id }>{ option.name }</option>) }
      </select>
      { errors && <div className="alert alert-danger ">{ errors }</div> }
    </div>
  );
}

export default Select;