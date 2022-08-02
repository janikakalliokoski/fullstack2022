const Filter = (props) => {
    return (
        <form onSubmit={props.addFilter}>
        <div>
          filter shown with: <input
          value={props.newFilter}
          onChange={props.handleFilterChange}
          />
        </div>
      </form>
    )
}

export default Filter
