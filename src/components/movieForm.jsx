import React from 'react';

const MovieFrom = ({ match, history }) => {
  return (
    <div>
      <h2>Move From { match.params.id }</h2>
      <button className="btn btn-outline-success my-3" onClick={ () => history.push('/movies') }>Save</button>
    </div>

  );

}

export default MovieFrom;