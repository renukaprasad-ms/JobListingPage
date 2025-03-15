import React from 'react'
import styles from "./SearchBar.module.css"

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBarInput}>
        <input type="text" placeholder='Search Here' />
      </div>
    </div>
  )
}

export default SearchBar