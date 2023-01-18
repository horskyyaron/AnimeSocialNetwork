import React, { useState } from "react";
// import "./SearchBar.css";
import Axios from "axios";

export default function Home() {
    const [anime, setAnime] = useState();
    const [username, setUserName] = useState();

    const handleAnimeSearch = () => {
      Axios.post("http://localhost:3001/", {
              animeName: anime
          }).then((response) => {
              console.log(response)
          });    
      };

      const handleUserSearch = () => {
        Axios.post("http://localhost:3001/", {
                userName: username
            }).then((response) => {
                console.log(response)
            });
        };
  
    return (
      <div>

        <div className="animeSearch">
        <div className="searchInputs">
          <input
            type="text"
            placeholder="Enter Anime"
            onChange={(e) => setAnime(e.target.value)}
            value={anime}
            required 
          />
          <button onClick={handleAnimeSearch}>Search</button>
        </div>
        
      </div>
      <br></br>
    
      <div className="userSearch">
        <div className="searchInputs">
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
            required 
          />
          <button onClick={handleUserSearch}>Search</button>
        </div>
        
      </div>

    </div>
      
    );
  }