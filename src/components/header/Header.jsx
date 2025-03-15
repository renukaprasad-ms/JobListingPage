import React from "react";
import styles from "./Header.module.css"; // Importing CSS module for styling
import { CiSearch } from "react-icons/ci"; // Importing search icon
import { RxCross1 } from "react-icons/rx"; // Importing close (cross) icon

// Header component that includes a title and a toggleable search icon
const Header = ({ setSearchBar, searchBar }) => {
  return (
    <div className={styles.header}> {/* Header container */}
      <h1>Job Listings</h1> {/* Page title */}
      
      {/* Search icon container */}
      <div 
        className={styles.searchIcon} 
        onClick={() => { setSearchBar(!searchBar); }} // Toggle search bar state on click
      >
        {/* Conditionally render search or close icon based on searchBar state */}
        {!searchBar && <CiSearch size={30} />} {/* Show search icon when searchBar is false */}
        {searchBar && <RxCross1 size={30} />} {/* Show cross icon when searchBar is true */}
      </div>
    </div>
  );
};

export default Header;
