import React from 'react';


const ListGroup = ({ items, onItemSelect, textProperty, valueProperty, selectedItem }) => {

  return (
    <ul className="list-group mb-3">
      { items.map(item => (
        <li
          className={ item === selectedItem ? "clickable list-group-item active  p-2" : "clickable list-group-item  p-2" }
          key={ item[valueProperty] }
          onClick={ () => onItemSelect(item) }
        >{ item[textProperty] }</li>
      )) }
    </ul>
  )
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
}


export default ListGroup;
