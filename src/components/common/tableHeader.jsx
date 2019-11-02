import React from 'react'

const TableHeader = ({ columns, onSort, sortColumn }) => {
  const raiseSort = path => {
    const sortCol = { ...sortColumn }
    if (sortCol.path === path) sortCol.order = sortCol.order === "asc" ? "desc" : "asc"
    else {
      sortCol.path = path
      sortCol.order = "asc"
    }
    onSort(sortCol)
  }

  const renderSortIcon = column => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>
    return <i className="fa fa-sort-desc"></i>
  }

  return (
    <thead>
      <tr>
        { columns.map(column => (
          <th
            className="clickable"
            key={ column.path || column.key }
            onClick={ () => raiseSort(column.path) }>
            { column.label } { renderSortIcon(column) }
          </th>)) }
      </tr>
    </thead>
  );
}

export default TableHeader;