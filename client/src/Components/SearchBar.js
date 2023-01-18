import React, { useState } from "react";
// import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Axios from "axios";

function SearchBar({ placeholder, data }) {
  const [anime, setAnime] = useState();

  const handleSearch = () => {
    Axios.post("http://localhost:3001/register", {
            anime: anime
        }).then((response) => {
            console.log(response)
        });
        console.log("after register");
    };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => setAnime(e.target.value)}
          value={anime}
          required 
        />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;